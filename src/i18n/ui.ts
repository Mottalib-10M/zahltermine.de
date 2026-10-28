import type { Locale } from './routes';
const de = {
  updatedOn: 'Aktualisiert am', editorialPolicy: 'Redaktionsgrundsätze', contactLabel: 'Kontakt', reviewedBy: 'Erstellt von',
  skipToContent: 'Zum Inhalt springen', mainNav: 'Hauptnavigation', breadcrumbLabel: 'Brotkrumen', breadcrumbHome: 'Start', menuOpen: 'Menü öffnen',
  faqTitle: 'Häufige Fragen', relatedCalculators: 'Weiter mit', sourcesTitle: 'Amtliche Quellen dieser Seite', writtenBy: 'Erstellt von',
  asOf: 'Stand', lastUpdated: 'Termine und Gesetzestexte geprüft am', footerValidated: 'Quellen: Familienkasse, Deutsche Rentenversicherung, Bundesagentur für Arbeit, SGB II, III und VI, EStG, BEEG, WoGG, BAföG, EZB',
  footerBrowser: 'Alles läuft in Ihrem Browser · nichts, was Sie eingeben, wird gesendet oder gespeichert · kein Konto',
  footerDisclaimer: 'Unabhängige Seite von Radif Partners, ohne Verbindung zur Familienkasse, zur Rentenversicherung, zur Bundesagentur für Arbeit oder einer anderen Behörde. Maßgeblich sind Ihr Bescheid und die Mitteilungen Ihrer Behörde; die Seite ersetzt keine Beratung.',
  footerPopular: 'Werkzeuge',
  notFound: 'Unter dieser Adresse gibt es keine Seite. Auf der Startseite finden Sie Ihre nächsten Zahltage für Kindergeld, Rente, Grundsicherungsgeld und weitere Leistungen.',
  readMore: 'Weiterlesen',
  moreOptions: 'Weitere Angaben', copyLink: 'Link kopieren', copied: 'Link kopiert', print: 'Drucken', howComputed: 'So wird gerechnet', openFull: 'Zum vollständigen Werkzeug',
  countdownTo: 'Noch bis', days: 'Tage', hours: 'Std.', minutes: 'Min.', seconds: 'Sek.', tzNote: 'Rechnet mit der Uhr Ihres Geräts, Zeitzone', passed: 'Dieser Termin liegt hinter uns.',
};
const en: typeof de = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Prepared by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Common questions', relatedCalculators: 'Keep going', sourcesTitle: 'Official sources for this page', writtenBy: 'Prepared by',
  asOf: 'As of', lastUpdated: 'dates and statutes checked on', footerValidated: 'Sources: Familienkasse, German Pension Insurance, Federal Employment Agency, Social Code Books II, III and VI, EStG, BEEG, WoGG, BAföG, ECB',
  footerBrowser: 'Everything runs in your browser · nothing you type is sent or stored · no account',
  footerDisclaimer: 'Independent site published by Radif Partners, not affiliated with the Familienkasse, the German Pension Insurance, the Federal Employment Agency or any other authority. Your award notice and your office have the final word; this site does not replace advice.',
  footerPopular: 'Tools',
  notFound: 'Nothing lives at this address. The home page shows your next payment days for Kindergeld, state pension, Grundsicherungsgeld and other German benefits.',
  readMore: 'Read more',
  moreOptions: 'More details', copyLink: 'Copy share link', copied: 'Link copied', print: 'Print', howComputed: 'How this is calculated', openFull: 'Open the full tool',
  countdownTo: 'Time left until', days: 'days', hours: 'hrs', minutes: 'min', seconds: 'sec', tzNote: 'Uses your device clock, time zone', passed: 'This date has passed.',
};
const ALL = { de, en };
export function t(lang: Locale) { return ALL[lang] ?? de; }
