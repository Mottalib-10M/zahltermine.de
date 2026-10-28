/** Première pension : début (§ 99 SGB VI), premier versement en fin de premier mois (§ 118), rappel si l'avis arrive tard. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong } from '../../lib/tool-specs';

const jan = K.renteNach(2027, 1), feb = K.renteNach(2027, 2);

export default defineGuide({
  id: 'erste-rentenzahlung', group: 'rente', order: 17, tool: 'r1', toolArg: { monat: '2027-01' },
  related: ['rente-auszahlung-2027', 'rente-vor-2004', 'rentenerhoehung-2027', 'home'],
  sources: ['sgb6-99', 'sgb6-118'],
  de: {
    slug: 'erste-rentenzahlung', nav: 'Erste Rentenzahlung', card: 'Wann das erste Rentengeld kommt',
    title: 'Erste Rentenzahlung 2026 und 2027: wann das Geld kommt',
    description: 'Erste Rentenzahlung: Die Rente beginnt am Monatsersten und wird am Monatsende gezahlt. Rechner für Rentenbeginn 2026 und 2027, mit allen Folgeterminen.',
    h1: 'Erste Rentenzahlung: wann das erste Geld auf dem Konto ist',
    intro: 'Monat des Rentenbeginns wählen: Der Rechner zeigt den Tag der ersten Zahlung, die nächsten fünf und die erste Zahlung nach einer Julianpassung.',
    resume: `Eine Rente beginnt immer am Ersten eines Monats und wird am Ende dieses Monats zum ersten Mal gezahlt. Nach § 99 SGB VI wird eine Altersrente von dem Kalendermonat an geleistet, zu dessen Beginn alle Voraussetzungen erfüllt sind, sofern der Antrag spätestens bis zum Ende des dritten Kalendermonats danach gestellt wird; wer später beantragt, bekommt sie erst ab dem Antragsmonat. Gezahlt wird nach § 118 am letzten Bankarbeitstag des Monats, für den die Rente gilt. Wer am 1. Januar 2027 in Rente geht, bekommt das erste Geld also am ${dLong(jan, 'de')}, die zweite Zahlung am ${dLong(feb, 'de')}. Zwischen dem letzten Gehalt und der ersten Rente entsteht damit oft eine Lücke: Das Gehalt für Dezember kommt meist Ende Dezember, die erste Rente Ende Januar. Liegt der Rentenbescheid zum Zahltag noch nicht vor, beginnt die laufende Zahlung später, und die Monate seit Rentenbeginn werden nachgezahlt. Diese Nachzahlung folgt einem eigenen Lauf und nicht dem Monatsend-Termin.`,
    faqs: [
      { q: 'Wann kommt die erste Rente bei Rentenbeginn 1. Januar 2027?', a: `Am ${dLong(jan, 'de')}, dem letzten Bankarbeitstag im Januar; der 31. Januar 2027 ist ein Sonntag. Voraussetzung ist, dass der Bescheid rechtzeitig vorliegt. Sonst kommt das Geld für Januar später als Nachzahlung, und die laufende Rente beginnt mit einem der folgenden Monatsend-Termine.` },
      { q: 'Bekomme ich die erste Rente im Voraus?', a: 'Nein. Für alle Renten, die seit dem 1. April 2004 beginnen, gilt die Zahlung am Monatsende. Nur Renten mit Beginn vor diesem Datum werden im Voraus gezahlt. Wer neu in Rente geht, bekommt also den ersten Rentenmonat am Ende dieses Monats.' },
      { q: 'Was passiert, wenn ich den Antrag spät stelle?', a: 'Stellen Sie den Antrag bis zum Ende des dritten Kalendermonats nach dem Monat, in dem alle Voraussetzungen erfüllt sind, beginnt die Rente trotzdem rückwirkend. Danach beginnt sie erst mit dem Antragsmonat, und die Monate davor sind verloren. Das regelt § 99 Absatz 1 SGB VI.' },
    ],
    body: (h) => `<h2>Erste Zahlung je Rentenbeginn</h2>
${h.table([h.T('Rentenbeginn', 'Pension starts'), h.T('Erste Zahlung', 'First payment'), h.T('Zweite Zahlung', 'Second payment')], ['2026-11', '2026-12', '2027-01', '2027-02', '2027-03', '2027-04', '2027-05', '2027-06'].map((x) => { const [y, m] = x.split('-').map(Number); return [h.dl(K.monatserster(y, m)), h.wday(K.renteNach(y, m)), h.ds(K.renteNach(...K.folgemonat(y, m)))]; }), h.T('Erste und zweite Rentenzahlung, berechnet nach § 118 SGB VI', 'First and second pension payments, calculated under section 118 SGB VI'), ['l', 'l', 'l'])}
<p>Rechtsgrundlagen: ${h.src('sgb6-99', '§ 99 SGB VI')} für den Beginn, ${h.src('sgb6-118', '§ 118 SGB VI')} für den Zahltag.</p>
<h2>Die Lücke zwischen Gehalt und Rente</h2>
<p>Wer bis zum letzten Tag vor der Rente arbeitet, erhält das letzte Gehalt meist am Monatsende. Die erste Rente kommt einen Monat später, ebenfalls am Monatsende. Dazwischen liegt kein Monat ohne Geld, aber ein Monat, in dem nur das Gehalt des Vormonats zur Verfügung steht. Wer Lastschriften für den Monatsanfang hat, sollte das im ersten Rentenmonat berücksichtigen. Wann im Jahr der neue Rentenwert erstmals ausgezahlt wird, zeigt ${h.a('rentenerhoehung-2027', 'Rentenerhöhung 2027')}; alle Termine 2027 stehen unter ${h.a('rente-auszahlung-2027', 'Rente Termine 2027')}.</p>
<h2>Mehrere Leistungen im Übergang</h2>
<p>Wer vor der Rente Arbeitslosengeld bezog, erhält dieses nachträglich am ersten Arbeitstag des Folgemonats; das letzte Arbeitslosengeld und die erste Rente können deshalb nahe beieinander liegen. Beide Termine zusammen zeigt der ${h.a('home', 'Zahltermin-Kalender')}.</p>
${h.mini('r1', { p: ['monat'], d: { monat: '2027-04' }, t: 'Rentenbeginn: Ihre erste Zahlung' })}`,
  },
  en: {
    slug: 'first-pension-payment', nav: 'First pension payment', card: 'When the first pension money arrives',
    title: 'First pension payment in Germany 2026 and 2027: when',
    description: 'First German pension payment: the pension starts on the first of a month and is paid at its end. Tool for pension starts in 2026 and 2027, with later dates.',
    h1: 'First German pension payment: when the money reaches your account',
    intro: 'Pick the month your pension starts: the tool shows the day of the first payment, the next five and the first payment after a July adjustment.',
    resume: `A German pension always starts on the first of a month and is paid for the first time at the end of that month. Under section 99 of Social Code Book VI, an old-age pension is paid from the calendar month at whose start all conditions are met, provided you apply by the end of the third calendar month after that; if you apply later, it only starts with the month of application. Under section 118 it is paid on the last bank business day of the month it covers. If you retire on 1 January 2027, the first money arrives on ${dLong(jan, 'en')} and the second payment on ${dLong(feb, 'en')}. That often leaves a gap between the last salary and the first pension: December's salary usually arrives at the end of December, the first pension at the end of January. If the award notice is not ready by the payment day, regular payments start later and the months since the pension began are paid in arrears. That back payment runs on its own schedule, not on the month-end date.`,
    faqs: [
      { q: 'When does the first pension arrive for a start on 1 January 2027?', a: `On ${dLong(jan, 'en')}, the last bank business day of January; 31 January 2027 is a Sunday. This assumes the award notice is ready in time. Otherwise January's money comes later as a back payment, and the regular pension starts on one of the following month-end dates.` },
      { q: 'Is my first pension paid in advance?', a: 'No. Every pension starting on or after 1 April 2004 is paid at the end of the month. Only pensions that began before that date are paid in advance. If you retire now, you receive your first pension month at the end of that month.' },
      { q: 'What happens if I apply late?', a: 'If you apply by the end of the third calendar month after the month in which all conditions are met, the pension still starts retroactively. After that, it only starts with the month of application and the months before are lost. Section 99(1) SGB VI sets this out.' },
    ],
    body: (h) => `<h2>First payment by pension start</h2>
${h.table([h.T('Rentenbeginn', 'Pension starts'), h.T('Erste Zahlung', 'First payment'), h.T('Zweite Zahlung', 'Second payment')], ['2026-11', '2026-12', '2027-01', '2027-02', '2027-03', '2027-04', '2027-05', '2027-06'].map((x) => { const [y, m] = x.split('-').map(Number); return [h.dl(K.monatserster(y, m)), h.wday(K.renteNach(y, m)), h.ds(K.renteNach(...K.folgemonat(y, m)))]; }), h.T('Erste und zweite Rentenzahlung, berechnet nach § 118 SGB VI', 'First and second pension payments, calculated under section 118 SGB VI'), ['l', 'l', 'l'])}
<p>Legal basis: ${h.src('sgb6-99', 'section 99 SGB VI')} for the start, ${h.src('sgb6-118', 'section 118 SGB VI')} for the payment day.</p>
<h2>The gap between salary and pension</h2>
<p>If you work until the day before your pension starts, the last salary usually arrives at the end of the month. The first pension comes a month later, also at the end of the month. There is no month without money, but there is a month in which only the previous month's salary is available. If you have direct debits early in the month, allow for that in your first pension month. When the new pension value is paid for the first time in the year is shown on ${h.a('rentenerhoehung-2027', 'pension increase 2027')}; every 2027 date is on ${h.a('rente-auszahlung-2027', 'pension dates 2027')}.</p>
<h2>Several benefits during the transition</h2>
<p>If you received unemployment benefit before retiring, it is paid in arrears on the first working day of the following month, so the last unemployment benefit and the first pension can arrive close together. The ${h.a('home', 'payment calendar')} shows both dates together.</p>
${h.mini('r1', { p: ['monat'], d: { monat: '2027-04' }, t: 'Pension start: your first payment' })}`,
  },
});
