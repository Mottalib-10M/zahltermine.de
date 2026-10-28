/** Kindergeld 2027 : la liste complète déjà publiée par la Familienkasse. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong } from '../../lib/tool-specs';
import { kgJahr, kgMonat } from './_tabellen';

const KG = K.P.kindergeld;
const j0 = K.kindergeld(2027, 1, 0)!, j9 = K.kindergeld(2027, 1, 9)!;
const mai9 = K.kindergeld(2027, 5, 9)!, dez0 = K.kindergeld(2027, 12, 0)!, dez9 = K.kindergeld(2027, 12, 9)!;
const sp = (m: number) => Number(K.kindergeld(2027, m, 9)!.slice(8)) - Number(K.kindergeld(2027, m, 0)!.slice(8));

export default defineGuide({
  id: 'kindergeld-termine-2027', group: 'kindergeld', order: 2, tool: 'kg', toolArg: { monat: '2027-01', endziffer: 0 },
  related: ['kindergeld-auszahlung', 'kindergeld-erhoehung-2027', 'auszahlungstermine-2027', 'kindergeldnummer-endziffer'],
  sources: ['ba-kg-termine', 'estg66', 'btdrs-21-8235'],
  countdown: { date: j0, label: { de: 'erstes Kindergeld 2027 (Endziffer 0)', en: 'first Kindergeld of 2027 (last digit 0)' } },
  de: {
    slug: 'kindergeld-termine-2027', nav: 'Kindergeld 2027', card: 'Alle zwölf Monate, schon veröffentlicht',
    title: 'Kindergeld Termine 2027: Auszahlung nach Endziffer',
    description: 'Kindergeld Termine 2027: Die Familienkasse hat alle Auszahlungstage nach Endziffer veröffentlicht. Januar bis Dezember mit Wochentag und Kalenderexport.',
    h1: 'Kindergeld Termine 2027: das ganze Jahr nach Endziffer',
    intro: 'Endziffer und Monat 2027 wählen: Der Rechner zeigt Ihren Tag, die drei folgenden Monate und die Termine aller zehn Endziffern.',
    resume: `Die Familienkasse hat die Auszahlungstermine für das ganze Jahr 2027 bereits veröffentlicht, also mehr als zwei Monate im Voraus. Das erste Kindergeld des Jahres kommt am ${dLong(j0, 'de')} für Endziffer 0, Endziffer 9 folgt am ${dLong(j9, 'de')}. Am spätesten im Monat zahlt sie im Januar und im Mai: Endziffer 9 kommt am ${dLong(j9, 'de')} und am ${dLong(mai9, 'de')}, weil Neujahr den Januar und Christi Himmelfahrt mit Pfingstmontag den Mai verkürzen. Im Dezember 2027 zahlt die Familienkasse wieder früh, vom ${dLong(dez0, 'de')} bis zum ${dLong(dez9, 'de')}. Wir übernehmen jeden Termin unverändert aus der Liste der Familienkasse und haben geprüft, dass keiner auf ein Wochenende oder einen bundesweiten Feiertag fällt. Wie hoch das Kindergeld 2027 sein wird, ist noch offen: Ein Gesetzentwurf der Bundesregierung sieht ${KG.betrag2027Entwurf} Euro statt ${KG.betrag2026} Euro vor, beschlossen ist er noch nicht. An den Terminen ändert das nichts.`,
    faqs: [
      { q: 'Wann kommt das erste Kindergeld 2027?', a: `Am ${dLong(j0, 'de')} für Kindergeldnummern mit Endziffer 0. Die übrigen Endziffern folgen bis zum ${dLong(j9, 'de')}. Neujahr ist ein Freitag, deshalb beginnt der Januar erst in der zweiten Woche. Das Geld für Januar kommt also deutlich später als das Dezembergeld, das schon in der ersten Dezemberhälfte 2026 überwiesen wird.` },
      { q: 'Sind die Termine 2027 schon endgültig?', a: 'Die Familienkasse hat sie als ihre Planung veröffentlicht. Sie weist aber darauf hin, dass kein Anspruch auf einen bestimmten Tag besteht. Ändert sie einen Termin, übernehmen wir die neue Liste; ein Datum, das sie nicht veröffentlicht hat, rechnen wir nie hoch.' },
      { q: 'In welchem Monat 2027 kommt das Kindergeld am spätesten?', a: `Im Januar und im Mai. Für Endziffer 9 zahlt die Familienkasse dann erst am 26. des Monats: am ${dLong(j9, 'de')} und am ${dLong(mai9, 'de')}. Im Mai liegen Christi Himmelfahrt am 6. und Pfingstmontag am 17. Mai, sodass die Zahlungen sich über mehr Kalendertage verteilen; im Januar beginnt der Lauf erst nach Neujahr.` },
    ],
    body: (h) => `<h2>Kindergeld 2027 in einer Tabelle</h2>
<p>Für jeden Monat steht hier der Tag, an dem die Familienkasse für jede Endziffer überweist. Quelle ist die ${h.src('ba-kg-termine', 'Terminliste der Familienkasse')}. Zwischen dem ersten und dem letzten Termin eines Monats liegen 2027 zwischen ${h.n(Math.min(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(sp)))} und ${h.n(Math.max(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(sp)))} Kalendertage.</p>
${kgJahr(h, 2027)}
<h2>Januar 2027 im Einzelnen</h2>
<p>Der Jahreswechsel ist für viele Familien knapp: Das Dezembergeld kommt in der ersten Dezemberhälfte, das Januargeld erst ab dem ${h.dl(j0)}. Wer auf Endziffer 9 endet, bekommt das Dezembergeld am ${h.dl(K.kindergeld(2026, 12, 9)!)} und das Januargeld am ${h.dl(j9)}: ${h.n(K.tageBis(K.kindergeld(2026, 12, 9)!, j9))} Tage dazwischen statt der üblichen vier bis fünf Wochen.</p>
${kgMonat(h, 2027, 1)}
<h2>Betrag 2027: Entwurf, nicht beschlossen</h2>
<p>Nach ${h.src('estg66', '§ 66 EStG')} beträgt das Kindergeld derzeit ${h.eur(KG.betrag2026)} je Kind und Monat. Der ${h.src('btdrs-21-8235', 'Entwurf eines Einkommensteuerreformgesetzes 2027')} vom ${h.dl(KG.entwurfDatum)} sieht ${h.eur(KG.betrag2027Entwurf)} ab Januar 2027 und ${h.eur(KG.betrag2028Entwurf)} ab Januar 2028 vor. Der Bundestag hat ihn am ${h.dl(KG.ersteLesung)} in erster Lesung beraten. Den aktuellen Stand fasst ${h.a('kindergeld-erhoehung-2027', 'Kindergeld-Erhöhung 2027')} zusammen.</p>
<p>Wer mehrere Leistungen bezieht, kann alle Termine 2027 im ${h.a('home', 'Zahltermin-Kalender')} zusammenführen und als Datei in sein Smartphone übernehmen; eine Monatsübersicht aller Leistungen bietet ${h.a('auszahlungstermine-2027', 'Auszahlungstermine 2027')}.</p>
${h.mini('kg', { p: ['endziffer', 'monat'], d: { monat: '2027-06' }, t: 'Kindergeld 2027: Ihr Monat' })}`,
  },
  en: {
    slug: 'kindergeld-dates-2027', nav: 'Kindergeld 2027', card: 'All twelve months, already published',
    title: 'Kindergeld dates 2027: payment by last digit, every month',
    description: 'Kindergeld dates 2027: the Familienkasse has published every payment day by last digit. January to December with weekday, countdown and calendar export.',
    h1: 'Kindergeld dates 2027: the whole year by last digit',
    intro: 'Pick your last digit and a 2027 month: the tool shows your day, the three following months and the dates for all ten digits.',
    resume: `The Familienkasse has already published the Kindergeld payment dates for the whole of 2027, more than two months ahead. The first child benefit of the year arrives on ${dLong(j0, 'en')} for last digit 0, with digit 9 following on ${dLong(j9, 'en')}. The latest in the month are January and May: digit 9 arrives on ${dLong(j9, 'en')} and on ${dLong(mai9, 'en')}, because New Year's Day shortens January and Ascension Day with Whit Monday shortens May. In December 2027 the Familienkasse pays early again, from ${dLong(dez0, 'en')} to ${dLong(dez9, 'en')}. We copy every date unchanged from the Familienkasse list and have checked that none falls on a weekend or a nationwide holiday. How much Kindergeld will be in 2027 is still open: a government bill proposes ${KG.betrag2027Entwurf} euros instead of ${KG.betrag2026} euros, but it has not been passed. The dates do not depend on it.`,
    faqs: [
      { q: 'When is the first Kindergeld of 2027 paid?', a: `On ${dLong(j0, 'en')} for Kindergeld numbers ending in 0. The other digits follow until ${dLong(j9, 'en')}. New Year's Day is a Friday, so January only starts in the second week. January's money therefore comes much later than December's, which is transferred in the first half of December 2026.` },
      { q: 'Are the 2027 dates final?', a: 'The Familienkasse has published them as its schedule. It does, however, point out that there is no right to a particular day. If it changes a date, we adopt the new list; a date it has not published is never projected by us.' },
      { q: 'In which month of 2027 does Kindergeld come latest?', a: `In January and May. For last digit 9 the Familienkasse then only pays on the 26th: on ${dLong(j9, 'en')} and on ${dLong(mai9, 'en')}. In May, Ascension Day on the 6th and Whit Monday on the 17th spread the payments over more calendar days; in January the run only starts after New Year.` },
    ],
    body: (h) => `<h2>Kindergeld 2027 in one table</h2>
<p>For each month, the day the Familienkasse transfers money for each last digit. The source is the ${h.src('ba-kg-termine', 'Familienkasse list')}. In 2027, between ${h.n(Math.min(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(sp)))} and ${h.n(Math.max(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(sp)))} calendar days separate a month's first and last dates.</p>
${kgJahr(h, 2027)}
<h2>January 2027 in detail</h2>
<p>The turn of the year is tight for many families: December's money arrives in the first half of December, January's only from ${h.dl(j0)}. Numbers ending in 9 get December's money on ${h.dl(K.kindergeld(2026, 12, 9)!)} and January's on ${h.dl(j9)}: ${h.n(K.tageBis(K.kindergeld(2026, 12, 9)!, j9))} days apart instead of the usual four to five weeks.</p>
${kgMonat(h, 2027, 1)}
<h2>The 2027 amount: a bill, not law</h2>
<p>Under ${h.src('estg66', 'section 66 EStG')} Kindergeld is currently ${h.eur(KG.betrag2026)} per child per month. The ${h.src('btdrs-21-8235', 'draft Income Tax Reform Act 2027')} of ${h.dl(KG.entwurfDatum)} proposes ${h.eur(KG.betrag2027Entwurf)} from January 2027 and ${h.eur(KG.betrag2028Entwurf)} from January 2028. The Bundestag held its first reading on ${h.dl(KG.ersteLesung)}. The current state is summed up on ${h.a('kindergeld-erhoehung-2027', 'Kindergeld increase 2027')}.</p>
<p>If you receive several benefits, the ${h.a('home', 'payment calendar')} combines all your 2027 dates and exports them to your phone; a month-by-month overview of every benefit is on ${h.a('auszahlungstermine-2027', 'payment dates 2027')}.</p>
${h.mini('kg', { p: ['endziffer', 'monat'], d: { monat: '2027-06' }, t: 'Kindergeld 2027: your month' })}`,
  },
});
