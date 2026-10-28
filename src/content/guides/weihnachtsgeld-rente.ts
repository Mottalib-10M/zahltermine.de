/** Weihnachtsgeld Rente : pas de 13e versement dans la pension légale ; dates de décembre 2026 et 2027. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong } from '../../lib/tool-specs';

const d26 = K.renteNach(2026, 12), d27 = K.renteNach(2027, 12), j27 = K.renteNach(2027, 1), j28 = K.renteNach(2028, 1);
const A = K.P.rente.anpassung2026;

export default defineGuide({
  id: 'weihnachtsgeld-rente', group: 'rente', order: 15, tool: 're', toolArg: { monat: '2026-12', beginn: 'nach' },
  related: ['rente-dezember-2026', 'rentenerhoehung-2027', 'rente-auszahlung-2026', 'grundsicherungsgeld-dezember-2026'],
  sources: ['sgb6-118', 'sgb6-65', 'drv-anpassung', 'drv-termine'],
  de: {
    slug: 'weihnachtsgeld-rente', nav: 'Weihnachtsgeld Rente', card: 'Gibt es nicht, und wann die Dezemberrente kommt',
    title: 'Weihnachtsgeld Rente 2026: gibt es das? Termin im Dezember',
    description: 'Weihnachtsgeld zur Rente 2026: Die gesetzliche Rente kennt keine Sonderzahlung. Wann die Dezemberrente kommt, was am 1. Juli steigt, welche Renten abweichen.',
    h1: 'Weihnachtsgeld zur Rente: was es gibt und was nicht',
    intro: 'Rentenbeginn wählen: Der Rechner zeigt, wann die Dezemberrente auf dem Konto ist, und die Termine des ganzen Jahres.',
    resume: `Ein Weihnachtsgeld zur gesetzlichen Rente gibt es nicht. Die Rentenversicherung zahlt zwölf Monatsrenten im Jahr, jeweils am letzten Bankarbeitstag des Monats, wie es § 118 SGB VI vorschreibt; eine dreizehnte Zahlung oder einen Zuschlag im Dezember sieht das Sechste Buch Sozialgesetzbuch nicht vor. Die Dezemberrente 2026 kommt deshalb erst am ${dLong(d26, 'de')}, an Silvester, und nicht vor den Feiertagen. 2027 ist es der ${dLong(d27, 'de')}. Die einzige regelmäßige Änderung des Betrags im Jahr ist die Rentenanpassung zum 1. Juli nach § 65 SGB VI; 2026 stiegen die Renten um ${String(A.prozent).replace('.', ',')} Prozent. Anders kann es bei Leistungen sein, die nicht von der gesetzlichen Rentenversicherung kommen: Ob eine Betriebsrente, eine Zusatzversorgung oder eine Beamtenversorgung eine Sonderzahlung kennt, regeln deren eigene Bestimmungen. Wer zusätzlich Grundsicherung im Alter bezieht, erhält diese vom Sozialamt nach dessen Zahlungslauf.`,
    faqs: [
      { q: 'Bekommen Rentner Weihnachtsgeld?', a: 'Von der gesetzlichen Rentenversicherung nicht. Sie zahlt zwölf Monatsrenten im Jahr ohne Sonderzahlung. Ein Weihnachtsgeld kann es nur aus anderen Quellen geben, etwa aus einer Betriebsrente oder einer Versorgung, deren Regeln das vorsehen. Im Zweifel hilft ein Blick in die Mitteilung des jeweiligen Trägers.' },
      { q: 'Kommt die Rente im Dezember früher wegen Weihnachten?', a: `Nein. Die Rente kommt am letzten Bankarbeitstag des Dezembers, 2026 am ${dLong(d26, 'de')}. Nur wer vor April 2004 in Rente ging, erhält die Dezemberrente bereits am letzten Bankarbeitstag im November, weil seine Rente immer im Voraus gezahlt wird. Einen Zuschlag zu Weihnachten gibt es nicht.` },
      { q: 'Gab es früher ein Weihnachtsgeld zur Rente?', a: 'In der gesetzlichen Rentenversicherung nicht. Der Eindruck entsteht oft, weil manche Rentner einen Monat früher zahlen als andere oder weil Betriebsrenten eine Sonderzahlung kennen. Für die gesetzliche Rente gilt die Regel des § 118 SGB VI: monatlich, am Monatsende, ohne Zusatzzahlung.' },
    ],
    body: (h) => `<h2>Dezember- und Januarrente auf einen Blick</h2>
${h.table([h.T('Rente für', 'Pension for'), h.T('Beginn ab 04/2004', 'Started 04/2004 or later'), h.T('Beginn vor 04/2004', 'Started before 04/2004')], [
      [h.T('Dezember 2026', 'December 2026'), h.wday(d26), h.wday(K.renteVor(2026, 12))],
      [h.T('Januar 2027', 'January 2027'), h.wday(j27), h.wday(K.renteVor(2027, 1))],
      [h.T('Dezember 2027', 'December 2027'), h.wday(d27), h.wday(K.renteVor(2027, 12))],
      [h.T('Januar 2028', 'January 2028'), h.wday(j28), h.wday(K.renteVor(2028, 1))],
    ], h.T('Rente im Dezember und Januar, 2026 bis 2028 (ab 2027 berechnet)', 'Pension in December and January, 2026 to 2028 (calculated from 2027)'), ['l', 'l', 'l'])}
<p>Der Termin für Dezember 2026 steht in der ${h.src('drv-termine', 'Liste der Rentenversicherung')}; die übrigen folgen aus ${h.src('sgb6-118', '§ 118 SGB VI')}.</p>
<h2>Was im Jahr wirklich steigt</h2>
<p>Die Rente ändert sich einmal im Jahr, zum 1. Juli. Dann wird der aktuelle Rentenwert nach ${h.src('sgb6-65', '§ 65 SGB VI')} angepasst; 2026 stieg er von ${h.eur(A.rentenwertAlt, 2)} auf ${h.eur(A.rentenwertNeu, 2)} (${h.src('drv-anpassung', 'Rentenversicherung')}). Die erste höhere Zahlung kommt Ende Juli, bei Rentenbeginn vor April 2004 schon Ende Juni. Was für 2027 bekannt ist, steht unter ${h.a('rentenerhoehung-2027', 'Rentenerhöhung 2027')}. Für Haushalte mit Grundsicherungsgeld gilt ein eigener Zahltag, siehe ${h.a('grundsicherungsgeld-dezember-2026', 'Grundsicherungsgeld Dezember 2026')}.</p>
${h.mini('re', { p: ['beginn'], d: { monat: '2027-12' }, t: 'Dezemberrente 2027' })}`,
  },
  en: {
    slug: 'christmas-bonus-pension', nav: 'Christmas bonus and pension', card: 'There is none, and when December pays',
    title: 'Christmas bonus German pension 2026: is there one?',
    description: 'Christmas bonus and the German state pension 2026: there is no special payment. When the December pension arrives, what rises on 1 July, and the exceptions.',
    h1: 'Christmas bonus and the German pension: what exists and what does not',
    intro: 'Pick your pension start: the tool shows when the December pension reaches your account, and the dates for the whole year.',
    resume: `There is no Christmas bonus (Weihnachtsgeld) with the German statutory pension. The pension insurance pays twelve monthly pensions a year, each on the last bank business day of the month as section 118 of Social Code Book VI requires; Book VI provides for no thirteenth payment or December supplement. The December 2026 pension therefore only arrives on ${dLong(d26, 'en')}, New Year's Eve, not before the holidays. In 2027 it is ${dLong(d27, 'en')}. The only regular change in the amount during the year is the adjustment on 1 July under section 65; in 2026 pensions rose by ${A.prozent} per cent. Benefits that do not come from the statutory pension insurance can differ: whether a company pension, a supplementary scheme or a civil service pension has a special payment depends on their own rules. If you also receive basic income support in old age, the social welfare office pays it on its own schedule.`,
    faqs: [
      { q: 'Do pensioners in Germany get a Christmas bonus?', a: 'Not from the statutory pension insurance. It pays twelve monthly pensions a year with no special payment. A Christmas bonus can only come from other sources, such as a company pension or a scheme whose rules provide for one. If in doubt, check the notice from the body concerned.' },
      { q: 'Is the pension paid earlier in December because of Christmas?', a: `No. It arrives on the last bank business day of December, in 2026 on ${dLong(d26, 'en')}. Only people whose pension began before April 2004 receive the December pension on the last bank business day of November, because their pension is always paid in advance.` },
      { q: 'Was there a Christmas bonus with the pension in the past?', a: 'Not in the statutory pension insurance. The impression often arises because some pensioners are paid a month earlier than others, or because company pensions may have a special payment. For the statutory pension, section 118 SGB VI applies: monthly, at the end of the month, with no extra payment.' },
    ],
    body: (h) => `<h2>December and January pensions at a glance</h2>
${h.table([h.T('Rente für', 'Pension for'), h.T('Beginn ab 04/2004', 'Started 04/2004 or later'), h.T('Beginn vor 04/2004', 'Started before 04/2004')], [
      [h.T('Dezember 2026', 'December 2026'), h.wday(d26), h.wday(K.renteVor(2026, 12))],
      [h.T('Januar 2027', 'January 2027'), h.wday(j27), h.wday(K.renteVor(2027, 1))],
      [h.T('Dezember 2027', 'December 2027'), h.wday(d27), h.wday(K.renteVor(2027, 12))],
      [h.T('Januar 2028', 'January 2028'), h.wday(j28), h.wday(K.renteVor(2028, 1))],
    ], h.T('Rente im Dezember und Januar, 2026 bis 2028 (ab 2027 berechnet)', 'Pension in December and January, 2026 to 2028 (calculated from 2027)'), ['l', 'l', 'l'])}
<p>The December 2026 date is on the ${h.src('drv-termine', 'pension insurance list')}; the others follow from ${h.src('sgb6-118', 'section 118 SGB VI')}.</p>
<h2>What actually rises during the year</h2>
<p>The pension changes once a year, on 1 July, when the pension value is adjusted under ${h.src('sgb6-65', 'section 65 SGB VI')}; in 2026 it rose from ${h.eur(A.rentenwertAlt, 2)} to ${h.eur(A.rentenwertNeu, 2)} (${h.src('drv-anpassung', 'German Pension Insurance')}). The first higher payment arrives at the end of July, or at the end of June for pensions that began before April 2004. What is known for 2027 is on ${h.a('rentenerhoehung-2027', 'pension increase 2027')}. Households on Grundsicherungsgeld have their own payment day, see ${h.a('grundsicherungsgeld-dezember-2026', 'Grundsicherungsgeld December 2026')}.</p>
${h.mini('re', { p: ['beginn'], d: { monat: '2027-12' }, t: 'December pension 2027' })}`,
  },
});
