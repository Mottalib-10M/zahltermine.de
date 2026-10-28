/** Kindergeldnummer : où la trouver, pourquoi la dernière chiffre compte ; statistiques calculées sur la liste 2026–2027. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const stat = (e: number) => {
  const days: number[] = [];
  for (const y of [2026, 2027]) for (let m = 1; m <= 12; m++) days.push(Number(K.kindergeld(y, m, e)!.slice(8)));
  return { min: Math.min(...days), max: Math.max(...days), avg: days.reduce((a, b) => a + b, 0) / days.length };
};
const S = Array.from({ length: 10 }, (_, e) => stat(e));

export default defineGuide({
  id: 'kindergeldnummer-endziffer', group: 'kindergeld', order: 7, tool: 'kg', toolArg: { monat: '2026-11', endziffer: 7 },
  related: ['kindergeld-auszahlung', 'kindergeld-termine-2027', 'kinderzuschlag-auszahlung'],
  sources: ['ba-kg-termine', 'ba-kg-archiv', 'bkgg11'],
  de: {
    slug: 'kindergeldnummer-endziffer', nav: 'Kindergeldnummer, Endziffer', card: 'Wo die Nummer steht, was die Ziffer bewirkt',
    title: 'Kindergeldnummer und Endziffer: wo sie steht, was sie heißt',
    description: 'Kindergeldnummer und Endziffer: Wo Sie die Nummer finden, wie sie aufgebaut ist und an welchem Tag jede Endziffer 2026 und 2027 im Schnitt Kindergeld bekommt.',
    h1: 'Kindergeldnummer und Endziffer: was die letzte Ziffer bedeutet',
    intro: 'Endziffer wählen: Der Rechner zeigt den Auszahlungstag im gewählten Monat und die Termine der übrigen Endziffern zum Vergleich.',
    resume: `Die Kindergeldnummer ordnet Ihren Kindergeldfall bei der Familienkasse zu. Sie besteht aus drei Ziffern, den Buchstaben FK und sechs weiteren Ziffern, zum Beispiel 123FK456789. Sie steht im Bescheid der Familienkasse, auf jedem späteren Schreiben und im Verwendungszweck der monatlichen Überweisung auf Ihrem Kontoauszug. Für den Zahltag zählt nur die letzte Ziffer, die Endziffer. Die Familienkasse zahlt nicht alle Familien an einem Tag, sondern Endziffer für Endziffer: 0 und 1 in den ersten Tagen des Monats, 8 und 9 in der zweiten Monatshälfte. Über die Jahre 2026 und 2027 gerechnet bekommt Endziffer 0 ihr Geld im Schnitt am ${S[0].avg.toFixed(1).replace('.', ',')}. eines Monats, Endziffer 9 am ${S[9].avg.toFixed(1).replace('.', ',')}. Ändern lässt sich die Endziffer nicht; sie wird bei der Bewilligung vergeben. Diese Seite fragt nur nach der letzten Ziffer, und auch die bleibt in Ihrem Browser.`,
    faqs: [
      { q: 'Wo finde ich meine Kindergeldnummer?', a: 'Im Bewilligungsbescheid der Familienkasse und in jedem späteren Schreiben. Außerdem im Verwendungszweck der Kindergeldzahlung auf Ihrem Kontoauszug, den Sie auch in der Banking-App finden. Haben Sie beides nicht zur Hand, fragen Sie bei der Familienkasse nach; dort müssen Sie sich als berechtigte Person ausweisen.' },
      { q: 'Kann ich die Endziffer ändern lassen, um früher Geld zu bekommen?', a: 'Nein. Die Nummer vergibt die Familienkasse bei der Bewilligung, und an ihr hängt die gesamte Akte. Eine Änderung nur wegen des Zahltags ist nicht vorgesehen. Wer knapp kalkuliert, kann Lastschriften wie Miete oder Kita-Beitrag auf einen Tag nach dem eigenen Termin legen lassen.' },
      { q: 'Ist die Reihenfolge der Endziffern jeden Monat gleich?', a: 'Ja, in allen 24 Monaten der Jahre 2026 und 2027 kommt Endziffer 0 zuerst und Endziffer 9 zuletzt; mehrere Endziffern können denselben Tag haben. Die Abstände zwischen den Endziffern ändern sich aber mit Wochenenden und Feiertagen. Den Tag für Ihre Endziffer zeigt der Rechner oben für jeden Monat.' },
    ],
    body: (h) => `<h2>Welcher Tag im Monat für welche Endziffer</h2>
<p>Die Tabelle fasst alle ${h.n(24)} Monate der Jahre 2026 und 2027 aus der ${h.src('ba-kg-termine', 'Terminliste der Familienkasse')} zusammen: frühester und spätester Tag im Monat und der Durchschnitt. Für 2026 haben wir Januar bis September der ${h.src('ba-kg-archiv', 'archivierten Fassung der Liste')} entnommen.</p>
${h.table([h.T('Endziffer', 'Last digit'), h.T('Frühester Tag', 'Earliest day'), h.T('Spätester Tag', 'Latest day'), h.T('Im Schnitt', 'On average')], S.map((x, e) => [String(e), `${x.min}.`, `${x.max}.`, `${h.n(x.avg, 1)}.`]), h.T('Kindergeld 2026 und 2027: Auszahlungstag im Monat je Endziffer', 'Kindergeld 2026 and 2027: day of the month for each last digit'), ['r', 'r', 'r', 'r'])}
<h2>Wie die Nummer aufgebaut ist</h2>
<p>Drei Ziffern, die Buchstaben FK und sechs Ziffern: Die Nummer ist elf Zeichen lang. Auf der Überweisung steht sie im Verwendungszweck, oft zusammen mit dem Monat, für den gezahlt wird. Für Kinderzuschlag gilt dieselbe Nummer und derselbe Termin (${h.a('kinderzuschlag-auszahlung', 'Kinderzuschlag')}). Geben Sie Ihre Nummer nur gegenüber der Familienkasse oder Stellen an, die sie für Ihren Fall brauchen.</p>
<h2>Die Endziffer im Alltag</h2>
<p>Kindergeld wird nach ${h.src('bkgg11', '§ 11 BKGG')} monatlich gewährt, ein bestimmter Tag ist nicht vorgeschrieben. Wer mit Endziffer 8 oder 9 jeden Monat bis zur dritten Woche wartet, kann das bei Abbuchungen berücksichtigen. Ihre Termine für ${h.a('kindergeld-auszahlung', '2026')} und ${h.a('kindergeld-termine-2027', '2027')} zeigen die beiden Jahresseiten.</p>
${h.mini('kg', { p: ['endziffer'], d: { monat: '2027-03' }, t: 'Ihre Endziffer im März 2027' })}`,
  },
  en: {
    slug: 'kindergeld-number-last-digit', nav: 'Kindergeld number, last digit', card: 'Where the number is, what the digit does',
    title: 'Kindergeld number and last digit: where it is, what it means',
    description: 'Kindergeld number and last digit: where to find the number, how it is built, and on which day each last digit received Kindergeld on average in 2026 and 2027.',
    h1: 'Kindergeld number and last digit: what the final digit means',
    intro: 'Pick your last digit: the tool shows the payment day in the chosen month and the dates for the other digits for comparison.',
    resume: `The Kindergeld number links your child benefit case to the Familienkasse. It consists of three digits, the letters FK and six more digits, for example 123FK456789. It appears on the Familienkasse award notice, on every later letter and in the payment reference of the monthly transfer on your bank statement. Only the last digit matters for the payment day. The Familienkasse does not pay every family on one day but digit by digit: 0 and 1 in the first days of the month, 8 and 9 in the second half. Across 2026 and 2027, last digit 0 received its money on day ${S[0].avg.toFixed(1)} of the month on average, digit 9 on day ${S[9].avg.toFixed(1)}. The last digit cannot be changed; it is assigned when Kindergeld is awarded. This site only ever asks for the last digit, and that stays in your browser.`,
    faqs: [
      { q: 'Where do I find my Kindergeld number?', a: 'On the Familienkasse award notice and on every later letter. It also appears in the payment reference of the Kindergeld transfer on your bank statement, which you can also find in your banking app. If you have neither to hand, ask the Familienkasse; you will have to prove you are the person entitled.' },
      { q: 'Can I have my last digit changed to get paid earlier?', a: 'No. The Familienkasse assigns the number when it awards Kindergeld, and your whole file hangs on it. A change just because of the payment day is not provided for. If money is tight, ask for direct debits such as rent or nursery fees to be collected after your date.' },
      { q: 'Is the order of the digits the same every month?', a: 'Yes. In all 24 months of 2026 and 2027, last digit 0 came first and digit 9 last; several digits can share a day. The gaps between the digits do change, however, with weekends and holidays. The tool above shows the day for your digit in every month.' },
    ],
    body: (h) => `<h2>Which day of the month for which digit</h2>
<p>The table sums up all ${h.n(24)} months of 2026 and 2027 from the ${h.src('ba-kg-termine', 'Familienkasse list')}: earliest and latest day of the month and the average. For 2026, January to September come from the ${h.src('ba-kg-archiv', 'archived version of the list')}.</p>
${h.table([h.T('Endziffer', 'Last digit'), h.T('Frühester Tag', 'Earliest day'), h.T('Spätester Tag', 'Latest day'), h.T('Im Schnitt', 'On average')], S.map((x, e) => [String(e), `${x.min}`, `${x.max}`, `${h.n(x.avg, 1)}`]), h.T('Kindergeld 2026 und 2027: Auszahlungstag im Monat je Endziffer', 'Kindergeld 2026 and 2027: day of the month for each last digit'), ['r', 'r', 'r', 'r'])}
<h2>How the number is built</h2>
<p>Three digits, the letters FK and six digits: the number is eleven characters long. On the transfer it appears in the payment reference, often with the month being paid. Kinderzuschlag uses the same number and the same date (${h.a('kinderzuschlag-auszahlung', 'Kinderzuschlag')}). Only give your number to the Familienkasse or to bodies that need it for your case.</p>
<h2>The last digit in everyday life</h2>
<p>Under ${h.src('bkgg11', 'section 11 BKGG')} Kindergeld is granted monthly, with no particular day prescribed. If your number ends in 8 or 9 and you wait until the third week every month, take that into account for direct debits. Your dates for ${h.a('kindergeld-auszahlung', '2026')} and ${h.a('kindergeld-termine-2027', '2027')} are on the two yearly pages.</p>
${h.mini('kg', { p: ['endziffer'], d: { monat: '2027-03' }, t: 'Your last digit in March 2027' })}`,
  },
});
