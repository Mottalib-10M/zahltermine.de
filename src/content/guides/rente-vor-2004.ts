/** Rente vor April 2004 : versement anticipé (§ 272a SGB VI), y compris pensions de survivant enchaînées. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong } from '../../lib/tool-specs';

const jan27vor = K.renteVor(2027, 1);

export default defineGuide({
  id: 'rente-vor-2004', group: 'rente', order: 16, tool: 're', toolArg: { monat: '2027-01', beginn: 'vor' },
  related: ['rente-auszahlung-2026', 'rente-auszahlung-2027', 'erste-rentenzahlung', 'rente-dezember-2026'],
  sources: ['sgb6-272a', 'sgb6-118', 'drv-termine'],
  de: {
    slug: 'rente-vor-2004-vorschuessig', nav: 'Rente vor 2004', card: 'Zahlung im Voraus, auch bei Witwenrente',
    title: 'Rente vor 2004: vorschüssige Zahlung, Termine 2026 und 2027',
    description: 'Rente mit Beginn vor April 2004: Sie wird im Voraus am letzten Bankarbeitstag des Vormonats gezahlt (§ 272a SGB VI). Termine 2026 und 2027, Witwenrenten.',
    h1: 'Rente mit Beginn vor April 2004: Zahlung im Voraus',
    intro: 'Monat wählen: Der Rechner zeigt, an welchem Tag die vorschüssige Rente für diesen Monat kommt, und die Termine des ganzen Jahres.',
    resume: `Renten, die vor dem 1. April 2004 begonnen haben, werden bis heute im Voraus gezahlt. § 272a SGB VI bestimmt, dass sie zu Beginn des Monats fällig werden und am letzten Bankarbeitstag des Vormonats ausgezahlt werden. Die Rente für Januar 2027 kommt deshalb am ${dLong(jan27vor, 'de')}, die für Februar 2027 am ${dLong(K.renteVor(2027, 2), 'de')}. Für alle späteren Renten gilt seit dem 1. April 2004 § 118 SGB VI: Zahlung am Ende des Monats, für den die Rente bestimmt ist. Auf dem Kontoauszug sehen beide Gruppen ihr Geld am selben Kalendertag, nur der Monat dahinter ist verschieden. Der alte Rhythmus bleibt nach Absatz 2 auch erhalten, wenn sich ohne Unterbrechung eine neue Rente anschließt, etwa eine Regelaltersrente an eine Erwerbsminderungsrente oder eine Witwen- oder Witwerrente an die Rente der verstorbenen Person, sofern deren erstmaliger Rentenbeginn vor April 2004 lag. Welche Regel für Sie gilt, steht im Rentenbescheid.`,
    faqs: [
      { q: 'Woran erkenne ich, ob meine Rente vorschüssig gezahlt wird?', a: 'Am Rentenbeginn im Bescheid: Liegt er vor dem 1. April 2004, wird die Rente im Voraus gezahlt. Auch der Kontoauszug hilft: Steht bei der Zahlung Ende November als Zeitraum der Dezember, ist Ihre Rente vorschüssig. Bei einer Hinterbliebenenrente zählt unter Umständen der Rentenbeginn der verstorbenen Person.' },
      { q: 'Bekomme ich als Witwe den alten Zahltag?', a: 'Ja, wenn sich Ihre Witwenrente ohne Unterbrechung an die Rente Ihres verstorbenen Partners anschließt und dessen erstmaliger Rentenbeginn vor dem 1. April 2004 lag. Dann gilt nach § 272a Absatz 2 SGB VI weiter die Zahlung im Voraus. Nach einer Unterbrechung gilt der neue Rentenbeginn und damit die Zahlung am Monatsende.' },
      { q: 'Bekomme ich durch die Vorauszahlung mehr Geld?', a: 'Nein. Der Betrag ist derselbe, nur der Zeitpunkt ist einen Monat früher. Beim Wechsel einer Rentenart oder beim Tod kann es deshalb zu Rückforderungen kommen: Eine im Voraus gezahlte Rente für einen Monat, in dem kein Anspruch mehr besteht, fordert der Renten Service zurück.' },
    ],
    body: (h) => `<h2>Vorschüssige Termine 2026 und 2027</h2>
${h.table([h.T('Rente für', 'Pension for'), h.T('Zahltag 2026', 'Paid 2026'), h.T('Zahltag 2027', 'Paid 2027')], Array.from({ length: 12 }, (_, i) => [h.T(['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'][i], ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][i]), h.wday(K.renteVor(2026, i + 1)), h.wday(K.renteVor(2027, i + 1))]), h.T('Renten mit Beginn vor dem 1. April 2004: Zahltag je Monat', 'Pensions started before 1 April 2004: payment day per month'), ['l', 'l', 'l'])}
<p>Rechtsgrundlage ist ${h.src('sgb6-272a', '§ 272a SGB VI')}; die Tage entsprechen den Monatsend-Terminen der ${h.src('drv-termine', 'Rentenversicherung')} jeweils einen Monat früher.</p>
<h2>Warum es zwei Rhythmen gibt</h2>
<p>Bis März 2004 wurden alle Renten im Voraus gezahlt, fällig zum Monatsbeginn. Seit dem 1. April 2004 werden neue Renten nach ${h.src('sgb6-118', '§ 118 SGB VI')} erst am Monatsende gezahlt. Für Menschen, die damals schon Rente bezogen, blieb der alte Rhythmus erhalten. Wer heute neu in Rente geht, erhält die erste Zahlung deshalb am Ende des ersten Rentenmonats (${h.a('erste-rentenzahlung', 'erste Rentenzahlung')}).</p>
<h2>Jahreswechsel und Juli</h2>
<p>Zwei Termine sind für diese Gruppe besonders: Die Januarrente kommt an Silvester (${h.a('rente-dezember-2026', 'Rente Dezember 2026')}), und die erste erhöhte Rente nach der Anpassung zum 1. Juli kommt schon Ende Juni. Alle anderen Daten zeigen ${h.a('rente-auszahlung-2026', 'Rente 2026')} und ${h.a('rente-auszahlung-2027', 'Rente 2027')} in der zweiten Spalte.</p>
${h.mini('re', { p: ['monat'], d: { beginn: 'vor', monat: '2027-07' }, t: 'Vorschüssige Rente Juli 2027' })}`,
  },
  en: {
    slug: 'pension-before-2004-paid-in-advance', nav: 'Pension before 2004', card: "Paid in advance, survivors' pensions too",
    title: 'Pension before 2004 in Germany: paid in advance, dates',
    description: "German pensions that started before April 2004 are paid in advance on the last bank business day of the month before (section 272a SGB VI). Dates 2026, 2027.",
    h1: 'German pensions started before April 2004: paid in advance',
    intro: 'Pick a month: the tool shows the day on which the pension paid in advance arrives for that month, plus the dates for the whole year.',
    resume: `German pensions that began before 1 April 2004 are still paid in advance. Section 272a of Social Code Book VI says they fall due at the start of the month and are paid on the last bank business day of the month before. The pension for January 2027 therefore arrives on ${dLong(jan27vor, 'en')}, the one for February 2027 on ${dLong(K.renteVor(2027, 2), 'en')}. All later pensions have fallen under section 118 since 1 April 2004: payment at the end of the month the pension is for. On the bank statement both groups see their money on the same calendar day; only the month behind it differs. Under subsection 2, the old rhythm also continues when a new pension follows without a break, such as a standard old-age pension after a reduced earning capacity pension, or a widow's or widower's pension after the deceased partner's pension, provided that pension first began before April 2004. Your award notice tells you which rule applies to you.`,
    faqs: [
      { q: 'How do I know whether my pension is paid in advance?', a: 'From the start date in your award notice: if it is before 1 April 2004, the pension is paid in advance. Your bank statement helps too: if the payment at the end of November names December as the period, your pension is paid in advance. For a survivor\'s pension, the deceased person\'s start date may be what counts.' },
      { q: 'As a widow, do I keep the old payment day?', a: 'Yes, if your widow\'s pension follows your late partner\'s pension without a break and that pension first began before 1 April 2004. Payment in advance then continues under section 272a(2) SGB VI. After a break, the new pension start applies, and with it payment at the end of the month.' },
      { q: 'Do I get more money because it is paid in advance?', a: 'No. The amount is the same; only the timing is a month earlier. That is why a change of pension type or a death can lead to repayment claims: a pension paid in advance for a month in which there is no longer any entitlement is reclaimed by the pension service.' },
    ],
    body: (h) => `<h2>Advance payment dates 2026 and 2027</h2>
${h.table([h.T('Rente für', 'Pension for'), h.T('Zahltag 2026', 'Paid 2026'), h.T('Zahltag 2027', 'Paid 2027')], Array.from({ length: 12 }, (_, i) => [h.T(['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'][i], ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][i]), h.wday(K.renteVor(2026, i + 1)), h.wday(K.renteVor(2027, i + 1))]), h.T('Renten mit Beginn vor dem 1. April 2004: Zahltag je Monat', 'Pensions started before 1 April 2004: payment day per month'), ['l', 'l', 'l'])}
<p>The legal basis is ${h.src('sgb6-272a', 'section 272a SGB VI')}; the days match the ${h.src('drv-termine', 'pension insurance')} month-end dates, one month earlier.</p>
<h2>Why there are two rhythms</h2>
<p>Until March 2004 every pension was paid in advance, falling due at the start of the month. Since 1 April 2004, new pensions have been paid only at the end of the month under ${h.src('sgb6-118', 'section 118 SGB VI')}. People already drawing a pension then kept the old rhythm. If you retire today, your first payment therefore arrives at the end of your first pension month (${h.a('erste-rentenzahlung', 'first pension payment')}).</p>
<h2>New year and July</h2>
<p>Two dates stand out for this group: the January pension arrives on New Year's Eve (${h.a('rente-dezember-2026', 'pension December 2026')}), and the first higher pension after the 1 July adjustment already arrives at the end of June. Every other date is in the second column of ${h.a('rente-auszahlung-2026', 'pension 2026')} and ${h.a('rente-auszahlung-2027', 'pension 2027')}.</p>
${h.mini('re', { p: ['monat'], d: { beginn: 'vor', monat: '2027-07' }, t: 'Pension paid in advance, July 2027' })}`,
  },
});
