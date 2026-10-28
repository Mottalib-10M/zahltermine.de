/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://zahltermine.de";
export const SITE_NAMES: Record<string, string> = {"de": "Zahltermine", "en": "Zahltermine"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), « » pour aucune.
export const BRAND_ACCENT = "termine";
/** Locale des nombres et des dates : anglais britannique pour la version anglaise. */
export const NUM_TAGS: Record<string, string> = {"de": "de-DE", "en": "en-GB"};
export const LANG_TAGS: Record<string, string> = {"de": "de-DE", "en": "en-DE"};
export const OG_LOCALES: Record<string, string> = {"de": "de_DE", "en": "en_GB"};
export const LOCALE_TAG = 'de-DE';
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-28';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"de": "Herausgeber eines unabhängigen Kalenders der Zahltage von Kindergeld, Rente, Grundsicherungsgeld, Arbeitslosengeld, Elterngeld, Wohngeld und BAföG", "en": "Publisher of an independent calendar of German benefit payment days: child benefit, pension, basic income support, unemployment benefit, parental allowance, housing benefit and BAföG"};
export const AUTHOR_DESC: Record<string, string> = {"de": "Radif Partners trägt die Zahltermine zusammen, die Familienkasse und Deutsche Rentenversicherung veröffentlichen, liest die Fälligkeitsregeln in § 118 und § 272a SGB VI, § 42 SGB II, § 337 SGB III, § 6 BEEG, § 26 WoGG und § 51 BAföG und rechnet daraus mit dem Kalender der Bankarbeitstage die Termine für 2026 und 2027 nach. Jede Liste nennt ihre Quelle und ihr Lesedatum. Radif Partners ist keine Behörde und zahlt keine Leistungen aus.", "en": "Radif Partners collects the payment dates published by the Familienkasse and the Deutsche Rentenversicherung, reads the due-date rules in sections 118 and 272a SGB VI, 42 SGB II, 337 SGB III, 6 BEEG, 26 WoGG and 51 BAföG, and works the 2026 and 2027 dates out against the calendar of German bank business days. Every list names its source and the day it was read. Radif Partners is not an authority and pays out no benefits."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"de": ["Auszahlungstermine des Kindergeldes nach Endziffer", "Rentenzahltermine nach § 118 und § 272a SGB VI", "Zahlung des Grundsicherungsgeldes nach § 42 SGB II", "Bankarbeitstage und TARGET-Schließtage", "Fälligkeit von Arbeitslosengeld, Elterngeld, Wohngeld und BAföG"], "en": ["German child benefit payment dates by final digit", "German pension payment dates", "Payment of basic income support (Grundsicherungsgeld)", "Bank business days and TARGET closing days", "Due dates of unemployment benefit, parental allowance, housing benefit and BAföG"]};
export const CONTACT_EMAIL = "contact@zahltermine.de";
export const THEME_COLOR = '#1E5A8A';
export const LOGO_SYMBOL = 'AZ';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = '95e1d5ff0a60614c248a757bd7fbae8a';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "Frankreich / France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "USt-IdNr.",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city']; // legalForm vide à dessein, comme les autres sites du portefeuille

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
