/** Elterngeld : versé au cours du Lebensmonat qu'il couvre (§ 6 BEEG) ; Lebensmonate selon le jour de naissance (§ 4 BEEG). */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong } from '../../lib/tool-specs';

const G = '2026-11-15';
const lm = (k: number) => K.lebensmonat(G, k);
const G2 = '2027-01-31';

export default defineGuide({
  id: 'elterngeld-auszahlung', group: 'leistungen', order: 24, tool: 'eg', toolArg: { tag: 15, gmonat: 11, gjahr: 2026, dauer: 'basis' },
  related: ['kindergeld-auszahlung', 'kinderzuschlag-auszahlung', 'wohngeld-auszahlung', 'home'],
  sources: ['beeg6', 'beeg4', 'beeg7'],
  de: {
    slug: 'elterngeld-auszahlung', nav: 'Elterngeld', card: 'Im Lebensmonat, ohne festen Tag',
    title: 'Elterngeld Auszahlung 2026: Lebensmonate und Zahltag',
    description: 'Elterngeld Auszahlung 2026: gezahlt im Laufe des Lebensmonats, nicht zum Monatsersten. Rechner für die Lebensmonate ab Geburt, Basis und ElterngeldPlus.',
    h1: 'Elterngeld: wann es kommt und warum der Tag wandert',
    intro: 'Geburtstag des Kindes eingeben: Der Rechner zeigt jeden Lebensmonat mit Anfang und Ende, in dem das Elterngeld gezahlt wird.',
    resume: `Elterngeld hat keinen festen Zahltag im Kalendermonat. Nach § 6 BEEG wird es im Laufe des Lebensmonats gezahlt, für den es bestimmt ist, und Lebensmonate beginnen am Geburtstag des Kindes, nicht am Monatsersten. Ein Kind, das am ${dLong(G, 'de')} geboren ist, hat seinen ersten Lebensmonat vom ${dLong(lm(1).von, 'de')} bis zum ${dLong(lm(1).bis, 'de')}, den zweiten vom ${dLong(lm(2).von, 'de')} bis zum ${dLong(lm(2).bis, 'de')}. Irgendwann in diesem Zeitraum kommt das Geld; viele Elterngeldstellen überweisen zu Beginn des Lebensmonats, einen einheitlichen Termin gibt es aber nicht. Die erste Zahlung kommt erst nach dem Bescheid, Lebensmonate davor werden nachgezahlt. Rückwirkend zahlt die Elterngeldstelle nach § 7 BEEG nur für die letzten drei Lebensmonate vor dem Monat, in dem der Antrag eingeht. Basiselterngeld gibt es nach § 4 bis zum 14. Lebensmonat, ElterngeldPlus bis höchstens zum 32. Der Rechner oben zeigt alle Lebensmonate Ihres Kindes.`,
    faqs: [
      { q: 'An welchem Tag wird das Elterngeld gezahlt?', a: 'Es gibt keinen festen Tag. Das Gesetz sagt nur, dass das Elterngeld im Laufe des Lebensmonats gezahlt wird, für den es bestimmt ist. Den genauen Tag bestimmt die Elterngeldstelle Ihres Bundeslandes. Verlässlich ist deshalb der Zeitraum des Lebensmonats, den der Rechner zeigt.' },
      { q: 'Was ist ein Lebensmonat?', a: `Ein Zeitraum von der Geburt an, nicht der Kalendermonat. Ist das Kind am 15. geboren, läuft jeder Lebensmonat vom 15. bis zum 14. des nächsten Monats. Ist es am 31. geboren, endet der erste Lebensmonat in kürzeren Monaten am Monatsletzten: bei einer Geburt am ${dLong(G2, 'de')} am ${dLong(K.lebensmonat(G2, 1).bis, 'de')}.` },
      { q: 'Wann kommt die erste Zahlung?', a: 'Erst nach dem Bewilligungsbescheid. Für Lebensmonate, die bis dahin vergangen sind, zahlt die Elterngeldstelle nach. Stellen Sie den Antrag rechtzeitig: Rückwirkend gibt es Elterngeld nur für die drei Lebensmonate vor dem Monat, in dem der Antrag eingeht. Die Bearbeitung dauert je nach Land einige Wochen.' },
      { q: 'Kommt Elterngeld zusammen mit dem Kindergeld?', a: 'Nein. Kindergeld zahlt die Familienkasse nach der Endziffer der Kindergeldnummer, Elterngeld die Elterngeldstelle des Landes nach den Lebensmonaten. Die beiden Termine haben nichts miteinander zu tun und liegen oft in verschiedenen Wochen. Beide Leistungen werden getrennt beantragt, Kindergeld bei der Familienkasse, Elterngeld bei der Elterngeldstelle Ihres Bundeslandes.' },
    ],
    body: (h) => `<h2>Lebensmonate für ein Beispielkind</h2>
<p>Für ein Kind mit Geburtstag am ${h.dl(G)} zeigt die Tabelle die ersten sechs Lebensmonate. In jedem dieser Zeiträume wird ein Monatsbetrag gezahlt, so regelt es ${h.src('beeg6', '§ 6 BEEG')}.</p>
${h.table([h.T('Lebensmonat', 'Month of life'), h.T('Von', 'From'), h.T('Bis', 'To')], Array.from({ length: 6 }, (_, i) => [String(i + 1), h.ds(lm(i + 1).von), h.ds(lm(i + 1).bis)]), h.T(`Lebensmonate 1 bis 6 bei Geburt am ${h.dl(G)}`, `Months of life 1 to 6 for a birth on ${h.dl(G)}`), ['r', 'l', 'l'])}
<h2>Basiselterngeld und ElterngeldPlus</h2>
<p>Nach ${h.src('beeg4', '§ 4 BEEG')} haben Eltern zusammen Anspruch auf zwölf Monatsbeträge Basiselterngeld, mit Partnermonaten auf vierzehn; bezogen werden kann es bis zur Vollendung des 14. Lebensmonats. Statt eines Monats Basiselterngeld lassen sich zwei Monate ElterngeldPlus beziehen, längstens bis zum 32. Lebensmonat. Am Zahlungsprinzip ändert das nichts: Jeder Monatsbetrag gehört zu einem Lebensmonat. Im Rechner können Sie zwischen beiden Varianten wechseln.</p>
<h2>Der Antrag bestimmt den Beginn</h2>
<p>Elterngeld gibt es nur auf schriftlichen Antrag, und nach ${h.src('beeg7', '§ 7 BEEG')} rückwirkend nur für drei Lebensmonate. Wer den Antrag im fünften Lebensmonat stellt, verliert den ersten. Das Kindergeld läuft unabhängig davon über die Familienkasse; Termine nach Endziffer unter ${h.a('kindergeld-auszahlung', 'Kindergeld Auszahlung')}. Familien mit kleinem Einkommen können zusätzlich ${h.a('kinderzuschlag-auszahlung', 'Kinderzuschlag')} und ${h.a('wohngeld-auszahlung', 'Wohngeld')} bekommen.</p>
${h.mini('eg', { p: ['tag', 'gmonat', 'gjahr'], d: { tag: 3, gmonat: 1, gjahr: 2027 }, t: 'Lebensmonate Ihres Kindes' })}`,
  },
  en: {
    slug: 'elterngeld-payment-dates', nav: 'Parental allowance', card: 'Within the month of life, no fixed day',
    title: 'Elterngeld payment dates 2026: months of life explained',
    description: 'Elterngeld (parental allowance) payment 2026: paid during the month of life, not on the 1st. Tool for every month of life from birth, basic and ElterngeldPlus.',
    h1: 'Elterngeld: when it arrives and why the day moves',
    intro: "Enter your child's birth date: the tool shows each month of life, with start and end, during which Elterngeld is paid.",
    resume: `Elterngeld, Germany's parental allowance, has no fixed payment day in the calendar month. Section 6 of the Parental Allowance Act (BEEG) says it is paid during the month of life it covers, and months of life start on the child's birthday, not on the 1st. A child born on ${dLong(G, 'en')} has its first month of life from ${dLong(lm(1).von, 'en')} to ${dLong(lm(1).bis, 'en')}, its second from ${dLong(lm(2).von, 'en')} to ${dLong(lm(2).bis, 'en')}. The money arrives at some point in that window; many parental allowance offices transfer it at the start of the month of life, but there is no common date. The first payment only comes after the decision, with earlier months paid in arrears. Under section 7 BEEG the office pays back only for the three months of life before the month your application arrives. Basic Elterngeld runs up to month of life 14 under section 4, ElterngeldPlus up to month 32 at most. The tool above lists every month of life for your child.`,
    faqs: [
      { q: 'On which day is Elterngeld paid?', a: 'There is no fixed day. The law only says Elterngeld is paid during the month of life it covers. The parental allowance office of your federal state sets the exact day. What you can rely on is the window of the month of life shown by the tool.' },
      { q: 'What is a month of life?', a: `A period counted from the birth, not the calendar month. If the child was born on the 15th, each month of life runs from the 15th to the 14th of the next month. If born on the 31st, the first month of life ends on the last day of a shorter month: for a birth on ${dLong(G2, 'en')} it ends on ${dLong(K.lebensmonat(G2, 1).bis, 'en')}.` },
      { q: 'When does the first payment come?', a: 'Only after the award notice. The office pays the months of life that have passed by then in arrears. Apply in good time: Elterngeld is paid back only for the three months of life before the month in which your application arrives.' },
      { q: 'Is Elterngeld paid together with Kindergeld?', a: 'No. Kindergeld is paid by the Familienkasse according to the last digit of the Kindergeld number, Elterngeld by the state office according to the months of life. The two dates are unrelated and often fall in different weeks. Both are applied for separately.' },
    ],
    body: (h) => `<h2>Months of life for an example child</h2>
<p>For a child born on ${h.dl(G)}, the table shows the first six months of life. One monthly amount is paid within each window, as ${h.src('beeg6', 'section 6 BEEG')} provides.</p>
${h.table([h.T('Lebensmonat', 'Month of life'), h.T('Von', 'From'), h.T('Bis', 'To')], Array.from({ length: 6 }, (_, i) => [String(i + 1), h.ds(lm(i + 1).von), h.ds(lm(i + 1).bis)]), h.T(`Lebensmonate 1 bis 6 bei Geburt am ${h.dl(G)}`, `Months of life 1 to 6 for a birth on ${h.dl(G)}`), ['r', 'l', 'l'])}
<h2>Basic Elterngeld and ElterngeldPlus</h2>
<p>Under ${h.src('beeg4', 'section 4 BEEG')} parents together are entitled to twelve monthly amounts of basic Elterngeld, fourteen with partner months; it can be drawn until the end of month of life 14. Instead of one month of basic Elterngeld, you can take two months of ElterngeldPlus, up to month of life 32 at most. The payment principle stays the same: each monthly amount belongs to one month of life. The tool lets you switch between the two.</p>
<h2>The application sets the start</h2>
<p>Elterngeld is only paid on written application, and under ${h.src('beeg7', 'section 7 BEEG')} only for three months of life back. If you apply in the fifth month of life, you lose the first. Kindergeld runs separately through the Familienkasse; dates by last digit are on ${h.a('kindergeld-auszahlung', 'Kindergeld payment dates')}. Families on low incomes may also get ${h.a('kinderzuschlag-auszahlung', 'Kinderzuschlag')} and ${h.a('wohngeld-auszahlung', 'housing benefit')}.</p>
${h.mini('eg', { p: ['tag', 'gmonat', 'gjahr'], d: { tag: 3, gmonat: 1, gjahr: 2027 }, t: "Your child's months of life" })}`,
  },
});
