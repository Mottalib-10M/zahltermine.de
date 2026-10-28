/** Toutes les pages prévues (id = nom du fichier de src/content/guides).
 *  Les tests acceptent un lien vers ces ids pendant la rédaction ; « toutes les pages existent » échoue tant qu'il en manque. */
export const PLANNED_GUIDES = [
  'kindergeld-auszahlung', 'kindergeld-termine-2027', 'kindergeld-november-2026', 'kindergeld-dezember-2026', 'kindergeld-erhoehung-2027', 'kinderzuschlag-auszahlung', 'kindergeldnummer-endziffer',
  'rente-auszahlung-2026', 'rente-auszahlung-2027', 'rente-november-2026', 'rente-dezember-2026', 'rentenerhoehung-2027', 'weihnachtsgeld-rente', 'rente-vor-2004', 'erste-rentenzahlung',
  'grundsicherungsgeld-auszahlung', 'grundsicherungsgeld-dezember-2026', 'grundsicherungsgeld-2027', 'arbeitslosengeld-auszahlung', 'elterngeld-auszahlung', 'wohngeld-auszahlung', 'bafoeg-auszahlung',
  'auszahlungstermine-2027', 'auszahlungstermine-dezember-2026', 'bankarbeitstage-2026', 'bankarbeitstage-2027',
];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, 'home', 'method', 'about', 'widget', 'contact', 'editorial', 'privacy', 'terms', 'cookies']);
