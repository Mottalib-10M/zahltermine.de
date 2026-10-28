/** Grundsicherungsgeld (früher Bürgergeld) 2027 : calendrier calculé et état du Regelbedarf (non fixé). */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong } from '../../lib/tool-specs';
import { gsJahr } from './_tabellen';

const G = K.P.grundsicherung;
const T27 = Array.from({ length: 12 }, (_, i) => K.grundsicherung(2027, i + 1));
const vor = T27.filter((d, i) => d !== K.monatsletzter(...K.vormonat(2027, i + 1))).length;

export default defineGuide({
  id: 'grundsicherungsgeld-2027', group: 'leistungen', order: 22, tool: 'gs', toolArg: { monat: '2027-03' },
  related: ['grundsicherungsgeld-auszahlung', 'grundsicherungsgeld-dezember-2026', 'kindergeld-erhoehung-2027', 'auszahlungstermine-2027'],
  sources: ['sgb2-42', 'ba-gs-auszahlung', 'breg-nullrunde', 'sgb12-40', 'sgb12-28a'],
  de: {
    slug: 'grundsicherungsgeld-2027', nav: 'Grundsicherungsgeld 2027', card: 'Zahltage 2027, Regelbedarf noch offen',
    title: 'Grundsicherungsgeld (früher Bürgergeld) 2027: Termine',
    description: 'Grundsicherungsgeld (früher Bürgergeld) 2027: alle zwölf Zahltage, berechnet nach § 42 SGB II, und der Stand zum Regelbedarf, der noch nicht feststeht.',
    h1: 'Grundsicherungsgeld (früher Bürgergeld) 2027: Zahltage und Regelbedarf',
    intro: 'Monat 2027 wählen: Der Rechner zeigt den Zahltag für diesen Monat und alle Termine des Jahres.',
    resume: `Für 2027 steht beim Grundsicherungsgeld (früher Bürgergeld) bisher nur der Zahlungsrhythmus fest, nicht der Betrag. Die Zahltage folgen aus § 42 SGB II und dem Hinweis der Bundesagentur für Arbeit, dass das Geld einen Kalendertag vor dem Monat bereitsteht. Das erste Geld des Jahres, für Januar 2027, kommt am ${dLong(T27[0], 'de')}; das für Dezember 2027 am ${dLong(T27[11], 'de')}. In ${vor} Monaten fällt der Vormonatsletzte auf ein Wochenende, und die Zahlung rückt nach unserer Rechnung auf den Bankarbeitstag davor. Beim Regelbedarf gilt seit dem 1. Januar 2024 für Alleinstehende ${G.regelbedarf1} Euro im Monat; 2025 und 2026 gab es keine Erhöhung, weil der errechnete Wert darunter lag und die Besitzschutzregelung eine Senkung verhindert. Die Fortschreibung für 2027 legt nach § 40 SGB XII eine Verordnung bis zum 31. Oktober fest. Bis zum ${dLong(K.P.retrieved_at, 'de')} haben wir keine veröffentlichte Verordnung für 2027 gefunden. Nach geltendem Recht kann der Betrag nicht unter ${G.regelbedarf1} Euro sinken.`,
    faqs: [
      { q: 'Steigt das Bürgergeld 2027?', a: `Für das Grundsicherungsgeld (früher Bürgergeld) ist der Regelbedarf 2027 noch nicht festgesetzt. Seit Januar 2024 liegt er für Alleinstehende bei ${G.regelbedarf1} Euro. Die Fortschreibung erfolgt per Verordnung bis Ende Oktober; wir übernehmen den neuen Wert, sobald er veröffentlicht ist. Wegen des Besitzschutzes kann er nicht sinken.` },
      { q: 'Wann kommt das erste Grundsicherungsgeld 2027?', a: `Das Geld für Januar 2027 kommt am ${dLong(T27[0], 'de')}, also noch im alten Jahr. Das Geld für Februar folgt am ${dLong(T27[1], 'de')}, einem Freitag, weil der 31. Januar 2027 ein Sonntag ist. Im Rechner oben können Sie jeden Monat 2027 einzeln aufrufen.` },
      { q: 'Muss ich für 2027 einen neuen Antrag stellen?', a: 'Nur wenn Ihr Bewilligungszeitraum endet. Grundsicherungsgeld wird in der Regel für zwölf Monate bewilligt, manchmal für sechs. Vor dem Ende ist ein Weiterbewilligungsantrag nötig; ein Jahreswechsel allein löst keinen neuen Antrag aus. Den Zeitraum nennt Ihr Bescheid. Eine neue Höhe setzt das Jobcenter von sich aus um.' },
    ],
    body: (h) => `<h2>Zahltermine 2027</h2>
${gsJahr(h, 2027)}
<p>Berechnet nach ${h.src('sgb2-42', '§ 42 SGB II')} und dem Hinweis der ${h.src('ba-gs-auszahlung', 'Bundesagentur für Arbeit')}. Fällt der letzte Tag des Vormonats auf ein Wochenende oder einen bundesweiten Feiertag, nennt die BA keinen eigenen Tag; wir rechnen mit dem Bankarbeitstag davor und kennzeichnen den Termin als berechnet.</p>
<h2>Regelbedarf 2027: was feststeht</h2>
${h.table([h.T('Jahr', 'Year'), h.T('Regelbedarfsstufe 1', 'Standard rate level 1'), h.T('Stand', 'Status')], [
      ['2024', h.eur(G.regelbedarf1), h.T('festgesetzt', 'set')],
      ['2025', h.eur(G.regelbedarf1), h.T('unverändert (Besitzschutz)', 'unchanged (protection rule)')],
      ['2026', h.eur(G.regelbedarf1), h.T('unverändert (Besitzschutz)', 'unchanged (protection rule)')],
      ['2027', h.T(`mindestens ${h.eur(G.regelbedarf1)}`, `at least ${h.eur(G.regelbedarf1)}`), h.T('noch nicht festgesetzt', 'not yet set')],
    ], h.T('Regelbedarf für Alleinstehende, 2024 bis 2027', 'Standard rate for single adults, 2024 to 2027'), ['l', 'r', 'l'])}
<p>Die Werte 2024 bis 2026 nennt die ${h.src('breg-nullrunde', 'Bundesregierung')}. Die jährliche Fortschreibung regeln ${h.src('sgb12-28a', '§ 28a SGB XII')} und ${h.src('sgb12-40', '§ 40 SGB XII')}; nach Absatz 5 von § 28a darf ein einmal festgesetzter Betrag nicht sinken. Diese Seite rechnet keine Beträge aus und kennt Ihren Bedarf nicht; maßgeblich ist der Bescheid des Jobcenters.</p>
<p>Auch beim ${h.a('kindergeld-erhoehung-2027', 'Kindergeld')} ist der Betrag 2027 noch offen. Alle Leistungen eines Monats 2027 zeigt ${h.a('auszahlungstermine-2027', 'Auszahlungstermine 2027')}.</p>
${h.mini('gs', { p: ['monat'], d: { monat: '2027-08' }, t: 'Grundsicherungsgeld 2027: Ihr Monat' })}`,
  },
  en: {
    slug: 'grundsicherungsgeld-2027', nav: 'Grundsicherungsgeld 2027', card: '2027 payment days, rate still open',
    title: 'Grundsicherungsgeld (formerly Bürgergeld) 2027: dates',
    description: 'Grundsicherungsgeld (formerly Bürgergeld) 2027: all twelve payment days, calculated under section 42 SGB II, and the 2027 standard rate, not yet set today.',
    h1: 'Grundsicherungsgeld (formerly Bürgergeld) 2027: payment days and rate',
    intro: 'Pick a 2027 month: the tool shows the payment day for that month and every date of the year.',
    resume: `For 2027, only the payment rhythm of Grundsicherungsgeld (formerly Bürgergeld) is settled so far, not the amount. The payment days follow from section 42 SGB II and the Federal Employment Agency guidance that the money is available one calendar day before the month. The first money of the year, for January 2027, arrives on ${dLong(T27[0], 'en')}; the money for December 2027 on ${dLong(T27[11], 'en')}. In ${vor} months the last day of the previous month falls on a weekend, and by our calculation the payment moves to the bank business day before. The standard rate for a single adult has been ${G.regelbedarf1} euros a month since 1 January 2024; there was no increase in 2025 or 2026 because the calculated figure was lower and the protection rule prevents a cut. Under section 40 SGB XII, a regulation sets the 2027 update by 31 October. As of ${dLong(K.P.retrieved_at, 'en')} we have found no published regulation for 2027. Under current law the amount cannot fall below ${G.regelbedarf1} euros.`,
    faqs: [
      { q: 'Will Bürgergeld rise in 2027?', a: `For Grundsicherungsgeld (formerly Bürgergeld), the 2027 standard rate has not been set. Since January 2024 it has been ${G.regelbedarf1} euros for a single adult. The update is made by regulation by the end of October; we will adopt the new figure once it is published. Under the protection rule it cannot go down.` },
      { q: 'When does the first Grundsicherungsgeld of 2027 arrive?', a: `The money for January 2027 arrives on ${dLong(T27[0], 'en')}, still in the old year. February's money follows on ${dLong(T27[1], 'en')}, a Friday, because 31 January 2027 is a Sunday. The tool above shows every month of 2027 one by one, with the reason for any shift.` },
      { q: 'Do I need to apply again for 2027?', a: 'Only if your award period ends. Grundsicherungsgeld is usually awarded for twelve months, sometimes for six. You need a renewal application before it ends; the new year on its own does not trigger one. Your award notice states the period.' },
    ],
    body: (h) => `<h2>Payment dates 2027</h2>
${gsJahr(h, 2027)}
<p>Calculated under ${h.src('sgb2-42', 'section 42 SGB II')} and the ${h.src('ba-gs-auszahlung', 'Federal Employment Agency')} guidance. If the last day of the previous month is a weekend or a nationwide holiday, the agency gives no separate day; we use the bank business day before and label the date as calculated.</p>
<h2>Standard rate 2027: what is settled</h2>
${h.table([h.T('Jahr', 'Year'), h.T('Regelbedarfsstufe 1', 'Standard rate level 1'), h.T('Stand', 'Status')], [
      ['2024', h.eur(G.regelbedarf1), h.T('festgesetzt', 'set')],
      ['2025', h.eur(G.regelbedarf1), h.T('unverändert (Besitzschutz)', 'unchanged (protection rule)')],
      ['2026', h.eur(G.regelbedarf1), h.T('unverändert (Besitzschutz)', 'unchanged (protection rule)')],
      ['2027', h.T(`mindestens ${h.eur(G.regelbedarf1)}`, `at least ${h.eur(G.regelbedarf1)}`), h.T('noch nicht festgesetzt', 'not yet set')],
    ], h.T('Regelbedarf für Alleinstehende, 2024 bis 2027', 'Standard rate for single adults, 2024 to 2027'), ['l', 'r', 'l'])}
<p>The ${h.src('breg-nullrunde', 'Federal Government')} gives the 2024 to 2026 figures. The annual update is governed by ${h.src('sgb12-28a', 'section 28a SGB XII')} and ${h.src('sgb12-40', 'section 40 SGB XII')}; under subsection 5 of section 28a an amount once set may not fall. This site calculates no amounts and does not know your needs; the Jobcenter's notice is what counts.</p>
<p>The 2027 amount for ${h.a('kindergeld-erhoehung-2027', 'Kindergeld')} is still open too. Every benefit for a 2027 month is on ${h.a('auszahlungstermine-2027', 'payment dates 2027')}.</p>
${h.mini('gs', { p: ['monat'], d: { monat: '2027-08' }, t: 'Grundsicherungsgeld 2027: your month' })}`,
  },
});
