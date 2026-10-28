/**
 * « Meine nächsten Zahlungen » : Leistungen ankreuzen → die nächsten Zahltage, Countdown bis zum nächsten,
 * Kalenderdatei (.ics) zum Herunterladen. Alles im Browser; nichts wird gesendet oder gespeichert.
 * Premier rendu = jour du build (__BUILD_DAY__) et valeurs par défaut ; date du jour et lien partagé lus après
 * le montage (RECETTE §17.5). Le lien n'est réécrit qu'après une action de l'utilisateur (url-state).
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { Choice, ShareRow } from '../calc/parts';
import { readParams, updateURL } from '../../lib/url-state';
import { zahlungenImZeitraum, ics, plusTage, tageBis, KG_JAHRE, type Leistung, type Zahlung } from '../../lib/engine/zahltermine';
import { dShort, dWeek, monat } from '../../lib/tool-specs';
import { t } from '../../i18n/ui';
import type { Lang } from '../../lib/format';

const NAMEN: Record<Leistung, { de: string; en: string }> = {
  kindergeld: { de: 'Kindergeld, Kinderzuschlag', en: 'Kindergeld, Kinderzuschlag' },
  rente: { de: 'Rente', en: 'State pension' },
  rentevor: { de: 'Rente', en: 'State pension' },
  grundsicherung: { de: 'Grundsicherungsgeld', en: 'Grundsicherungsgeld' },
  alg: { de: 'Arbeitslosengeld', en: 'Unemployment benefit' },
  wohngeld: { de: 'Wohngeld', en: 'Housing benefit' },
  bafoeg: { de: 'BAföG', en: 'BAföG' },
  elterngeld: { de: 'Elterngeld', en: 'Parental allowance' },
};
const WAHL: Leistung[] = ['kindergeld', 'rente', 'grundsicherung', 'alg', 'wohngeld', 'bafoeg', 'elterngeld'];
const DEF = { l: 'kindergeld,rente', e: '0', r: 'nach', z: '6', g: '' };
interface Props { lang: Lang; methodHref?: string; idPrefix?: string }

export default function MeineZahlungen({ lang, methodHref, idPrefix = 'mz' }: Props) {
  const ui = t(lang);
  const T = (de: string, en: string) => (lang === 'de' ? de : en);
  const [heute, setHeute] = useState<string>(__BUILD_DAY__);
  const [wahl, setWahl] = useState<Leistung[]>(DEF.l.split(',') as Leistung[]);
  const [endziffer, setEndziffer] = useState(DEF.e);
  const [beginn, setBeginn] = useState(DEF.r);
  const [monate, setMonate] = useState(DEF.z);
  const [geburt, setGeburt] = useState(DEF.g);
  useEffect(() => {
    // Datum in Deutschland, nicht UTC: kurz nach Mitternacht zählt schon der neue Tag.
    try { setHeute(new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin' }).format(new Date())); } catch { setHeute(new Date().toISOString().slice(0, 10)); }
    const u = readParams(window.location.search);
    const l = u.get('l'); if (l !== null) setWahl(l.split(',').filter((x): x is Leistung => (WAHL as string[]).includes(x)));
    const e = u.get('e'); if (e && /^\d$/.test(e)) setEndziffer(e);
    const r = u.get('r'); if (r === 'vor' || r === 'nach') setBeginn(r);
    const z = u.get('z'); if (z && ['3', '6', '12'].includes(z)) setMonate(z);
    const g = u.get('g'); if (g && /^\d{4}-\d{2}-\d{2}$/.test(g)) setGeburt(g);
  }, []);
  useEffect(() => updateURL({ l: wahl.join(','), e: endziffer, r: beginn, z: monate, g: wahl.includes('elterngeld') ? geburt : undefined }), [wahl, endziffer, beginn, monate, geburt]);
  const egGeburt = geburt || plusTage(heute, -20);
  const bis = useMemo(() => { const [y, m] = heute.split('-').map(Number); const t2 = m - 1 + Number(monate); return plusTage(`${y + Math.floor(t2 / 12)}-${String((t2 % 12) + 1).padStart(2, '0')}-01`, -1); }, [heute, monate]);
  const liste: Zahlung[] = useMemo(() => {
    const ls = wahl.map((x) => (x === 'rente' && beginn === 'vor' ? 'rentevor' : x)) as Leistung[];
    return zahlungenImZeitraum({ leistungen: ls, endziffer: Number(endziffer), geburt: egGeburt }, heute, bis);
  }, [wahl, beginn, endziffer, egGeburt, heute, bis]);
  const naechste = liste[0];
  const kgFehlt = wahl.includes('kindergeld') && Number(bis.slice(0, 4)) > Math.max(...KG_JAHRE);
  const titel = (z: Zahlung) => z.leistung === 'elterngeld'
    ? T(`Elterngeld, ${z.lm}. Lebensmonat (Zahlung bis ${dShort(z.bis!, 'de')})`, `Parental allowance, month of life ${z.lm} (paid by ${dShort(z.bis!, 'en')})`)
    : `${NAMEN[z.leistung][lang]}, ${monat(z.fuer, lang)}`;
  const art = (z: Zahlung) => (z.art === 'amtlich' ? T('amtlicher Termin', 'official date') : z.art === 'regel' ? T('nach der Regel berechnet', 'calculated from the rule') : T('Orientierung, Tag nennt die Behörde', 'guide, your office sets the day'));
  const toggle = (x: Leistung) => setWahl((w) => (w.includes(x) ? w.filter((y) => y !== x) : [...w, x]));
  const download = () => {
    const body = ics(liste.map((z, i) => ({ date: z.date, title: titel(z), desc: `${art(z)}. ${T('Erstellt im Browser, ohne Gewähr.', 'Created in your browser, no guarantee.')}`, uid: `${z.date}-${z.leistung}-${i}@auszahlungstermine` })), heute);
    const url = URL.createObjectURL(new Blob([body], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = T('auszahlungstermine.ics', 'payment-dates.ics'); document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const tage = naechste ? tageBis(heute, naechste.date) : 0;
  const [gy, gm, gd] = egGeburt.split('-');
  const setG = (i: number) => (v: string) => { const p = egGeburt.split('-'); p[i] = v.padStart(i === 0 ? 4 : 2, '0'); setGeburt(p.join('-')); };
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)]">
        <form className="grid content-start grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-z`} label={T('Zeitraum', 'Period')} value={monate} onChange={setMonate} options={[{ value: '3', label: T('nächste 3 Monate', 'next 3 months') }, { value: '6', label: T('nächste 6 Monate', 'next 6 months') }, { value: '12', label: T('nächste 12 Monate', 'next 12 months') }]} />
          <SelectField id={`${idPrefix}-e`} label={T('Endziffer der Kindergeldnummer', 'Last digit of the Kindergeld number')} value={endziffer} onChange={setEndziffer} options={Array.from({ length: 10 }, (_, i) => ({ value: String(i), label: String(i) }))} />
          <fieldset className="sm:col-span-2">
            <legend className="mb-1 block text-sm font-medium text-navy-700">{T('Ihre Leistungen (antippen zum An- und Abwählen)', 'Your benefits (tap to select or clear)')}</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {WAHL.map((x) => (
                <button key={x} type="button" aria-pressed={wahl.includes(x)} onClick={() => toggle(x)}
                  className={`min-h-11 rounded-lg border px-2 py-1.5 text-left text-sm font-medium ${wahl.includes(x) ? 'border-accent-700 bg-accent-700 text-white' : 'border-navy-300 bg-white text-navy-700 hover:bg-navy-50'}`}>
                  <span aria-hidden="true">{wahl.includes(x) ? '✓ ' : '+ '}</span>{NAMEN[x][lang].split(',')[0]}
                </button>
              ))}
            </div>
          </fieldset>
          {wahl.includes('rente') && <div className="grid grid-rows-subgrid row-span-3 sm:col-span-2"><Choice id={`${idPrefix}-r`} label={T('Rentenbeginn', 'Pension start')} value={beginn} onChange={setBeginn} options={[{ value: 'nach', label: T('ab April 2004', 'April 2004 or later') }, { value: 'vor', label: T('vor April 2004', 'before April 2004') }]} /></div>}
          {wahl.includes('elterngeld') && <>
            <SelectField id={`${idPrefix}-gd`} label={T('Geburt: Tag', 'Birth: day')} value={String(Number(gd))} onChange={setG(2)} options={Array.from({ length: 31 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }))} />
            <SelectField id={`${idPrefix}-gm`} label={T('Geburt: Monat und Jahr', 'Birth: month and year')} value={`${gy}-${gm}`} onChange={(v) => { const [a, b] = v.split('-'); setGeburt(`${a}-${b}-${gd}`); }} options={[2025, 2026, 2027].flatMap((y) => Array.from({ length: 12 }, (_, i) => { const v = `${y}-${String(i + 1).padStart(2, '0')}`; return { value: v, label: monat(v, lang) }; }))} />
          </>}
        </form>
        <div data-resultat aria-live="polite" className="rounded-lg border-t-4 border-accent-500 bg-navy-50 p-4 sm:p-5">
          <p className="text-sm font-medium text-navy-700">{naechste ? T(`Nächste Zahlung: ${titel(naechste)}`, `Next payment: ${titel(naechste)}`) : T('Keine Leistung gewählt', 'No benefit selected')}</p>
          <p className="tabular-nums mt-1 text-[2.1rem] font-bold leading-tight text-navy-900">{naechste ? dShort(naechste.date, lang) : '–'}</p>
          {naechste && <p className="mt-1 text-sm text-navy-700">{tage === 0 ? T('Heute.', 'Today.') : tage === 1 ? T('Morgen.', 'Tomorrow.') : T(`In ${tage} Tagen.`, `In ${tage} days.`)} {art(naechste)}.</p>}
          <table className="mt-3 w-full table-fixed text-sm"><tbody className="divide-y divide-navy-200">
            {liste.slice(1, 6).map((z, i) => <tr key={i}><td className="py-1.5 pe-3 text-navy-700 [overflow-wrap:anywhere]">{titel(z)}</td><td className="w-[38%] tabular-nums py-1.5 text-right align-top text-navy-900">{dShort(z.date, lang)}</td></tr>)}
          </tbody></table>
          <button type="button" onClick={download} disabled={!liste.length} className="mt-3 w-full rounded-lg bg-accent-700 px-3 py-2.5 text-sm font-semibold text-white hover:bg-accent-800 disabled:opacity-50">{T(`Alle ${liste.length} Termine als Kalenderdatei (.ics)`, `All ${liste.length} dates as a calendar file (.ics)`)}</button>
          <ShareRow methodHref={methodHref} labels={ui} />
        </div>
      </div>
      {kgFehlt && <p className="mt-3 text-sm text-navy-700">{T(`Kindergeld: Die Familienkasse hat Termine bis Dezember ${Math.max(...KG_JAHRE)} veröffentlicht; spätere Monate fehlen in der Liste, nichts wird hochgerechnet.`, `Kindergeld: the Familienkasse has published dates up to December ${Math.max(...KG_JAHRE)}; later months are left out, nothing is extrapolated.`)}</p>}
      {liste.length > 0 && <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <caption className="mb-2 text-left text-sm text-navy-700">{T(`Ihre Zahltage vom ${dShort(heute, 'de')} bis ${dShort(bis, 'de')}`, `Your payment days from ${dShort(heute, 'en')} to ${dShort(bis, 'en')}`)}</caption>
          <thead><tr>{[T('Datum', 'Date'), T('Leistung', 'Benefit'), T('Herkunft', 'Basis')].map((h) => <th key={h} scope="col" className="border-b border-navy-300 px-2 py-1.5 text-left font-semibold text-navy-900">{h}</th>)}</tr></thead>
          <tbody>{liste.map((z, i) => <tr key={i}><td className="tabular-nums border-b border-navy-100 px-2 py-1.5 text-navy-800">{dWeek(z.date, lang)}</td><td className="border-b border-navy-100 px-2 py-1.5 text-navy-800">{titel(z)}</td><td className="border-b border-navy-100 px-2 py-1.5 text-navy-800">{art(z)}</td></tr>)}</tbody>
        </table>
      </div>}
    </div>
  );
}
