/** Bankarbeitstage 2027 : comparaison avec 2026, Pâques en mars, jours fériés tombant le week-end. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong, monatName } from '../../lib/tool-specs';

const Y = 2027;
const tage = (y: number) => Array.from({ length: 12 }, (_, i) => K.bankarbeitstage(y, i + 1));
const t27 = tage(Y), t26 = tage(2026);
const s27 = t27.reduce((a, b) => a + b, 0), s26 = t26.reduce((a, b) => a + b, 0);
const frei = K.bankFeiertage(Y);
const amWE = frei.filter((f) => K.isWeekend(K.fromIso(f.date)));
const ostern = K.ostersonntag(Y);
const karfreitag = frei.find((f) => f.id === 'karfreitag')!.date;
const ersterJan = K.ersterBankarbeitstag(Y, 1);
const minM = t27.indexOf(Math.min(...t27)) + 1;

export default defineGuide({
  id: 'bankarbeitstage-2027', group: 'kalender', order: 33, tool: 'bat', toolArg: { jahr: 2027, m: 1 },
  related: ['bankarbeitstage-2026', 'auszahlungstermine-2027', 'rente-auszahlung-2027', 'kindergeld-termine-2027'],
  sources: ['ecb-target', 'ostern-ptb', 'einigungsvertrag', 'sgb6-118'],
  countdown: { date: ersterJan, label: { de: 'erster Bankarbeitstag 2027', en: 'first bank business day of 2027' } },
  de: {
    slug: 'bankarbeitstage-2027', nav: 'Bankarbeitstage 2027', card: 'Mehr Buchungstage als 2026',
    title: 'Bankarbeitstage 2027: alle Monate, Feiertage, TARGET',
    description: 'Bankarbeitstage 2027 in Deutschland: Anzahl je Monat im Vergleich zu 2026, Ostern im März, Feiertage am Wochenende und der erste Bankarbeitstag im Januar.',
    h1: 'Bankarbeitstage 2027: das Buchungsjahr im Überblick',
    intro: 'Monat 2027 wählen: Der Rechner zeigt die Bankarbeitstage, den ersten und letzten im Monat und alle bankfreien Feiertage des Jahres.',
    resume: `2027 zählt ${s27} Bankarbeitstage, ${s27 - s26} mehr als 2026 mit ${s26}. Der Grund: Gleich vier bundesweite Feiertage fallen auf ein Wochenende, nämlich der Tag der Arbeit auf einen Samstag, der Tag der Deutschen Einheit auf einen Sonntag und beide Weihnachtstage auf Samstag und Sonntag. Das Jahr beginnt mit Neujahr an einem Freitag, der erste Bankarbeitstag ist deshalb der ${dLong(ersterJan, 'de')}. Ostern liegt früh: Ostersonntag ist der ${dLong(ostern, 'de')}, Karfreitag der ${dLong(karfreitag, 'de')}, und beide Ostertage fallen in den März. Am wenigsten Bankarbeitstage hat der ${monatName(minM, 'de')} mit ${t27[minM - 1]}, weil Christi Himmelfahrt und Pfingstmontag in ihn fallen. Der Dezember hat ${t27[11]} Bankarbeitstage, Silvester ist ein Freitag. Auf diesem Kalender beruhen alle berechneten Zahltermine 2027 auf dieser Website, von der Rente bis zum Arbeitslosengeld.`,
    faqs: [
      { q: 'Wie viele Bankarbeitstage hat 2027?', a: `${s27}. Das sind ${s27 - s26} mehr als 2026, weil 2027 vier bundesweite Feiertage auf Samstag oder Sonntag fallen und dadurch keinen Werktag kosten. Gezählt sind Montag bis Freitag ohne bundesweite Feiertage und TARGET-Schließtage. Ein Bankarbeitstag mehr oder weniger ändert nichts an der Regel, nach der Rente und Grundsicherungsgeld gezahlt werden.` },
      { q: 'Wann ist der erste Bankarbeitstag 2027?', a: `Der ${dLong(ersterJan, 'de')}. Neujahr ist ein Freitag, darauf folgt das Wochenende. Wer Geld erwartet, das am ersten Arbeitstag des Jahres verfügbar sein soll, etwa Arbeitslosengeld für Dezember, bekommt es an diesem Montag. Kindergeld für Januar kommt erst später im Monat, nach der Liste der Familienkasse.` },
      { q: 'Welche Feiertage 2027 liegen am Wochenende?', a: `${amWE.map((f) => `${f.name.de} (${dLong(f.date, 'de')})`).join(', ')}. An diesen Tagen wäre ohnehin nicht gebucht worden, deshalb verschieben sie keinen Zahltermin. Rente und Grundsicherungsgeld verschieben sich 2027 deshalb nur wegen Samstagen und Sonntagen am Monatsende.` },
    ],
    body: (h) => `<h2>2027 und 2026 im Vergleich</h2>
${h.table([h.T('Monat', 'Month'), '2027', '2026', h.T('Letzter Bankarbeitstag 2027', 'Last bank business day 2027')], Array.from({ length: 12 }, (_, i) => [monatName(i + 1, h.lang), t27[i], t26[i], h.ds(K.letzterBankarbeitstag(Y, i + 1))]), h.T(`Bankarbeitstage je Monat: 2027 zusammen ${s27}, 2026 zusammen ${s26}`, `Bank business days by month: ${s27} in 2027, ${s26} in 2026`), ['l', 'r', 'r', 'l'])}
<p>Der letzte Bankarbeitstag ist der Rentenzahltag nach ${h.src('sgb6-118', '§ 118 SGB VI')}. Alle Zahltermine des Jahres, die daraus folgen, stehen unter ${h.a('auszahlungstermine-2027', 'Auszahlungstermine 2027')}.</p>
<h2>Bankfreie Tage 2027</h2>
${h.table([h.T('Feiertag', 'Holiday'), h.T('Datum', 'Date'), h.T('Kostet einen Bankarbeitstag', 'Costs a business day')], frei.map((f) => [f.name[h.lang], h.wday(f.date), K.isWeekend(K.fromIso(f.date)) ? h.T('nein, Wochenende', 'no, weekend') : h.T('ja', 'yes')]), h.T('Bundesweite Feiertage 2027', 'Nationwide holidays 2027'), ['l', 'l', 'l'])}
<p>Ostersonntag nach der ${h.src('ostern-ptb', 'Osterformel der PTB')} ist 2027 der ${h.dl(ostern)}. Der Tag der Deutschen Einheit nach dem ${h.src('einigungsvertrag', 'Einigungsvertrag')} fällt auf einen Sonntag. Welche Tage auch Schließtage des europäischen Systems sind, steht bei der ${h.src('ecb-target', 'Europäischen Zentralbank')}. Zum Vergleich: ${h.a('bankarbeitstage-2026', 'Bankarbeitstage 2026')}.</p>
${h.mini('bat', { p: ['m'], d: { jahr: 2027, m: 3 }, t: 'Bankarbeitstage in Ihrem Monat 2027' })}`,
  },
  en: {
    slug: 'bank-business-days-2027', nav: 'Bank business days 2027', card: 'More booking days than in 2026',
    title: 'Bank business days 2027 in Germany: months and holidays',
    description: 'German bank business days 2027: number per month compared with 2026, Easter in March, holidays on weekends and the first bank business day of January.',
    h1: 'Bank business days 2027: the booking year at a glance',
    intro: 'Pick a month of 2027: the tool shows the bank business days, the first and last in the month and every bank holiday of the year.',
    resume: `2027 has ${s27} bank business days, ${s27 - s26} more than 2026 with ${s26}. The reason: four nationwide holidays fall on a weekend, namely Labour Day on a Saturday, German Unity Day on a Sunday, and both Christmas days on Saturday and Sunday. The year starts with New Year's Day on a Friday, so the first bank business day is ${dLong(ersterJan, 'en')}. Easter is early: Easter Sunday is ${dLong(ostern, 'en')}, Good Friday ${dLong(karfreitag, 'en')}, and both Easter holidays fall in March. ${monatName(minM, 'en')} has the fewest bank business days with ${t27[minM - 1]}, because Ascension Day and Whit Monday fall in it. December has ${t27[11]} bank business days, and New Year's Eve is a Friday. Every calculated payment date for 2027 on this site, from pensions to unemployment benefit, rests on this calendar.`,
    faqs: [
      { q: 'How many bank business days does 2027 have?', a: `${s27}. That is ${s27 - s26} more than in 2026, because in 2027 four nationwide holidays fall on a Saturday or Sunday and so cost no weekday. The count covers Monday to Friday without nationwide holidays and TARGET closing days. One business day more or less does not change the rules for pensions.` },
      { q: 'When is the first bank business day of 2027?', a: `${dLong(ersterJan, 'en')}. New Year's Day is a Friday, followed by the weekend. Money due on the first working day of the year, such as unemployment benefit for December, arrives on that Monday. Kindergeld for January follows later in the month, on the Familienkasse list.` },
      { q: 'Which 2027 holidays fall on a weekend?', a: `${amWE.map((f) => `${f.name.en} (${dLong(f.date, 'en')})`).join(', ')}. No bookings would have happened on those days anyway, so they do not move any payment date. Pensions and Grundsicherungsgeld in 2027 therefore only move for weekends.` },
    ],
    body: (h) => `<h2>2027 and 2026 compared</h2>
${h.table([h.T('Monat', 'Month'), '2027', '2026', h.T('Letzter Bankarbeitstag 2027', 'Last bank business day 2027')], Array.from({ length: 12 }, (_, i) => [monatName(i + 1, h.lang), t27[i], t26[i], h.ds(K.letzterBankarbeitstag(Y, i + 1))]), h.T(`Bankarbeitstage je Monat: 2027 zusammen ${s27}, 2026 zusammen ${s26}`, `Bank business days by month: ${s27} in 2027, ${s26} in 2026`), ['l', 'r', 'r', 'l'])}
<p>The last bank business day is the pension payment day under ${h.src('sgb6-118', 'section 118 SGB VI')}. Every payment date of the year that follows from it is on ${h.a('auszahlungstermine-2027', 'payment dates 2027')}.</p>
<h2>Bank holidays 2027</h2>
${h.table([h.T('Feiertag', 'Holiday'), h.T('Datum', 'Date'), h.T('Kostet einen Bankarbeitstag', 'Costs a business day')], frei.map((f) => [f.name[h.lang], h.wday(f.date), K.isWeekend(K.fromIso(f.date)) ? h.T('nein, Wochenende', 'no, weekend') : h.T('ja', 'yes')]), h.T('Bundesweite Feiertage 2027', 'Nationwide holidays 2027'), ['l', 'l', 'l'])}
<p>Easter Sunday under the ${h.src('ostern-ptb', 'PTB Easter formula')} is ${h.dl(ostern)} in 2027. German Unity Day under the ${h.src('einigungsvertrag', 'Unification Treaty')} falls on a Sunday. Which days are also closing days of the European system is published by the ${h.src('ecb-target', 'European Central Bank')}. For comparison: ${h.a('bankarbeitstage-2026', 'bank business days 2026')}.</p>
${h.mini('bat', { p: ['m'], d: { jahr: 2027, m: 3 }, t: 'Bank business days in your month of 2027' })}`,
  },
});
