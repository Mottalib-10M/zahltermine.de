/** Kindergeld-Erhöhung 2027 : état du projet de loi (non adopté) et dates du premier versement de 2027. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong } from '../../lib/tool-specs';

const KG = K.P.kindergeld;
const j0 = K.kindergeld(2027, 1, 0)!, j9 = K.kindergeld(2027, 1, 9)!;
const plus = KG.betrag2027Entwurf - KG.betrag2026, plus28 = KG.betrag2028Entwurf - KG.betrag2027Entwurf;

export default defineGuide({
  id: 'kindergeld-erhoehung-2027', group: 'kindergeld', order: 5, tool: 'kg', toolArg: { monat: '2027-01', endziffer: 0 },
  related: ['kindergeld-termine-2027', 'kindergeld-auszahlung', 'grundsicherungsgeld-2027', 'rentenerhoehung-2027'],
  sources: ['btdrs-21-8235', 'estg66', 'ba-kg-termine'],
  countdown: { date: '2027-01-01', label: { de: 'Beginn des Jahres 2027', en: 'start of 2027' } },
  de: {
    slug: 'kindergeld-erhoehung-2027', nav: 'Kindergeld-Erhöhung 2027', card: 'Entwurf: 267 Euro, noch nicht beschlossen',
    title: 'Kindergeld Erhöhung 2027: Stand des Gesetzes, erster Termin',
    description: 'Kindergeld-Erhöhung 2027: Der Gesetzentwurf sieht 267 statt 259 Euro vor, beschlossen ist er noch nicht. Stand des Verfahrens und wann das Januargeld kommt.',
    h1: 'Kindergeld-Erhöhung 2027: was feststeht und was nicht',
    intro: 'Endziffer wählen: Der Rechner zeigt, wann das erste Kindergeld 2027 auf Ihrem Konto ist, unabhängig davon, wie hoch es wird.',
    resume: `Ob das Kindergeld 2027 steigt, ist am ${dLong(K.P.retrieved_at, 'de')} noch nicht entschieden. Fest steht nur der geltende Betrag: ${KG.betrag2026} Euro je Kind und Monat nach § 66 des Einkommensteuergesetzes. Die Bundesregierung hat am ${dLong(KG.entwurfDatum, 'de')} den Entwurf eines Einkommensteuerreformgesetzes 2027 in den Bundestag eingebracht (Drucksache 21/8235). Er sieht ${KG.betrag2027Entwurf} Euro ab dem 1. Januar 2027 vor, also ${plus} Euro mehr, und ${KG.betrag2028Entwurf} Euro ab dem 1. Januar 2028. Die erste Lesung im Bundestag war am ${dLong(KG.ersteLesung, 'de')}; danach berät der Finanzausschuss, es folgen zweite und dritte Lesung und der Bundesrat. Erst wenn das Gesetz im Bundesgesetzblatt verkündet ist, gilt der neue Betrag. Unabhängig davon stehen die Zahltermine schon fest: Das erste Kindergeld 2027 kommt zwischen dem ${dLong(j0, 'de')} und dem ${dLong(j9, 'de')}, je nach Endziffer. Diese Seite rechnet keine Beträge aus.`,
    faqs: [
      { q: 'Steigt das Kindergeld 2027 auf 267 Euro?', a: `Das sieht der Gesetzentwurf der Bundesregierung vor, beschlossen ist es noch nicht. Bis das Gesetz Bundestag und Bundesrat passiert hat und verkündet ist, gelten ${KG.betrag2026} Euro nach § 66 EStG. Wir übernehmen den neuen Betrag erst, wenn er im Gesetz steht.` },
      { q: 'Verschiebt die Erhöhung den Januartermin?', a: `Nein. Das Januargeld kommt zwischen dem ${dLong(j0, 'de')} für Endziffer 0 und dem ${dLong(j9, 'de')} für Endziffer 9. Die Termine hat die Familienkasse bereits veröffentlicht; sie hängen nicht davon ab, ob und wann eine Erhöhung beschlossen wird. Kommt eine Erhöhung spät, kann der Unterschied nachgezahlt werden.` },
      { q: 'Muss ich eine Erhöhung beantragen?', a: 'Nein. Eine gesetzliche Änderung des Kindergeldbetrags setzt die Familienkasse von sich aus um; ein neuer Antrag ist dafür nicht nötig. Prüfen Sie aber, ob Ihre Kontoverbindung und Ihre Anschrift bei der Familienkasse aktuell sind, damit die Zahlung pünktlich ankommt. Den neuen Betrag sehen Sie dann auf dem Kontoauszug.' },
    ],
    body: (h) => `<h2>Stand des Verfahrens</h2>
${h.table([h.T('Schritt', 'Step'), h.T('Datum', 'Date'), h.T('Stand', 'Status')], [
      [h.T('Gesetzentwurf der Bundesregierung, Drucksache 21/8235', 'Government bill, printed paper 21/8235'), h.dl(KG.entwurfDatum), h.T('eingebracht', 'introduced')],
      [h.T('Erste Lesung im Bundestag', 'First reading in the Bundestag'), h.dl(KG.ersteLesung), h.T('erfolgt', 'held')],
      [h.T('Ausschussberatung, zweite und dritte Lesung', 'Committee stage, second and third reading'), '–', h.T('offen', 'pending')],
      [h.T('Bundesrat, Verkündung', 'Bundesrat, promulgation'), '–', h.T('offen', 'pending')],
    ], h.T(`Kindergeld 2027: Gesetzgebung, Stand ${h.dl(K.P.retrieved_at)}`, `Kindergeld 2027: legislation, as of ${h.dl(K.P.retrieved_at)}`), ['l', 'l', 'l'])}
<p>Quelle ist der ${h.src('btdrs-21-8235', 'Gesetzentwurf im Dokumentenserver des Bundestages')}. Bis zur Verkündung kann sich der Betrag noch ändern; Ausschüsse ändern Entwürfe häufig. Den geltenden Wortlaut zeigt ${h.src('estg66', '§ 66 EStG')}.</p>
<h2>Was der Entwurf vorsieht</h2>
${h.table([h.T('Ab', 'From'), h.T('Kindergeld je Kind und Monat', 'Kindergeld per child per month'), h.T('Rechtsstand', 'Legal status')], [
      [h.dl('2026-01-01'), h.eur(KG.betrag2026), h.T('geltendes Recht', 'law in force')],
      [h.dl('2027-01-01'), h.eur(KG.betrag2027Entwurf), h.T('Entwurf, + ', 'draft, + ') + h.eur(plus)],
      [h.dl('2028-01-01'), h.eur(KG.betrag2028Entwurf), h.T('Entwurf, + ', 'draft, + ') + h.eur(plus28)],
    ], h.T('Kindergeld: geltender Betrag und Entwurf', 'Kindergeld: current amount and draft'), ['l', 'r', 'l'])}
<h2>Die Termine stehen schon fest</h2>
<p>Unabhängig vom Betrag zahlt die Familienkasse im Januar 2027 vom ${h.dl(j0)} bis zum ${h.dl(j9)}. Alle Monate stehen unter ${h.a('kindergeld-termine-2027', 'Kindergeld Termine 2027')}; Ihre eigene Liste mit Kalenderdatei liefert der ${h.a('home', 'Zahltermin-Kalender')}. Auch bei anderen Leistungen ist 2027 noch nicht alles entschieden: der Regelbedarf beim ${h.a('grundsicherungsgeld-2027', 'Grundsicherungsgeld 2027')} und die ${h.a('rentenerhoehung-2027', 'Rentenerhöhung 2027')}.</p>
${h.mini('kg', { p: ['endziffer'], d: { monat: '2027-01' }, t: 'Erstes Kindergeld 2027' })}`,
  },
  en: {
    slug: 'kindergeld-increase-2027', nav: 'Kindergeld increase 2027', card: 'Bill: 267 euros, not passed yet',
    title: 'Kindergeld increase 2027: where the bill stands, first date',
    description: 'Kindergeld increase 2027: a government bill proposes 267 instead of 259 euros, but it has not been passed. Where it stands and when January money arrives.',
    h1: 'Kindergeld increase 2027: what is settled and what is not',
    intro: 'Pick your last digit: the tool shows when the first Kindergeld of 2027 reaches your account, whatever the amount turns out to be.',
    resume: `Whether German child benefit (Kindergeld) rises in 2027 is still undecided as of ${dLong(K.P.retrieved_at, 'en')}. Only the current amount is certain: ${KG.betrag2026} euros per child per month under section 66 of the Income Tax Act. On ${dLong(KG.entwurfDatum, 'en')} the Federal Government introduced a draft Income Tax Reform Act 2027 in the Bundestag (printed paper 21/8235). It proposes ${KG.betrag2027Entwurf} euros from 1 January 2027, ${plus} euros more, and ${KG.betrag2028Entwurf} euros from 1 January 2028. The Bundestag held the first reading on ${dLong(KG.ersteLesung, 'en')}; the finance committee follows, then the second and third readings and the Bundesrat. The new amount only applies once the act is promulgated in the Federal Law Gazette. The payment dates are already fixed regardless: the first Kindergeld of 2027 arrives between ${dLong(j0, 'en')} and ${dLong(j9, 'en')}, depending on the last digit. This site does not calculate amounts.`,
    faqs: [
      { q: 'Will Kindergeld rise to 267 euros in 2027?', a: `That is what the government bill proposes, but it has not been passed. Until the act has cleared the Bundestag and Bundesrat and been promulgated, ${KG.betrag2026} euros applies under section 66 EStG. We only adopt the new amount once it is in the statute.` },
      { q: 'Does the increase move the January date?', a: `No. January's money arrives between ${dLong(j0, 'en')} for last digit 0 and ${dLong(j9, 'en')} for digit 9. The Familienkasse has already published the dates; they do not depend on whether or when an increase is passed. If an increase is passed late, the difference can be paid afterwards.` },
      { q: 'Do I need to apply for an increase?', a: 'No. The Familienkasse applies a statutory change to the Kindergeld amount on its own; no new application is needed. Do check that your bank details and address are up to date with the Familienkasse so that the payment arrives on time.' },
    ],
    body: (h) => `<h2>Where the procedure stands</h2>
${h.table([h.T('Schritt', 'Step'), h.T('Datum', 'Date'), h.T('Stand', 'Status')], [
      [h.T('Gesetzentwurf der Bundesregierung, Drucksache 21/8235', 'Government bill, printed paper 21/8235'), h.dl(KG.entwurfDatum), h.T('eingebracht', 'introduced')],
      [h.T('Erste Lesung im Bundestag', 'First reading in the Bundestag'), h.dl(KG.ersteLesung), h.T('erfolgt', 'held')],
      [h.T('Ausschussberatung, zweite und dritte Lesung', 'Committee stage, second and third reading'), '–', h.T('offen', 'pending')],
      [h.T('Bundesrat, Verkündung', 'Bundesrat, promulgation'), '–', h.T('offen', 'pending')],
    ], h.T(`Kindergeld 2027: Gesetzgebung, Stand ${h.dl(K.P.retrieved_at)}`, `Kindergeld 2027: legislation, as of ${h.dl(K.P.retrieved_at)}`), ['l', 'l', 'l'])}
<p>The source is the ${h.src('btdrs-21-8235', 'bill on the Bundestag document server')}. The amount can still change before promulgation; committees often amend bills. The current wording is in ${h.src('estg66', 'section 66 EStG')}.</p>
<h2>What the bill proposes</h2>
${h.table([h.T('Ab', 'From'), h.T('Kindergeld je Kind und Monat', 'Kindergeld per child per month'), h.T('Rechtsstand', 'Legal status')], [
      [h.dl('2026-01-01'), h.eur(KG.betrag2026), h.T('geltendes Recht', 'law in force')],
      [h.dl('2027-01-01'), h.eur(KG.betrag2027Entwurf), h.T('Entwurf, + ', 'draft, + ') + h.eur(plus)],
      [h.dl('2028-01-01'), h.eur(KG.betrag2028Entwurf), h.T('Entwurf, + ', 'draft, + ') + h.eur(plus28)],
    ], h.T('Kindergeld: geltender Betrag und Entwurf', 'Kindergeld: current amount and draft'), ['l', 'r', 'l'])}
<h2>The dates are already fixed</h2>
<p>Whatever the amount, the Familienkasse pays in January 2027 from ${h.dl(j0)} to ${h.dl(j9)}. Every month is on ${h.a('kindergeld-termine-2027', 'Kindergeld dates 2027')}; your own list with a calendar file comes from the ${h.a('home', 'payment calendar')}. Other 2027 figures are not settled either: the standard rate for ${h.a('grundsicherungsgeld-2027', 'Grundsicherungsgeld 2027')} and the ${h.a('rentenerhoehung-2027', 'pension increase 2027')}.</p>
${h.mini('kg', { p: ['endziffer'], d: { monat: '2027-01' }, t: 'First Kindergeld of 2027' })}`,
  },
});
