/** Décembre 2026 : tous les paiements du mois triés par date (Noël, Silvester, fin d'année). */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong, dShort } from '../../lib/tool-specs';

const kg0 = K.kindergeld(2026, 12, 0)!, kg9 = K.kindergeld(2026, 12, 9)!;
const silvester = K.renteNach(2026, 12);
const algNov = K.alg(2026, 11), algDez = K.alg(2026, 12);
const NAMEN: Record<string, { de: string; en: string }> = {
  kindergeld: { de: 'Kindergeld Dezember', en: 'Kindergeld December' },
  rente: { de: 'Rente Dezember (Beginn ab 04/2004)', en: 'Pension December (started 04/2004 or later)' },
  rentevor: { de: 'Rente Januar 2027 (Beginn vor 04/2004)', en: 'Pension January 2027 (started before 04/2004)' },
  grundsicherung: { de: 'Grundsicherungsgeld Januar 2027', en: 'Grundsicherungsgeld January 2027' },
  alg: { de: 'Arbeitslosengeld November', en: 'Unemployment benefit November' },
  wohngeld: { de: 'Wohngeld, BAföG Dezember (erster Bankarbeitstag)', en: 'Housing benefit, BAföG December (first bank business day)' },
};
const DEZ = K.zahlungenImZeitraum({ leistungen: ['kindergeld', 'rente', 'rentevor', 'grundsicherung', 'alg', 'wohngeld'], endziffer: 0 }, '2026-12-01', '2026-12-31');
const amSilvester = DEZ.filter((z) => z.date === silvester).length;

export default defineGuide({
  id: 'auszahlungstermine-dezember-2026', group: 'kalender', order: 31, tool: 'mo', toolArg: { monat: '2026-12', endziffer: 0 },
  related: ['kindergeld-dezember-2026', 'rente-dezember-2026', 'grundsicherungsgeld-dezember-2026', 'weihnachtsgeld-rente'],
  sources: ['ba-kg-termine', 'drv-termine', 'sgb2-42', 'sgb3-337', 'ecb-target'],
  countdown: { date: silvester, label: { de: 'Rente und Grundsicherungsgeld an Silvester', en: "Pension and Grundsicherungsgeld on New Year's Eve" } },
  de: {
    slug: 'auszahlungstermine-dezember-2026', nav: 'Termine Dezember 2026', card: 'Weihnachten, Silvester, Jahreswechsel',
    title: 'Auszahlungstermine Dezember 2026: alle Zahltage im Monat',
    description: 'Auszahlungstermine Dezember 2026: Kindergeld, Rente, Grundsicherungsgeld, Arbeitslosengeld und Wohngeld nach Datum, mit Weihnachten und Silvester 2026.',
    h1: 'Dezember 2026: wann welches Geld kommt',
    intro: 'Endziffer wählen: Der Rechner sortiert alle Zahltage im Dezember 2026 nach Datum. Für einen anderen Monat einfach den Monat wechseln.',
    resume: `Der Dezember 2026 beginnt und endet mit Zahltagen. Am ${dLong(algNov, 'de')} ist das Arbeitslosengeld für November verfügbar, und am selben Tag beginnt der Monat, für den Wohngeld und BAföG im Voraus gezahlt werden. Das Kindergeld kommt je nach Endziffer zwischen dem ${dLong(kg0, 'de')} und dem ${dLong(kg9, 'de')}, also lange vor Weihnachten. Der 25. Dezember ist ein Freitag und bankfrei, der 26. ein Samstag; der Heiligabend und Silvester sind dagegen Bankarbeitstage. Silvester, der ${dLong(silvester, 'de')}, ist der wichtigste Tag des Monats: Die Rente für Dezember kommt, Renten mit Beginn vor April 2004 erhalten bereits das Geld für Januar, und auch das Grundsicherungsgeld (früher Bürgergeld) für Januar 2027 soll an diesem Tag auf dem Konto sein. Nach unserer Rechnung fallen damit ${amSilvester} Zahlungen auf den letzten Tag des Jahres. Arbeitslosengeld für Dezember gibt es erst am ${dLong(algDez, 'de')}, nach Neujahr und dem ersten Wochenende 2027.`,
    faqs: [
      { q: 'Kommt das Geld im Dezember 2026 vor Weihnachten?', a: `Das Kindergeld ja, für alle Endziffern bis spätestens ${dLong(kg9, 'de')}. Rente und Grundsicherungsgeld für Januar kommen dagegen nicht vorgezogen vor Weihnachten, sondern regulär am ${dLong(silvester, 'de')}, weil Silvester ein Donnerstag und ein Bankarbeitstag ist. Wer knapp rechnet, plant die Feiertage also mit dem Kindergeld und der Novemberrente.` },
      { q: 'Ist Heiligabend ein Bankarbeitstag?', a: 'Ja. Der 24. Dezember ist kein gesetzlicher Feiertag und kein Schließtag des europäischen Zahlungssystems TARGET, Überweisungen werden also gebucht. Viele Filialen schließen mittags, auf die Gutschrift auf dem Konto hat das keinen Einfluss. Dasselbe gilt für Silvester. Gutschriften, die für diese Tage geplant sind, kommen pünktlich.' },
      { q: 'Wann kommt das Arbeitslosengeld für Dezember?', a: `Am ${dLong(algDez, 'de')}. Arbeitslosengeld wird nachträglich gezahlt und ist am ersten Arbeitstag des Folgemonats verfügbar. Der 1. Januar ist Neujahr, danach folgen Samstag und Sonntag, deshalb verschiebt sich der Termin auf den Montag. Die Agentur überweist das Geld einige Tage vorher, gutgeschrieben wird es nach dem Jahreswechsel.` },
    ],
    body: (h) => `<h2>Alle Zahltage im Dezember 2026</h2>
<p>Die Liste ordnet die Zahlungen nach dem Tag der Gutschrift, für Kindergeld am Beispiel der Endziffer 0. Die Kindergeld-Termine stammen aus der ${h.src('ba-kg-termine', 'Liste der Familienkasse')}, die Renten-Termine aus der ${h.src('drv-termine', 'Liste der Rentenversicherung')}; die übrigen sind nach ${h.src('sgb2-42', '§ 42 SGB II')} und ${h.src('sgb3-337', '§ 337 SGB III')} berechnet.</p>
${h.table([h.T('Datum', 'Date'), h.T('Zahlung', 'Payment')], DEZ.map((z) => [dShort(z.date, h.lang), NAMEN[z.leistung][h.lang]]), h.T('Dezember 2026: Zahlungen nach Datum (Kindergeld: Endziffer 0)', 'December 2026: payments by date (Kindergeld: last digit 0)'), ['l', 'l'])}
<h2>Kindergeld nach Endziffer</h2>
<p>Das Kindergeld verteilt sich im Dezember auf die erste Monatshälfte, vom ${h.dl(kg0)} für Endziffer 0 bis zum ${h.dl(kg9)} für Endziffer 9. Alle zehn Tage stehen unter ${h.a('kindergeld-dezember-2026', 'Kindergeld Dezember 2026')}.</p>
<h2>Rente und Grundsicherungsgeld an Silvester</h2>
<p>Die Dezemberrente kommt am letzten Bankarbeitstag des Monats, und das ist 2026 Silvester selbst. Ein Weihnachtsgeld zahlt die gesetzliche Rentenversicherung nicht; was es damit auf sich hat, erklärt ${h.a('weihnachtsgeld-rente', 'Weihnachtsgeld Rente')}. Einzelheiten zu beiden Leistungen: ${h.a('rente-dezember-2026', 'Rente Dezember 2026')} und ${h.a('grundsicherungsgeld-dezember-2026', 'Grundsicherungsgeld Dezember 2026')}. Bankfrei sind nur die beiden Weihnachtstage, wie bei allen ${h.src('ecb-target', 'TARGET-Schließtagen')}.</p>
${h.mini('mo', { p: ['endziffer'], d: { monat: '2026-12', endziffer: 7 }, t: 'Dezember 2026 mit Ihrer Endziffer' })}`,
  },
  en: {
    slug: 'payment-dates-december-2026', nav: 'Dates December 2026', card: 'Christmas, New Year’s Eve, turn of the year',
    title: 'Payment dates December 2026 for German benefits, all in one',
    description: 'German benefit payment dates December 2026: Kindergeld, pension, Grundsicherungsgeld, unemployment and housing benefit by date, Christmas and New Year.',
    h1: 'December 2026: which money arrives when',
    intro: 'Pick your last digit: the tool sorts every payment day in December 2026 by date. Switch the month to see another one.',
    resume: `December 2026 starts and ends with payment days. On ${dLong(algNov, 'en')} unemployment benefit for November becomes available, and the same day starts the month for which housing benefit and BAföG are paid in advance. Kindergeld arrives between ${dLong(kg0, 'en')} and ${dLong(kg9, 'en')} depending on the last digit, well before Christmas. 25 December is a Friday and a bank holiday, the 26th a Saturday; Christmas Eve and New Year's Eve, by contrast, are bank business days. New Year's Eve, ${dLong(silvester, 'en')}, is the key day of the month: the December pension arrives, pensions that started before April 2004 already receive the money for January, and Grundsicherungsgeld (formerly Bürgergeld) for January 2027 is also due in the account that day. By our calculation, ${amSilvester} payments therefore fall on the last day of the year. Unemployment benefit for December only comes on ${dLong(algDez, 'en')}, after New Year and the first weekend of 2027.`,
    faqs: [
      { q: 'Does the money arrive before Christmas in December 2026?', a: `Kindergeld does, for every last digit by ${dLong(kg9, 'en')} at the latest. Pension and Grundsicherungsgeld for January are not brought forward to before Christmas, however; they arrive as normal on ${dLong(silvester, 'en')}, because New Year's Eve is a Thursday and a bank business day.` },
      { q: 'Is Christmas Eve a bank business day?', a: 'Yes. 24 December is neither a public holiday nor a closing day of the European TARGET payment system, so transfers are booked. Many branches close at midday, but that has no effect on the credit to your account. The same applies to New Year’s Eve.' },
      { q: 'When does unemployment benefit for December arrive?', a: `On ${dLong(algDez, 'en')}. Unemployment benefit is paid in arrears and is available on the first working day of the next month. 1 January is New Year's Day, followed by Saturday and Sunday, so the date moves to the Monday.` },
    ],
    body: (h) => `<h2>Every payment day in December 2026</h2>
<p>The list orders payments by the day they are credited, with Kindergeld shown for last digit 0. Kindergeld dates come from the ${h.src('ba-kg-termine', 'Familienkasse list')}, pension dates from the ${h.src('drv-termine', 'pension insurance list')}; the rest are calculated under ${h.src('sgb2-42', 'section 42 SGB II')} and ${h.src('sgb3-337', 'section 337 SGB III')}.</p>
${h.table([h.T('Datum', 'Date'), h.T('Zahlung', 'Payment')], DEZ.map((z) => [dShort(z.date, h.lang), NAMEN[z.leistung][h.lang]]), h.T('Dezember 2026: Zahlungen nach Datum (Kindergeld: Endziffer 0)', 'December 2026: payments by date (Kindergeld: last digit 0)'), ['l', 'l'])}
<h2>Kindergeld by last digit</h2>
<p>In December, Kindergeld is spread over the first half of the month, from ${h.dl(kg0)} for last digit 0 to ${h.dl(kg9)} for last digit 9. All ten days are on ${h.a('kindergeld-dezember-2026', 'Kindergeld December 2026')}.</p>
<h2>Pension and Grundsicherungsgeld on New Year’s Eve</h2>
<p>The December pension arrives on the last bank business day of the month, which in 2026 is New Year's Eve itself. The statutory pension insurance pays no Christmas bonus; ${h.a('weihnachtsgeld-rente', 'Christmas bonus and pensions')} explains why. Details on both benefits: ${h.a('rente-dezember-2026', 'pension December 2026')} and ${h.a('grundsicherungsgeld-dezember-2026', 'Grundsicherungsgeld December 2026')}. Only the two Christmas days are bank holidays, as with all ${h.src('ecb-target', 'TARGET closing days')}.</p>
${h.mini('mo', { p: ['endziffer'], d: { monat: '2026-12', endziffer: 7 }, t: 'December 2026 with your last digit' })}`,
  },
});
