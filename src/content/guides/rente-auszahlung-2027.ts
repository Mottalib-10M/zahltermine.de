/** Rente 2027 : calculée par la règle (§ 118 SGB VI), la DRV n'a pas encore publié sa liste. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong } from '../../lib/tool-specs';
import { renteJahr } from './_tabellen';

const R = Array.from({ length: 12 }, (_, i) => K.renteNach(2027, i + 1));
const versch = R.filter((d, i) => d !== K.monatsletzter(2027, i + 1));
const fr = R.filter((d) => K.weekday(K.fromIso(d)) === 5).length;

export default defineGuide({
  id: 'rente-auszahlung-2027', group: 'rente', order: 11, tool: 're', toolArg: { monat: '2027-01', beginn: 'nach' },
  related: ['rente-auszahlung-2026', 'rentenerhoehung-2027', 'auszahlungstermine-2027', 'bankarbeitstage-2027'],
  sources: ['sgb6-118', 'sgb6-272a', 'drv-termine', 'ecb-target'],
  countdown: { date: R[0], label: { de: 'erste Rente 2027', en: 'first pension of 2027' } },
  de: {
    slug: 'rente-auszahlung-termine-2027', nav: 'Rente Termine 2027', card: 'Nach § 118 SGB VI berechnet',
    title: 'Rente Auszahlung Termine 2027: die zwölf Zahltage im Voraus',
    description: 'Rente Auszahlungstermine 2027, berechnet nach § 118 SGB VI: letzter Bankarbeitstag jedes Monats, vier Termine vorgezogen. Auch für Rentenbeginn vor 2004.',
    h1: 'Rente Auszahlung 2027: wann die Rente jeden Monat kommt',
    intro: 'Rentenbeginn und Monat 2027 wählen: Der Rechner zeigt den Zahltag, warum er vom Monatsletzten abweicht, und das ganze Jahr.',
    resume: `Die Rentenversicherung hat ihre Terminliste für 2027 noch nicht veröffentlicht; für 2026 erschien sie im Januar. Die Termine lassen sich aber schon heute sicher bestimmen, denn § 118 SGB VI schreibt den Zahltag vor: den letzten Bankarbeitstag des Monats, für den die Rente gilt. Mit dieser Regel trifft unser Rechenkern alle zwölf Termine der amtlichen Liste 2026. Für 2027 ergibt sie: Die erste Rente kommt am ${dLong(R[0], 'de')}, die letzte am ${dLong(R[11], 'de')}. In ${versch.length} Monaten liegt der Monatsletzte auf einem Wochenende, die Rente kommt dann am Freitag davor: im Januar, Februar, Juli und Oktober. ${fr} der zwölf Zahltage sind Freitage. Feiertage am Monatsende gibt es 2027 nicht; Ostern fällt auf den 28. März, der Monatsletzte des März ist ein Mittwoch. Für Renten mit Beginn vor April 2004 gilt nach § 272a SGB VI jeweils der Termin des Vormonats. Veröffentlicht die Rentenversicherung abweichende Termine, übernehmen wir ihre Liste.`,
    faqs: [
      { q: 'Wann wird die Rente im Januar 2027 gezahlt?', a: `Am ${dLong(R[0], 'de')}, einem Freitag. Der 31. Januar 2027 ist ein Sonntag, deshalb rückt die Zahlung auf den letzten Bankarbeitstag davor. Wer seine Rente schon vor April 2004 bezog, erhält am selben Tag bereits die Februarrente; die Januarrente kam bei dieser Gruppe am 31. Dezember 2026.` },
      { q: 'Sind die Termine 2027 amtlich?', a: 'Noch nicht. Sie sind aus der gesetzlichen Regel berechnet, die auch der amtlichen Liste 2026 zugrunde liegt; dieselbe Rechnung reproduziert die zwölf Termine 2026 ohne Abweichung. Die Tabelle kennzeichnet jeden Termin als berechnet, bis die Rentenversicherung ihre Liste 2027 herausgibt.' },
      { q: 'Kommt die Rente 2027 einmal später als am Monatsende?', a: 'Nein. Die Rente wird nie nach dem Monatsletzten gezahlt, sondern bei Wochenende oder Feiertag immer vorher. 2027 ist die früheste Zahlung im Monat der 26. Februar, weil der 27. und 28. Februar auf Samstag und Sonntag fallen. Wer die Rente für Lastschriften am Monatsanfang braucht, hat sie damit immer rechtzeitig.' },
    ],
    body: (h) => `<h2>Rentenzahltermine 2027</h2>
<p>Berechnet nach ${h.src('sgb6-118', '§ 118 Abs. 1 SGB VI')} und ${h.src('sgb6-272a', '§ 272a SGB VI')} mit dem Kalender der Bankarbeitstage: Montag bis Freitag ohne bundesweite Feiertage und ohne ${h.src('ecb-target', 'TARGET-Schließtage')}.</p>
${renteJahr(h, 2027)}
<h2>Vier Monatsenden am Wochenende</h2>
<p>Vorgezogen werden 2027: ${versch.map((d) => h.dl(d)).join(', ')}. Im Mai fällt der 31. auf einen Montag, die Rente kommt also am Monatsletzten, obwohl Pfingstmontag zwei Wochen vorher liegt. Im Dezember ist Silvester ein Freitag und Bankarbeitstag; die Dezemberrente kommt am ${h.dl(R[11])}.</p>
<h2>Wie verlässlich die Rechnung ist</h2>
<p>Unsere Regel reproduziert die ${h.src('drv-termine', 'zwölf amtlichen Termine 2026')} exakt; das prüft ein automatischer Test bei jeder Änderung. Ein Unterschied für 2027 könnte nur entstehen, wenn ein neuer bundesweiter Feiertag beschlossen oder das Gesetz geändert würde. Beides ist für 2027 nicht bekannt. Zum 1. Juli 2027 werden die Renten nach § 65 SGB VI angepasst; die Höhe legt die Bundesregierung per Verordnung fest (${h.a('rentenerhoehung-2027', 'Rentenerhöhung 2027')}). Alle Leistungen eines Monats zusammen zeigt ${h.a('auszahlungstermine-2027', 'Auszahlungstermine 2027')}.</p>
${h.mini('re', { p: ['monat'], d: { monat: '2027-07' }, t: 'Ihr Rentenmonat 2027' })}`,
  },
  en: {
    slug: 'pension-payment-dates-2027', nav: 'Pension dates 2027', card: 'Calculated under section 118 SGB VI',
    title: 'Pension payment dates 2027 in Germany: all twelve days',
    description: 'German pension payment dates 2027, calculated under section 118 SGB VI: last bank business day of each month, four dates brought forward, pre-2004 too.',
    h1: 'German state pension 2027: when it arrives each month',
    intro: 'Pick your pension start and a 2027 month: the tool shows the payment day, why it differs from the last day of the month, and the whole year.',
    resume: `The German Pension Insurance has not yet published its list of payment dates for 2027; the 2026 list came out in January. The dates can nonetheless be fixed today, because section 118 of Social Code Book VI prescribes the payment day: the last bank business day of the month the pension is for. With this rule our engine matches all twelve dates on the official 2026 list. For 2027 it gives: the first pension arrives on ${dLong(R[0], 'en')}, the last on ${dLong(R[11], 'en')}. In ${versch.length} months the last day falls on a weekend and the pension comes on the Friday before: in January, February, July and October. ${fr} of the twelve payment days are Fridays. There are no holidays at a month end in 2027; Easter Sunday is 28 March and 31 March is a Wednesday. Pensions that started before April 2004 use the previous month's date under section 272a. If the pension insurance publishes different dates, we will adopt its list.`,
    faqs: [
      { q: 'When is the German pension paid in January 2027?', a: `On ${dLong(R[0], 'en')}, a Friday. 31 January 2027 is a Sunday, so payment moves to the last bank business day before it. If your pension started before April 2004, that same day brings your February pension; your January pension came on 31 December 2026.` },
      { q: 'Are the 2027 dates official?', a: 'Not yet. They are calculated from the statutory rule behind the official 2026 list, and the same calculation reproduces the twelve 2026 dates without a single difference. The table labels every date as calculated until the pension insurance publishes its 2027 list.' },
      { q: 'Is the pension ever paid after the end of the month in 2027?', a: 'No. The pension is never paid after the last day of the month; on a weekend or holiday it always comes earlier. The earliest payment in a month in 2027 is 26 February, because 27 and 28 February fall on a Saturday and Sunday.' },
    ],
    body: (h) => `<h2>Pension payment dates 2027</h2>
<p>Calculated under ${h.src('sgb6-118', 'section 118(1) SGB VI')} and ${h.src('sgb6-272a', 'section 272a SGB VI')} with the bank business day calendar: Monday to Friday without nationwide holidays and without ${h.src('ecb-target', 'TARGET closing days')}.</p>
${renteJahr(h, 2027)}
<h2>Four month ends on a weekend</h2>
<p>Brought forward in 2027: ${versch.map((d) => h.dl(d)).join(', ')}. In May, the 31st is a Monday, so the pension arrives on the last day even though Whit Monday falls two weeks earlier. In December, New Year's Eve is a Friday and a bank business day; December's pension arrives on ${h.dl(R[11])}.</p>
<h2>How reliable the calculation is</h2>
<p>Our rule reproduces the ${h.src('drv-termine', 'twelve official 2026 dates')} exactly; an automated test checks this on every change. A difference for 2027 could only arise if a new nationwide holiday were introduced or the statute amended, and neither is known for 2027. Pensions are adjusted on 1 July 2027 under section 65 SGB VI; the government sets the rate by regulation (${h.a('rentenerhoehung-2027', 'pension increase 2027')}). Every benefit for a month is on ${h.a('auszahlungstermine-2027', 'payment dates 2027')}.</p>
${h.mini('re', { p: ['monat'], d: { monat: '2027-07' }, t: 'Your 2027 pension month' })}`,
  },
});
