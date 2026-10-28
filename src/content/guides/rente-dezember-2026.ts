/** Rente décembre 2026 : jeudi 31 décembre (Silvester = Bankarbeitstag), passage à 2027. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong } from '../../lib/tool-specs';

const dez = K.renteNach(2026, 12), nov = K.renteNach(2026, 11), jan = K.renteNach(2027, 1), feb = K.renteNach(2027, 2);

export default defineGuide({
  id: 'rente-dezember-2026', group: 'rente', order: 13, tool: 're', toolArg: { monat: '2026-12', beginn: 'nach' },
  related: ['weihnachtsgeld-rente', 'rente-november-2026', 'rente-auszahlung-2027', 'auszahlungstermine-dezember-2026'],
  sources: ['drv-termine', 'sgb6-118', 'sgb6-272a', 'ecb-target'],
  countdown: { date: dez, label: { de: 'Rente Dezember 2026', en: 'pension December 2026' } },
  de: {
    slug: 'rente-dezember-2026', nav: 'Rente Dezember 2026', card: 'Silvester, Donnerstag 31. Dezember',
    title: 'Rente Dezember 2026: Auszahlung an Silvester, 31. Dezember',
    description: 'Rente Dezember 2026: Zahltag ist Donnerstag, 31. Dezember, denn Silvester ist ein Bankarbeitstag. Wer vor 2004 in Rente ging, bekommt dann die Januarrente.',
    h1: 'Rente im Dezember 2026: Zahltag an Silvester',
    intro: 'Rentenbeginn wählen: Der Rechner zeigt, welche Rente am 31. Dezember kommt, und die Termine Januar und Februar 2027.',
    resume: `Die Rente für Dezember 2026 wird am ${dLong(dez, 'de')} gutgeschrieben. Viele erwarten sie vor Weihnachten, doch der Zahltag ist gesetzlich der letzte Bankarbeitstag des Monats, und Silvester gehört dazu: Der 31. Dezember ist kein Feiertag, und das europäische Zahlungssystem TARGET ist nur am 25. und 26. Dezember geschlossen. Die Rentenversicherung hat den Termin entsprechend in ihre Liste für 2026 aufgenommen. Wer seine Rente vor dem 1. April 2004 begonnen hat, erhält an Silvester bereits die Rente für Januar 2027, die Dezemberrente kam bei dieser Gruppe am ${dLong(nov, 'de')}. Danach geht es für alle mit dem ${dLong(jan, 'de')} weiter, denn der 31. Januar 2027 ist ein Sonntag, und dem ${dLong(feb, 'de')}. Zwischen Dezember- und Januarrente liegen damit ${K.tageBis(dez, jan)} Tage. Eine Weihnachtszahlung zur gesetzlichen Rente gibt es nicht; mehr dazu auf der Seite Weihnachtsgeld Rente.`,
    faqs: [
      { q: 'Wird die Rente im Dezember 2026 vor Weihnachten gezahlt?', a: `Nein. Die Rente kommt am ${dLong(dez, 'de')}, dem letzten Bankarbeitstag des Monats. Heiligabend und die Weihnachtstage ändern daran nichts, weil der Monatsletzte selbst ein Bankarbeitstag ist. Nur Renten mit Beginn vor April 2004 kommen faktisch „früher“: deren Dezemberrente kam schon Ende November.` },
      { q: 'Wann kommt die Januarrente 2027?', a: `Für Renten mit Beginn ab April 2004 am ${dLong(jan, 'de')}, weil der 31. Januar ein Sonntag ist. Für Renten mit Beginn vor April 2004 kommt sie schon am ${dLong(dez, 'de')}, zusammen mit dem Jahreswechsel. Den Countdown bis zum nächsten Termin zeigt der Rechner.` },
      { q: 'Ist Silvester ein Bankarbeitstag?', a: 'Ja. Der 31. Dezember ist in Deutschland kein gesetzlicher Feiertag, und das Zahlungssystem TARGET der Zentralbanken arbeitet an diesem Tag. Viele Filialen schließen früher, Überweisungen werden aber gebucht. Deshalb zahlt die Rentenversicherung an Silvester, wenn es auf einen Werktag fällt.' },
    ],
    body: (h) => `<h2>Dezember 2026 bis Februar 2027</h2>
${h.table([h.T('Zahltag', 'Payment day'), h.T('Beginn ab 04/2004: Rente für', 'Started 04/2004 or later: pension for'), h.T('Beginn vor 04/2004: Rente für', 'Started before 04/2004: pension for')], [
      [h.wday(nov), h.T('November 2026', 'November 2026'), h.T('Dezember 2026', 'December 2026')],
      [h.wday(dez), h.T('Dezember 2026', 'December 2026'), h.T('Januar 2027', 'January 2027')],
      [h.wday(jan), h.T('Januar 2027', 'January 2027'), h.T('Februar 2027', 'February 2027')],
      [h.wday(feb), h.T('Februar 2027', 'February 2027'), h.T('März 2027', 'March 2027')],
    ], h.T('Rentenzahlungen über den Jahreswechsel', 'Pension payments over the new year'), ['l', 'l', 'l'])}
<p>Termin 2026 nach der ${h.src('drv-termine', 'Liste der Rentenversicherung')}, Termine 2027 berechnet nach ${h.src('sgb6-118', '§ 118 SGB VI')} und ${h.src('sgb6-272a', '§ 272a SGB VI')}.</p>
<h2>Warum nicht vor Weihnachten</h2>
<p>Anders als manche Arbeitgeber zieht die Rentenversicherung den Zahltag nicht wegen der Feiertage vor. Sie zahlt am letzten Bankarbeitstag, und nur ein Wochenende oder ein bundesweiter Feiertag am Monatsende verschiebt ihn. Der 25. und 26. Dezember sind ${h.src('ecb-target', 'TARGET-Schließtage')}, aber 2026 folgen danach noch vier Bankarbeitstage, Montag bis Donnerstag, bis einschließlich Silvester. Wer Weihnachtsausgaben plant, rechnet daher mit der Novemberrente. Warum es kein Weihnachtsgeld gibt, erklärt ${h.a('weihnachtsgeld-rente', 'Weihnachtsgeld Rente')}; alle Zahltage des Monats zeigt ${h.a('auszahlungstermine-dezember-2026', 'Auszahlungstermine Dezember 2026')}.</p>
${h.mini('re', { p: ['beginn', 'monat'], d: { monat: '2027-01' }, t: 'Rente Januar 2027' })}`,
  },
  en: {
    slug: 'pension-december-2026', nav: 'Pension December 2026', card: "New Year's Eve, Thursday 31 December",
    title: "Pension December 2026 in Germany: paid on New Year's Eve",
    description: "German pension December 2026: payment day is Thursday 31 December, as New Year's Eve is a bank business day. Pre-2004 pensioners then get their January pension.",
    h1: "German pension in December 2026: paid on New Year's Eve",
    intro: 'Pick your pension start: the tool shows which pension arrives on 31 December, and the January and February 2027 dates.',
    resume: `The German state pension for December 2026 is credited on ${dLong(dez, 'en')}. Many expect it before Christmas, but the statutory payment day is the last bank business day of the month, and New Year's Eve is one: 31 December is not a public holiday, and the European TARGET payment system only closes on 25 and 26 December. The pension insurance has the date on its 2026 list accordingly. If your pension started before 1 April 2004, New Year's Eve already brings your January 2027 pension; your December pension came on ${dLong(nov, 'en')}. After that, everyone continues with ${dLong(jan, 'en')}, because 31 January 2027 is a Sunday, and ${dLong(feb, 'en')}. That leaves ${K.tageBis(dez, jan)} days between the December and January pensions. There is no Christmas payment with the statutory pension; more on the Christmas bonus pension page.`,
    faqs: [
      { q: 'Is the German pension paid before Christmas in December 2026?', a: `No. It arrives on ${dLong(dez, 'en')}, the last bank business day of the month. Christmas Eve and the Christmas holidays change nothing, because the last day of the month is itself a bank business day. Only pensions that began before April 2004 effectively come "earlier": their December pension already arrived at the end of November.` },
      { q: 'When does the January 2027 pension arrive?', a: `For pensions started in April 2004 or later, on ${dLong(jan, 'en')}, because 31 January is a Sunday. For pensions started before April 2004 it already arrives on ${dLong(dez, 'en')}, at the turn of the year. The tool shows a countdown to the next date.` },
      { q: "Is New Year's Eve a bank business day in Germany?", a: 'Yes. 31 December is not a statutory holiday in Germany, and the central banks\' TARGET payment system operates that day. Many branches close early, but transfers are posted. That is why the pension insurance pays on New Year\'s Eve when it falls on a weekday.' },
    ],
    body: (h) => `<h2>December 2026 to February 2027</h2>
${h.table([h.T('Zahltag', 'Payment day'), h.T('Beginn ab 04/2004: Rente für', 'Started 04/2004 or later: pension for'), h.T('Beginn vor 04/2004: Rente für', 'Started before 04/2004: pension for')], [
      [h.wday(nov), h.T('November 2026', 'November 2026'), h.T('Dezember 2026', 'December 2026')],
      [h.wday(dez), h.T('Dezember 2026', 'December 2026'), h.T('Januar 2027', 'January 2027')],
      [h.wday(jan), h.T('Januar 2027', 'January 2027'), h.T('Februar 2027', 'February 2027')],
      [h.wday(feb), h.T('Februar 2027', 'February 2027'), h.T('März 2027', 'March 2027')],
    ], h.T('Rentenzahlungen über den Jahreswechsel', 'Pension payments over the new year'), ['l', 'l', 'l'])}
<p>The 2026 date follows the ${h.src('drv-termine', 'pension insurance list')}; the 2027 dates are calculated under ${h.src('sgb6-118', 'section 118 SGB VI')} and ${h.src('sgb6-272a', 'section 272a SGB VI')}.</p>
<h2>Why not before Christmas</h2>
<p>Unlike some employers, the pension insurance does not bring the payment day forward for the holidays. It pays on the last bank business day, and only a weekend or a nationwide holiday at the month end moves it. 25 and 26 December are ${h.src('ecb-target', 'TARGET closing days')}, but in 2026 four bank business days still follow, Monday to Thursday, up to and including New Year's Eve. If you are planning Christmas spending, count on the November pension. Why there is no Christmas bonus is explained on ${h.a('weihnachtsgeld-rente', 'Christmas bonus and pension')}; every payment day of the month is on ${h.a('auszahlungstermine-dezember-2026', 'payment dates December 2026')}.</p>
${h.mini('re', { p: ['beginn', 'monat'], d: { monat: '2027-01' }, t: 'Pension January 2027' })}`,
  },
});
