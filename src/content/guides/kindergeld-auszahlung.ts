/** Kindergeld-Auszahlung 2026 : la page pilier du Kindergeld (liste de la Familienkasse, par Endziffer). */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong } from '../../lib/tool-specs';
import { kgMonat, kgJahr } from './_tabellen';

const KG = K.P.kindergeld;
const n0 = K.kindergeld(2026, 11, 0)!, n9 = K.kindergeld(2026, 11, 9)!, d0 = K.kindergeld(2026, 12, 0)!, d9 = K.kindergeld(2026, 12, 9)!;
const j0 = K.kindergeld(2027, 1, 0)!, j9 = K.kindergeld(2027, 1, 9)!;

export default defineGuide({
  id: 'kindergeld-auszahlung', group: 'kindergeld', order: 1, tool: 'kg', toolArg: { monat: '2026-11', endziffer: 0 },
  related: ['kindergeld-november-2026', 'kindergeld-dezember-2026', 'kindergeld-termine-2027', 'kindergeldnummer-endziffer', 'kinderzuschlag-auszahlung', 'home'],
  sources: ['ba-kg-termine', 'ba-kg-archiv', 'estg66'],
  countdown: { date: n0, label: { de: 'Kindergeld November, Endziffer 0', en: 'Kindergeld November, last digit 0' } },
  de: {
    slug: 'kindergeld-auszahlung', nav: 'Kindergeld Auszahlung', card: 'Alle Termine 2026 nach Endziffer',
    title: 'Kindergeld Auszahlung 2026: Termine nach Endziffer 0 bis 9',
    description: 'Kindergeld Auszahlung 2026: Wann die Familienkasse zahlt, je nach letzter Ziffer der Kindergeldnummer. Alle Termine von Januar bis Dezember, mit Wochentag.',
    h1: 'Kindergeld Auszahlung 2026: Ihr Termin nach Endziffer',
    intro: 'Endziffer Ihrer Kindergeldnummer und Monat wählen: Sie sehen den Auszahlungstag, die nächsten drei Monate und die Termine aller Endziffern.',
    resume: `Die Familienkasse zahlt das Kindergeld nicht an alle Familien am selben Tag, sondern verteilt die Zahlungen nach der letzten Ziffer der Kindergeldnummer über den Monat. Endziffer 0 kommt zuerst, Endziffer 9 zuletzt. Im November 2026 reicht die Spanne vom ${dLong(n0, 'de')} bis zum ${dLong(n9, 'de')}, im Dezember 2026 vom ${dLong(d0, 'de')} bis zum ${dLong(d9, 'de')}; der Dezember beginnt früher, sodass alle Zahlungen vor Weihnachten auf den Konten sind. Der Kinderzuschlag kommt am selben Tag wie das Kindergeld. Die Termine stammen aus der Liste der Familienkasse, die wir Tag für Tag übernehmen; die Familienkasse weist ausdrücklich darauf hin, dass kein Anspruch auf einen bestimmten Tag besteht und Wochenenden oder Feiertage einen Termin verschieben können. Das Kindergeld beträgt 2026 nach § 66 EStG ${KG.betrag2026} Euro je Kind und Monat. Im Januar 2027 beginnen die Zahlungen am ${dLong(j0, 'de')}.`,
    faqs: [
      { q: 'Wann wird das Kindergeld im November 2026 ausgezahlt?', a: `Zwischen dem ${dLong(n0, 'de')} für Endziffer 0 und dem ${dLong(n9, 'de')} für Endziffer 9. Die genauen Tage aller zehn Endziffern stehen in der Tabelle und im Rechner oben. Bis die Buchung in Ihrer Banking-App erscheint, kann es je nach Bank noch einige Stunden dauern.` },
      { q: 'Warum bekommt meine Nachbarin das Kindergeld früher?', a: 'Weil ihre Kindergeldnummer mit einer anderen Ziffer endet. Die Familienkasse zahlt nicht nach Wohnort, Kinderzahl oder Bank, sondern nur nach der letzten Ziffer der Nummer. Wer auf 0 endet, ist jeden Monat zuerst an der Reihe, wer auf 9 endet, zuletzt. Der Unterschied beträgt meist zwei bis drei Wochen.' },
      { q: 'Gibt es einen Anspruch auf einen festen Tag?', a: 'Nein. Kindergeld wird nach § 66 EStG monatlich gezahlt, einen bestimmten Kalendertag schreibt das Gesetz nicht vor. Die Liste der Familienkasse ist ihre veröffentlichte Planung. Ein Bankwechsel, eine Nachzahlung oder eine Prüfung kann eine einzelne Zahlung verschieben. Bisher hat die Familienkasse ihre veröffentlichten Termine in aller Regel eingehalten.' },
      { q: 'Kommt der Kinderzuschlag am selben Tag?', a: 'Ja. Die Familienkasse zahlt Kindergeld und Kinderzuschlag gemeinsam und nach derselben Terminliste, also am Tag Ihrer Endziffer. Wer nur Kinderzuschlag bezieht, richtet sich nach der Kindergeldnummer, unter der der Kinderzuschlag geführt wird. Wie lange der Kinderzuschlag bewilligt wird und wann ein Folgeantrag nötig ist, steht auf der Seite zum Kinderzuschlag.' },
    ],
    body: (h) => `<h2>Die Termine für November und Dezember 2026</h2>
<p>Die beiden nächsten Monate im Überblick. Im November liegt kein bundesweiter Feiertag im Zahlungszeitraum; im Dezember beginnt die Familienkasse am ${h.dl(d0)} und schließt mit Endziffer 9 am ${h.dl(d9)} ab, gut eine Woche vor den Weihnachtstagen.</p>
${kgMonat(h, 2026, 11)}
${kgMonat(h, 2026, 12)}
<h2>Das ganze Jahr 2026</h2>
<p>Die folgende Tabelle zeigt für jeden Monat den Tag, an dem die Familienkasse für jede Endziffer zahlt. Oktober bis Dezember stehen auf der ${h.src('ba-kg-termine', 'aktuellen Seite der Familienkasse')}; Januar bis September haben wir der ${h.src('ba-kg-archiv', 'Kopie dieser Seite vom 1. Januar 2026')} entnommen, weil die Familienkasse vergangene Monate entfernt.</p>
${kgJahr(h, 2026)}
<h2>So lesen Sie die Termine</h2>
<p>Ein Termin ist der Tag, an dem die Familienkasse das Geld überweist. Die Buchung erscheint meist am selben Tag, bei manchen Banken erst am nächsten Morgen. Wer eine Lastschrift, etwa für Kita oder Mittagessen, auf das Kindergeld abstimmen möchte, sollte zwei Bankarbeitstage Puffer einplanen. Die Termine ${h.a('kindergeld-termine-2027', 'für 2027')} sind bereits vollständig veröffentlicht, sodass Sie das kommende Jahr schon heute planen können; im Januar 2027 reichen sie vom ${h.dl(j0)} bis zum ${h.dl(j9)}.</p>
<p>Wo Sie Ihre Kindergeldnummer finden, steht unter ${h.a('kindergeldnummer-endziffer', 'Kindergeldnummer und Endziffer')}. Alle anderen Zahltage Ihres Haushalts, etwa Rente oder Grundsicherungsgeld, legt der ${h.a('home', 'persönliche Zahltermin-Kalender')} daneben.</p>
${h.mini('kg', { p: ['endziffer'], d: { monat: '2026-12' }, t: 'Ihr Kindergeld im Dezember 2026' })}`,
  },
  en: {
    slug: 'kindergeld-payment-dates', nav: 'Kindergeld payment dates', card: 'Every 2026 date by last digit',
    title: 'Kindergeld payment dates 2026: by last digit 0 to 9',
    description: 'Kindergeld payment dates 2026: when the Familienkasse pays German child benefit, depending on the last digit of your Kindergeld number. Every month, weekday.',
    h1: 'Kindergeld payment dates 2026: your date by last digit',
    intro: 'Pick the last digit of your Kindergeld number and the month: you see the payment day, the next three months and the dates for every digit.',
    resume: `The Familienkasse does not pay German child benefit (Kindergeld) to every family on the same day. It spreads the payments over the month according to the last digit of the Kindergeld number: digit 0 first, digit 9 last. In November 2026 the range runs from ${dLong(n0, 'en')} to ${dLong(n9, 'en')}, in December 2026 from ${dLong(d0, 'en')} to ${dLong(d9, 'en')}; December starts earlier, so every payment lands before Christmas. Kinderzuschlag, the supplement for low-income families, arrives on the same day as Kindergeld. The dates come from the Familienkasse list, which we copy day by day. The Familienkasse states expressly that there is no right to a particular day and that weekends or holidays can move a date. In 2026 Kindergeld is ${KG.betrag2026} euros per child per month under section 66 of the Income Tax Act. In January 2027, payments start on ${dLong(j0, 'en')}.`,
    faqs: [
      { q: 'When is Kindergeld paid in November 2026?', a: `Between ${dLong(n0, 'en')} for last digit 0 and ${dLong(n9, 'en')} for last digit 9. The exact days for all ten digits are in the table and the tool above. Depending on your bank, it can take a few more hours before the credit shows in your banking app.` },
      { q: 'Why does my neighbour get Kindergeld earlier?', a: 'Because her Kindergeld number ends in a different digit. The Familienkasse does not pay by place of residence, number of children or bank, only by the last digit of the number. Numbers ending in 0 come first every month, numbers ending in 9 last. The gap is usually two to three weeks.' },
      { q: 'Is there a right to a fixed day?', a: 'No. Section 66 of the Income Tax Act says Kindergeld is paid monthly but sets no calendar day. The Familienkasse list is its published schedule. A change of bank account, a back payment or a review can move a single payment. If the money is missing for several days, contact the Familienkasse.' },
      { q: 'Does Kinderzuschlag arrive on the same day?', a: 'Yes. The Familienkasse pays Kindergeld and Kinderzuschlag together, following the same list, so on the day for your last digit. If you only receive Kinderzuschlag, use the Kindergeld number under which your Kinderzuschlag is managed. The amount is not shown here; the dates are.' },
    ],
    body: (h) => `<h2>The dates for November and December 2026</h2>
<p>The next two months at a glance. No nationwide holiday falls within November's payment window; in December the Familienkasse starts on ${h.dl(d0)} and finishes with digit 9 on ${h.dl(d9)}, a good week before Christmas.</p>
${kgMonat(h, 2026, 11)}
${kgMonat(h, 2026, 12)}
<h2>The whole of 2026</h2>
<p>The next table shows, for each month, the day the Familienkasse pays each last digit. October to December are on the ${h.src('ba-kg-termine', 'current Familienkasse page')}; January to September come from the ${h.src('ba-kg-archiv', 'copy of that page from 1 January 2026')}, because the Familienkasse removes past months.</p>
${kgJahr(h, 2026)}
<h2>How to read the dates</h2>
<p>A date is the day the Familienkasse sends the transfer. The credit usually shows the same day, with some banks only the next morning. If you want to time a direct debit, for nursery fees or school lunches, to Kindergeld, allow two bank business days of margin. The ${h.a('kindergeld-termine-2027', '2027 dates')} have already been published in full, so you can plan next year now; in January 2027 they run from ${h.dl(j0)} to ${h.dl(j9)}.</p>
<p>Where to find your Kindergeld number is explained under ${h.a('kindergeldnummer-endziffer', 'Kindergeld number and last digit')}. The ${h.a('home', 'personal payment calendar')} puts your household's other payment days, such as pension or Grundsicherungsgeld, alongside.</p>
${h.mini('kg', { p: ['endziffer'], d: { monat: '2026-12' }, t: 'Your Kindergeld in December 2026' })}`,
  },
});
