/** Tableaux calculés partagés par plusieurs pages (hors contrôle d'unicité : les tableaux n'y comptent pas). */
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dShort, dWeek, monatName } from '../../lib/tool-specs';

/** Kindergeld d'un mois : une ligne par Endziffer. */
export function kgMonat(h: Helpers, y: number, m: number) {
  const rows = Array.from({ length: 10 }, (_, e) => { const d = K.kindergeld(y, m, e)!; return [String(e), dWeek(d, h.lang)]; });
  return h.table([h.T('Endziffer', 'Last digit'), h.T('Auszahlung', 'Payment')], rows, h.T(`Kindergeld und Kinderzuschlag ${monatName(m, 'de')} ${y}: Termine der Familienkasse nach Endziffer`, `Kindergeld and Kinderzuschlag, ${monatName(m, 'en')} ${y}: Familienkasse dates by last digit`), ['r', 'l']);
}
/** Kindergeld d'une année : mois en lignes, Endziffern 0 à 9 en colonnes (jour du mois). */
export function kgJahr(h: Helpers, y: number) {
  const rows = Array.from({ length: 12 }, (_, i) => [monatName(i + 1, h.lang), ...Array.from({ length: 10 }, (_, e) => String(Number(K.kindergeld(y, i + 1, e)!.slice(8))) + (h.lang === 'de' ? '.' : ''))]);
  return h.table([h.T('Monat', 'Month'), ...Array.from({ length: 10 }, (_, e) => String(e))], rows, h.T(`Kindergeld ${y}: Auszahlungstag im Monat je Endziffer 0 bis 9 (Quelle: Familienkasse)`, `Kindergeld ${y}: day of the month for last digits 0 to 9 (source: Familienkasse)`), ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r']);
}
/** Rente d'une année : nachschüssig et vorschüssig côte à côte. */
export function renteJahr(h: Helpers, y: number) {
  const rows = Array.from({ length: 12 }, (_, i) => { const n = K.renteNach(y, i + 1), v = K.renteVor(y, i + 1); return [monatName(i + 1, h.lang), dWeek(n, h.lang), dShort(v, h.lang), K.drvTabelle(n) ? h.T('DRV-Liste', 'DRV list') : h.T('berechnet', 'calculated')]; });
  return h.table([h.T('Rente für', 'Pension for'), h.T('Beginn ab 04/2004', 'Started 04/2004 or later'), h.T('Beginn vor 04/2004', 'Started before 04/2004'), h.T('Herkunft', 'Basis')], rows, h.T(`Rentenzahltermine ${y}: Tag der Gutschrift`, `German pension payment dates ${y}: day credited`), ['l', 'l', 'l', 'l']);
}
/** Grundsicherungsgeld d'une année. */
export function gsJahr(h: Helpers, y: number) {
  const rows = Array.from({ length: 12 }, (_, i) => { const d = K.grundsicherung(y, i + 1); const regel = K.monatsletzter(...K.vormonat(y, i + 1)); return [monatName(i + 1, h.lang), dWeek(d, h.lang), d === regel ? h.T('am Regeltag', 'on the rule day') : h.T(`vorgezogen, ${dShort(regel, h.lang)} bankfrei`, `brought forward, ${dShort(regel, h.lang)} closed`)]; });
  return h.table([h.T('Geld für', 'Money for'), h.T('Auf dem Konto', 'In your account'), h.T('Hinweis', 'Note')], rows, h.T(`Grundsicherungsgeld ${y}: Zahltage, berechnet nach § 42 SGB II und dem Hinweis der BA`, `Grundsicherungsgeld ${y}: payment days, worked out from section 42 SGB II and the BA guidance`), ['l', 'l', 'l']);
}
