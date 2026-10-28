/** Grundsicherungsgeld (früher Bürgergeld) : versement anticipé (§ 42 SGB II), veille du mois selon la BA ; calendrier 2026. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong } from '../../lib/tool-specs';
import { gsJahr } from './_tabellen';

const G = K.P.grundsicherung;
const nov = K.grundsicherung(2026, 11), dez = K.grundsicherung(2026, 12), jan = K.grundsicherung(2027, 1);
const vor26 = Array.from({ length: 12 }, (_, i) => K.grundsicherung(2026, i + 1)).filter((d, i) => d !== K.monatsletzter(...K.vormonat(2026, i + 1))).length;

export default defineGuide({
  id: 'grundsicherungsgeld-auszahlung', group: 'leistungen', order: 20, tool: 'gs', toolArg: { monat: '2026-12' },
  related: ['grundsicherungsgeld-dezember-2026', 'grundsicherungsgeld-2027', 'arbeitslosengeld-auszahlung', 'bankarbeitstage-2026'],
  sources: ['sgb2-42', 'ba-gs-auszahlung', 'ba-gs', 'breg-grundsicherung'],
  countdown: { date: dez, label: { de: 'Grundsicherungsgeld für Dezember', en: 'Grundsicherungsgeld for December' } },
  de: {
    slug: 'grundsicherungsgeld-auszahlung', nav: 'Grundsicherungsgeld', card: 'Grundsicherungsgeld (früher Bürgergeld): im Voraus',
    title: 'Grundsicherungsgeld (früher Bürgergeld): Zahltermine 2026',
    description: 'Grundsicherungsgeld (früher Bürgergeld) Auszahlung 2026: im Voraus, in der Regel am Tag vor dem Monat. Alle Zahltage mit Wochenende, Feiertag und Vorschuss.',
    h1: 'Grundsicherungsgeld (früher Bürgergeld): wann das Geld kommt',
    intro: 'Monat wählen: Der Rechner zeigt, an welchem Tag das Grundsicherungsgeld für diesen Monat auf dem Konto sein soll, und alle Termine des Jahres.',
    resume: `Grundsicherungsgeld (früher Bürgergeld) wird im Voraus gezahlt. Nach § 42 Absatz 1 SGB II sollen die Leistungen monatlich im Voraus erbracht werden. Nach Angaben der Bundesagentur für Arbeit steht das Geld in der Regel einen Kalendertag vor dem Monat zur Verfügung, für den es bestimmt ist, also am letzten Tag des Vormonats. Das Geld für Dezember 2026 kommt danach am ${dLong(dez, 'de')}, das für Januar 2027 am ${dLong(jan, 'de')}. Fällt der letzte Tag des Vormonats auf einen Samstag, Sonntag oder bundesweiten Feiertag, bucht keine Bank; wir rechnen dann mit dem Bankarbeitstag davor. So kam das Geld für November 2026 schon am ${dLong(nov, 'de')}, weil der 31. Oktober ein Samstag war. Die BA nennt für diesen Fall keinen eigenen Tag, und Verzögerungen auf dem Zahlungsweg sind nach ihren Angaben möglich. Auf Antrag kann das Jobcenter nach § 42 Absatz 2 bis zu ${G.vorschussMax} Euro der nächsten Zahlung vorzeitig auszahlen. Bewilligt wird in der Regel für zwölf Monate.`,
    faqs: [
      { q: 'Wann wird das Grundsicherungsgeld gezahlt?', a: 'Im Voraus, in der Regel am letzten Tag des Vormonats. Das Jobcenter überweist so, dass das Geld laut Bundesagentur für Arbeit einen Kalendertag vor dem Monat bereitsteht, für den es gezahlt wird. Liegt dieser Tag auf einem Wochenende, kommt die Gutschrift nach unserer Rechnung am Bankarbeitstag davor.' },
      { q: 'Hat sich mit dem neuen Namen der Zahltag geändert?', a: `Nein. Seit dem ${dLong(G.start, 'de')} heißt die Leistung Grundsicherungsgeld (früher Bürgergeld). Die Regel in § 42 SGB II, die Zahlung im Voraus, ist geblieben, ebenso der Hinweis der Bundesagentur für Arbeit zum Zeitpunkt der Gutschrift. Das Geld für einen Monat steht also weiterhin am letzten Tag des Vormonats bereit.` },
      { q: 'Kann ich einen Vorschuss bekommen?', a: `Ja, in begrenztem Umfang. Nach § 42 Absatz 2 SGB II kann das Jobcenter auf Antrag bis zu ${G.vorschussMax} Euro der nächsten fälligen Zahlung vorzeitig leisten; die Zahlung im Folgemonat verringert sich entsprechend. Ausgeschlossen ist das etwa, wenn eine Aufrechnung zu erwarten ist.` },
      { q: 'Wie lange wird Grundsicherungsgeld bewilligt?', a: 'In der Regel für zwölf Monate, in bestimmten Fällen nur für sechs, etwa bei schwankendem Einkommen. Vor dem Ende des Bewilligungszeitraums ist ein Weiterbewilligungsantrag nötig, damit die Zahlung ohne Lücke weiterläuft. Den Zeitraum nennt der Bewilligungsbescheid. Den Antrag stellen Sie beim Jobcenter oder online.' },
    ],
    body: (h) => `<h2>Zahltermine 2026</h2>
<p>Die Tabelle zeigt für jeden Monat 2026 den Tag, an dem das Geld nach der Regel auf dem Konto ist. In ${h.n(vor26)} Monaten liegt der Vormonatsletzte auf einem Wochenende, und die Gutschrift rückt auf den Freitag davor.</p>
${gsJahr(h, 2026)}
<p>Grundlage sind ${h.src('sgb2-42', '§ 42 SGB II')} und der Hinweis der ${h.src('ba-gs-auszahlung', 'Bundesagentur für Arbeit zur Auszahlung')}. Für 2027 stehen die Termine unter ${h.a('grundsicherungsgeld-2027', 'Grundsicherungsgeld 2027')}, für den Jahreswechsel unter ${h.a('grundsicherungsgeld-dezember-2026', 'Grundsicherungsgeld Dezember 2026')}.</p>
<h2>Vom Bürgergeld zum Grundsicherungsgeld</h2>
<p>Die ${h.src('breg-grundsicherung', 'Reform der Grundsicherung')} hat der Bundestag am ${h.dl(G.bundestag)} beschlossen, der Bundesrat hat am ${h.dl(G.bundesrat)} zugestimmt; seit dem ${h.dl(G.start)} gilt der neue Name. Für den Zahltag hat das nichts geändert. Den Antrag, die Weiterbewilligung und Änderungen erledigen Sie beim Jobcenter oder online über die ${h.src('ba-gs', 'Seiten der Bundesagentur für Arbeit')}.</p>
<h2>Wenn das Geld nicht da ist</h2>
<p>Die BA weist darauf hin, dass das Jobcenter keinen Einfluss auf Verzögerungen auf dem Zahlungsweg hat. Warten Sie einen Bankarbeitstag ab und prüfen Sie, ob ein Weiterbewilligungsantrag fällig war. Fehlt das Geld weiter, ist das Jobcenter die richtige Stelle. Wer zusätzlich ${h.a('arbeitslosengeld-auszahlung', 'Arbeitslosengeld')} bezieht, bekommt dieses zu einem anderen Termin, nachträglich am Monatsanfang.</p>
${h.mini('gs', { p: ['monat'], d: { monat: '2027-02' }, t: 'Grundsicherungsgeld: Ihr Monat' })}`,
  },
  en: {
    slug: 'grundsicherungsgeld-payment-dates', nav: 'Grundsicherungsgeld', card: 'Grundsicherungsgeld (formerly Bürgergeld): in advance',
    title: 'Grundsicherungsgeld (formerly Bürgergeld): dates 2026',
    description: 'Grundsicherungsgeld (formerly Bürgergeld) payment dates 2026: paid in advance, usually the day before the month. Every date with weekends and holidays.',
    h1: 'Grundsicherungsgeld (formerly Bürgergeld): when the money arrives',
    intro: 'Pick a month: the tool shows the day on which Grundsicherungsgeld for that month should be in your account, and every date of the year.',
    resume: `Grundsicherungsgeld (formerly Bürgergeld), Germany's basic income support for jobseekers, is paid in advance. Under section 42(1) of Social Code Book II, benefits are to be paid monthly in advance. According to the Federal Employment Agency, the money is usually available one calendar day before the month it covers, which is the last day of the previous month. On that basis, the money for December 2026 arrives on ${dLong(dez, 'en')} and the money for January 2027 on ${dLong(jan, 'en')}. If the last day of the previous month is a Saturday, Sunday or nationwide holiday, no bank posts transfers, so we use the bank business day before. That is why the money for November 2026 came on ${dLong(nov, 'en')}: 31 October was a Saturday. The agency gives no separate day for this case and says delays in the payment chain are possible. On application, section 42(2) lets the Jobcenter pay up to ${G.vorschussMax} euros of the next payment early. Awards usually run for twelve months.`,
    faqs: [
      { q: 'When is Grundsicherungsgeld paid?', a: 'In advance, usually on the last day of the previous month. According to the Federal Employment Agency, the Jobcenter transfers it so that the money is available one calendar day before the month it covers. If that day falls on a weekend, the credit comes on the bank business day before, by our calculation.' },
      { q: 'Did the payment day change with the new name?', a: `No. Since ${dLong(G.start, 'en')} the benefit has been called Grundsicherungsgeld (formerly Bürgergeld). The rule in section 42 SGB II, payment in advance, is unchanged, and so is the agency's guidance on when the money is credited. The money for a month is still available on the last day of the month before.` },
      { q: 'Can I get an advance?', a: `Yes, to a limited extent. Under section 42(2) SGB II the Jobcenter can, on application, pay up to ${G.vorschussMax} euros of the next payment due early; the following month's payment is reduced accordingly. This is excluded, for example, when an offset is expected.` },
      { q: 'How long is Grundsicherungsgeld awarded for?', a: 'Usually for twelve months, in some cases only six, for instance when income fluctuates. Before the award period ends you need to apply for a renewal so that payments continue without a gap. The award notice states the period. You apply at the Jobcenter or online.' },
    ],
    body: (h) => `<h2>Payment dates 2026</h2>
<p>For each month of 2026, the table shows the day the money is in your account under the rule. In ${h.n(vor26)} months the last day of the previous month falls on a weekend, and the credit moves to the Friday before.</p>
${gsJahr(h, 2026)}
<p>The basis is ${h.src('sgb2-42', 'section 42 SGB II')} and the ${h.src('ba-gs-auszahlung', 'Federal Employment Agency guidance on payment')}. The 2027 dates are on ${h.a('grundsicherungsgeld-2027', 'Grundsicherungsgeld 2027')}, the turn of the year on ${h.a('grundsicherungsgeld-dezember-2026', 'Grundsicherungsgeld December 2026')}.</p>
<h2>From Bürgergeld to Grundsicherungsgeld</h2>
<p>The Bundestag passed the ${h.src('breg-grundsicherung', 'basic income support reform')} on ${h.dl(G.bundestag)} and the Bundesrat approved it on ${h.dl(G.bundesrat)}; the new name has applied since ${h.dl(G.start)}. Nothing changed for the payment day. Applications, renewals and changes go through the Jobcenter or online via the ${h.src('ba-gs', 'Federal Employment Agency pages')}.</p>
<h2>If the money is not there</h2>
<p>The agency points out that the Jobcenter has no influence on delays in the payment chain. Wait one bank business day and check whether a renewal application was due. If the money is still missing, the Jobcenter is the right place. If you also receive ${h.a('arbeitslosengeld-auszahlung', 'unemployment benefit')}, that arrives on a different date, in arrears at the start of the month.</p>
${h.mini('gs', { p: ['monat'], d: { monat: '2027-02' }, t: 'Grundsicherungsgeld: your month' })}`,
  },
});
