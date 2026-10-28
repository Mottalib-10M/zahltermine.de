/** llms.txt (RECETTE §21), généré à partir du registre des pages. */
import { GUIDES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { KIT as K } from '../lib/kit';
export function GET() {
  const R = K.P.rente.anpassung2026;
  const lines = [
    `# ${SITE_NAMES.de}`, '',
    `> Payment dates of German social benefits for 2026 and 2027, in German and English: Kindergeld and Kinderzuschlag by the last digit of the Kindergeld number (copied unchanged from the Familienkasse lists for ${K.KG_JAHRE.join(' and ')}), statutory pensions (last bank business day of the month under section 118 SGB VI, or of the previous month for pensions that started before April 2004 under section 272a; the engine reproduces all twelve 2026 dates of the Deutsche Rentenversicherung list), Grundsicherungsgeld (formerly Bürgergeld; paid in advance under section 42 SGB II), Arbeitslosengeld (in arrears, first working day of the next month, section 337 SGB III), Elterngeld (during each month of life, section 6 BEEG), Wohngeld and BAföG (monthly in advance; the exact day is set by the local office). Bank business days exclude weekends, nationwide public holidays and ECB TARGET closing days. Examples: December 2026 pension ${K.renteNach(2026, 12)}; Grundsicherungsgeld for January 2027 ${K.grundsicherung(2027, 1)}; Kindergeld January 2027 last digit 0: ${K.kindergeld(2027, 1, 0)}. Pension increase on ${R.datum}: ${R.prozent} %. Sources read on ${K.P.retrieved_at}. Everything runs in the browser, including the calendar (ICS) export; nothing entered is sent. Independent site by Radif Partners, not affiliated with any authority. Last updated ${LAST_UPDATED}.`, '',
    '## Zahltermin-Kalender / Payment calendar', `- [Auszahlungstermine](${SITE_URL}${route('home', 'de')})`, `- [Payment dates](${SITE_URL}${route('home', 'en')})`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label.en} / ${g.label.de}`, ...GUIDES.filter((p) => p.group === g.id).flatMap((p) => [
      `- [${p.de.nav}](${SITE_URL}${route(p.id, 'de')}): ${p.de.card}`,
      `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`,
    ]), '']),
    '## About', `- [Methode](${SITE_URL}${route('method', 'de')})`, `- [Method](${SITE_URL}${route('method', 'en')})`, `- [Über uns](${SITE_URL}${route('about', 'de')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
