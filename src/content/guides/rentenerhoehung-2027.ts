/** Rentenerhöhung 2027 : rien d'officiel ; procédure (§ 65, § 69 SGB VI), historique sourcé, date du premier versement augmenté. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong } from '../../lib/tool-specs';

const R = K.P.rente;
const A = R.anpassung2026;
const jul27 = K.renteNach(2027, 7), jun27 = K.renteVor(2027, 7);
const de = (x: number) => String(x).replace('.', ',');

export default defineGuide({
  id: 'rentenerhoehung-2027', group: 'rente', order: 14, tool: 're', toolArg: { monat: '2027-07', beginn: 'nach' },
  related: ['rente-auszahlung-2027', 'weihnachtsgeld-rente', 'kindergeld-erhoehung-2027', 'grundsicherungsgeld-2027'],
  sources: ['sgb6-65', 'sgb6-69', 'drv-anpassung'],
  countdown: { date: '2027-07-01', label: { de: 'Rentenanpassung 2027', en: 'pension adjustment 2027' } },
  de: {
    slug: 'rentenerhoehung-2027', nav: 'Rentenerhöhung 2027', card: 'Wann entschieden, wann zuerst gezahlt',
    title: 'Rentenerhöhung 2027: Stand, Termin und erste höhere Zahlung',
    description: 'Rentenerhöhung 2027: Wann der neue Rentenwert festgelegt wird, was bisher bekannt ist und an welchem Tag die erste höhere Rente kommt, auch bei Beginn vor 2004.',
    h1: 'Rentenerhöhung 2027: was feststeht und wann sie ankommt',
    intro: 'Rentenbeginn wählen: Der Rechner zeigt, an welchem Tag die Rente für Juli 2027, die erste nach der Anpassung, auf dem Konto ist.',
    resume: `Wie stark die Renten am 1. Juli 2027 steigen, steht am ${dLong(K.P.retrieved_at, 'de')} noch nicht fest. Nach § 65 SGB VI werden die Renten zum 1. Juli jedes Jahres angepasst; den neuen aktuellen Rentenwert bestimmt die Bundesregierung nach § 69 per Verordnung mit Zustimmung des Bundesrates, spätestens bis zum 30. Juni. Bis 2031 gilt dabei die Haltelinie: Der Wert wird so bestimmt, dass das Rentenniveau bei 48 Prozent liegt, was vor allem von der Lohnentwicklung des Vorjahres abhängt. Bekannt sind die letzten Anpassungen: ${de(R.anpassung2024)} Prozent im Jahr 2024, ${de(R.anpassung2025)} Prozent 2025 und ${de(A.prozent)} Prozent zum 1. Juli 2026, als der Rentenwert von ${de(A.rentenwertAlt)} auf ${de(A.rentenwertNeu)} Euro stieg. Sicher ist der Zahltag: Die erste Rente mit dem neuen Wert ist die Julirente, gezahlt am ${dLong(jul27, 'de')}. Wer vor April 2004 in Rente ging, bekommt sie schon am ${dLong(jun27, 'de')}. Prognosen nennen wir nicht.`,
    faqs: [
      { q: 'Um wie viel Prozent steigt die Rente 2027?', a: 'Das steht noch nicht fest. Den Wert legt die Bundesregierung per Verordnung fest, wenn die Lohndaten des Vorjahres vorliegen, spätestens bis zum 30. Juni 2027. Zahlen, die vorher genannt werden, sind Schätzungen. Wir übernehmen den Wert, sobald er beschlossen und veröffentlicht ist.' },
      { q: 'Wann kommt die erste erhöhte Rente 2027?', a: `Bei Rentenbeginn ab April 2004 am ${dLong(jul27, 'de')}, denn der 31. Juli ist ein Samstag. Bei Rentenbeginn vor April 2004 am ${dLong(jun27, 'de')}, weil diese Renten im Voraus für den Folgemonat gezahlt werden. Die Rentenversicherung verschickt vorher eine Mitteilung über den neuen Betrag.` },
      { q: 'Muss ich die Rentenerhöhung beantragen?', a: 'Nein. Die Anpassung gilt für alle laufenden Renten automatisch. Sie erhalten eine schriftliche Mitteilung mit dem neuen Zahlbetrag, auf dem auch Beiträge zur Kranken- und Pflegeversicherung berücksichtigt sind. Einen Antrag gibt es dafür nicht. Die erste höhere Zahlung kommt mit der Rente für Juli.' },
    ],
    body: (h) => `<h2>Die letzten Anpassungen</h2>
${h.table([h.T('Anpassung zum', 'Adjustment on'), h.T('Erhöhung', 'Increase'), h.T('Quelle', 'Source')], [
      [h.dl('2024-07-01'), `${h.n(R.anpassung2024, 2)} %`, h.src('drv-anpassung', h.T('Rentenversicherung', 'Pension insurance'))],
      [h.dl('2025-07-01'), `${h.n(R.anpassung2025, 2)} %`, h.src('drv-anpassung', h.T('Rentenversicherung', 'Pension insurance'))],
      [h.dl(A.datum), `${h.n(A.prozent, 2)} %`, h.src('drv-anpassung', h.T('Rentenversicherung', 'Pension insurance'))],
      [h.dl('2027-07-01'), h.T('noch nicht festgelegt', 'not yet set'), h.src('sgb6-69', '§ 69 SGB VI')],
    ], h.T('Rentenanpassungen 2024 bis 2027', 'Pension adjustments 2024 to 2027'), ['l', 'r', 'l'])}
<h2>So läuft die Entscheidung</h2>
<p>Bis einschließlich 2031 wird der Rentenwert nach der Haltelinie so festgesetzt, dass das Rentenniveau bei ${R.haltelinie} Prozent liegt; die frühere Anpassungsformel ist so lange ausgesetzt (${h.src('drv-anpassung', 'Rentenversicherung')}). Die Rente folgt damit im Wesentlichen den Löhnen. Die Bundesregierung setzt das Ergebnis per Verordnung fest, der Bundesrat stimmt zu, und der neue Wert gilt ab dem 1. Juli (${h.src('sgb6-65', '§ 65')} und ${h.src('sgb6-69', '§ 69 SGB VI')}). Für 2026 betrug der aktuelle Rentenwert danach ${h.eur(A.rentenwertNeu, 2)} je Entgeltpunkt. Einen eigenen Rechner für den Betrag bietet diese Seite nicht; Ihre Rentenhöhe steht in der Anpassungsmitteilung.</p>
<h2>Die Zahltage rund um den 1. Juli 2027</h2>
${h.table([h.T('Zahltag', 'Payment day'), h.T('Beginn ab 04/2004', 'Started 04/2004 or later'), h.T('Beginn vor 04/2004', 'Started before 04/2004')], [
      [h.wday(K.renteNach(2027, 6)), h.T('Juni, alter Wert', 'June, old value'), h.T('Juli, neuer Wert', 'July, new value')],
      [h.wday(jul27), h.T('Juli, neuer Wert', 'July, new value'), h.T('August, neuer Wert', 'August, new value')],
    ], h.T('Erste Zahlung mit dem Rentenwert ab 1. Juli 2027', 'First payment with the pension value from 1 July 2027'), ['l', 'l', 'l'])}
<p>Alle Termine 2027 stehen unter ${h.a('rente-auszahlung-2027', 'Rente Termine 2027')}. Auch bei ${h.a('kindergeld-erhoehung-2027', 'Kindergeld')} und ${h.a('grundsicherungsgeld-2027', 'Grundsicherungsgeld')} ist der Betrag 2027 noch offen.</p>
${h.mini('re', { p: ['beginn'], d: { monat: '2027-07' }, t: 'Erste Rente nach der Anpassung 2027' })}`,
  },
  en: {
    slug: 'pension-increase-2027', nav: 'Pension increase 2027', card: 'When decided, when first paid',
    title: 'Pension increase 2027 in Germany: status and first payment',
    description: 'German pension increase 2027: when the new pension value is set, what is known so far and on which day the first higher pension arrives, also before 2004.',
    h1: 'German pension increase 2027: what is settled and when it arrives',
    intro: 'Pick your pension start: the tool shows the day on which the July 2027 pension, the first after the adjustment, reaches your account.',
    resume: `How much German pensions will rise on 1 July 2027 is not yet known as of ${dLong(K.P.retrieved_at, 'en')}. Under section 65 of Social Code Book VI pensions are adjusted on 1 July every year; under section 69 the Federal Government sets the new pension value by regulation with the consent of the Bundesrat, by 30 June at the latest. Until 2031 the floor rule applies: the value is set so that the pension level stays at 48 per cent, which depends mainly on the previous year's wage growth. The last adjustments are known: ${R.anpassung2024} per cent in 2024, ${R.anpassung2025} per cent in 2025 and ${A.prozent} per cent on 1 July 2026, when the pension value rose from ${A.rentenwertAlt} to ${A.rentenwertNeu} euros. The payment day is certain: the first pension at the new value is July's, paid on ${dLong(jul27, 'en')}. If your pension started before April 2004, it already comes on ${dLong(jun27, 'en')}. We publish no forecasts.`,
    faqs: [
      { q: 'By what percentage will the German pension rise in 2027?', a: 'That has not been set. The Federal Government fixes the value by regulation once the previous year\'s wage data are in, by 30 June 2027 at the latest. Figures mentioned before then are estimates. We will adopt the value once it has been decided and published.' },
      { q: 'When does the first higher pension arrive in 2027?', a: `For pensions started in April 2004 or later, on ${dLong(jul27, 'en')}, because 31 July is a Saturday. For pensions started before April 2004, on ${dLong(jun27, 'en')}, because those pensions are paid in advance for the following month. The pension insurance sends a notice of the new amount beforehand.` },
      { q: 'Do I have to apply for the pension increase?', a: 'No. The adjustment applies automatically to every pension in payment. You receive a written notice with the new amount, which also takes health and long-term care contributions into account. There is no application for it. The first higher payment comes with the pension for July.' },
    ],
    body: (h) => `<h2>The latest adjustments</h2>
${h.table([h.T('Anpassung zum', 'Adjustment on'), h.T('Erhöhung', 'Increase'), h.T('Quelle', 'Source')], [
      [h.dl('2024-07-01'), `${h.n(R.anpassung2024, 2)} %`, h.src('drv-anpassung', h.T('Rentenversicherung', 'Pension insurance'))],
      [h.dl('2025-07-01'), `${h.n(R.anpassung2025, 2)} %`, h.src('drv-anpassung', h.T('Rentenversicherung', 'Pension insurance'))],
      [h.dl(A.datum), `${h.n(A.prozent, 2)} %`, h.src('drv-anpassung', h.T('Rentenversicherung', 'Pension insurance'))],
      [h.dl('2027-07-01'), h.T('noch nicht festgelegt', 'not yet set'), h.src('sgb6-69', '§ 69 SGB VI')],
    ], h.T('Rentenanpassungen 2024 bis 2027', 'Pension adjustments 2024 to 2027'), ['l', 'r', 'l'])}
<h2>How the decision is made</h2>
<p>Up to and including 2031, the pension value is set under the floor rule so that the pension level stays at ${R.haltelinie} per cent; the former adjustment formula is suspended until then (${h.src('drv-anpassung', 'German Pension Insurance')}). Pensions therefore broadly follow wages. The Federal Government sets the result by regulation, the Bundesrat consents, and the new value applies from 1 July (${h.src('sgb6-65', 'section 65')} and ${h.src('sgb6-69', 'section 69 SGB VI')}). For 2026 the resulting pension value was ${h.eur(A.rentenwertNeu, 2)} per earnings point. This site has no calculator for the amount; your pension is shown in the adjustment notice.</p>
<h2>Payment days around 1 July 2027</h2>
${h.table([h.T('Zahltag', 'Payment day'), h.T('Beginn ab 04/2004', 'Started 04/2004 or later'), h.T('Beginn vor 04/2004', 'Started before 04/2004')], [
      [h.wday(K.renteNach(2027, 6)), h.T('Juni, alter Wert', 'June, old value'), h.T('Juli, neuer Wert', 'July, new value')],
      [h.wday(jul27), h.T('Juli, neuer Wert', 'July, new value'), h.T('August, neuer Wert', 'August, new value')],
    ], h.T('Erste Zahlung mit dem Rentenwert ab 1. Juli 2027', 'First payment with the pension value from 1 July 2027'), ['l', 'l', 'l'])}
<p>Every 2027 date is on ${h.a('rente-auszahlung-2027', 'pension dates 2027')}. The 2027 amounts for ${h.a('kindergeld-erhoehung-2027', 'Kindergeld')} and ${h.a('grundsicherungsgeld-2027', 'Grundsicherungsgeld')} are still open too.</p>
${h.mini('re', { p: ['beginn'], d: { monat: '2027-07' }, t: 'First pension after the 2027 adjustment' })}`,
  },
});
