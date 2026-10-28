/**
 * Die Werkzeuge der Seite. Jedes Datum kommt aus dem Rechenkern (engine/zahltermine.ts) oder aus der
 * Terminliste der Familienkasse (params-2026.json); nichts ist abgetippt. Eine Spec listet ihre Felder
 * (sichtbar zuerst, `adv` eingeklappt) und eine Funktion `run`, die die Ergebniskarte liefert.
 * Der Kalender « Meine nächsten Zahlungen » ist eine eigene Komponente (components/az/MeineZahlungen.tsx).
 */
import type { ToolSpec, V, Opt, OutTable } from './tool-types';
import { resolve } from './tool-types';
import { formatNumber, type Lang } from './format';
import { fromIso, toIso, weekday } from './engine/feiertage';
import {
  renteNach, renteVor, grundsicherung, alg, imVoraus, kindergeld, lebensmonat, bankFeiertage, bankarbeitstage,
  warumFrei, monatsletzter, monatserster, vormonat, folgemonat, drvTabelle, tageImMonat, KG_JAHRE, ym,
} from './engine/zahltermine';

export type Args = Record<string, number | string>;
const T = (l: Lang, de: string, en: string) => (l === 'de' ? de : en);
const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k] ?? '');
const num = (x: number, l: Lang) => formatNumber(x, 0, l);
const TAG = (l: Lang) => (l === 'de' ? 'de-DE' : 'en-GB');
const fmt = (iso: string, l: Lang, o: Intl.DateTimeFormatOptions) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(TAG(l), { ...o, timeZone: 'UTC' });
/** « 30. November 2026 » / « 30 November 2026 » */
export const dLong = (iso: string, l: Lang) => fmt(iso, l, { day: 'numeric', month: 'long', year: 'numeric' });
/** « Montag, 30. November 2026 » */
export const dWeek = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
/** « Mo., 30. November » / « Mon 30 November » */
export const dShort = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'short', day: 'numeric', month: 'long' });
/** « November 2026 » */
export const monat = (ymStr: string, l: Lang) => fmt(`${ymStr}-15`, l, { month: 'long', year: 'numeric' });
export const monatName = (m: number, l: Lang) => fmt(`2027-${String(m).padStart(2, '0')}-15`, l, { month: 'long' });
const wd = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'long' });

/* ------------------------------------------------------------------ Felder */
const MONATE: string[] = []; for (const y of [2026, 2027]) for (let m = 1; m <= 12; m++) MONATE.push(ym(y, m));
const monatOpts = (l: Lang): Opt[] => MONATE.map((x) => ({ value: x, label: monat(x, l) }));
const fMonat = (l: Lang, def: string, label = T(l, 'Monat', 'Month')) => ({ kind: 'select' as const, id: 'monat', label, def, options: monatOpts(l) });
const fJahr = (l: Lang, def: number) => ({ kind: 'select' as const, id: 'jahr', label: T(l, 'Jahr', 'Year'), def: String(def), options: [2026, 2027].map((y) => ({ value: String(y), label: String(y) })) });
const fEnd = (l: Lang, def: number) => ({ kind: 'select' as const, id: 'endziffer', label: T(l, 'Endziffer der Kindergeldnummer', 'Last digit of the Kindergeld number'), def: String(def), options: Array.from({ length: 10 }, (_, i) => ({ value: String(i), label: String(i) })) });
const fBeginn = (l: Lang, def = 'nach') => ({ kind: 'choice' as const, id: 'beginn', label: T(l, 'Rentenbeginn', 'Pension start'), def, options: [{ value: 'nach', label: T(l, 'ab April 2004', 'April 2004 or later') }, { value: 'vor', label: T(l, 'vor April 2004', 'before April 2004') }] });
const split = (x: string): [number, number] => { const [y, m] = x.split('-').map(Number); return [y, m]; };
/** Hinweis, wenn der Regeltag auf einen bankfreien Tag fällt: « 31.10.: Samstag ». */
function verschoben(regeltag: string, zahltag: string, l: Lang): string {
  if (regeltag === zahltag) return T(l, 'kein Wochenende, kein Feiertag', 'no weekend, no holiday');
  const grund: string[] = [];
  for (let d = fromIso(zahltag) + 1; d <= fromIso(regeltag); d++) { const w = warumFrei(toIso(d), l); if (w) grund.push(`${fmt(toIso(d), l, { day: 'numeric', month: 'short' })} ${w}`); }
  for (let d = fromIso(regeltag); d < fromIso(zahltag); d++) { const w = warumFrei(toIso(d), l); if (w) grund.push(`${fmt(toIso(d), l, { day: 'numeric', month: 'short' })} ${w}`); }
  return T(l, `vorgezogen oder verschoben: ${grund.join(', ')}`, `moved: ${grund.join(', ')}`);
}
const herkunft = (amtlich: boolean, l: Lang) => (amtlich ? T(l, 'amtliche Terminliste', 'official list') : T(l, 'aus der gesetzlichen Regel berechnet', 'calculated from the statutory rule'));

/* ------------------------------------------------------------------ Kindergeld */
function kgSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fEnd(l, Number(a.endziffer ?? 0)), fMonat(l, String(a.monat ?? '2026-11'))],
    run: (v) => {
      const e = n(v, 'endziffer'); const [y, m] = split(s(v, 'monat'));
      const d = kindergeld(y, m, e);
      const next = [1, 2, 3].map((k) => { let [yy, mm] = [y, m]; for (let i = 0; i < k; i++) [yy, mm] = folgemonat(yy, mm); return { ym: ym(yy, mm), d: kindergeld(yy, mm, e) }; });
      const jahr: OutTable = {
        caption: T(l, `Kindergeld ${y}, Endziffer ${e}: alle Termine der Familienkasse`, `Kindergeld ${y}, last digit ${e}: every date from the Familienkasse`),
        headers: [T(l, 'Monat', 'Month'), T(l, 'Auszahlung', 'Payment'), T(l, 'Wochentag', 'Weekday')],
        rows: Array.from({ length: 12 }, (_, i) => { const x = kindergeld(y, i + 1, e)!; return [monatName(i + 1, l), dLong(x, l), wd(x, l)]; }), align: ['l', 'l', 'l'],
      };
      const alle: OutTable = {
        caption: T(l, `Kindergeld ${monat(s(v, 'monat'), l)}: Termine aller Endziffern`, `Kindergeld ${monat(s(v, 'monat'), l)}: dates for every last digit`),
        headers: [T(l, 'Endziffer', 'Last digit'), T(l, 'Auszahlung', 'Payment')],
        rows: Array.from({ length: 10 }, (_, k) => [String(k), dShort(kindergeld(y, m, k)!, l)]), align: ['r', 'l'],
      };
      return {
        label: T(l, `Kindergeld ${monat(s(v, 'monat'), l)}, Endziffer ${e}`, `Kindergeld ${monat(s(v, 'monat'), l)}, last digit ${e}`),
        value: d ? dShort(d, l) : '–',
        sub: T(l, 'Kinderzuschlag kommt am selben Tag. Ein Anspruch auf einen bestimmten Tag besteht nicht.', 'Kinderzuschlag arrives the same day. There is no legal right to a particular day.'),
        rows: next.map((x) => [monat(x.ym, l), x.d ? dShort(x.d, l) : T(l, 'noch nicht veröffentlicht', 'not yet published')]),
        table: alle, tables: [jahr],
      };
    },
  };
}

/* ------------------------------------------------------------------ Rente */
function reSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fBeginn(l, String(a.beginn ?? 'nach')), fMonat(l, String(a.monat ?? '2026-11'), T(l, 'Rente für den Monat', 'Pension for the month'))],
    run: (v) => {
      const vor = s(v, 'beginn') === 'vor'; const [y, m] = split(s(v, 'monat'));
      const f = vor ? renteVor : renteNach;
      const d = f(y, m);
      const regel = vor ? monatsletzter(...vormonat(y, m)) : monatsletzter(y, m);
      const jahr: OutTable = {
        caption: T(l, `Rente ${y}, ${vor ? 'Rentenbeginn vor April 2004 (Zahlung im Vormonat)' : 'Rentenbeginn ab April 2004 (Zahlung am Monatsende)'}`, `Pension ${y}, ${vor ? 'started before April 2004 (paid the month before)' : 'started April 2004 or later (paid at month end)'}`),
        headers: [T(l, 'Rente für', 'Pension for'), T(l, 'Auf dem Konto', 'In your account'), T(l, 'Wochentag', 'Weekday'), T(l, 'Quelle', 'Source')],
        rows: Array.from({ length: 12 }, (_, i) => { const x = f(y, i + 1); return [monatName(i + 1, l), dLong(x, l), wd(x, l), herkunft(drvTabelle(x), l)]; }), align: ['l', 'l', 'l', 'l'],
      };
      return {
        label: T(l, `Rente für ${monat(s(v, 'monat'), l)}`, `Pension for ${monat(s(v, 'monat'), l)}`),
        value: dShort(d, l),
        sub: vor ? T(l, 'Vorschüssig: Das Geld kommt am letzten Bankarbeitstag des Vormonats (§ 272a SGB VI).', 'Paid in advance: the money arrives on the last bank business day of the month before (s. 272a SGB VI).') : T(l, 'Nachschüssig: Das Geld kommt am letzten Bankarbeitstag des Monats (§ 118 SGB VI).', 'Paid in arrears: the money arrives on the last bank business day of the month (s. 118 SGB VI).'),
        rows: [
          [T(l, 'Letzter Kalendertag', 'Last calendar day'), dShort(regel, l)],
          [T(l, 'Wochenende oder Feiertag', 'Weekend or holiday'), verschoben(regel, d, l)],
          [T(l, 'Herkunft des Datums', 'Where the date comes from'), herkunft(drvTabelle(d), l)],
        ],
        table: jahr,
      };
    },
  };
}

/* ------------------------------------------------------------------ Erste Rentenzahlung */
function r1Spec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fMonat(l, String(a.monat ?? '2027-01'), T(l, 'Rentenbeginn (Monat)', 'Pension starts (month)'))],
    run: (v) => {
      const [y, m] = split(s(v, 'monat'));
      const reihe = Array.from({ length: 6 }, (_, k) => { let [yy, mm] = [y, m]; for (let i = 0; i < k; i++) [yy, mm] = folgemonat(yy, mm); return { ym: ym(yy, mm), d: renteNach(yy, mm) }; });
      const juli = reihe.find((x) => x.ym.endsWith('-07'));
      return {
        label: T(l, `Rentenbeginn ${monat(s(v, 'monat'), l)}: erste Zahlung`, `Pension from ${monat(s(v, 'monat'), l)}: first payment`),
        value: dShort(reihe[0].d, l),
        sub: T(l, 'Ab dem Rentenbescheid. Kommt der Bescheid später, wird der Betrag für die Monate davor nachgezahlt.', 'Once the award notice is issued. If it comes later, the months before are paid in arrears.'),
        rows: [
          [T(l, 'Rentenbeginn', 'Pension start'), dLong(monatserster(y, m), l)],
          [T(l, 'Zweite Zahlung', 'Second payment'), dShort(reihe[1].d, l)],
          [T(l, 'Dritte Zahlung', 'Third payment'), dShort(reihe[2].d, l)],
          ...(juli ? [[T(l, 'Erste Zahlung nach der Anpassung zum 1. Juli', 'First payment after the 1 July increase'), dShort(juli.d, l)] as [string, string]] : []),
        ],
        table: { caption: T(l, 'Die ersten sechs Zahlungen', 'The first six payments'), headers: [T(l, 'Rente für', 'Pension for'), T(l, 'Auf dem Konto', 'In your account')], rows: reihe.map((x) => [monat(x.ym, l), dWeek(x.d, l)]), align: ['l', 'l'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ Grundsicherungsgeld */
function gsSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fMonat(l, String(a.monat ?? '2026-12'), T(l, 'Grundsicherungsgeld für', 'Grundsicherungsgeld for'))],
    run: (v) => {
      const [y, m] = split(s(v, 'monat'));
      const d = grundsicherung(y, m), regel = monatsletzter(...vormonat(y, m));
      return {
        label: T(l, `Grundsicherungsgeld für ${monat(s(v, 'monat'), l)}`, `Grundsicherungsgeld for ${monat(s(v, 'monat'), l)}`),
        value: dShort(d, l),
        sub: T(l, 'Im Voraus: in der Regel einen Kalendertag vor dem Monat, für den es gezahlt wird.', 'In advance: as a rule one calendar day before the month it covers.'),
        rows: [
          [T(l, 'Regeltag (Vormonatsletzter)', 'Rule day (last day of the month before)'), dShort(regel, l)],
          [T(l, 'Wochenende oder Feiertag', 'Weekend or holiday'), verschoben(regel, d, l)],
          [T(l, 'Herkunft des Datums', 'Where the date comes from'), herkunft(false, l)],
        ],
        table: { caption: T(l, `Grundsicherungsgeld ${y}: Zahltage für jeden Monat`, `Grundsicherungsgeld ${y}: payment day for each month`), headers: [T(l, 'Für den Monat', 'For the month'), T(l, 'Auf dem Konto', 'In your account'), T(l, 'Wochentag', 'Weekday')], rows: Array.from({ length: 12 }, (_, i) => { const x = grundsicherung(y, i + 1); return [monatName(i + 1, l), dLong(x, l), wd(x, l)]; }), align: ['l', 'l', 'l'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ Arbeitslosengeld */
function algSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fMonat(l, String(a.monat ?? '2026-11'), T(l, 'Arbeitslosengeld für', 'Unemployment benefit for'))],
    run: (v) => {
      const [y, m] = split(s(v, 'monat'));
      const d = alg(y, m), erster = monatserster(...folgemonat(y, m));
      return {
        label: T(l, `Arbeitslosengeld für ${monat(s(v, 'monat'), l)}`, `Arbeitslosengeld for ${monat(s(v, 'monat'), l)}`),
        value: dShort(d, l),
        sub: T(l, 'Nachträglich: verfügbar am ersten Arbeitstag des Folgemonats.', 'In arrears: available on the first working day of the following month.'),
        rows: [
          [T(l, 'Erster Tag des Folgemonats', 'First day of the next month'), dShort(erster, l)],
          [T(l, 'Wochenende oder Feiertag', 'Weekend or holiday'), verschoben(erster, d, l)],
          [T(l, 'Herkunft des Datums', 'Where the date comes from'), herkunft(false, l)],
        ],
        table: { caption: T(l, `Arbeitslosengeld ${y}: verfügbar ab`, `Arbeitslosengeld ${y}: available from`), headers: [T(l, 'Für den Monat', 'For the month'), T(l, 'Auf dem Konto', 'In your account'), T(l, 'Wochentag', 'Weekday')], rows: Array.from({ length: 12 }, (_, i) => { const x = alg(y, i + 1); return [monatName(i + 1, l), dLong(x, l), wd(x, l)]; }), align: ['l', 'l', 'l'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ Wohngeld, BAföG */
function voSpec(l: Lang, a: Args = {}): ToolSpec {
  const art = String(a.leistung ?? 'wohngeld');
  const name = art === 'bafoeg' ? 'BAföG' : T(l, 'Wohngeld', 'Wohngeld');
  return {
    inputs: [fMonat(l, String(a.monat ?? '2026-12'), T(l, `${name} für`, `${name} for`))],
    run: (v) => {
      const [y, m] = split(s(v, 'monat'));
      const d = imVoraus(y, m), vorher = renteNach(...vormonat(y, m));
      return {
        label: T(l, `${name} für ${monat(s(v, 'monat'), l)}`, `${name} for ${monat(s(v, 'monat'), l)}`),
        value: dShort(d, l),
        sub: T(l, 'Im Voraus: Fälligkeit zum Monatsanfang. Den genauen Tag legt Ihre Behörde fest; dieser Wert ist der erste Bankarbeitstag des Monats.', 'In advance: due at the start of the month. Your office sets the exact day; this is the first bank business day of the month.'),
        rows: [
          [T(l, 'Fällig ab', 'Due from'), dShort(monatserster(y, m), l)],
          [T(l, 'Erster Bankarbeitstag', 'First bank business day'), dShort(d, l)],
          [T(l, 'Letzter Bankarbeitstag davor', 'Last bank business day before'), dShort(vorher, l)],
          [T(l, 'Bankarbeitstage im Monat', 'Bank business days in the month'), num(bankarbeitstage(y, m), l)],
        ],
        table: { caption: T(l, `${name} ${y}: Monatsanfang und erster Bankarbeitstag`, `${name} ${y}: start of month and first bank business day`), headers: [T(l, 'Für den Monat', 'For the month'), T(l, 'Erster Bankarbeitstag', 'First bank business day'), T(l, 'Letzter Bankarbeitstag des Vormonats', 'Last bank business day of the month before')], rows: Array.from({ length: 12 }, (_, i) => [monatName(i + 1, l), dShort(imVoraus(y, i + 1), l), dShort(renteNach(...vormonat(y, i + 1)), l)]), align: ['l', 'l', 'l'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ Elterngeld */
function egSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [
      { kind: 'select', id: 'tag', label: T(l, 'Geburtstag des Kindes: Tag', "Child's birth date: day"), def: String(a.tag ?? 15), options: Array.from({ length: 31 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) })) },
      { kind: 'select', id: 'gmonat', label: T(l, 'Monat', 'Month'), def: String(a.gmonat ?? 11), options: Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: monatName(i + 1, l) })) },
      { kind: 'select', id: 'gjahr', label: T(l, 'Jahr', 'Year'), def: String(a.gjahr ?? 2026), options: [2025, 2026, 2027].map((y) => ({ value: String(y), label: String(y) })) },
      { kind: 'choice', id: 'dauer', label: T(l, 'Bezug', 'Payment'), def: String(a.dauer ?? 'basis'), options: [{ value: 'basis', label: T(l, 'Basiselterngeld', 'Basic') }, { value: 'plus', label: 'ElterngeldPlus' }] },
    ],
    run: (v) => {
      const y = n(v, 'gjahr'), m = n(v, 'gmonat'); const d = Math.min(n(v, 'tag'), tageImMonat(y, m));
      const geburt = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const k = s(v, 'dauer') === 'plus' ? 28 : 14;
      const lm = Array.from({ length: k }, (_, i) => ({ i: i + 1, ...lebensmonat(geburt, i + 1) }));
      return {
        label: T(l, `Geburt am ${dLong(geburt, l)}: 1. Lebensmonat`, `Born ${dLong(geburt, l)}: month of life 1`),
        value: `${fmt(lm[0].von, l, { day: 'numeric', month: 'short' })} – ${fmt(lm[0].bis, l, { day: 'numeric', month: 'short' })}`,
        sub: T(l, 'Elterngeld wird im Laufe des Lebensmonats gezahlt, für den es bestimmt ist (§ 6 BEEG); einen festen Tag gibt es nicht.', 'Elterngeld is paid during the month of life it covers (s. 6 BEEG); there is no fixed day.'),
        rows: [
          [T(l, '2. Lebensmonat', 'Month of life 2'), `${dShort(lm[1].von, l)} – ${dShort(lm[1].bis, l)}`],
          [T(l, '3. Lebensmonat', 'Month of life 3'), `${dShort(lm[2].von, l)} – ${dShort(lm[2].bis, l)}`],
          [T(l, `Ende des ${k}. Lebensmonats`, `End of month of life ${k}`), dLong(lm[k - 1].bis, l)],
        ],
        table: { caption: T(l, `Lebensmonate 1 bis ${k} (${k === 14 ? 'Basiselterngeld, höchstens 14 Monate für beide Eltern' : 'ElterngeldPlus: zwei Plus-Monate je Basismonat, Bezug höchstens bis zum 32. Lebensmonat'})`, `Months of life 1 to ${k} (${k === 14 ? 'basic Elterngeld, at most 14 months for both parents' : 'ElterngeldPlus: two Plus months per basic month, at most up to month of life 32'})`), headers: [T(l, 'Lebensmonat', 'Month of life'), T(l, 'Von', 'From'), T(l, 'Bis', 'To'), T(l, 'Tage', 'Days')], rows: lm.map((x) => [String(x.i), dShort(x.von, l), dShort(x.bis, l), num(fromIso(x.bis) - fromIso(x.von) + 1, l)]), align: ['r', 'l', 'l', 'r'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ Bankarbeitstage */
function batSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJahr(l, Number(a.jahr ?? 2027)), { kind: 'select', id: 'm', label: T(l, 'Monat', 'Month'), def: String(a.m ?? 12), options: Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: monatName(i + 1, l) })) }],
    run: (v) => {
      const y = n(v, 'jahr'), m = n(v, 'm');
      const frei = bankFeiertage(y);
      const imMonat = frei.filter((f) => Number(f.date.slice(5, 7)) === m);
      const total = Array.from({ length: 12 }, (_, i) => bankarbeitstage(y, i + 1)).reduce((p, q) => p + q, 0);
      return {
        label: T(l, `Bankarbeitstage ${monatName(m, l)} ${y}`, `Bank business days, ${monatName(m, l)} ${y}`),
        value: num(bankarbeitstage(y, m), l),
        sub: imMonat.length ? T(l, `Bankfrei außer am Wochenende: ${imMonat.map((f) => `${f.name.de} (${dShort(f.date, l)})`).join(', ')}.`, `Closed besides weekends: ${imMonat.map((f) => `${f.name.en} (${dShort(f.date, l)})`).join(', ')}.`) : T(l, 'Nur Samstage und Sonntage sind in diesem Monat bankfrei.', 'Only Saturdays and Sundays are closed this month.'),
        rows: [
          [T(l, 'Erster Bankarbeitstag', 'First bank business day'), dShort(imVoraus(y, m), l)],
          [T(l, 'Letzter Bankarbeitstag', 'Last bank business day'), dShort(renteNach(y, m), l)],
          [T(l, `Bankarbeitstage im Jahr ${y}`, `Bank business days in ${y}`), num(total, l)],
        ],
        table: { caption: T(l, `Bundesweit bankfreie Feiertage ${y} (TARGET = auch Schließtag des europäischen Zahlungssystems)`, `Nationwide bank holidays ${y} (TARGET = also a closing day of the European payment system)`), headers: [T(l, 'Datum', 'Date'), T(l, 'Feiertag', 'Holiday'), 'TARGET'], rows: frei.map((f) => [dWeek(f.date, l), f.name[l], f.target ? T(l, 'ja', 'yes') : T(l, 'nein', 'no')]), align: ['l', 'l', 'l'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ Monatsübersicht aller Leistungen */
function moSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fMonat(l, String(a.monat ?? '2026-12')), { ...fEnd(l, Number(a.endziffer ?? 0)), adv: true }],
    run: (v) => {
      const [y, m] = split(s(v, 'monat')); const e = n(v, 'endziffer');
      const [ny, nm] = folgemonat(y, m), [py, pm] = vormonat(y, m);
      const zeilen: Array<[string, string, string]> = [
        [T(l, `Kindergeld ${monatName(m, l)} (Endziffer ${e})`, `Kindergeld ${monatName(m, l)} (last digit ${e})`), kindergeld(y, m, e) ?? '', T(l, 'Familienkasse', 'Familienkasse')],
        [T(l, `Rente ${monatName(m, l)} (ab 04/2004)`, `Pension ${monatName(m, l)} (from 04/2004)`), renteNach(y, m), drvTabelle(renteNach(y, m)) ? T(l, 'DRV-Liste', 'DRV list') : T(l, '§ 118 SGB VI', 's. 118 SGB VI')],
        [T(l, `Rente ${monatName(nm, l)} (vor 04/2004)`, `Pension ${monatName(nm, l)} (before 04/2004)`), renteVor(ny, nm), T(l, '§ 272a SGB VI', 's. 272a SGB VI')],
        [T(l, `Grundsicherungsgeld ${monatName(nm, l)}`, `Grundsicherungsgeld ${monatName(nm, l)}`), grundsicherung(ny, nm), T(l, '§ 42 SGB II, BA', 's. 42 SGB II, BA')],
        [T(l, `Arbeitslosengeld ${monatName(pm, l)}`, `Arbeitslosengeld ${monatName(pm, l)}`), alg(py, pm), T(l, '§ 337 SGB III', 's. 337 SGB III')],
        [T(l, `Wohngeld, BAföG ${monatName(m, l)} (Orientierung)`, `Wohngeld, BAföG ${monatName(m, l)} (guide)`), imVoraus(y, m), T(l, '§ 26 WoGG, § 51 BAföG', 's. 26 WoGG, s. 51 BAföG')],
      ];
      const sorted = zeilen.filter((z) => z[1]).sort((p, q) => p[1].localeCompare(q[1]));
      return {
        label: T(l, `Zahltage im ${monat(s(v, 'monat'), l)}`, `Payment days in ${monat(s(v, 'monat'), l)}`),
        value: T(l, `${num(sorted.length, l)} Termine`, `${num(sorted.length, l)} dates`),
        sub: T(l, `Erster Termin: ${dShort(sorted[0][1], l)}. Letzter: ${dShort(sorted[sorted.length - 1][1], l)}.`, `First date: ${dShort(sorted[0][1], l)}. Last: ${dShort(sorted[sorted.length - 1][1], l)}.`),
        rows: [
          [T(l, 'Bankarbeitstage im Monat', 'Bank business days in the month'), num(bankarbeitstage(y, m), l)],
          [T(l, 'Letzter Bankarbeitstag', 'Last bank business day'), dShort(renteNach(y, m), l)],
        ],
        table: { caption: T(l, `Alle Zahltage im ${monat(s(v, 'monat'), l)}, nach Datum`, `Every payment day in ${monat(s(v, 'monat'), l)}, by date`), headers: [T(l, 'Datum', 'Date'), T(l, 'Leistung', 'Benefit'), T(l, 'Grundlage', 'Basis')], rows: sorted.map((z) => [dShort(z[1], l), z[0], z[2]]), align: ['l', 'l', 'l'] },
      };
    },
  };
}

export const SPECS: Record<string, (l: Lang, arg?: Args) => ToolSpec> = { kg: kgSpec, re: reSpec, r1: r1Spec, gs: gsSpec, alg: algSpec, vo: voSpec, eg: egSpec, bat: batSpec, mo: moSpec };
export const TOOL_KINDS = [...Object.keys(SPECS), 'meine'];
export function getTool(kind: string, l: Lang, arg?: Args): ToolSpec {
  const f = SPECS[kind]; if (!f) throw new Error(`simulateur inconnu : ${kind}`);
  return f(l, arg);
}
/** Lance un simulateur avec ses valeurs par défaut (ou celles données) : sert aux pages et aux tests. */
export function runTool(kind: string, l: Lang, arg?: Args, values?: V) {
  const spec = getTool(kind, l, arg);
  const v = Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])) as V;
  return spec.run(resolve(spec.inputs, { ...v, ...(values ?? {}) }));
}
export { KG_JAHRE, weekday };
