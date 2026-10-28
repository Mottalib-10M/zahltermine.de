/** Kindergeld novembre 2026 : dates par Endziffer, semaine par semaine. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong, dShort } from '../../lib/tool-specs';
import { kgMonat } from './_tabellen';

const k = (e: number) => K.kindergeld(2026, 11, e)!;
const okt = (e: number) => K.kindergeld(2026, 10, e)!;
const tage = (e: number) => K.tageBis(okt(e), k(e));

export default defineGuide({
  id: 'kindergeld-november-2026', group: 'kindergeld', order: 3, tool: 'kg', toolArg: { monat: '2026-11', endziffer: 5 },
  related: ['kindergeld-dezember-2026', 'kindergeld-auszahlung', 'rente-november-2026', 'auszahlungstermine-dezember-2026'],
  sources: ['ba-kg-termine', 'estg66'],
  countdown: { date: k(9), label: { de: 'Kindergeld November, Endziffer 9', en: 'Kindergeld November, last digit 9' } },
  de: {
    slug: 'kindergeld-november-2026', nav: 'Kindergeld November 2026', card: 'Vom 4. bis 20. November, je Endziffer',
    title: 'Kindergeld November 2026: Auszahlung nach Endziffer',
    description: 'Kindergeld November 2026: Die Familienkasse zahlt vom 4. bis zum 20. November, je nach Endziffer. Ihr Tag, der Abstand zum Oktober und der Dezembertermin.',
    h1: 'Kindergeld im November 2026: wann Ihre Endziffer dran ist',
    intro: 'Endziffer wählen: Der Rechner nennt Ihren Novembertermin, die nächsten Monate und die Tage aller Endziffern.',
    resume: `Im November 2026 überweist die Familienkasse das Kindergeld vom Mittwoch der ersten Novemberwoche bis zum Freitag der dritten. Den Anfang macht Endziffer 0 am ${dLong(k(0), 'de')}, es folgen Endziffer 1 am ${dShort(k(1), 'de')} und Endziffer 2 am ${dShort(k(2), 'de')}. In der zweiten Novemberwoche sind die Endziffern 3 bis 6 an der Reihe, vom ${dShort(k(3), 'de')} bis zum ${dShort(k(6), 'de')}. Endziffer 7 kommt am ${dShort(k(7), 'de')}, Endziffer 8 am ${dShort(k(8), 'de')} und Endziffer 9 als letzte am ${dLong(k(9), 'de')}. Bundesweite Feiertage gibt es im November nicht; der Buß- und Bettag am 18. November ist nur in Sachsen ein Feiertag und verschiebt keine Zahlung. Kinderzuschlag kommt am selben Tag wie das Kindergeld. Wer seine Ausgaben für Dezember plant, sollte wissen, dass die Dezemberzahlung schon am ${dLong(K.kindergeld(2026, 12, 0)!, 'de')} beginnt, also nur knapp vier Wochen später.`,
    faqs: [
      { q: 'Wann kommt das Kindergeld im November 2026 bei Endziffer 5?', a: `Am ${dLong(k(5), 'de')}, einem Donnerstag. Das sind ${tage(5)} Tage nach der Oktoberzahlung am ${dLong(okt(5), 'de')}. Für die anderen Endziffern zeigt der Rechner oben den Tag, wenn Sie die Ziffer wechseln; die Tabelle darunter listet alle zehn auf einmal.` },
      { q: 'Verschiebt der Buß- und Bettag das Kindergeld?', a: 'Nein. Der Buß- und Bettag ist nur in Sachsen ein gesetzlicher Feiertag. Banken buchen bundesweit, und die Familienkasse zahlt nach einem bundesweiten Plan. Am 18. November 2026 ist deshalb überall ein normaler Bankarbeitstag, auch für Familien in Sachsen. Ihr Termin ergibt sich allein aus der Endziffer.' },
      { q: 'Mein Kindergeld ist im November nicht gekommen. Was tun?', a: 'Warten Sie zwei Bankarbeitstage nach dem Termin Ihrer Endziffer. Prüfen Sie dann, ob die Familienkasse Unterlagen angefordert hat, etwa eine Schulbescheinigung für ein Kind über 18 Jahren. Fehlt das Geld weiter, hilft nur die Familienkasse selbst; wir können keine Zahlung prüfen.' },
    ],
    body: (h) => `<h2>Alle Novembertermine</h2>
${kgMonat(h, 2026, 11)}
<h2>Wie viel Zeit seit Oktober vergeht</h2>
<p>Der Abstand zwischen zwei Zahlungen schwankt mit dem Kalender. Für Endziffer 0 liegen zwischen Oktober (${h.ds(okt(0))}) und November ${h.n(tage(0))} Tage, für Endziffer 9 (${h.ds(okt(9))}) sind es ${h.n(tage(9))}. Wer knapp kalkuliert, plant deshalb mit dem Novembertermin der eigenen Endziffer und nicht mit „Anfang des Monats“.</p>
${h.table([h.T('Endziffer', 'Last digit'), h.T('Oktober', 'October'), h.T('November', 'November'), h.T('Tage dazwischen', 'Days between')], Array.from({ length: 10 }, (_, e) => [String(e), h.ds(okt(e)), h.ds(k(e)), h.n(tage(e))]), h.T('Kindergeld Oktober und November 2026 im Vergleich', 'Kindergeld October and November 2026 compared'), ['r', 'l', 'l', 'r'])}
<h2>Was im November sonst kommt</h2>
<p>Die Rente für November überweist die Rentenversicherung am ${h.dl(K.renteNach(2026, 11))}, siehe ${h.a('rente-november-2026', 'Rente November 2026')}. Das Grundsicherungsgeld für Dezember steht am selben Tag bereit. Eine Übersicht aller Zahltage des Folgemonats bietet ${h.a('auszahlungstermine-dezember-2026', 'Auszahlungstermine Dezember 2026')}; die Termine stammen für das Kindergeld aus der ${h.src('ba-kg-termine', 'Liste der Familienkasse')}.</p>
${h.mini('kg', { p: ['endziffer'], d: { monat: '2026-12' }, t: 'Und im Dezember?' })}`,
  },
  en: {
    slug: 'kindergeld-november-2026', nav: 'Kindergeld November 2026', card: '4 to 20 November, by last digit',
    title: 'Kindergeld November 2026: payment by last digit, every day',
    description: 'Kindergeld November 2026: the Familienkasse pays from 4 to 20 November, depending on your last digit. Your day, the gap since October and the December date.',
    h1: 'Kindergeld in November 2026: when your last digit is due',
    intro: 'Pick your last digit: the tool gives your November date, the next months and the days for every digit.',
    resume: `In November 2026 the Familienkasse transfers Kindergeld from the Wednesday of the first week to the Friday of the third week. Last digit 0 goes first on ${dLong(k(0), 'en')}, followed by digit 1 on ${dShort(k(1), 'en')} and digit 2 on ${dShort(k(2), 'en')}. Digits 3 to 6 follow in the second week of November, from ${dShort(k(3), 'en')} to ${dShort(k(6), 'en')}. Digit 7 arrives on ${dShort(k(7), 'en')}, digit 8 on ${dShort(k(8), 'en')} and digit 9 last, on ${dLong(k(9), 'en')}. There is no nationwide holiday in November; the Day of Repentance and Prayer on 18 November is a holiday only in Saxony and moves no payment. Kinderzuschlag arrives on the same day as Kindergeld. When budgeting for December, bear in mind that the December payments already start on ${dLong(K.kindergeld(2026, 12, 0)!, 'en')}, barely four weeks later.`,
    faqs: [
      { q: 'When does Kindergeld arrive in November 2026 for last digit 5?', a: `On ${dLong(k(5), 'en')}, a Thursday. That is ${tage(5)} days after the October payment on ${dLong(okt(5), 'en')}. For the other digits, change the digit in the tool above; the table below lists all ten at once. Your date depends only on the last digit.` },
      { q: 'Does the Day of Repentance and Prayer delay Kindergeld?', a: 'No. The Day of Repentance and Prayer is a public holiday only in Saxony. Banks post nationwide and the Familienkasse pays to a national schedule, so 18 November 2026 is an ordinary bank business day everywhere, including for families in Saxony.' },
      { q: 'My Kindergeld did not arrive in November. What now?', a: 'Wait two bank business days after the date for your last digit. Then check whether the Familienkasse has asked for documents, such as proof of schooling for a child over 18. If the money is still missing, only the Familienkasse can help; we cannot check any payment.' },
    ],
    body: (h) => `<h2>Every November date</h2>
${kgMonat(h, 2026, 11)}
<h2>How long since October</h2>
<p>The gap between two payments varies with the calendar. For last digit 0 there are ${h.n(tage(0))} days between October (${h.ds(okt(0))}) and November; for digit 9 (${h.ds(okt(9))}) there are ${h.n(tage(9))}. If money is tight, plan with the November date for your own digit rather than with "early in the month".</p>
${h.table([h.T('Endziffer', 'Last digit'), h.T('Oktober', 'October'), h.T('November', 'November'), h.T('Tage dazwischen', 'Days between')], Array.from({ length: 10 }, (_, e) => [String(e), h.ds(okt(e)), h.ds(k(e)), h.n(tage(e))]), h.T('Kindergeld Oktober und November 2026 im Vergleich', 'Kindergeld October and November 2026 compared'), ['r', 'l', 'l', 'r'])}
<h2>What else arrives in November</h2>
<p>The pension insurance transfers November's pension on ${h.dl(K.renteNach(2026, 11))}, see ${h.a('rente-november-2026', 'pension November 2026')}. Grundsicherungsgeld for December is available the same day. An overview of every payment day of the following month is on ${h.a('auszahlungstermine-dezember-2026', 'payment dates December 2026')}; the Kindergeld dates come from the ${h.src('ba-kg-termine', 'Familienkasse list')}.</p>
${h.mini('kg', { p: ['endziffer'], d: { monat: '2026-12' }, t: 'And in December?' })}`,
  },
});
