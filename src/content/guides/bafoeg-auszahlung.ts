/** BAföG : mensuel et d'avance (§ 51 Abs. 1 BAföG), décision en général pour un an (§ 50 Abs. 3), avance après 10 semaines (§ 51 Abs. 2). */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong, monatName } from '../../lib/tool-specs';

const okt = K.imVoraus(2027, 10), apr = K.imVoraus(2027, 4), nov = K.imVoraus(2026, 11);
/** Mois de début des semestres : avril et octobre. */
const SEM = [[2027, 4], [2027, 10]] as const;

export default defineGuide({
  id: 'bafoeg-auszahlung', group: 'leistungen', order: 26, tool: 'vo', toolArg: { leistung: 'bafoeg', monat: '2026-12' },
  related: ['wohngeld-auszahlung', 'kindergeld-auszahlung', 'bankarbeitstage-2026', 'bankarbeitstage-2027'],
  sources: ['bafoeg51', 'bafoeg50', 'sgb1-41'],
  countdown: { date: K.imVoraus(2026, 12), label: { de: 'erster Bankarbeitstag im Dezember', en: 'first bank business day in December' } },
  de: {
    slug: 'bafoeg-auszahlung', nav: 'BAföG', card: 'Im Voraus, zum Monatsanfang',
    title: 'BAföG Auszahlung 2026: Termin im Monat und Semester',
    description: 'BAföG Auszahlung 2026 und 2027: monatlich im Voraus nach § 51 BAföG, meist um den Monatsersten. Bankarbeitstage, Semesterbeginn, Abschlag, Folgeantrag.',
    h1: 'BAföG: wann das Geld auf dem Konto ist',
    intro: 'Monat wählen: Der Rechner zeigt den Monatsanfang, den ersten Bankarbeitstag und den letzten Bankarbeitstag davor, also den Rahmen der Überweisung.',
    resume: `BAföG wird nach § 51 Absatz 1 des Bundesausbildungsförderungsgesetzes unbar und monatlich im Voraus gezahlt. Das Geld für einen Monat kommt also zu dessen Beginn, nicht am Ende. Einen bundesweit festen Kalendertag nennt das Gesetz nicht; überwiesen wird über das Amt für Ausbildungsförderung, und die Gutschrift liegt erfahrungsgemäß in den letzten Tagen des Vormonats oder am Anfang des Monats. Der erste Bankarbeitstag im November 2026 ist der ${dLong(nov, 'de')}, weil der 1. November ein Sonntag ist. Zum Sommersemester 2027 ist es der ${dLong(apr, 'de')}, zum Wintersemester der ${dLong(okt, 'de')}. Über den Antrag wird nach § 50 Absatz 3 in der Regel für ein Jahr entschieden. Kann das Amt beim ersten Antrag nicht binnen zehn Kalenderwochen zahlen, leistet es nach § 51 Absatz 2 für vier Monate einen Abschlag von bis zu vier Fünfteln des voraussichtlichen Bedarfs. Wer den Folgeantrag zwei Monate vor dem Ende stellt, wird ohne Lücke weiter gefördert.`,
    faqs: [
      { q: 'Wann kommt das BAföG im Monat?', a: 'Zu Beginn des Monats, für den es gezahlt wird, weil das Gesetz die Zahlung im Voraus vorschreibt. Häufig ist das Geld schon am letzten Bankarbeitstag des Vormonats oder am ersten des Monats da. Einen einheitlichen Tag für ganz Deutschland gibt es nicht.' },
      { q: 'Was ist, wenn mein Antrag noch nicht bearbeitet ist?', a: 'Beim ersten Antrag in einem Ausbildungsabschnitt gilt: Kann das Amt nicht binnen sechs Kalenderwochen entscheiden oder nicht binnen zehn Kalenderwochen zahlen, wird für vier Monate ein Abschlag unter dem Vorbehalt der Rückforderung geleistet. Er beträgt bis zu vier Fünftel des voraussichtlichen Bedarfs.' },
      { q: 'Wie lange wird BAföG bewilligt?', a: 'In der Regel für ein Jahr, den Bewilligungszeitraum. Danach ist ein neuer Antrag nötig. Ist er im Wesentlichen vollständig zwei Kalendermonate vor Ablauf gestellt und noch nicht entschieden, zahlt das Amt nach dem bisherigen Bescheid unter Vorbehalt weiter. Den Zeitraum nennt Ihr Bescheid.' },
      { q: 'Wird BAföG unter 10 Euro gezahlt?', a: 'Nein. Nach § 51 Absatz 4 werden monatliche Förderungsbeträge unter 10 Euro nicht geleistet. Beträge werden auf volle Euro gerundet, ab 50 Cent nach oben. Die Höhe ergibt sich aus Bedarf, eigenem Einkommen und Vermögen sowie dem Einkommen der Eltern und steht im Bescheid. Ändert sich das Einkommen, kann ein neuer Antrag einen höheren Betrag ergeben.' },
    ],
    body: (h) => `<h2>Der Rahmen der Überweisung 2027</h2>
<p>Für jeden Monat 2027 zeigt die Tabelle den letzten Bankarbeitstag des Vormonats und den ersten des Monats. Dazwischen liegt bei Zahlung im Voraus nach ${h.src('bafoeg51', '§ 51 Abs. 1 BAföG')} die Gutschrift.</p>
${h.table([h.T('BAföG für', 'BAföG for'), h.T('Letzter Bankarbeitstag davor', 'Last bank business day before'), h.T('Erster Bankarbeitstag', 'First bank business day')], Array.from({ length: 12 }, (_, i) => [monatName(i + 1, h.lang), h.ds(K.renteNach(...K.vormonat(2027, i + 1))), h.ds(K.imVoraus(2027, i + 1))]), h.T('BAföG 2027: Monatsanfang und Bankarbeitstage', 'BAföG 2027: start of month and bank business days'), ['l', 'l', 'l'])}
<h2>Semesterbeginn und Bewilligungszeitraum</h2>
<p>An Hochschulen beginnen die Semester meist im April und im Oktober, und viele Bewilligungszeiträume folgen diesem Takt. Nach ${h.src('bafoeg50', '§ 50 Abs. 3 BAföG')} wird in der Regel für ein Jahr entschieden. Für eine Förderung ohne Lücke muss der Folgeantrag ${h.src('bafoeg50', 'zwei Kalendermonate vor Ablauf')} im Wesentlichen vollständig sein.</p>
${h.table([h.T('Semesterbeginn', 'Semester start'), h.T('Erste Zahlung frühestens', 'First payment at the earliest'), h.T('Folgeantrag spätestens im', 'Reapply by')], SEM.map(([y, m]) => { let [fy, fm] = [y + 1, m]; for (let k = 0; k < 3; k++) [fy, fm] = K.vormonat(fy, fm); return [h.mon(K.ym(y, m)), h.ds(K.imVoraus(y, m)), h.mon(K.ym(fy, fm))]; }), h.T('BAföG: zwölf Monate ab Semesterbeginn, Folgeantrag zwei Monate vor dem Ende', 'BAföG: twelve months from semester start, reapply two months before the end'), ['l', 'l', 'l'])}
<h2>BAföG, Kindergeld und Wohngeld</h2>
<p>Kindergeld läuft für Studierende unter 25 neben dem BAföG weiter, zum Termin der Familienkasse (${h.a('kindergeld-auszahlung', 'Kindergeld Auszahlung')}). Wohngeld bekommen BAföG-Berechtigte nur in Ausnahmefällen; der Zahltag hängt dann von der Wohngeldstelle ab (${h.a('wohngeld-auszahlung', 'Wohngeld Auszahlung')}). Fällig ist jeder Anspruch nach ${h.src('sgb1-41', '§ 41 SGB I')} mit seinem Entstehen.</p>
${h.mini('vo', { p: ['monat'], d: { leistung: 'bafoeg', monat: '2027-10' }, t: 'BAföG: Ihr Monat' })}`,
  },
  en: {
    slug: 'bafoeg-payment-dates', nav: 'BAföG', card: 'In advance, at the start of the month',
    title: 'BAföG payment dates 2026: day of the month and semester',
    description: 'BAföG payment dates 2026 and 2027: paid monthly in advance under section 51 BAföG, usually around the 1st. Bank business days, semester start and advances.',
    h1: 'BAföG: when the money is in your account',
    intro: 'Pick a month: the tool shows the start of the month, the first bank business day and the last bank business day before it, the window for the transfer.',
    resume: `BAföG, Germany's state student finance, is paid cashless and monthly in advance under section 51(1) of the Federal Training Assistance Act. The money for a month therefore arrives at its start, not its end. The law names no fixed nationwide calendar day; the student finance office makes the transfer, and in practice the credit lands in the last days of the previous month or at the start of the month. The first bank business day in November 2026 is ${dLong(nov, 'en')}, because 1 November is a Sunday. For the 2027 summer semester it is ${dLong(apr, 'en')}, for the winter semester ${dLong(okt, 'en')}. Under section 50(3) a decision usually covers one year. If the office cannot pay within ten calendar weeks of a first application, section 51(2) requires it to pay an advance of up to four fifths of the expected need for four months. If you reapply two months before the end, funding continues without a gap.`,
    faqs: [
      { q: 'When in the month does BAföG arrive?', a: 'At the start of the month it covers, because the law requires payment in advance. The money is often there on the last bank business day of the previous month or the first of the month. There is no single day for the whole of Germany.' },
      { q: 'What if my application has not been processed yet?', a: 'For a first application in a stage of education: if the office cannot decide within six calendar weeks or pay within ten, it pays an advance for four months, subject to repayment. The advance is up to four fifths of the expected need.' },
      { q: 'How long is BAföG awarded for?', a: 'Usually one year, the award period. After that you need a new application. If it was essentially complete two calendar months before the end and has not yet been decided, the office keeps paying under the previous notice, subject to repayment.' },
      { q: 'Is BAföG paid if it is under 10 euros?', a: 'No. Under section 51(4), monthly amounts under 10 euros are not paid. Amounts are rounded to whole euros, upwards from 50 cents. The amount depends on your need, your own income and assets and the income of your parents, and is shown in the award notice. If income changes, a new application may give a higher amount.' },
    ],
    body: (h) => `<h2>The transfer window in 2027</h2>
<p>For each month of 2027 the table shows the last bank business day of the previous month and the first of the month. With payment in advance under ${h.src('bafoeg51', 'section 51(1) BAföG')}, the credit falls between the two.</p>
${h.table([h.T('BAföG für', 'BAföG for'), h.T('Letzter Bankarbeitstag davor', 'Last bank business day before'), h.T('Erster Bankarbeitstag', 'First bank business day')], Array.from({ length: 12 }, (_, i) => [monatName(i + 1, h.lang), h.ds(K.renteNach(...K.vormonat(2027, i + 1))), h.ds(K.imVoraus(2027, i + 1))]), h.T('BAföG 2027: Monatsanfang und Bankarbeitstage', 'BAföG 2027: start of month and bank business days'), ['l', 'l', 'l'])}
<h2>Semester start and award period</h2>
<p>At universities, semesters usually start in April and October, and many award periods follow that rhythm. Under ${h.src('bafoeg50', 'section 50(3) BAföG')} a decision usually covers one year. For funding without a gap, the new application must be essentially complete ${h.src('bafoeg50', 'two calendar months before the end')}.</p>
${h.table([h.T('Semesterbeginn', 'Semester start'), h.T('Erste Zahlung frühestens', 'First payment at the earliest'), h.T('Folgeantrag spätestens im', 'Reapply by')], SEM.map(([y, m]) => { let [fy, fm] = [y + 1, m]; for (let k = 0; k < 3; k++) [fy, fm] = K.vormonat(fy, fm); return [h.mon(K.ym(y, m)), h.ds(K.imVoraus(y, m)), h.mon(K.ym(fy, fm))]; }), h.T('BAföG: zwölf Monate ab Semesterbeginn, Folgeantrag zwei Monate vor dem Ende', 'BAföG: twelve months from semester start, reapply two months before the end'), ['l', 'l', 'l'])}
<h2>BAföG, Kindergeld and housing benefit</h2>
<p>For students under 25, Kindergeld continues alongside BAföG, on the Familienkasse date (${h.a('kindergeld-auszahlung', 'Kindergeld payment dates')}). People eligible for BAföG only get housing benefit in exceptional cases; the payment day then depends on the housing benefit office (${h.a('wohngeld-auszahlung', 'housing benefit payment dates')}). Under ${h.src('sgb1-41', 'section 41 SGB I')} each claim is due as soon as it arises.</p>
${h.mini('vo', { p: ['monat'], d: { leistung: 'bafoeg', monat: '2027-10' }, t: 'BAföG: your month' })}`,
  },
});
