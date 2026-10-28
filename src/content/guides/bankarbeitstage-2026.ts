/** Bankarbeitstage 2026 : jours ouvrés bancaires par mois, jours fériés nationaux et TARGET. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dLong, monatName } from '../../lib/tool-specs';

const Y = 2026;
const proMonat = Array.from({ length: 12 }, (_, i) => K.bankarbeitstage(Y, i + 1));
const summe = proMonat.reduce((a, b) => a + b, 0);
const frei = K.bankFeiertage(Y);
const amWochenende = frei.filter((f) => K.isWeekend(K.fromIso(f.date)));
const werktags = frei.length - amWochenende.length;
const target = frei.filter((f) => f.target).length;
const minM = proMonat.indexOf(Math.min(...proMonat)) + 1, maxM = proMonat.indexOf(Math.max(...proMonat)) + 1;
const ostern = K.ostersonntag(Y);

export default defineGuide({
  id: 'bankarbeitstage-2026', group: 'kalender', order: 32, tool: 'bat', toolArg: { jahr: 2026, m: 12 },
  related: ['bankarbeitstage-2027', 'auszahlungstermine-dezember-2026', 'rente-auszahlung-2026', 'grundsicherungsgeld-auszahlung'],
  sources: ['ecb-target', 'einigungsvertrag', 'ostern-ptb', 'sgb6-118'],
  de: {
    slug: 'bankarbeitstage-2026', nav: 'Bankarbeitstage 2026', card: 'Je Monat, mit Feiertagen und TARGET',
    title: 'Bankarbeitstage 2026: Tabelle je Monat und Feiertage',
    description: 'Bankarbeitstage 2026 in Deutschland: Anzahl je Monat, erster und letzter Bankarbeitstag, bundesweite Feiertage und TARGET-Schließtage, für alle Zahltermine.',
    h1: 'Bankarbeitstage 2026: an welchen Tagen Geld gebucht wird',
    intro: 'Monat wählen: Der Rechner zeigt die Zahl der Bankarbeitstage, den ersten und letzten im Monat und die bankfreien Feiertage des Jahres.',
    resume: `2026 hat in Deutschland ${summe} Bankarbeitstage. Als Bankarbeitstag zählt jeder Tag von Montag bis Freitag, der weder ein bundesweiter Feiertag noch ein Schließtag des europäischen Zahlungssystems TARGET ist. Von den ${frei.length} bankfreien Feiertagen fallen 2026 nur ${werktags} auf einen Werktag; der Tag der Deutschen Einheit und der zweite Weihnachtstag liegen auf einem Samstag und kosten keinen Bankarbeitstag. ${target} der Tage sind zugleich TARGET-Schließtage, an denen in ganz Europa keine Euro-Überweisung zwischen Banken abgewickelt wird. Am wenigsten Bankarbeitstage hat der ${monatName(minM, 'de')} mit ${proMonat[minM - 1]}, wegen Tag der Arbeit, Christi Himmelfahrt und Pfingstmontag; am meisten der ${monatName(maxM, 'de')} mit ${proMonat[maxM - 1]}. Ostern fällt auf den ${dLong(ostern, 'de')}. Regionale Feiertage wie Fronleichnam oder der Reformationstag ändern an den Buchungstagen nichts, weil Überweisungen bundesweit verrechnet werden. Aus diesem Kalender folgen Rente, Grundsicherungsgeld und Arbeitslosengeld.`,
    faqs: [
      { q: 'Wann gilt ein Tag 2026 als Bankarbeitstag?', a: 'Wenn Banken an ihm Überweisungen ausführen und gutschreiben: Montag bis Freitag, außer an den bundesweiten gesetzlichen Feiertagen. Die Schließtage des TARGET-Systems der Europäischen Zentralbank zählen ebenfalls nicht, sind 2026 aber ohnehin alle Feiertage. Für jeden Monat 2026 zählt die Tabelle unten diese Tage und nennt den ersten und den letzten.' },
      { q: 'Sind Heiligabend und Silvester Bankarbeitstage?', a: `Ja, beide. Weder der 24. noch der 31. Dezember ist ein gesetzlicher Feiertag oder TARGET-Schließtag. 2026 ist Silvester ein Donnerstag, und an diesem Tag kommen die Rente für Dezember und das Grundsicherungsgeld für Januar. Am Heiligabend selbst ist keine der großen Leistungen fällig.` },
      { q: 'Zählen Feiertage in meinem Bundesland?', a: 'Für Überweisungen nicht. Fronleichnam, Allerheiligen, der Reformationstag oder der Buß- und Bettag sind nur in einzelnen Ländern frei; der Zahlungsverkehr läuft an diesen Tagen bundesweit weiter. Ihre Filiale kann geschlossen sein, die Gutschrift kommt trotzdem. Für alle Zahltermine auf dieser Seite zählt deshalb allein der bundesweite Kalender.' },
    ],
    body: (h) => `<h2>Bankarbeitstage je Monat 2026</h2>
${h.table([h.T('Monat', 'Month'), h.T('Bankarbeitstage', 'Bank business days'), h.T('Erster', 'First'), h.T('Letzter', 'Last')], Array.from({ length: 12 }, (_, i) => [monatName(i + 1, h.lang), proMonat[i], h.ds(K.ersterBankarbeitstag(Y, i + 1)), h.ds(K.letzterBankarbeitstag(Y, i + 1))]), h.T(`Bankarbeitstage 2026, zusammen ${summe}`, `Bank business days 2026, ${summe} in total`), ['l', 'r', 'l', 'l'])}
<p>Der letzte Bankarbeitstag eines Monats ist der Rentenzahltag nach ${h.src('sgb6-118', '§ 118 SGB VI')}; der erste ist der Tag, ab dem Leistungen verfügbar sind, die nachträglich gezahlt werden. Was das für Ihre Leistung heißt, zeigt der ${h.a('home', 'Zahltermin-Kalender')}.</p>
<h2>Bankfreie Feiertage 2026</h2>
${h.table([h.T('Feiertag', 'Holiday'), h.T('Datum', 'Date'), 'TARGET'], frei.map((f) => [f.name[h.lang], h.wday(f.date), f.target ? h.T('Schließtag', 'closed') : h.T('geöffnet', 'open')]), h.T('Bundesweite Feiertage 2026 und TARGET-Schließtage der EZB', 'Nationwide holidays 2026 and ECB TARGET closing days'), ['l', 'l', 'l'])}
<p>Die beweglichen Feiertage hängen am Ostersonntag, den die ${h.src('ostern-ptb', 'Physikalisch-Technische Bundesanstalt')} nach der Gaußschen Osterformel angibt. Der Tag der Deutschen Einheit ist im ${h.src('einigungsvertrag', 'Einigungsvertrag')} festgelegt und der einzige Feiertag kraft Bundesrecht. Die Schließtage des europäischen Systems veröffentlicht die ${h.src('ecb-target', 'Europäische Zentralbank')}. Zwei Feiertage liegen 2026 auf einem Samstag: ${amWochenende.map((f) => `${f.name.de} (${h.ds(f.date)})`).join(' und ')}. Den Vergleich mit dem Folgejahr zeigt ${h.a('bankarbeitstage-2027', 'Bankarbeitstage 2027')}.</p>
${h.mini('bat', { p: ['m'], d: { jahr: 2026, m: 5 }, t: 'Bankarbeitstage in Ihrem Monat 2026' })}`,
  },
  en: {
    slug: 'bank-business-days-2026', nav: 'Bank business days 2026', card: 'By month, with holidays and TARGET',
    title: 'Bank business days 2026 in Germany: table by month',
    description: 'German bank business days 2026: number per month, first and last bank business day, nationwide public holidays and TARGET closing days, for every payment.',
    h1: 'Bank business days 2026: the days money is booked',
    intro: 'Pick a month: the tool shows the number of bank business days, the first and last in the month and the bank holidays of the year.',
    resume: `Germany has ${summe} bank business days in 2026. A bank business day is any Monday to Friday that is neither a nationwide public holiday nor a closing day of the European TARGET payment system. Of the ${frei.length} bank holidays, only ${werktags} fall on a weekday in 2026; German Unity Day and Boxing Day are on a Saturday and cost no business day. ${target} of them are also TARGET closing days, when no euro transfers between banks are settled anywhere in Europe. ${monatName(minM, 'en')} has the fewest bank business days with ${proMonat[minM - 1]}, because of Labour Day, Ascension Day and Whit Monday; ${monatName(maxM, 'en')} has the most with ${proMonat[maxM - 1]}. Easter Sunday falls on ${dLong(ostern, 'en')}. Regional holidays such as Corpus Christi or Reformation Day change nothing for booking days, because transfers are cleared nationwide. Pensions, Grundsicherungsgeld and unemployment benefit all follow from this calendar.`,
    faqs: [
      { q: 'When does a day in 2026 count as a bank business day?', a: 'When banks execute and credit transfers on it: Monday to Friday, except nationwide public holidays. The European Central Bank’s TARGET closing days are excluded too, but in 2026 they are all public holidays anyway. The table below counts these days for every month of 2026, with the first and the last.' },
      { q: 'Are Christmas Eve and New Year’s Eve bank business days?', a: 'Yes, both. Neither 24 nor 31 December is a public holiday or TARGET closing day. In 2026 New Year’s Eve is a Thursday, and the December pension and Grundsicherungsgeld for January arrive that day. No major benefit is due on Christmas Eve itself.' },
      { q: 'Do holidays in my federal state count?', a: 'Not for transfers. Corpus Christi, All Saints’ Day, Reformation Day or the Day of Repentance are only holidays in some states; payment traffic continues nationwide on those days. Your branch may be closed, but the credit still arrives. Only the nationwide calendar counts for the payment dates on this site.' },
    ],
    body: (h) => `<h2>Bank business days by month in 2026</h2>
${h.table([h.T('Monat', 'Month'), h.T('Bankarbeitstage', 'Bank business days'), h.T('Erster', 'First'), h.T('Letzter', 'Last')], Array.from({ length: 12 }, (_, i) => [monatName(i + 1, h.lang), proMonat[i], h.ds(K.ersterBankarbeitstag(Y, i + 1)), h.ds(K.letzterBankarbeitstag(Y, i + 1))]), h.T(`Bankarbeitstage 2026, zusammen ${summe}`, `Bank business days 2026, ${summe} in total`), ['l', 'r', 'l', 'l'])}
<p>The last bank business day of a month is the pension payment day under ${h.src('sgb6-118', 'section 118 SGB VI')}; the first is the day from which benefits paid in arrears are available. The ${h.a('home', 'payment calendar')} shows what that means for your benefit.</p>
<h2>Bank holidays 2026</h2>
${h.table([h.T('Feiertag', 'Holiday'), h.T('Datum', 'Date'), 'TARGET'], frei.map((f) => [f.name[h.lang], h.wday(f.date), f.target ? h.T('Schließtag', 'closed') : h.T('geöffnet', 'open')]), h.T('Bundesweite Feiertage 2026 und TARGET-Schließtage der EZB', 'Nationwide holidays 2026 and ECB TARGET closing days'), ['l', 'l', 'l'])}
<p>The movable holidays depend on Easter Sunday, which the ${h.src('ostern-ptb', 'Physikalisch-Technische Bundesanstalt')} gives using Gauss's Easter formula. German Unity Day is set in the ${h.src('einigungsvertrag', 'Unification Treaty')} and is the only holiday under federal law. The ${h.src('ecb-target', 'European Central Bank')} publishes the closing days of the European system. Two holidays fall on a Saturday in 2026: ${amWochenende.map((f) => `${f.name.en} (${h.ds(f.date)})`).join(' and ')}. For a comparison with the following year, see ${h.a('bankarbeitstage-2027', 'bank business days 2027')}.</p>
${h.mini('bat', { p: ['m'], d: { jahr: 2026, m: 5 }, t: 'Bank business days in your month of 2026' })}`,
  },
});
