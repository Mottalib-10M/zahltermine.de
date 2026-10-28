/** Wohngeld : mensuel et d'avance (§ 26 Abs. 2 WoGG), période de 12 mois (§ 25) ; jour exact fixé par la Wohngeldstelle. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong, monatName } from '../../lib/tool-specs';

const dez = K.imVoraus(2026, 12), jan = K.imVoraus(2027, 1), vorJan = K.renteNach(2026, 12);
const nichtErster27 = Array.from({ length: 12 }, (_, i) => K.imVoraus(2027, i + 1)).filter((d, i) => d !== K.monatserster(2027, i + 1)).length;

export default defineGuide({
  id: 'wohngeld-auszahlung', group: 'leistungen', order: 25, tool: 'vo', toolArg: { leistung: 'wohngeld', monat: '2027-01' },
  related: ['kinderzuschlag-auszahlung', 'bafoeg-auszahlung', 'grundsicherungsgeld-auszahlung', 'bankarbeitstage-2027'],
  sources: ['wogg26', 'wogg25', 'sgb1-41'],
  countdown: { date: jan, label: { de: 'erster Bankarbeitstag im Januar', en: 'first bank business day in January' } },
  de: {
    slug: 'wohngeld-auszahlung', nav: 'Wohngeld', card: 'Im Voraus, Tag legt die Behörde fest',
    title: 'Wohngeld Auszahlung 2026: wann das Geld auf dem Konto ist',
    description: 'Wohngeld Auszahlung 2026 und 2027: monatlich im Voraus nach § 26 WoGG. Den genauen Tag legt die Wohngeldstelle fest; Monatsanfänge, Bankarbeitstage, Antrag.',
    h1: 'Wohngeld: Auszahlung im Voraus, aber an welchem Tag?',
    intro: 'Monat wählen: Der Rechner zeigt, wann der Monat beginnt, für den das Wohngeld gilt, den ersten Bankarbeitstag und den letzten davor.',
    resume: `Wohngeld wird nach § 26 Absatz 2 des Wohngeldgesetzes monatlich im Voraus auf ein Konto gezahlt. Einen bundesweit einheitlichen Zahltag gibt es aber nicht: Wohngeld ist Ländersache, und jede Wohngeldstelle oder ihr Rechenzentrum legt den Überweisungstermin selbst fest. In der Praxis kommt das Geld meist in den letzten Tagen des Vormonats oder in den ersten Tagen des Monats, für den es gilt. Fällig ist der Anspruch zum Monatsanfang. Für Dezember 2026 ist der erste Bankarbeitstag der ${dLong(dez, 'de')}; für Januar 2027 erst der ${dLong(jan, 'de')}, weil Neujahr ein Freitag ist und das Wochenende folgt. Der letzte Bankarbeitstag vor dem Januar ist der ${dLong(vorJan, 'de')}. Bewilligt wird nach § 25 WoGG in der Regel für zwölf Monate, beginnend mit dem Monat des Antrags. Den Tag Ihrer Überweisung erfahren Sie aus dem Bescheid oder bei Ihrer Wohngeldstelle; diese Seite zeigt den Rahmen, in dem er liegt.`,
    faqs: [
      { q: 'Wann wird das Wohngeld überwiesen?', a: 'Im Voraus für den laufenden Monat, also um den Monatswechsel. Den genauen Tag bestimmt die zuständige Wohngeldstelle, er unterscheidet sich von Kommune zu Kommune. Wer einmal den Tag der ersten Gutschrift kennt, kann sich auf ihn meist auch in den Folgemonaten einstellen.' },
      { q: 'Warum kommt mein Wohngeld an einem anderen Tag als bei Bekannten?', a: 'Weil es keinen bundesweiten Zahltermin gibt. Anders als Kindergeld oder Rente wird Wohngeld von Ländern und Kommunen ausgezahlt. Jede Stelle bucht nach ihrem eigenen Lauf, das Gesetz verlangt nur die Zahlung im Voraus. Fragen Sie im Zweifel direkt bei Ihrer Wohngeldstelle nach dem Buchungstag.' },
      { q: 'Wie lange wird Wohngeld bewilligt?', a: 'In der Regel für zwölf Monate. Die Behörde kann den Zeitraum verkürzen oder bei gleichbleibenden Verhältnissen auf bis zu 24 Monate verlängern. Er beginnt am Ersten des Monats, in dem Sie den Antrag gestellt haben. Den genauen Zeitraum und den monatlichen Betrag nennt Ihr Wohngeldbescheid.' },
      { q: 'Wann sollte ich den Weiterleistungsantrag stellen?', a: 'Rechtzeitig vor dem Ende des Bewilligungszeitraums, damit kein Monat ohne Wohngeld bleibt. Ein neuer Zeitraum beginnt mit dem Monat des Antrags. Wer erst nach dem Ende beantragt, bekommt für die Zeit dazwischen in der Regel nichts. Planen Sie deshalb einige Wochen Bearbeitungszeit ein.' },
    ],
    body: (h) => `<h2>Monatsanfänge und Bankarbeitstage 2027</h2>
<p>Die Tabelle zeigt den Rahmen der Auszahlung: den ersten Bankarbeitstag jedes Monats und den letzten Bankarbeitstag davor. Zwischen beiden liegt der Tag Ihrer Wohngeldstelle in den meisten Fällen. Grundlage für die Zahlung im Voraus ist ${h.src('wogg26', '§ 26 Abs. 2 WoGG')}.</p>
${h.table([h.T('Wohngeld für', 'Housing benefit for'), h.T('Letzter Bankarbeitstag davor', 'Last bank business day before'), h.T('Erster Bankarbeitstag', 'First bank business day')], Array.from({ length: 12 }, (_, i) => [monatName(i + 1, h.lang), h.ds(K.renteNach(...K.vormonat(2027, i + 1))), h.ds(K.imVoraus(2027, i + 1))]), h.T('Wohngeld 2027: Rahmen der Auszahlung je Monat', 'Housing benefit 2027: payment window for each month'), ['l', 'l', 'l'])}
<p>In ${h.n(nichtErster27)} Monaten 2027 ist der Monatserste kein Bankarbeitstag. Bucht Ihre Wohngeldstelle zum Ersten, kommt das Geld dann am nächsten Bankarbeitstag.</p>
<h2>Was das Gesetz festlegt</h2>
<p>Das Wohngeld ist ${h.src('wogg26', 'monatlich im Voraus')} auf ein Konto eines Haushaltsmitglieds zu zahlen; mit Einwilligung kann es auch direkt an den Vermieter gehen. Der ${h.src('wogg25', 'Bewilligungszeitraum')} beginnt am Ersten des Antragsmonats und dauert in der Regel zwölf Monate. Fällig ist der Anspruch nach ${h.src('sgb1-41', '§ 41 SGB I')}, sobald er entsteht.</p>
<h2>Wohngeld neben anderen Leistungen</h2>
<p>Wohngeld wird oft zusammen mit ${h.a('kinderzuschlag-auszahlung', 'Kinderzuschlag')} bezogen, der am Kindergeldtag kommt. Neben Grundsicherungsgeld (früher Bürgergeld) gibt es dagegen in der Regel kein Wohngeld, weil die Wohnkosten dort enthalten sind; dessen Termine stehen unter ${h.a('grundsicherungsgeld-auszahlung', 'Grundsicherungsgeld Auszahlung')}. Alle Bankarbeitstage des Jahres zeigt ${h.a('bankarbeitstage-2027', 'Bankarbeitstage 2027')}.</p>
${h.mini('vo', { p: ['monat'], d: { leistung: 'wohngeld', monat: '2027-04' }, t: 'Wohngeld: Ihr Monat' })}`,
  },
  en: {
    slug: 'wohngeld-payment-dates', nav: 'Housing benefit', card: 'In advance, the office sets the day',
    title: 'Wohngeld payment dates 2026: housing benefit timing',
    description: 'Wohngeld (housing benefit) payment 2026 and 2027: monthly in advance under section 26 WoGG. The exact day depends on your local office; month starts, bank days.',
    h1: 'Wohngeld: paid in advance, but on which day?',
    intro: 'Pick a month: the tool shows when the month covered by housing benefit starts, the first bank business day and the last one before it.',
    resume: `Wohngeld, Germany's housing benefit, is paid monthly in advance into a bank account under section 26(2) of the Housing Benefit Act. There is no nationwide payment day, however: housing benefit is run by the federal states, and each housing benefit office or its data centre sets its own transfer date. In practice the money usually arrives in the last days of the previous month or the first days of the month it covers. The claim is due at the start of the month. For December 2026 the first bank business day is ${dLong(dez, 'en')}; for January 2027 it is only ${dLong(jan, 'en')}, because New Year's Day is a Friday followed by the weekend. The last bank business day before January is ${dLong(vorJan, 'en')}. Under section 25 the award usually runs for twelve months, starting with the month of application. Your award notice or your housing benefit office tells you the day of your transfer; this page shows the window it falls in.`,
    faqs: [
      { q: 'When is Wohngeld transferred?', a: 'In advance for the current month, so around the turn of the month. The responsible housing benefit office sets the exact day, and it differs from one municipality to the next. Once you know the day of your first credit, you can usually count on it in the following months too.' },
      { q: 'Why does my housing benefit arrive on a different day from a friend’s?', a: 'Because there is no nationwide payment date. Unlike Kindergeld or pensions, housing benefit is paid by the states and municipalities. Each office books on its own cycle; the law only requires payment in advance. If in doubt, ask your housing benefit office for its booking day.' },
      { q: 'How long is Wohngeld awarded for?', a: 'Usually twelve months. The office can shorten the period or extend it up to 24 months if circumstances are expected to stay the same. It starts on the 1st of the month in which you applied. Your award notice states the exact period and the monthly amount.' },
      { q: 'When should I apply to continue?', a: 'In good time before the award period ends, so that no month goes without housing benefit. A new period starts with the month of application. If you apply only after the end, you usually receive nothing for the gap. Allow a few weeks for processing.' },
    ],
    body: (h) => `<h2>Month starts and bank business days in 2027</h2>
<p>The table shows the payment window: the first bank business day of each month and the last bank business day before it. Your housing benefit office's day falls between the two in most cases. Payment in advance is set by ${h.src('wogg26', 'section 26(2) WoGG')}.</p>
${h.table([h.T('Wohngeld für', 'Housing benefit for'), h.T('Letzter Bankarbeitstag davor', 'Last bank business day before'), h.T('Erster Bankarbeitstag', 'First bank business day')], Array.from({ length: 12 }, (_, i) => [monatName(i + 1, h.lang), h.ds(K.renteNach(...K.vormonat(2027, i + 1))), h.ds(K.imVoraus(2027, i + 1))]), h.T('Wohngeld 2027: Rahmen der Auszahlung je Monat', 'Housing benefit 2027: payment window for each month'), ['l', 'l', 'l'])}
<p>In ${h.n(nichtErster27)} months of 2027 the 1st is not a bank business day. If your office books on the 1st, the money then comes on the next bank business day.</p>
<h2>What the law sets</h2>
<p>Housing benefit must be paid ${h.src('wogg26', 'monthly in advance')} into the account of a household member; with consent it can go straight to the landlord. The ${h.src('wogg25', 'award period')} starts on the 1st of the month of application and usually lasts twelve months. Under ${h.src('sgb1-41', 'section 41 SGB I')} the claim is due as soon as it arises.</p>
<h2>Housing benefit alongside other benefits</h2>
<p>Housing benefit is often received together with ${h.a('kinderzuschlag-auszahlung', 'Kinderzuschlag')}, which comes on the Kindergeld day. Alongside Grundsicherungsgeld (formerly Bürgergeld), by contrast, there is usually no housing benefit, because housing costs are included there; its dates are on ${h.a('grundsicherungsgeld-auszahlung', 'Grundsicherungsgeld payment dates')}. Every bank business day of the year is on ${h.a('bankarbeitstage-2027', 'bank business days 2027')}.</p>
${h.mini('vo', { p: ['monat'], d: { leistung: 'wohngeld', monat: '2027-04' }, t: 'Housing benefit: your month' })}`,
  },
});
