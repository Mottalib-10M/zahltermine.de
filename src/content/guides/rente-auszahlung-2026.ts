/** Rente 2026 : liste officielle de la DRV, reproduite par le moteur (§ 118 et § 272a SGB VI). */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong } from '../../lib/tool-specs';
import { renteJahr } from './_tabellen';

const T26 = K.P.rente.tabelle2026 as string[];
const verschoben = T26.filter((d) => d !== K.monatsletzter(Number(d.slice(0, 4)), Number(d.slice(5, 7))));

export default defineGuide({
  id: 'rente-auszahlung-2026', group: 'rente', order: 10, tool: 're', toolArg: { monat: '2026-11', beginn: 'nach' },
  related: ['rente-november-2026', 'rente-dezember-2026', 'rente-auszahlung-2027', 'rente-vor-2004', 'erste-rentenzahlung'],
  sources: ['drv-termine', 'sgb6-118', 'sgb6-272a'],
  countdown: { date: K.renteNach(2026, 11), label: { de: 'Rente November 2026', en: 'pension November 2026' } },
  de: {
    slug: 'rente-auszahlung-termine-2026', nav: 'Rente Termine 2026', card: 'Alle zwölf Zahltage, amtliche Liste',
    title: 'Rente Auszahlung Termine 2026: alle Zahltage mit Wochentag',
    description: 'Rente Auszahlungstermine 2026: Die Rentenversicherung zahlt am letzten Bankarbeitstag des Monats, bei Rentenbeginn vor April 2004 einen Monat früher. Alle Tage.',
    h1: 'Rente Auszahlung 2026: die Termine für jeden Monat',
    intro: 'Rentenbeginn und Monat wählen: Der Rechner nennt den Zahltag, erklärt jede Verschiebung durch Wochenende oder Feiertag und zeigt das ganze Jahr.',
    resume: `Die gesetzliche Rente kommt 2026 am letzten Bankarbeitstag jedes Monats. Die Deutsche Rentenversicherung hat die zwölf Termine im Januar 2026 veröffentlicht: vom ${dLong(T26[0], 'de')} bis zum ${dLong(T26[11], 'de')}. ${verschoben.length} dieser Termine liegen vor dem Monatsletzten, weil der letzte Tag des Monats auf ein Wochenende fällt, so im Januar, Februar, Mai und Oktober. Grundlage ist § 118 SGB VI: Die Rente ist am Ende des Monats fällig, für den sie gezahlt wird. Das gilt für alle Renten, die seit dem 1. April 2004 begonnen haben. Wer schon vorher Rente bezog, bekommt sie nach § 272a SGB VI im Voraus, am letzten Bankarbeitstag des Vormonats; die Januarrente 2026 kam bei dieser Gruppe am 31. Dezember 2025. Auf dem Konto landen beide Gruppen am selben Tag, nur für einen anderen Monat. Ausgezahlt wird über den Renten Service der Deutschen Post; die Gutschrift ist im Laufe des Zahltags zu erwarten.`,
    faqs: [
      { q: 'An welchem Tag wird die Rente 2026 gezahlt?', a: `Am letzten Bankarbeitstag jedes Monats: ${T26.map((d) => dLong(d, 'de').replace(' 2026', '')).join(', ')}. Diese Liste hat die Deutsche Rentenversicherung veröffentlicht, und unser Rechenkern kommt nach § 118 SGB VI auf dieselben zwölf Tage.` },
      { q: 'Warum kommt meine Rente einen Monat früher als bei anderen?', a: 'Weil Ihre Rente vor dem 1. April 2004 begonnen hat. Solche Renten werden nach § 272a SGB VI im Voraus gezahlt, am letzten Bankarbeitstag des Vormonats. Das Geld kommt am selben Kalendertag wie bei allen anderen, ist aber schon für den folgenden Monat bestimmt.' },
      { q: 'Was passiert, wenn der Monatsletzte ein Samstag ist?', a: 'Dann zahlt die Rentenversicherung am Freitag davor, also am letzten Bankarbeitstag. Ist auch der Freitag ein bundesweiter Feiertag, rückt die Zahlung weiter vor. Ein Feiertag, der nur in einem Bundesland gilt, verschiebt die Rente nicht. Den Grund für jede Verschiebung nennt der Rechner oben.' },
    ],
    body: (h) => `<h2>Die Rententermine 2026</h2>
<p>Die Tabelle zeigt beide Gruppen. Die Spalte „Beginn ab 04/2004“ entspricht der ${h.src('drv-termine', 'Pressemeldung der Rentenversicherung vom 22. Januar 2026')}; die zweite Spalte zeigt, wann Renten mit Beginn vor April 2004 für denselben Monat gutgeschrieben werden.</p>
${renteJahr(h, 2026)}
<h2>Welche Termine vorgezogen sind</h2>
<p>In ${h.n(verschoben.length)} Monaten fällt der Monatsletzte 2026 auf einen Samstag oder Sonntag. Die Rente kommt dann am Freitag davor: ${verschoben.map((d) => h.dl(d)).join(', ')}. Einen bundesweiten Feiertag am Monatsende gibt es 2026 nicht; Silvester ist ein Bankarbeitstag. Die Regel steht in ${h.src('sgb6-118', '§ 118 Abs. 1 SGB VI')}: Die Rente wird am letzten Bankarbeitstag des Monats ausgezahlt, für den sie fällig ist.</p>
<h2>Zwei Gruppen von Rentnern</h2>
<p>Für Renten mit Beginn vor dem 1. April 2004 gilt ${h.src('sgb6-272a', '§ 272a SGB VI')}. Diese Gruppe erhält am selben Tag das Geld für den Folgemonat. Ob Ihre Rente dazugehört, steht im Rentenbescheid; mehr unter ${h.a('rente-vor-2004', 'Rente vor 2004: Zahlung im Voraus')}. Wer 2026 neu in Rente geht, bekommt die erste Zahlung am Ende des ersten Rentenmonats, siehe ${h.a('erste-rentenzahlung', 'erste Rentenzahlung')}.</p>
${h.mini('re', { p: ['beginn'], d: { monat: '2026-12' }, t: 'Rente Dezember 2026' })}`,
  },
  en: {
    slug: 'pension-payment-dates-2026', nav: 'Pension dates 2026', card: 'All twelve payment days, official list',
    title: 'Pension payment dates 2026 in Germany: every day, weekday',
    description: 'German pension payment dates 2026: paid on the last bank business day of the month, a month earlier for pensions that started before April 2004. Every date.',
    h1: 'German state pension 2026: the payment date for each month',
    intro: 'Pick your pension start and a month: the tool gives the payment day, explains any shift caused by a weekend or holiday and shows the whole year.',
    resume: `In 2026 the German statutory pension (Rente) arrives on the last bank business day of every month. The Deutsche Rentenversicherung published the twelve dates in January 2026: from ${dLong(T26[0], 'en')} to ${dLong(T26[11], 'en')}. ${verschoben.length} of these dates fall before the last day of the month because that day is a Saturday or Sunday, as in January, February, May and October. The rule is section 118 of Social Code Book VI: the pension falls due at the end of the month it is paid for. That applies to every pension that started on or after 1 April 2004. If your pension started earlier, it is paid in advance under section 272a, on the last bank business day of the month before; for this group January 2026 arrived on 31 December 2025. Both groups are paid on the same calendar day, just for a different month. Payments are made through the pension service of Deutsche Post; expect the credit in the course of the payment day.`,
    faqs: [
      { q: 'On which day is the German pension paid in 2026?', a: `On the last bank business day of every month: ${T26.map((d) => dLong(d, 'en').replace(' 2026', '')).join(', ')}. The German Pension Insurance published this list, and our engine arrives at the same twelve days from section 118 SGB VI.` },
      { q: 'Why does my pension arrive a month earlier than other people\'s?', a: 'Because your pension started before 1 April 2004. Such pensions are paid in advance under section 272a SGB VI, on the last bank business day of the month before. The money arrives on the same calendar day as everyone else\'s, but is already meant for the following month.' },
      { q: 'What happens when the last day of the month is a Saturday?', a: 'Then the pension insurance pays on the Friday before, the last bank business day. If that Friday is also a nationwide holiday, payment moves earlier again. A holiday that applies in only one state does not move the pension. The tool above gives the reason for every shift.' },
    ],
    body: (h) => `<h2>Pension dates 2026</h2>
<p>The table shows both groups. The column "started 04/2004 or later" matches the ${h.src('drv-termine', 'pension insurance press release of 22 January 2026')}; the second column shows when pensions that started before April 2004 are credited for the same month.</p>
${renteJahr(h, 2026)}
<h2>Which dates are brought forward</h2>
<p>In ${h.n(verschoben.length)} months of 2026 the last day falls on a Saturday or Sunday, so the pension arrives on the Friday before: ${verschoben.map((d) => h.dl(d)).join(', ')}. There is no nationwide holiday at a month end in 2026; New Year's Eve is a bank business day. The rule is in ${h.src('sgb6-118', 'section 118(1) SGB VI')}: the pension is paid on the last bank business day of the month in which it falls due.</p>
<h2>Two groups of pensioners</h2>
<p>Pensions that started before 1 April 2004 fall under ${h.src('sgb6-272a', 'section 272a SGB VI')}. This group receives the next month's money on the same day. Your award notice tells you whether you belong to it; more under ${h.a('rente-vor-2004', 'pension before 2004: paid in advance')}. If you retire in 2026, the first payment comes at the end of your first pension month, see ${h.a('erste-rentenzahlung', 'first pension payment')}.</p>
${h.mini('re', { p: ['beginn'], d: { monat: '2026-12' }, t: 'Pension December 2026' })}`,
  },
});
