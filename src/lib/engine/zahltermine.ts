/**
 * Zahltermine der Sozialleistungen, berechnet nach den Zahlungsregeln der Gesetze und nicht abgetippt.
 *
 * Bankarbeitstag: Montag bis Freitag, außer an den bundesweiten Feiertagen (Neujahr, Karfreitag, Ostermontag,
 * 1. Mai, Christi Himmelfahrt, Pfingstmontag, 3. Oktober, 25. und 26. Dezember). Die TARGET-Schließtage der EZB
 * (1.1., Karfreitag, Ostermontag, 1.5., 25. und 26.12.) sind darin enthalten. Heiligabend und Silvester sind
 * Bankarbeitstage: die Rentenversicherung zahlt am 31. Dezember (Pressemeldung DRV vom 22.01.2026).
 *
 * - Rente, Beginn ab 1.4.2004: am letzten Bankarbeitstag des Monats, für den sie gilt (§ 118 Abs. 1 SGB VI).
 * - Rente, Beginn vor dem 1.4.2004: am letzten Bankarbeitstag des Vormonats (§ 272a SGB VI).
 * - Grundsicherungsgeld: im Voraus (§ 42 SGB II); die BA stellt es in der Regel einen Kalendertag vor dem Monat
 *   bereit, also am letzten Tag des Vormonats; fällt der auf ein Wochenende oder einen Feiertag, rechnet der Kern
 *   mit dem Bankarbeitstag davor.
 * - Arbeitslosengeld: nachträglich (§ 337 SGB III); verfügbar am ersten Arbeitstag des Folgemonats (Merkblatt 1).
 * - Wohngeld (§ 26 WoGG) und BAföG (§ 51 BAföG): monatlich im Voraus; einen bundesweiten Tag gibt es nicht.
 * - Elterngeld: im Laufe des Lebensmonats (§ 6 BEEG); Lebensmonate nach §§ 187, 188 BGB ab dem Tag der Geburt.
 * - Kindergeld und Kinderzuschlag: Termine der Familienkasse je Endziffer (params-2026.json), nie hochgerechnet.
 */
import P from '../../data/params-2026.json';
import { dayNum, fromIso, toIso, weekday, isWeekend, ostersonntag } from './feiertage';

export type Leistung = 'kindergeld' | 'rente' | 'rentevor' | 'grundsicherung' | 'alg' | 'wohngeld' | 'bafoeg' | 'elterngeld';
export const LEISTUNGEN: Leistung[] = ['kindergeld', 'rente', 'rentevor', 'grundsicherung', 'alg', 'wohngeld', 'bafoeg', 'elterngeld'];

/* ------------------------------------------------------------------ Bankfreie Tage */
export interface BankFrei { date: string; id: string; name: { de: string; en: string }; target: boolean }
const BANK_FEST: Array<{ id: string; md: string; name: { de: string; en: string }; target: boolean }> = [
  { id: 'neujahr', md: '01-01', name: { de: 'Neujahr', en: "New Year's Day" }, target: true },
  { id: 'maifeiertag', md: '05-01', name: { de: 'Tag der Arbeit', en: 'Labour Day' }, target: true },
  { id: 'einheit', md: '10-03', name: { de: 'Tag der Deutschen Einheit', en: 'German Unity Day' }, target: false },
  { id: 'weihnachten1', md: '12-25', name: { de: '1. Weihnachtstag', en: 'Christmas Day' }, target: true },
  { id: 'weihnachten2', md: '12-26', name: { de: '2. Weihnachtstag', en: 'Boxing Day' }, target: true },
];
const BANK_OSTERN: Array<{ id: string; off: number; name: { de: string; en: string }; target: boolean }> = [
  { id: 'karfreitag', off: -2, name: { de: 'Karfreitag', en: 'Good Friday' }, target: true },
  { id: 'ostermontag', off: 1, name: { de: 'Ostermontag', en: 'Easter Monday' }, target: true },
  { id: 'himmelfahrt', off: 39, name: { de: 'Christi Himmelfahrt', en: 'Ascension Day' }, target: false },
  { id: 'pfingstmontag', off: 50, name: { de: 'Pfingstmontag', en: 'Whit Monday' }, target: false },
];
const cache = new Map<number, BankFrei[]>();
/** Bundesweite Feiertage eines Jahres, an denen keine Überweisung gutgeschrieben wird. */
export function bankFeiertage(y: number): BankFrei[] {
  const c = cache.get(y); if (c) return c;
  const os = fromIso(ostersonntag(y));
  const list: BankFrei[] = [
    ...BANK_FEST.map((f) => ({ date: `${y}-${f.md}`, id: f.id, name: f.name, target: f.target })),
    ...BANK_OSTERN.map((f) => ({ date: toIso(os + f.off), id: f.id, name: f.name, target: f.target })),
  ].sort((a, b) => a.date.localeCompare(b.date));
  cache.set(y, list);
  return list;
}
export const bankFeiertag = (iso: string) => bankFeiertage(Number(iso.slice(0, 4))).find((f) => f.date === iso);
export const istBankarbeitstag = (n: number) => !isWeekend(n) && !bankFeiertag(toIso(n));
/** Grund, warum ein Tag kein Bankarbeitstag ist (Samstag, Sonntag oder Feiertag), sonst null. */
export function warumFrei(iso: string, l: 'de' | 'en'): string | null {
  const w = weekday(fromIso(iso));
  if (w === 6) return l === 'de' ? 'Samstag' : 'Saturday';
  if (w === 0) return l === 'de' ? 'Sonntag' : 'Sunday';
  const f = bankFeiertag(iso);
  return f ? f.name[l] : null;
}
/** Bankarbeitstag am Tag selbst oder davor. */
export function bisBankarbeitstag(iso: string): string { let n = fromIso(iso); while (!istBankarbeitstag(n)) n--; return toIso(n); }
/** Bankarbeitstag am Tag selbst oder danach. */
export function abBankarbeitstag(iso: string): string { let n = fromIso(iso); while (!istBankarbeitstag(n)) n++; return toIso(n); }
export const tageImMonat = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();
const pad = (x: number) => String(x).padStart(2, '0');
export const ym = (y: number, m: number) => `${y}-${pad(m)}`;
export const monatsletzter = (y: number, m: number) => `${y}-${pad(m)}-${pad(tageImMonat(y, m))}`;
export const monatserster = (y: number, m: number) => `${y}-${pad(m)}-01`;
export const letzterBankarbeitstag = (y: number, m: number) => bisBankarbeitstag(monatsletzter(y, m));
export const ersterBankarbeitstag = (y: number, m: number) => abBankarbeitstag(monatserster(y, m));
export const vormonat = (y: number, m: number): [number, number] => (m === 1 ? [y - 1, 12] : [y, m - 1]);
export const folgemonat = (y: number, m: number): [number, number] => (m === 12 ? [y + 1, 1] : [y, m + 1]);
/** Bankarbeitstage eines Monats. */
export function bankarbeitstage(y: number, m: number): number {
  let k = 0; for (let d = 1; d <= tageImMonat(y, m); d++) if (istBankarbeitstag(dayNum(y, m, d))) k++; return k;
}

/* ------------------------------------------------------------------ Regeln je Leistung (Zahlung für Monat m) */
/** Rente, Beginn ab dem 1. April 2004: letzter Bankarbeitstag des Monats (§ 118 SGB VI). */
export const renteNach = (y: number, m: number) => letzterBankarbeitstag(y, m);
/** Rente, Beginn vor dem 1. April 2004: letzter Bankarbeitstag des Vormonats (§ 272a SGB VI). */
export const renteVor = (y: number, m: number) => letzterBankarbeitstag(...vormonat(y, m));
/** Der Kalendertag, an dem eine Rente gezahlt wird, die vor dem Stichtag begann: false = nachschüssig. */
export const istVorschuessig = (beginnIso: string) => beginnIso < P.rente.stichtagVorschuessig;
/** Grundsicherungsgeld: letzter Kalendertag des Vormonats, bei Wochenende oder Feiertag der Bankarbeitstag davor. */
export const grundsicherung = (y: number, m: number) => bisBankarbeitstag(monatsletzter(...vormonat(y, m)));
/** Arbeitslosengeld: erster Bankarbeitstag des Folgemonats. */
export const alg = (y: number, m: number) => ersterBankarbeitstag(...folgemonat(y, m));
/** Wohngeld und BAföG: im Voraus; Fälligkeit zum Monatsersten, erster Bankarbeitstag als Orientierung. */
export const imVoraus = (y: number, m: number) => ersterBankarbeitstag(y, m);
/** Die Kindergeld-Termine einer Endziffer, oder null, wenn die Familienkasse sie (noch) nicht veröffentlicht hat. */
export function kindergeld(y: number, m: number, endziffer: number): string | null {
  const t = (P.kindergeld.termine as Record<string, Record<string, number[]>>)[String(y)];
  if (!t) return null;
  const d = t[String(endziffer)]?.[m - 1];
  return d ? `${y}-${pad(m)}-${pad(d)}` : null;
}
export const KG_JAHRE = Object.keys(P.kindergeld.termine).map(Number);

/** Lebensmonate nach §§ 187 Abs. 2, 188 Abs. 2 und 3 BGB: Beginn am Tag der Geburt. */
export function lebensmonat(geburt: string, k: number): { von: string; bis: string } {
  const [gy, gm, gd] = geburt.split('-').map(Number);
  const ende = (j: number) => { const t = gm - 1 + j; const y = gy + Math.floor(t / 12), m = (t % 12) + 1; return gd <= tageImMonat(y, m) ? dayNum(y, m, gd) - 1 : dayNum(y, m, tageImMonat(y, m)); };
  return { von: toIso(k === 1 ? fromIso(geburt) : ende(k - 1) + 1), bis: toIso(ende(k)) };
}

/** Steht der Tag in der Terminliste 2026 der Rentenversicherung? (31.12.2025 = Januar-Rente der Vorschüssigen.) */
export const drvTabelle = (iso: string) => iso === '2025-12-31' || (P.rente.tabelle2026 as string[]).includes(iso);

/* ------------------------------------------------------------------ Kalender */
export interface Zahlung { leistung: Leistung; date: string; fuer: string; /** amtlicher Termin (Tabelle) oder aus der Regel berechnet */ art: 'amtlich' | 'regel' | 'fenster'; bis?: string; lm?: number }
export interface Auswahl { leistungen: Leistung[]; endziffer?: number; geburt?: string }
/** Alle Zahlungen einer Auswahl in einem Monat des Kalenders (nach dem Tag, an dem das Geld kommt). */
export function zahlungenImZeitraum(a: Auswahl, von: string, bis: string): Zahlung[] {
  const out: Zahlung[] = [];
  const [vy, vm] = von.split('-').map(Number);
  const [by, bm] = bis.split('-').map(Number);
  // Monate, für die gezahlt wird: einen Monat davor bis einen danach, damit vorschüssige und nachträgliche Zahlungen erfasst sind.
  let [y, m] = vormonat(vy, vm);
  const [ey, em] = folgemonat(by, bm);
  while (y < ey || (y === ey && m <= em)) {
    const fuer = ym(y, m);
    for (const l of a.leistungen) {
      if (l === 'kindergeld') { const d = kindergeld(y, m, a.endziffer ?? 0); if (d) out.push({ leistung: l, date: d, fuer, art: 'amtlich' }); }
      if (l === 'rente') out.push({ leistung: l, date: renteNach(y, m), fuer, art: drvTabelle(renteNach(y, m)) ? 'amtlich' : 'regel' });
      if (l === 'rentevor') out.push({ leistung: l, date: renteVor(y, m), fuer, art: drvTabelle(renteVor(y, m)) ? 'amtlich' : 'regel' });
      if (l === 'grundsicherung') out.push({ leistung: l, date: grundsicherung(y, m), fuer, art: 'regel' });
      if (l === 'alg') out.push({ leistung: l, date: alg(y, m), fuer, art: 'regel' });
      if (l === 'wohngeld' || l === 'bafoeg') out.push({ leistung: l, date: imVoraus(y, m), fuer, art: 'fenster' });
    }
    [y, m] = folgemonat(y, m);
  }
  if (a.leistungen.includes('elterngeld') && a.geburt) {
    for (let k = 1; k <= 32; k++) { const lm = lebensmonat(a.geburt, k); out.push({ leistung: 'elterngeld', date: lm.von, bis: lm.bis, fuer: lm.von.slice(0, 7), art: 'fenster', lm: k }); }
  }
  return out.filter((z) => z.date >= von && z.date <= bis).sort((p, q) => p.date.localeCompare(q.date) || LEISTUNGEN.indexOf(p.leistung) - LEISTUNGEN.indexOf(q.leistung));
}
export const plusTage = (iso: string, d: number) => toIso(fromIso(iso) + d);
export const tageBis = (von: string, bis: string) => fromIso(bis) - fromIso(von);

/** iCalendar (RFC 5545): ganztägige Termine, im Browser erzeugt, nichts wird gesendet. */
export function ics(events: Array<{ date: string; title: string; desc?: string; uid: string }>, stamp: string): string {
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  const d = (iso: string) => iso.replace(/-/g, '');
  const fold = (line: string) => { const parts: string[] = []; let s = line; while (s.length > 74) { parts.push(s.slice(0, 74)); s = ` ${s.slice(74)}`; } parts.push(s); return parts.join('\r\n'); };
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Radif Partners//Auszahlungstermine//DE', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
  for (const e of events) {
    lines.push('BEGIN:VEVENT', `UID:${e.uid}`, `DTSTAMP:${d(stamp)}T000000Z`, `DTSTART;VALUE=DATE:${d(e.date)}`, `DTEND;VALUE=DATE:${d(plusTage(e.date, 1))}`, fold(`SUMMARY:${esc(e.title)}`));
    if (e.desc) lines.push(fold(`DESCRIPTION:${esc(e.desc)}`));
    lines.push('TRANSP:TRANSPARENT', 'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}
