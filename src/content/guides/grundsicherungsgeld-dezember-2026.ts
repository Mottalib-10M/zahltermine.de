/** Grundsicherungsgeld (früher Bürgergeld) décembre 2026 : argent de décembre le 30.11, argent de janvier le 31.12. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong } from '../../lib/tool-specs';

const dez = K.grundsicherung(2026, 12), jan = K.grundsicherung(2027, 1), feb = K.grundsicherung(2027, 2), nov = K.grundsicherung(2026, 11);

export default defineGuide({
  id: 'grundsicherungsgeld-dezember-2026', group: 'leistungen', order: 21, tool: 'gs', toolArg: { monat: '2027-01' },
  related: ['grundsicherungsgeld-auszahlung', 'grundsicherungsgeld-2027', 'auszahlungstermine-dezember-2026', 'rente-dezember-2026'],
  sources: ['sgb2-42', 'ba-gs-auszahlung'],
  countdown: { date: jan, label: { de: 'Grundsicherungsgeld für Januar 2027', en: 'Grundsicherungsgeld for January 2027' } },
  de: {
    slug: 'grundsicherungsgeld-dezember-2026', nav: 'Grundsicherungsgeld Dezember', card: 'Am 30. November und an Silvester',
    title: 'Grundsicherungsgeld (früher Bürgergeld) Dezember 2026',
    description: 'Grundsicherungsgeld (früher Bürgergeld) im Dezember 2026: Das Geld für Dezember kommt am 30. November, das Geld für Januar 2027 an Silvester. Mit Rechner.',
    h1: 'Grundsicherungsgeld (früher Bürgergeld) im Dezember 2026',
    intro: 'Monat wählen: Der Rechner zeigt, wann das Geld für diesen Monat kommt. Voreingestellt ist Januar 2027, gezahlt an Silvester.',
    resume: `Rund um den Dezember 2026 gibt es zwei Zahltage, die leicht verwechselt werden. Das Grundsicherungsgeld (früher Bürgergeld) für Dezember wird im Voraus gezahlt und steht nach der Regel der Bundesagentur für Arbeit am letzten Tag des Vormonats bereit: am ${dLong(dez, 'de')}, einem Montag. Im Dezember selbst kommt dann das Geld für Januar 2027, und zwar am ${dLong(jan, 'de')}. Silvester ist ein Donnerstag und ein gewöhnlicher Bankarbeitstag; die Weihnachtstage am 25. und 26. Dezember verschieben die Zahlung nicht, weil sie nicht am Monatsende liegen. Wer im Dezember Geld für Geschenke oder Heizkosten plant, hat also nur die Novemberzahlung zur Verfügung, bis an Silvester das Januargeld eintrifft. Danach folgt das Geld für Februar am ${dLong(feb, 'de')}, weil der 31. Januar 2027 ein Sonntag ist. Eine zusätzliche Zahlung zu Weihnachten gibt es beim Grundsicherungsgeld nicht. Die Daten sind aus § 42 SGB II und dem Hinweis der BA berechnet; die BA weist auf mögliche Verzögerungen auf dem Zahlungsweg hin.`,
    faqs: [
      { q: 'Wann kommt das Grundsicherungsgeld (früher Bürgergeld) für Dezember 2026?', a: `Das Grundsicherungsgeld (früher Bürgergeld) für Dezember kommt am ${dLong(dez, 'de')}, dem letzten Tag vor dem Monat. Es wird im Voraus gezahlt. Der Name hat sich zum 1. Juli 2026 geändert, der Zahlungsrhythmus nicht. Beide Zahlungen liegen damit noch im alten Jahr, die zweite an seinem letzten Tag.` },
      { q: 'Kommt das Januargeld 2027 noch im Dezember?', a: `Ja, am ${dLong(jan, 'de')}. Silvester ist ein Bankarbeitstag, und nach der Regel der Bundesagentur für Arbeit steht das Geld einen Kalendertag vor dem Monat bereit, für den es bestimmt ist. Das Geld muss dann bis zum ${dLong(feb, 'de')} reichen.` },
      { q: 'Gibt es ein Weihnachtsgeld zum Grundsicherungsgeld?', a: 'Nein. Das Grundsicherungsgeld wird monatlich in gleicher Höhe gezahlt, ohne Weihnachtszuschlag. Einmalige Bedarfe wie die Erstausstattung einer Wohnung werden getrennt beantragt und haben nichts mit dem Dezember zu tun. Das Geld für Januar kommt nach unserer Rechnung erst an Silvester, also nach den Feiertagen. Planen Sie die Weihnachtszeit deshalb mit der Zahlung, die Ende November eingegangen ist.' },
    ],
    body: (h) => `<h2>Die Zahltage von November bis Februar</h2>
${h.table([h.T('Geld für', 'Money for'), h.T('Auf dem Konto', 'In your account'), h.T('Tage bis zur nächsten Zahlung', 'Days to the next payment')], [
      [h.T('November 2026', 'November 2026'), h.wday(nov), h.n(K.tageBis(nov, dez))],
      [h.T('Dezember 2026', 'December 2026'), h.wday(dez), h.n(K.tageBis(dez, jan))],
      [h.T('Januar 2027', 'January 2027'), h.wday(jan), h.n(K.tageBis(jan, feb))],
      [h.T('Februar 2027', 'February 2027'), h.wday(feb), h.n(K.tageBis(feb, K.grundsicherung(2027, 3)))],
    ], h.T('Grundsicherungsgeld (früher Bürgergeld) über den Jahreswechsel', 'Grundsicherungsgeld (formerly Bürgergeld) over the new year'), ['l', 'l', 'r'])}
<p>Berechnet nach ${h.src('sgb2-42', '§ 42 SGB II')} und dem Hinweis der ${h.src('ba-gs-auszahlung', 'Bundesagentur für Arbeit')}, dass das Geld einen Kalendertag vor dem Monat bereitsteht. Für November 2026 rückte der Termin auf Freitag, den ${h.dl(nov)}, weil der 31. Oktober ein Samstag war; die BA nennt für diesen Fall keinen eigenen Tag, und wir rechnen mit dem Bankarbeitstag davor.</p>
<h2>Dezember im Haushalt</h2>
<p>Im Dezember treffen bei vielen Haushalten mehrere Zahlungen zusammen. Das Kindergeld kommt je nach Endziffer zwischen dem 3. und dem 16. Dezember, die Rente am ${h.dl(K.renteNach(2026, 12))}. Eine Übersicht aller Termine des Monats bietet ${h.a('auszahlungstermine-dezember-2026', 'Auszahlungstermine Dezember 2026')}. Was für 2027 beim Regelbedarf gilt, steht unter ${h.a('grundsicherungsgeld-2027', 'Grundsicherungsgeld 2027')}; die allgemeine Regel und alle Termine 2026 unter ${h.a('grundsicherungsgeld-auszahlung', 'Grundsicherungsgeld Auszahlung')}.</p>
${h.mini('gs', { p: ['monat'], d: { monat: '2026-12' }, t: 'Geld für Dezember 2026' })}`,
  },
  en: {
    slug: 'grundsicherungsgeld-december-2026', nav: 'Grundsicherungsgeld December', card: "30 November and New Year's Eve",
    title: 'Grundsicherungsgeld (formerly Bürgergeld) December 2026',
    description: "Grundsicherungsgeld (formerly Bürgergeld) in December 2026: December's money arrives on 30 November, January 2027's on New Year's Eve. With a date tool.",
    h1: 'Grundsicherungsgeld (formerly Bürgergeld) in December 2026',
    intro: "Pick a month: the tool shows when the money for that month arrives. It starts on January 2027, paid on New Year's Eve.",
    resume: `Around December 2026 there are two payment days that are easily confused. Grundsicherungsgeld (formerly Bürgergeld) for December is paid in advance and, under the Federal Employment Agency's rule, is available on the last day of the previous month: ${dLong(dez, 'en')}, a Monday. In December itself, the money for January 2027 then arrives, on ${dLong(jan, 'en')}. New Year's Eve is a Thursday and an ordinary bank business day; Christmas on 25 and 26 December does not move the payment because it is not at the month end. If you are budgeting for presents or heating in December, you only have the November payment until January's money arrives on New Year's Eve. February's money then follows on ${dLong(feb, 'en')}, because 31 January 2027 is a Sunday. There is no extra Christmas payment with Grundsicherungsgeld. The dates are calculated from section 42 SGB II and the agency's guidance; the agency points out that delays in the payment chain are possible.`,
    faqs: [
      { q: 'When does Grundsicherungsgeld (formerly Bürgergeld) for December 2026 arrive?', a: `Grundsicherungsgeld (formerly Bürgergeld) for December arrives on ${dLong(dez, 'en')}, the last day before the month. It is paid in advance. The name changed on 1 July 2026; the payment rhythm did not. Both payments therefore fall in the old year, the second on its last day.` },
      { q: 'Does January 2027 money still arrive in December?', a: `Yes, on ${dLong(jan, 'en')}. New Year's Eve is a bank business day, and under the Federal Employment Agency's rule the money is available one calendar day before the month it covers. It then has to last until ${dLong(feb, 'en')}.` },
      { q: 'Is there a Christmas bonus with Grundsicherungsgeld?', a: 'No. Grundsicherungsgeld is paid monthly at the same level, with no Christmas supplement. One-off needs such as initial furnishing of a flat are applied for separately and have nothing to do with December. By our calculation the money for January only arrives on 31 December, after the holidays, so plan Christmas with the payment from late November.' },
    ],
    body: (h) => `<h2>Payment days from November to February</h2>
${h.table([h.T('Geld für', 'Money for'), h.T('Auf dem Konto', 'In your account'), h.T('Tage bis zur nächsten Zahlung', 'Days to the next payment')], [
      [h.T('November 2026', 'November 2026'), h.wday(nov), h.n(K.tageBis(nov, dez))],
      [h.T('Dezember 2026', 'December 2026'), h.wday(dez), h.n(K.tageBis(dez, jan))],
      [h.T('Januar 2027', 'January 2027'), h.wday(jan), h.n(K.tageBis(jan, feb))],
      [h.T('Februar 2027', 'February 2027'), h.wday(feb), h.n(K.tageBis(feb, K.grundsicherung(2027, 3)))],
    ], h.T('Grundsicherungsgeld (früher Bürgergeld) über den Jahreswechsel', 'Grundsicherungsgeld (formerly Bürgergeld) over the new year'), ['l', 'l', 'r'])}
<p>Calculated from ${h.src('sgb2-42', 'section 42 SGB II')} and the ${h.src('ba-gs-auszahlung', 'Federal Employment Agency')} guidance that the money is available one calendar day before the month. For November 2026 the date moved to Friday ${h.dl(nov)}, because 31 October was a Saturday; the agency gives no separate day for this case, and we use the bank business day before.</p>
<h2>December in the household budget</h2>
<p>In December several payments come together in many households. Kindergeld arrives between 3 and 16 December depending on the last digit, the pension on ${h.dl(K.renteNach(2026, 12))}. Every date of the month is on ${h.a('auszahlungstermine-dezember-2026', 'payment dates December 2026')}. What applies to the 2027 standard rate is on ${h.a('grundsicherungsgeld-2027', 'Grundsicherungsgeld 2027')}; the general rule and all 2026 dates on ${h.a('grundsicherungsgeld-auszahlung', 'Grundsicherungsgeld payment dates')}.</p>
${h.mini('gs', { p: ['monat'], d: { monat: '2026-12' }, t: 'Money for December 2026' })}`,
  },
});
