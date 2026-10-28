/** Arbeitslosengeld : versé à terme échu (§ 337 Abs. 2 SGB III), disponible le premier jour ouvré du mois suivant (Merkblatt 1 de la BA). */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong, dShort, monatName } from '../../lib/tool-specs';

const okt = K.alg(2026, 10), nov = K.alg(2026, 11), dez = K.alg(2026, 12);
const A27 = Array.from({ length: 12 }, (_, i) => K.alg(2027, i + 1));
const spaet27 = A27.filter((d, i) => d !== K.monatserster(...K.folgemonat(2027, i + 1))).length;

export default defineGuide({
  id: 'arbeitslosengeld-auszahlung', group: 'leistungen', order: 23, tool: 'alg', toolArg: { monat: '2026-11' },
  related: ['grundsicherungsgeld-auszahlung', 'bankarbeitstage-2026', 'auszahlungstermine-dezember-2026', 'auszahlungstermine-2027'],
  sources: ['sgb3-337', 'ba-merkblatt1', 'sgb3-154', 'ecb-target'],
  countdown: { date: nov, label: { de: 'Arbeitslosengeld für November', en: 'Arbeitslosengeld for November' } },
  de: {
    slug: 'arbeitslosengeld-auszahlung', nav: 'Arbeitslosengeld', card: 'Nachträglich, am ersten Arbeitstag',
    title: 'Arbeitslosengeld Auszahlung 2026: Termine und Zahltag',
    description: 'Arbeitslosengeld Auszahlung 2026 und 2027: monatlich nachträglich, am ersten Arbeitstag des Folgemonats verfügbar. Alle Termine mit Feiertagen und Countdown.',
    h1: 'Arbeitslosengeld: wann es auf dem Konto ist',
    intro: 'Monat wählen, für den Sie Arbeitslosengeld bekommen: Der Rechner zeigt den Tag, an dem Sie darüber verfügen können, und das ganze Jahr.',
    resume: `Arbeitslosengeld kommt immer im Nachhinein. Nach § 337 Absatz 2 SGB III werden laufende Geldleistungen regelmäßig monatlich nachträglich ausgezahlt, das Geld für Oktober also erst Anfang November. Die Bundesagentur für Arbeit sagt im Merkblatt 1 zu, dass Sie am ersten Arbeitstag des Folgemonats über den Betrag verfügen können. Für Oktober 2026 ist das der ${dLong(okt, 'de')}, weil der 1. November ein Sonntag ist; für November der ${dLong(nov, 'de')} und für Dezember der ${dLong(dez, 'de')}, nach Neujahr und dem ersten Wochenende des Jahres. Damit unterscheidet sich das Arbeitslosengeld vom Grundsicherungsgeld (früher Bürgergeld), das im Voraus am Ende des Vormonats kommt. Wer neu arbeitslos wird, wartet deshalb bis zu einen Monat auf die erste Zahlung. Gerechnet wird nach Kalendertagen, ein voller Monat zählt nach § 154 SGB III 30 Tage. Welcher Zeitraum bezahlt wurde, steht auf dem Kontoauszug.`,
    faqs: [
      { q: 'Wann wird das Arbeitslosengeld überwiesen?', a: 'Monatlich nachträglich. Das Geld für einen Monat steht am ersten Arbeitstag des folgenden Monats bereit. Fällt der Monatserste auf ein Wochenende oder einen bundesweiten Feiertag, ist es nach unserer Rechnung der nächste Bankarbeitstag. Die Überweisung selbst löst die Agentur für Arbeit einige Tage vorher aus.' },
      { q: 'Warum kommt das Arbeitslosengeld später als das Grundsicherungsgeld?', a: 'Weil die Gesetze verschiedene Zeitpunkte vorschreiben. Das Arbeitslosengeld ist eine Versicherungsleistung und wird nach § 337 SGB III nachträglich gezahlt. Das Grundsicherungsgeld wird nach § 42 SGB II im Voraus gezahlt. Wer beides bekommt, hat deshalb zwei Zahltage im Monat.' },
      { q: 'Wann kommt die erste Zahlung nach der Arbeitslosmeldung?', a: 'Nach dem ersten Monat mit Anspruch, sobald der Antrag bewilligt ist. Wer ab dem 15. eines Monats Arbeitslosengeld bezieht, bekommt das Geld für die halbe Monatszeit am ersten Arbeitstag des Folgemonats. Zieht sich die Prüfung hin, kann die Agentur nach § 337 Absatz 4 SGB III eine Abschlagszahlung leisten.' },
      { q: 'Was tun, wenn das Geld nicht da ist?', a: 'Die Bundesagentur weist darauf hin, dass sie auf Verzögerungen bei der Gutschrift keinen Einfluss hat. Warten Sie einen Bankarbeitstag ab. Kommt dann nichts, prüfen Sie im Portal der Agentur, ob die Zahlung angewiesen wurde und ob die Bankverbindung stimmt, und fragen Sie bei Ihrer Agentur für Arbeit nach.' },
    ],
    body: (h) => `<h2>Wann das Arbeitslosengeld 2026 und 2027 kommt</h2>
<p>Die Tabelle zeigt für jeden Leistungsmonat den Tag, an dem das Geld nach der Zusage der Bundesagentur verfügbar ist: den ersten Bankarbeitstag des Folgemonats. Grundlage sind ${h.src('sgb3-337', '§ 337 Abs. 2 SGB III')} und das ${h.src('ba-merkblatt1', 'Merkblatt 1 für Arbeitslose')}.</p>
${h.table([h.T('Arbeitslosengeld für', 'Benefit for'), '2026', '2027'], Array.from({ length: 12 }, (_, i) => [monatName(i + 1, h.lang), dShort(K.alg(2026, i + 1), h.lang), dShort(K.alg(2027, i + 1), h.lang)]), h.T('Arbeitslosengeld: verfügbar am ersten Arbeitstag des Folgemonats', 'Arbeitslosengeld: available on the first working day of the following month'), ['l', 'l', 'l'])}
<p>Für die Leistungsmonate 2027 liegt der Zahltag in ${h.n(spaet27)} Fällen nicht auf dem Monatsersten des Folgemonats, weil dieser ein Samstag, Sonntag oder Feiertag ist. Als Bankarbeitstag zählt jeder Tag von Montag bis Freitag, der kein bundesweiter Feiertag und kein ${h.src('ecb-target', 'Schließtag des TARGET-Systems')} ist.</p>
<h2>Kalendertage statt Monatsbetrag</h2>
<p>Nach ${h.src('sgb3-154', '§ 154 SGB III')} wird das Arbeitslosengeld für Kalendertage berechnet. Ein voller Monat zählt immer 30 Tage, gleich ob er 28 oder 31 Tage hat. Beginnt oder endet der Anspruch mitten im Monat, zahlt die Agentur die Tage dieses Monats, ebenfalls nachträglich am ersten Arbeitstag danach. Den Tagessatz nennt der Bewilligungsbescheid.</p>
<h2>Arbeitslosengeld und Grundsicherungsgeld zusammen</h2>
<p>Reicht das Arbeitslosengeld nicht, kann ergänzend Grundsicherungsgeld (früher Bürgergeld) vom Jobcenter dazukommen. Es wird im Voraus gezahlt, am Ende des Vormonats; die Termine stehen unter ${h.a('grundsicherungsgeld-auszahlung', 'Grundsicherungsgeld Auszahlung')}. Beide Zahltage zusammen mit Kindergeld und Rente zeigt die Übersicht ${h.a('auszahlungstermine-dezember-2026', 'Auszahlungstermine Dezember 2026')}.</p>
${h.mini('alg', { p: ['monat'], d: { monat: '2027-01' }, t: 'Arbeitslosengeld: Ihr Monat' })}`,
  },
  en: {
    slug: 'arbeitslosengeld-payment-dates', nav: 'Unemployment benefit', card: 'In arrears, on the first working day',
    title: 'Arbeitslosengeld payment dates 2026: when it arrives',
    description: 'Arbeitslosengeld (unemployment benefit) payment dates 2026 and 2027: paid monthly in arrears, available on the first working day of the next month. All dates.',
    h1: 'Arbeitslosengeld: when it is in your account',
    intro: 'Pick the month you receive unemployment benefit for: the tool shows the day the money is available to you, and the whole year.',
    resume: `Arbeitslosengeld, Germany's contributory unemployment benefit, is always paid after the event. Section 337(2) of Social Code Book III says ongoing cash benefits are paid monthly in arrears, so the money for October only arrives at the start of November. In leaflet 1, the Federal Employment Agency guarantees that you can use the amount on the first working day of the following month. For October 2026 that is ${dLong(okt, 'en')}, because 1 November is a Sunday; for November it is ${dLong(nov, 'en')} and for December ${dLong(dez, 'en')}, after New Year and the first weekend of the year. This sets unemployment benefit apart from Grundsicherungsgeld (formerly Bürgergeld), which comes in advance at the end of the previous month. Anyone newly unemployed therefore waits up to a month for the first payment. The benefit is worked out per calendar day, and under section 154 SGB III a full month counts as 30 days. Your bank statement shows which period was paid.`,
    faqs: [
      { q: 'When is Arbeitslosengeld transferred?', a: 'Monthly in arrears. The money for a month is available on the first working day of the next month. If the 1st falls on a weekend or a nationwide holiday, it is the next bank business day by our calculation. The agency itself sends the transfer a few days earlier.' },
      { q: 'Why does unemployment benefit come later than Grundsicherungsgeld?', a: 'Because the laws set different times. Arbeitslosengeld is an insurance benefit and is paid in arrears under section 337 SGB III. Grundsicherungsgeld is paid in advance under section 42 SGB II. If you receive both, you have two payment days a month.' },
      { q: 'When does the first payment come after registering as unemployed?', a: 'After the first month of entitlement, once the claim is approved. If your benefit starts on the 15th, you receive the money for half the month on the first working day of the next month. If the assessment takes long, the agency can make an interim payment under section 337(4) SGB III.' },
      { q: 'What if the money has not arrived?', a: 'The agency points out that it has no influence on delays in crediting. Wait one bank business day. If nothing arrives, check in the agency portal whether the payment was issued and whether your bank details are correct, and ask your local employment agency.' },
    ],
    body: (h) => `<h2>When unemployment benefit arrives in 2026 and 2027</h2>
<p>For each benefit month, the table shows the day the money is available under the agency's guarantee: the first bank business day of the following month. The basis is ${h.src('sgb3-337', 'section 337(2) SGB III')} and ${h.src('ba-merkblatt1', 'leaflet 1 for unemployed people')}.</p>
${h.table([h.T('Arbeitslosengeld für', 'Benefit for'), '2026', '2027'], Array.from({ length: 12 }, (_, i) => [monatName(i + 1, h.lang), dShort(K.alg(2026, i + 1), h.lang), dShort(K.alg(2027, i + 1), h.lang)]), h.T('Arbeitslosengeld: verfügbar am ersten Arbeitstag des Folgemonats', 'Arbeitslosengeld: available on the first working day of the following month'), ['l', 'l', 'l'])}
<p>For the benefit months of 2027, the payment day is not the 1st of the following month in ${h.n(spaet27)} cases, because that day is a Saturday, Sunday or holiday. A bank business day is any Monday to Friday that is neither a nationwide holiday nor a ${h.src('ecb-target', 'TARGET closing day')}.</p>
<h2>Calendar days, not a monthly amount</h2>
<p>Under ${h.src('sgb3-154', 'section 154 SGB III')} unemployment benefit is calculated per calendar day. A full month always counts as 30 days, whether it has 28 or 31. If entitlement starts or ends mid-month, the agency pays the days of that month, again in arrears on the first working day afterwards. The award notice states the daily rate.</p>
<h2>Unemployment benefit and Grundsicherungsgeld together</h2>
<p>If unemployment benefit is not enough, the Jobcenter can top it up with Grundsicherungsgeld (formerly Bürgergeld). That is paid in advance, at the end of the previous month; the dates are on ${h.a('grundsicherungsgeld-auszahlung', 'Grundsicherungsgeld payment dates')}. Both payment days alongside Kindergeld and pensions are listed on ${h.a('auszahlungstermine-dezember-2026', 'payment dates December 2026')}.</p>
${h.mini('alg', { p: ['monat'], d: { monat: '2027-01' }, t: 'Unemployment benefit: your month' })}`,
  },
});
