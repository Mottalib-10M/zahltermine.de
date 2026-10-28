/** Rente novembre 2026 : lundi 30 novembre, et ce que reçoivent les deux groupes. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong, dShort } from '../../lib/tool-specs';

const nov = K.renteNach(2026, 11), okt = K.renteNach(2026, 10), dez = K.renteNach(2026, 12);
const abst = K.tageBis(okt, nov);

export default defineGuide({
  id: 'rente-november-2026', group: 'rente', order: 12, tool: 're', toolArg: { monat: '2026-11', beginn: 'nach' },
  related: ['rente-dezember-2026', 'rente-auszahlung-2026', 'kindergeld-november-2026', 'auszahlungstermine-dezember-2026'],
  sources: ['drv-termine', 'sgb6-118', 'sgb6-272a'],
  countdown: { date: nov, label: { de: 'Rente November 2026', en: 'pension November 2026' } },
  de: {
    slug: 'rente-november-2026', nav: 'Rente November 2026', card: 'Montag, 30. November',
    title: 'Rente November 2026: Auszahlung am Montag, 30. November',
    description: 'Rente November 2026: Die Rentenversicherung zahlt am Montag, 30. November 2026. Wer vor April 2004 in Rente ging, erhält an diesem Tag schon die Dezemberrente.',
    h1: 'Rente im November 2026: Zahltag Montag, 30. November',
    intro: 'Rentenbeginn wählen: Der Rechner zeigt, für welchen Monat das Geld am 30. November bestimmt ist, und alle Termine des Jahres.',
    resume: `Die Rente für November 2026 kommt am ${dLong(nov, 'de')}. Der 30. November ist ein Montag und damit ein Bankarbeitstag, die Zahlung muss also nicht vorgezogen werden. Das steht so in der Terminliste, die die Deutsche Rentenversicherung im Januar 2026 veröffentlicht hat, und folgt aus § 118 SGB VI: Renten werden am letzten Bankarbeitstag des Monats ausgezahlt, für den sie bestimmt sind. Ungewöhnlich ist der Abstand zur Oktoberrente. Weil der 31. Oktober 2026 ein Samstag war, kam sie schon am Freitag, dem ${dLong(okt, 'de')}; bis zur Novemberrente vergehen deshalb ${abst} Tage statt der üblichen 30 oder 31. Rentnerinnen und Rentner, deren Rente vor dem 1. April 2004 begann, erhalten am 30. November bereits die Rente für Dezember. Die nächste Zahlung folgt für alle am ${dLong(dez, 'de')}, Silvester. Eine Sonderzahlung oder ein Weihnachtsgeld gibt es zur gesetzlichen Rente weder im November noch im Dezember.`,
    faqs: [
      { q: 'Wann kommt die Rente im November 2026?', a: `Am ${dLong(nov, 'de')}. Der Monatsletzte ist ein Montag und Bankarbeitstag, deshalb gibt es keine Verschiebung. Die Gutschrift erfolgt im Laufe des Tages; manche Banken zeigen sie schon am Morgen, andere erst gegen Abend in der App an. Für Fragen zur Gutschrift ist Ihre Bank zuständig.` },
      { q: 'Warum liegt zwischen Oktober- und Novemberrente mehr als ein Monat?', a: `Weil die Oktoberrente vorgezogen war. Der 31. Oktober 2026 fiel auf einen Samstag, die Rente kam deshalb am ${dLong(okt, 'de')}. Bis zum ${dShort(nov, 'de')} sind es ${abst} Tage. Das Geld muss also etwas länger reichen als in einem gewöhnlichen Monat.` },
      { q: 'Ist das Geld am 30. November für November oder für Dezember?', a: 'Das hängt vom Rentenbeginn ab. Begann Ihre Rente am 1. April 2004 oder später, ist es die Novemberrente, nachträglich gezahlt. Begann sie vorher, ist es die Dezemberrente, im Voraus gezahlt. Welche Regel für Sie gilt, steht im Rentenbescheid. Auf dem Kontoauszug steht der Zeitraum, für den gezahlt wird.' },
    ],
    body: (h) => `<h2>November 2026 für beide Gruppen</h2>
${h.table([h.T('Rentenbeginn', 'Pension start'), h.T('Am 30. November kommt', 'Arriving on 30 November'), h.T('Rechtsgrundlage', 'Legal basis')], [
      [h.T('ab 1. April 2004', '1 April 2004 or later'), h.T('Rente für November', 'pension for November'), h.src('sgb6-118', '§ 118 SGB VI')],
      [h.T('vor 1. April 2004', 'before 1 April 2004'), h.T('Rente für Dezember', 'pension for December'), h.src('sgb6-272a', '§ 272a SGB VI')],
    ], h.T('Rente November 2026: ein Zahltag, zwei Monate', 'Pension November 2026: one payment day, two months'), ['l', 'l', 'l'])}
<p>Den Termin bestätigt die ${h.src('drv-termine', 'Liste der Rentenversicherung für 2026')}. Wer im November andere Leistungen erwartet: Das Kindergeld kommt je nach Endziffer zwischen dem 4. und 20. November (${h.a('kindergeld-november-2026', 'Kindergeld November 2026')}), das Grundsicherungsgeld für Dezember ebenfalls am ${h.ds(K.grundsicherung(2026, 12))}.</p>
<h2>Wie lange das Geld reichen muss</h2>
<p>Ein Blick auf die Abstände zwischen den Zahlungen hilft beim Planen von Lastschriften. Zwischen Oktober- und Novemberrente liegen ${h.n(abst)} Tage, zwischen November- und Dezemberrente ${h.n(K.tageBis(nov, dez))} Tage. Der Grund für den längeren Oktober-November-Abstand ist allein das Wochenende am 31. Oktober. Alle Termine 2026 stehen unter ${h.a('rente-auszahlung-2026', 'Rente Termine 2026')}; was im Dezember kommt, unter ${h.a('rente-dezember-2026', 'Rente Dezember 2026')}.</p>
${h.mini('re', { p: ['beginn'], d: { monat: '2026-12' }, t: 'Und die Dezemberrente?' })}`,
  },
  en: {
    slug: 'pension-november-2026', nav: 'Pension November 2026', card: 'Monday 30 November',
    title: 'Pension November 2026 in Germany: paid on Monday 30 November',
    description: 'German pension November 2026: the pension insurance pays on Monday 30 November 2026. If you retired before April 2004, that day brings your December pension.',
    h1: 'German pension in November 2026: payment day Monday 30 November',
    intro: 'Pick your pension start: the tool shows which month the money on 30 November is for, plus every date of the year.',
    resume: `The German state pension for November 2026 arrives on ${dLong(nov, 'en')}. 30 November is a Monday and therefore a bank business day, so the payment does not need to be brought forward. That is what the list published by the Deutsche Rentenversicherung in January 2026 says, and it follows from section 118 of Social Code Book VI: pensions are paid on the last bank business day of the month they are for. What is unusual is the gap to October's pension. Because 31 October 2026 was a Saturday, it came on Friday ${dLong(okt, 'en')}, so ${abst} days pass until November's pension instead of the usual 30 or 31. Pensioners whose pension began before 1 April 2004 already receive their December pension on 30 November. The next payment follows for everyone on ${dLong(dez, 'en')}, New Year's Eve. The statutory pension pays no special payment or Christmas bonus in November or December.`,
    faqs: [
      { q: 'When does the German pension arrive in November 2026?', a: `On ${dLong(nov, 'en')}. The last day of the month is a Monday and a bank business day, so nothing moves. The credit is made during the day; some banks show it in the morning, others only towards the evening in the app.` },
      { q: 'Why is there more than a month between the October and November pensions?', a: `Because October's pension was brought forward. 31 October 2026 fell on a Saturday, so the pension came on ${dLong(okt, 'en')}. From then to ${dShort(nov, 'en')} is ${abst} days, so the money has to last a little longer than in an ordinary month.` },
      { q: 'Is the money on 30 November for November or December?', a: 'That depends on when your pension started. If it began on or after 1 April 2004, it is November\'s pension, paid in arrears. If it began earlier, it is December\'s, paid in advance. Your award notice says which rule applies to you.' },
    ],
    body: (h) => `<h2>November 2026 for both groups</h2>
${h.table([h.T('Rentenbeginn', 'Pension start'), h.T('Am 30. November kommt', 'Arriving on 30 November'), h.T('Rechtsgrundlage', 'Legal basis')], [
      [h.T('ab 1. April 2004', '1 April 2004 or later'), h.T('Rente für November', 'pension for November'), h.src('sgb6-118', '§ 118 SGB VI')],
      [h.T('vor 1. April 2004', 'before 1 April 2004'), h.T('Rente für Dezember', 'pension for December'), h.src('sgb6-272a', '§ 272a SGB VI')],
    ], h.T('Rente November 2026: ein Zahltag, zwei Monate', 'Pension November 2026: one payment day, two months'), ['l', 'l', 'l'])}
<p>The ${h.src('drv-termine', 'pension insurance list for 2026')} confirms the date. If you expect other benefits in November: Kindergeld arrives between 4 and 20 November depending on the last digit (${h.a('kindergeld-november-2026', 'Kindergeld November 2026')}), and Grundsicherungsgeld for December also on ${h.ds(K.grundsicherung(2026, 12))}.</p>
<h2>How long the money has to last</h2>
<p>Looking at the gaps between payments helps when planning direct debits. ${h.n(abst)} days separate the October and November pensions, ${h.n(K.tageBis(nov, dez))} days the November and December pensions. The longer October to November gap is caused solely by the weekend on 31 October. Every 2026 date is on ${h.a('rente-auszahlung-2026', 'pension dates 2026')}; what comes in December is on ${h.a('rente-dezember-2026', 'pension December 2026')}.</p>
${h.mini('re', { p: ['beginn'], d: { monat: '2026-12' }, t: 'And the December pension?' })}`,
  },
});
