/** Kindergeld décembre 2026 : calendrier avancé avant Noël et long écart jusqu'à janvier. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong, dShort } from '../../lib/tool-specs';
import { kgMonat } from './_tabellen';

const k = (e: number) => K.kindergeld(2026, 12, e)!;
const jan = (e: number) => K.kindergeld(2027, 1, e)!;
const gap = (e: number) => K.tageBis(k(e), jan(e));

export default defineGuide({
  id: 'kindergeld-dezember-2026', group: 'kindergeld', order: 4, tool: 'kg', toolArg: { monat: '2026-12', endziffer: 0 },
  related: ['kindergeld-november-2026', 'kindergeld-termine-2027', 'auszahlungstermine-dezember-2026', 'rente-dezember-2026'],
  sources: ['ba-kg-termine', 'estg66'],
  countdown: { date: k(0), label: { de: 'Kindergeld Dezember, Endziffer 0', en: 'Kindergeld December, last digit 0' } },
  de: {
    slug: 'kindergeld-dezember-2026', nav: 'Kindergeld Dezember 2026', card: 'Vom 3. bis 16. Dezember, vor Weihnachten',
    title: 'Kindergeld Dezember 2026: alle Termine vor Weihnachten',
    description: 'Kindergeld Dezember 2026: Die Familienkasse zahlt vom 3. bis zum 16. Dezember, alle Endziffern vor Weihnachten. Mit Tag je Endziffer und der Pause bis Januar.',
    h1: 'Kindergeld im Dezember 2026: alle Zahlungen vor Weihnachten',
    intro: 'Endziffer wählen: Sie sehen Ihren Dezembertermin, den Januartermin 2027 und die Tage aller zehn Endziffern.',
    resume: `Im Dezember 2026 zahlt die Familienkasse das Kindergeld in nur zwei Wochen aus. Endziffer 0 bekommt das Geld am ${dLong(k(0), 'de')}, Endziffer 1 am Freitag, ${dShort(k(1), 'de')}. Nach dem Wochenende folgen Endziffer 2 bis 6 von Montag, ${dShort(k(2), 'de')}, bis Freitag, ${dShort(k(6), 'de')}. Die letzten drei Endziffern kommen am ${dShort(k(7), 'de')}, ${dShort(k(8), 'de')} und ${dLong(k(9), 'de')}. Damit sind alle Zahlungen neun Tage vor dem ersten Weihnachtstag auf den Konten. Der Preis dafür ist eine lange Pause: Das Januargeld 2027 kommt erst ab dem ${dLong(jan(0), 'de')}, für Endziffer 9 am ${dLong(jan(9), 'de')}. Zwischen der Dezember- und der Januarzahlung liegen je nach Endziffer ${gap(0)} bis ${gap(9)} Tage; ähnlich lang ist sonst nur die Pause zwischen März und April, wenn Ostern den April-Lauf verschiebt. Ein Weihnachtsgeld oder eine Sonderzahlung zum Kindergeld gibt es nicht; der Kinderzuschlag kommt wie immer am selben Tag.`,
    faqs: [
      { q: 'Kommt das Kindergeld im Dezember 2026 vor Weihnachten?', a: `Ja, für alle Endziffern. Die letzte Zahlung, Endziffer 9, kommt am ${dLong(k(9), 'de')}. Die Familienkasse zahlt im Dezember früher als in den meisten anderen Monaten, in denen Endziffer 9 erst um den 20. an der Reihe ist. Danach folgt eine lange Pause bis zum Januargeld.` },
      { q: 'Gibt es im Dezember ein doppeltes Kindergeld?', a: 'Nein. Im Dezember wird das Kindergeld für Dezember gezahlt, nicht zusätzlich das für Januar. Weil der Dezembertermin früh liegt und der Januartermin spät, wirkt die Pause über den Jahreswechsel länger als sonst. Einen gesetzlichen Weihnachtszuschlag zum Kindergeld gibt es nicht.' },
      { q: 'Wann kommt danach das Kindergeld für Januar 2027?', a: `Ab dem ${dLong(jan(0), 'de')} für Endziffer 0 bis zum ${dLong(jan(9), 'de')} für Endziffer 9. Das sind ${gap(0)} bis ${gap(9)} Tage nach der Dezemberzahlung. Wer Lastschriften für Anfang Januar hat, sollte sie mit dem Dezembergeld abdecken. Die Januartermine hat die Familienkasse bereits veröffentlicht.` },
    ],
    body: (h) => `<h2>Alle Dezembertermine 2026</h2>
${kgMonat(h, 2026, 12)}
<h2>Die Pause über den Jahreswechsel</h2>
<p>Die folgende Tabelle stellt Dezember 2026 und Januar 2027 nebeneinander. Die Spalte rechts zeigt, wie viele Tage Sie mit dem Dezembergeld auskommen müssen. Der Grund liegt im Kalender: Der Januar beginnt mit Neujahr an einem Freitag und einem Wochenende, die Familienkasse startet ihren Lauf deshalb erst in der zweiten Januarwoche.</p>
${h.table([h.T('Endziffer', 'Last digit'), h.T('Dezember 2026', 'December 2026'), h.T('Januar 2027', 'January 2027'), h.T('Tage dazwischen', 'Days between')], Array.from({ length: 10 }, (_, e) => [String(e), h.ds(k(e)), h.ds(jan(e)), h.n(gap(e))]), h.T('Kindergeld Dezember 2026 und Januar 2027', 'Kindergeld December 2026 and January 2027'), ['r', 'l', 'l', 'r'])}
<h2>Weitere Zahlungen im Dezember</h2>
<p>Die Rente für Dezember kommt am ${h.dl(K.renteNach(2026, 12))}, Silvester; dasselbe gilt für das Grundsicherungsgeld für Januar 2027 (${h.a('rente-dezember-2026', 'Rente Dezember 2026')}). Alle Termine des Monats zeigt ${h.a('auszahlungstermine-dezember-2026', 'Auszahlungstermine Dezember 2026')}. Die Kindergeldtermine stammen aus der ${h.src('ba-kg-termine', 'Liste der Familienkasse')}; den Betrag regelt ${h.src('estg66', '§ 66 EStG')}.</p>
${h.mini('kg', { p: ['endziffer'], d: { monat: '2027-01' }, t: 'Ihr Januartermin 2027' })}`,
  },
  en: {
    slug: 'kindergeld-december-2026', nav: 'Kindergeld December 2026', card: '3 to 16 December, before Christmas',
    title: 'Kindergeld December 2026: every date before Christmas',
    description: 'Kindergeld December 2026: the Familienkasse pays from 3 to 16 December, every last digit before Christmas. With the day for each digit and the gap to January.',
    h1: 'Kindergeld in December 2026: every payment before Christmas',
    intro: 'Pick your last digit: you see your December date, your January 2027 date and the days for all ten digits.',
    resume: `In December 2026 the Familienkasse pays Kindergeld in just two weeks. Last digit 0 receives the money on ${dLong(k(0), 'en')}, digit 1 on Friday ${dShort(k(1), 'en')}. After the weekend, digits 2 to 6 follow from Monday ${dShort(k(2), 'en')} to Friday ${dShort(k(6), 'en')}. The last three digits arrive on ${dShort(k(7), 'en')}, ${dShort(k(8), 'en')} and ${dLong(k(9), 'en')}. Every payment is therefore in accounts nine days before Christmas Day. The price is a long gap: January 2027's money only starts on ${dLong(jan(0), 'en')}, and digit 9 gets it on ${dLong(jan(9), 'en')}. Depending on the digit, ${gap(0)} to ${gap(9)} days separate the December and January payments; only the March to April gap, when Easter pushes the April run back, is similar. There is no Christmas bonus or special payment with Kindergeld; Kinderzuschlag arrives on the same day as always.`,
    faqs: [
      { q: 'Does Kindergeld arrive before Christmas in December 2026?', a: `Yes, for every last digit. The last payment, digit 9, arrives on ${dLong(k(9), 'en')}. The Familienkasse pays earlier in December than in most other months, when digit 9 is only due around the 20th. A long gap until the January money follows.` },
      { q: 'Is Kindergeld paid twice in December?', a: 'No. In December you receive the December Kindergeld, not January\'s as well. Because the December date is early and the January date late, the gap over the new year feels longer than usual. There is no statutory Christmas supplement to Kindergeld.' },
      { q: 'When does January 2027 Kindergeld arrive after that?', a: `From ${dLong(jan(0), 'en')} for last digit 0 to ${dLong(jan(9), 'en')} for digit 9. That is ${gap(0)} to ${gap(9)} days after the December payment. If you have direct debits in early January, cover them with the December money. The Familienkasse has already published the January dates.` },
    ],
    body: (h) => `<h2>Every December 2026 date</h2>
${kgMonat(h, 2026, 12)}
<h2>The gap over the new year</h2>
<p>The table below puts December 2026 and January 2027 side by side. The right-hand column shows how many days the December money has to last. The reason lies in the calendar: January opens with New Year's Day on a Friday followed by a weekend, so the Familienkasse only starts its run in the second week of January.</p>
${h.table([h.T('Endziffer', 'Last digit'), h.T('Dezember 2026', 'December 2026'), h.T('Januar 2027', 'January 2027'), h.T('Tage dazwischen', 'Days between')], Array.from({ length: 10 }, (_, e) => [String(e), h.ds(k(e)), h.ds(jan(e)), h.n(gap(e))]), h.T('Kindergeld Dezember 2026 und Januar 2027', 'Kindergeld December 2026 and January 2027'), ['r', 'l', 'l', 'r'])}
<h2>Other payments in December</h2>
<p>December's pension arrives on ${h.dl(K.renteNach(2026, 12))}, New Year's Eve; so does Grundsicherungsgeld for January 2027 (${h.a('rente-dezember-2026', 'pension December 2026')}). Every date of the month is on ${h.a('auszahlungstermine-dezember-2026', 'payment dates December 2026')}. The Kindergeld dates come from the ${h.src('ba-kg-termine', 'Familienkasse list')}; the amount is set by ${h.src('estg66', 'section 66 EStG')}.</p>
${h.mini('kg', { p: ['endziffer'], d: { monat: '2027-01' }, t: 'Your January 2027 date' })}`,
  },
});
