/** Kinderzuschlag : versé avec le Kindergeld, même liste ; période d'attribution de six mois (§ 6a Abs. 7 BKGG). */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong } from '../../lib/tool-specs';

const n0 = K.kindergeld(2026, 11, 0)!, n9 = K.kindergeld(2026, 11, 9)!;
/** Six mois d'attribution à partir d'un mois de demande. */
const sechs = (y: number, m: number) => Array.from({ length: 6 }, (_, i) => { let [yy, mm] = [y, m]; for (let k = 0; k < i; k++) [yy, mm] = K.folgemonat(yy, mm); return K.ym(yy, mm); });

export default defineGuide({
  id: 'kinderzuschlag-auszahlung', group: 'kindergeld', order: 6, tool: 'kg', toolArg: { monat: '2026-12', endziffer: 4 },
  related: ['kindergeld-auszahlung', 'kindergeldnummer-endziffer', 'wohngeld-auszahlung', 'home'],
  sources: ['bkgg11', 'bkgg6a', 'ba-kg-termine'],
  de: {
    slug: 'kinderzuschlag-auszahlung', nav: 'Kinderzuschlag', card: 'Zahltag wie das Kindergeld, sechs Monate',
    title: 'Kinderzuschlag Auszahlung 2026: Termine und Endziffer',
    description: 'Kinderzuschlag Auszahlung 2026 und 2027: Die Familienkasse zahlt ihn am Kindergeldtag Ihrer Endziffer. Termine, sechs Monate Bewilligung und Folgeantrag.',
    h1: 'Kinderzuschlag: wann er gezahlt wird und wie lange',
    intro: 'Endziffer und Monat wählen: Der Kinderzuschlag kommt am selben Tag wie das Kindergeld; der Rechner zeigt ihn für jeden Monat 2026 und 2027.',
    resume: `Den Kinderzuschlag zahlt die Familienkasse zusammen mit dem Kindergeld aus, am selben Tag und nach derselben Terminliste. Maßgeblich ist die letzte Ziffer der Kindergeldnummer: Im November 2026 kommt das Geld je nach Endziffer zwischen dem ${dLong(n0, 'de')} und dem ${dLong(n9, 'de')}. Beide Leistungen werden nach § 11 des Bundeskindergeldgesetzes monatlich gewährt. Anders als beim Kindergeld entscheidet die Familienkasse über den Kinderzuschlag aber immer nur für sechs Monate; dieser Bewilligungszeitraum beginnt nach § 6a Absatz 7 mit dem Monat, in dem der Antrag gestellt wird, frühestens nach dem Ende des laufenden Zeitraums. Wer keinen neuen Antrag stellt, bekommt nach dem sechsten Monat keinen Kinderzuschlag mehr, während das Kindergeld weiterläuft. Deshalb lohnt es sich, das Ende des Zeitraums im Kalender zu notieren. Der Rechner oben zeigt die Termine; die Höhe des Kinderzuschlags berechnet diese Seite nicht.`,
    faqs: [
      { q: 'Kommt der Kinderzuschlag getrennt vom Kindergeld?', a: 'Nein, die Familienkasse überweist ihn am Tag Ihrer Endziffer zusammen mit dem Kindergeld. Auf dem Kontoauszug kann er als eigener Betrag oder als Teil einer Gesamtzahlung erscheinen. Die erste Zahlung nach einer Bewilligung kann außerhalb des üblichen Laufs kommen, ebenso Nachzahlungen für zurückliegende Monate.' },
      { q: 'Wie lange wird der Kinderzuschlag bewilligt?', a: 'Für sechs Monate. Der Zeitraum beginnt mit dem Monat, in dem Sie den Antrag stellen. Für die Zeit danach brauchen Sie einen neuen Antrag; er kann frühestens für den Monat nach dem Ende des laufenden Zeitraums wirken. Ohne Folgeantrag endet die Zahlung nach dem sechsten Monat.' },
      { q: 'Wann sollte ich den Folgeantrag stellen?', a: 'Im letzten Monat des laufenden Bewilligungszeitraums. Der neue Zeitraum beginnt mit dem Antragsmonat, aber frühestens nach dem Ende des laufenden. Wer erst einen Monat nach dem Ende beantragt, verliert in der Regel einen Monat Kinderzuschlag. Den Monat zeigt die Tabelle unten für jeden Beginn.' },
    ],
    body: (h) => `<h2>Sechs Monate ab dem Antragsmonat</h2>
<p>Die Tabelle zeigt für einen Antrag im November 2026, im Januar 2027 und im März 2027, welche Monate der Bewilligungszeitraum umfasst, wann die letzte Zahlung kommt (Beispiel Endziffer 4) und in welchem Monat der Folgeantrag fällig ist. Grundlage ist ${h.src('bkgg6a', '§ 6a Abs. 7 BKGG')}.</p>
${h.table([h.T('Antrag im', 'Applied in'), h.T('Zeitraum', 'Period'), h.T('Letzte Zahlung (Endziffer 4)', 'Last payment (last digit 4)'), h.T('Folgeantrag im', 'Reapply in')], [[2026, 11], [2027, 1], [2027, 3]].map(([y, m]) => { const s = sechs(y, m); const [ly, lm] = s[5].split('-').map(Number); const last = K.kindergeld(ly, lm, 4); return [h.mon(s[0]), `${h.mon(s[0])} – ${h.mon(s[5])}`, last ? h.ds(last) : h.T('noch nicht veröffentlicht', 'not yet published'), h.mon(s[5])]; }), h.T('Kinderzuschlag: Bewilligungszeitraum und Folgeantrag', 'Kinderzuschlag: award period and reapplication'), ['l', 'l', 'l', 'l'])}
<h2>Ein Zahltag für beide Leistungen</h2>
<p>Kindergeld und Kinderzuschlag werden nach ${h.src('bkgg11', '§ 11 BKGG')} monatlich gewährt, und die Familienkasse zahlt beide nach ihrer ${h.src('ba-kg-termine', 'Terminliste')}. Für Ihre Endziffer gelten deshalb dieselben Tage wie unter ${h.a('kindergeld-auszahlung', 'Kindergeld Auszahlung')}. Wo Sie die Endziffer finden, steht unter ${h.a('kindergeldnummer-endziffer', 'Kindergeldnummer und Endziffer')}.</p>
<h2>Kinderzuschlag und Wohngeld</h2>
<p>Viele Familien mit Kinderzuschlag beziehen auch Wohngeld. Das Wohngeld zahlt nicht die Familienkasse, sondern die Wohngeldstelle, im Voraus und nach eigenem Lauf; die Termine und ihre Grenzen beschreibt ${h.a('wohngeld-auszahlung', 'Wohngeld Auszahlung')}. Beide Termine zusammen, dazu Kindergeld und andere Leistungen, legt der ${h.a('home', 'Zahltermin-Kalender')} in eine Liste.</p>
${h.mini('kg', { p: ['endziffer', 'monat'], d: { monat: '2027-02' }, t: 'Kinderzuschlag und Kindergeld: Ihr Termin' })}`,
  },
  en: {
    slug: 'kinderzuschlag-payment-dates', nav: 'Kinderzuschlag', card: 'Paid with Kindergeld, six months',
    title: 'Kinderzuschlag payment dates 2026: last digit, six months',
    description: 'Kinderzuschlag payment dates 2026 and 2027: the Familienkasse pays it on the Kindergeld day for your last digit. Dates, six-month award period, reapplying.',
    h1: 'Kinderzuschlag: when it is paid and for how long',
    intro: 'Pick your last digit and month: Kinderzuschlag arrives on the same day as Kindergeld; the tool shows it for every month of 2026 and 2027.',
    resume: `Kinderzuschlag, the child supplement for families on low incomes, is paid by the Familienkasse together with Kindergeld, on the same day and following the same list. What counts is the last digit of the Kindergeld number: in November 2026 the money arrives between ${dLong(n0, 'en')} and ${dLong(n9, 'en')}, depending on the digit. Section 11 of the Federal Child Benefit Act grants both benefits monthly. Unlike Kindergeld, however, the Familienkasse only ever decides on Kinderzuschlag for six months. Under section 6a(7), this award period starts with the month in which you apply, at the earliest after the current period ends. If you do not reapply, Kinderzuschlag stops after the sixth month while Kindergeld continues. That is why it is worth noting the end of the period in your calendar. The tool above shows the dates; this site does not calculate the amount of Kinderzuschlag.`,
    faqs: [
      { q: 'Is Kinderzuschlag paid separately from Kindergeld?', a: 'No, the Familienkasse transfers it on the day for your last digit, together with Kindergeld. Your statement may show it as a separate amount or as part of one payment. The first payment after an award can come outside the usual run, as can back payments for earlier months.' },
      { q: 'How long is Kinderzuschlag awarded for?', a: 'For six months. The period starts with the month in which you apply. For the time after that you need a new application, which can take effect at the earliest for the month after the current period ends. Without a new application, payments stop after the sixth month.' },
      { q: 'When should I reapply?', a: 'In the last month of the current award period. The new period starts with the month of application, but no earlier than the end of the current one. If you apply a month after it ends, you will usually lose a month of Kinderzuschlag. The table below shows the month for each start.' },
    ],
    body: (h) => `<h2>Six months from the month you apply</h2>
<p>For an application in November 2026, January 2027 and March 2027, the table shows which months the award period covers, when the last payment arrives (example: last digit 4) and in which month to reapply. The basis is ${h.src('bkgg6a', 'section 6a(7) BKGG')}.</p>
${h.table([h.T('Antrag im', 'Applied in'), h.T('Zeitraum', 'Period'), h.T('Letzte Zahlung (Endziffer 4)', 'Last payment (last digit 4)'), h.T('Folgeantrag im', 'Reapply in')], [[2026, 11], [2027, 1], [2027, 3]].map(([y, m]) => { const s = sechs(y, m); const [ly, lm] = s[5].split('-').map(Number); const last = K.kindergeld(ly, lm, 4); return [h.mon(s[0]), `${h.mon(s[0])} – ${h.mon(s[5])}`, last ? h.ds(last) : h.T('noch nicht veröffentlicht', 'not yet published'), h.mon(s[5])]; }), h.T('Kinderzuschlag: Bewilligungszeitraum und Folgeantrag', 'Kinderzuschlag: award period and reapplication'), ['l', 'l', 'l', 'l'])}
<h2>One payment day for both benefits</h2>
<p>Under ${h.src('bkgg11', 'section 11 BKGG')} Kindergeld and Kinderzuschlag are granted monthly, and the Familienkasse pays both following its ${h.src('ba-kg-termine', 'payment list')}. The same days as on ${h.a('kindergeld-auszahlung', 'Kindergeld payment dates')} therefore apply to your digit. Where to find the digit is explained under ${h.a('kindergeldnummer-endziffer', 'Kindergeld number and last digit')}.</p>
<h2>Kinderzuschlag and housing benefit</h2>
<p>Many families receiving Kinderzuschlag also get housing benefit (Wohngeld). That is paid not by the Familienkasse but by the housing benefit office, in advance and on its own schedule; ${h.a('wohngeld-auszahlung', 'housing benefit payment dates')} explains the dates and their limits. The ${h.a('home', 'payment calendar')} puts both, plus Kindergeld and other benefits, in one list.</p>
${h.mini('kg', { p: ['endziffer', 'monat'], d: { monat: '2027-02' }, t: 'Kinderzuschlag and Kindergeld: your date' })}`,
  },
});
