/** Vue annuelle 2027 : tous les jours de paiement par mois (Kindergeld publié, autres prestations calculées). */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong, dShort, monatName } from '../../lib/tool-specs';

const Y = 2027;
const kg0 = (m: number) => K.kindergeld(Y, m, 0)!, kg9 = (m: number) => K.kindergeld(Y, m, 9)!;
const ersterTermin = [K.alg(2026, 12), K.kindergeld(Y, 1, 0)!].sort()[0];
const ballung = Array.from({ length: 12 }, (_, i) => i + 1).filter((m) => K.renteNach(Y, m) === K.grundsicherung(...K.folgemonat(Y, m)));
const frueh = Array.from({ length: 12 }, (_, i) => i + 1).sort((a, b) => Number(K.renteNach(Y, a).slice(8)) - Number(K.renteNach(Y, b).slice(8)))[0];

export default defineGuide({
  id: 'auszahlungstermine-2027', group: 'kalender', order: 30, tool: 'mo', toolArg: { monat: '2027-01', endziffer: 0 },
  related: ['kindergeld-termine-2027', 'rente-auszahlung-2027', 'grundsicherungsgeld-2027', 'bankarbeitstage-2027'],
  sources: ['ba-kg-termine', 'sgb6-118', 'sgb2-42', 'sgb3-337', 'ecb-target'],
  countdown: { date: ersterTermin, label: { de: 'erster Zahltag 2027', en: 'first payment day of 2027' } },
  de: {
    slug: 'auszahlungstermine-2027', nav: 'Auszahlungstermine 2027', card: 'Alle Leistungen, Monat für Monat',
    title: 'Auszahlungstermine 2027: Kindergeld, Rente und mehr',
    description: 'Auszahlungstermine 2027 auf einen Blick: Kindergeld nach Endziffer, Rente, Grundsicherungsgeld, Arbeitslosengeld, Wohngeld und BAföG, Monat für Monat.',
    h1: 'Auszahlungstermine 2027: alle Zahltage in einer Tabelle',
    intro: 'Monat und Endziffer wählen: Der Rechner listet alle Zahltage dieses Monats nach Datum, von Kindergeld bis Arbeitslosengeld.',
    resume: `Für 2027 liegen die Termine schon fest. Die Familienkasse hat ihre Kindergeld-Liste für das ganze Jahr veröffentlicht: Im Januar kommt das Kindergeld je nach Endziffer zwischen dem ${dLong(kg0(1), 'de')} und dem ${dLong(kg9(1), 'de')}. Die übrigen Zahltage folgen aus dem Gesetz und dem Kalender der Bankarbeitstage. Die Rente für Januar kommt am ${dLong(K.renteNach(Y, 1), 'de')}, weil der 31. ein Sonntag ist; im Februar ist es mit dem ${dLong(K.renteNach(Y, 2), 'de')} der früheste Rententermin des Jahres. Grundsicherungsgeld (früher Bürgergeld) für Januar war schon am ${dLong(K.grundsicherung(Y, 1), 'de')} da, und in jedem Monat 2027 kommt das Geld für den Folgemonat am selben Tag wie die Rente. Arbeitslosengeld für Dezember 2026 ist am ${dLong(K.alg(2026, 12), 'de')} verfügbar, nach Neujahr und Wochenende. Wohngeld und BAföG werden im Voraus gezahlt, ihren genauen Tag legt die Behörde fest. Die Tabelle unten zeigt jeden Monat; der Rechner oben ordnet einen Monat nach Datum.`,
    faqs: [
      { q: 'Sind die Kindergeld-Termine 2027 schon amtlich?', a: 'Ja. Die Familienkasse hat die Auszahlungstermine für 2027 bereits veröffentlicht, wir haben sie unverändert übernommen. Alle anderen Termine auf dieser Seite sind aus der jeweiligen gesetzlichen Regel und den bundesweiten Bankfeiertagen berechnet und als solche gekennzeichnet. Ändert die Familienkasse einen Termin nachträglich, passen wir die Tabelle an und vermerken das Datum der Änderung.' },
      { q: 'Welcher Monat 2027 hat die frühesten Zahltage?', a: `Der Februar. Der 27. und 28. Februar 2027 fallen auf ein Wochenende, deshalb kommen Rente für Februar und Grundsicherungsgeld für März schon am ${dLong(K.renteNach(Y, 2), 'de')}. Ähnlich früh ist es im Januar, Juli und Oktober, wenn der Monatsletzte ebenfalls auf ein Wochenende fällt.` },
      { q: 'Kommen Rente und Grundsicherungsgeld am selben Tag?', a: `Ja, nach unserer Rechnung in allen ${ballung.length} Monaten 2027. Beide richten sich nach dem Monatsende und rücken bei Wochenende oder Feiertag auf den Bankarbeitstag davor: die Rente für den laufenden Monat, das Grundsicherungsgeld für den nächsten. Wer beides bezieht, bekommt also zwei Gutschriften am selben Tag.` },
    ],
    body: (h) => `<h2>Zahltage 2027 nach Monat</h2>
<p>Je Kalendermonat: Kindergeld (Endziffer 0 bis 9) nach der ${h.src('ba-kg-termine', 'Liste der Familienkasse')}, Rente nach ${h.src('sgb6-118', '§ 118 SGB VI')}, Grundsicherungsgeld für den Folgemonat nach ${h.src('sgb2-42', '§ 42 SGB II')} und Arbeitslosengeld für den Vormonat nach ${h.src('sgb3-337', '§ 337 SGB III')}.</p>
${h.table([h.T('Monat', 'Month'), 'Kindergeld', h.T('Rente', 'Pension'), h.T('Grundsicherungsgeld (Folgemonat)', 'Grundsicherungsgeld (next month)'), h.T('Arbeitslosengeld (Vormonat)', 'Unemployment benefit (previous month)')], Array.from({ length: 12 }, (_, i) => { const m = i + 1; return [monatName(m, h.lang), `${Number(kg0(m).slice(8))}.–${dShort(kg9(m), h.lang)}`, dShort(K.renteNach(Y, m), h.lang), dShort(K.grundsicherung(...K.folgemonat(Y, m)), h.lang), dShort(K.alg(...K.vormonat(Y, m)), h.lang)]; }), h.T('Auszahlungstermine 2027 je Kalendermonat', 'Payment dates 2027 by calendar month'), ['l', 'l', 'l', 'l', 'l'])}
<p>Gerechnet wird mit Bankarbeitstagen: Montag bis Freitag ohne bundesweite Feiertage und ohne ${h.src('ecb-target', 'TARGET-Schließtage')}. Der frühste Rententermin im Monat ist 2027 der ${h.dl(K.renteNach(Y, frueh))}.</p>
<h2>Die Termine je Leistung</h2>
<p>Ausführlich mit Erklärungen: ${h.a('kindergeld-termine-2027', 'Kindergeld Termine 2027')} mit allen Endziffern, ${h.a('rente-auszahlung-2027', 'Rente Auszahlung 2027')} mit Rentenbeginn vor 2004, ${h.a('grundsicherungsgeld-2027', 'Grundsicherungsgeld 2027')}, dazu ${h.a('arbeitslosengeld-auszahlung', 'Arbeitslosengeld')} und ${h.a('wohngeld-auszahlung', 'Wohngeld')}. Den ganzen Kalender der Bankarbeitstage zeigt ${h.a('bankarbeitstage-2027', 'Bankarbeitstage 2027')}.</p>
<h2>Ihr persönlicher Kalender</h2>
<p>Wer mehrere Leistungen bezieht, wählt sie im ${h.a('home', 'Zahltermin-Kalender')} aus und lädt die Termine als Kalenderdatei herunter. Die Datei entsteht in Ihrem Browser; es wird nichts übertragen.</p>
${h.mini('mo', { p: ['monat'], d: { monat: '2027-07', endziffer: 5 }, t: 'Alle Zahltage in Ihrem Monat' })}`,
  },
  en: {
    slug: 'payment-dates-2027', nav: 'Payment dates 2027', card: 'Every benefit, month by month',
    title: 'Payment dates 2027 for German benefits: Kindergeld, pension',
    description: 'German benefit payment dates 2027 at a glance: Kindergeld by last digit, pension, Grundsicherungsgeld, unemployment and housing benefit, BAföG, by month.',
    h1: 'Payment dates 2027: every payment day in one table',
    intro: 'Pick a month and last digit: the tool lists every payment day in that month by date, from Kindergeld to unemployment benefit.',
    resume: `The 2027 dates are already settled. The Familienkasse has published its Kindergeld list for the whole year: in January, Kindergeld arrives between ${dLong(kg0(1), 'en')} and ${dLong(kg9(1), 'en')}, depending on the last digit. The other payment days follow from the law and the calendar of bank business days. The January pension arrives on ${dLong(K.renteNach(Y, 1), 'en')}, because the 31st is a Sunday; in February, ${dLong(K.renteNach(Y, 2), 'en')} is the earliest pension date of the year. Grundsicherungsgeld (formerly Bürgergeld) for January was already there on ${dLong(K.grundsicherung(Y, 1), 'en')}, and in every month of 2027 the money for the following month arrives on the same day as the pension. Unemployment benefit for December 2026 is available on ${dLong(K.alg(2026, 12), 'en')}, after New Year and the weekend. Housing benefit and BAföG are paid in advance, with the exact day set by the office. The table below covers every month; the tool above sorts one month by date.`,
    faqs: [
      { q: 'Are the 2027 Kindergeld dates official?', a: 'Yes. The Familienkasse has already published its payment dates for 2027, and we have copied them unchanged. All other dates on this page are calculated from the relevant legal rule and the nationwide bank holidays, and are labelled as such.' },
      { q: 'Which month of 2027 has the earliest payment days?', a: `February. 27 and 28 February 2027 fall on a weekend, so the February pension and Grundsicherungsgeld for March already arrive on ${dLong(K.renteNach(Y, 2), 'en')}. January, July and October are similar, when the last day of the month also falls on a weekend.` },
      { q: 'Do pension and Grundsicherungsgeld arrive on the same day?', a: `Yes, by our calculation in all ${ballung.length} months of 2027. Both follow the end of the month and move back to the bank business day before a weekend or holiday: the pension for the current month, Grundsicherungsgeld for the next. If you receive both, you get two credits on the same day.` },
    ],
    body: (h) => `<h2>Payment days 2027 by month</h2>
<p>For each calendar month: Kindergeld (last digits 0 to 9) from the ${h.src('ba-kg-termine', 'Familienkasse list')}, pension under ${h.src('sgb6-118', 'section 118 SGB VI')}, Grundsicherungsgeld for the following month under ${h.src('sgb2-42', 'section 42 SGB II')} and unemployment benefit for the previous month under ${h.src('sgb3-337', 'section 337 SGB III')}.</p>
${h.table([h.T('Monat', 'Month'), 'Kindergeld', h.T('Rente', 'Pension'), h.T('Grundsicherungsgeld (Folgemonat)', 'Grundsicherungsgeld (next month)'), h.T('Arbeitslosengeld (Vormonat)', 'Unemployment benefit (previous month)')], Array.from({ length: 12 }, (_, i) => { const m = i + 1; return [monatName(m, h.lang), `${Number(kg0(m).slice(8))}–${dShort(kg9(m), h.lang)}`, dShort(K.renteNach(Y, m), h.lang), dShort(K.grundsicherung(...K.folgemonat(Y, m)), h.lang), dShort(K.alg(...K.vormonat(Y, m)), h.lang)]; }), h.T('Auszahlungstermine 2027 je Kalendermonat', 'Payment dates 2027 by calendar month'), ['l', 'l', 'l', 'l', 'l'])}
<p>The calculation uses bank business days: Monday to Friday without nationwide holidays and without ${h.src('ecb-target', 'TARGET closing days')}. The earliest pension date within a month in 2027 is ${h.dl(K.renteNach(Y, frueh))}.</p>
<h2>Dates for each benefit</h2>
<p>In detail with explanations: ${h.a('kindergeld-termine-2027', 'Kindergeld dates 2027')} with every last digit, ${h.a('rente-auszahlung-2027', 'pension payment dates 2027')} including pensions that started before 2004, ${h.a('grundsicherungsgeld-2027', 'Grundsicherungsgeld 2027')}, plus ${h.a('arbeitslosengeld-auszahlung', 'unemployment benefit')} and ${h.a('wohngeld-auszahlung', 'housing benefit')}. The full calendar of bank business days is on ${h.a('bankarbeitstage-2027', 'bank business days 2027')}.</p>
<h2>Your personal calendar</h2>
<p>If you receive several benefits, select them in the ${h.a('home', 'payment calendar')} and download the dates as a calendar file. The file is created in your browser; nothing is sent.</p>
${h.mini('mo', { p: ['monat'], d: { monat: '2027-07', endziffer: 5 }, t: 'Every payment day in your month' })}`,
  },
});
