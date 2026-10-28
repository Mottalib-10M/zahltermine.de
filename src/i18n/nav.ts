import { route, hasRoute, type Locale } from './routes';
import { GUIDES, guideById } from '../lib/pages';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  de: { home: 'Meine Zahltage', method: 'Methode', about: 'Über uns', widget: 'Werkzeuge einbinden', contact: 'Kontakt', editorial: 'Redaktionsgrundsätze', privacy: 'Datenschutz', terms: 'Impressum', cookies: 'Cookies' },
  en: { home: 'My payment days', method: 'Method', about: 'About', widget: 'Embed the tools', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
};
/** `short` : intitulé du menu du haut (un ou deux mots, RECETTE §10.3) ; `label` : intitulé complet. */
export const GROUPS: Array<{ id: Group; label: Record<Locale, string>; short: Record<Locale, string> }> = [
  { id: 'kindergeld', label: { de: 'Kindergeld und Kinderzuschlag', en: 'Kindergeld and Kinderzuschlag' }, short: { de: 'Kindergeld', en: 'Kindergeld' } },
  { id: 'rente', label: { de: 'Rente: Zahltermine', en: 'State pension: payment dates' }, short: { de: 'Rente', en: 'Pension' } },
  { id: 'leistungen', label: { de: 'Grundsicherung, ALG und weitere Leistungen', en: 'Basic income, unemployment and other benefits' }, short: { de: 'Leistungen', en: 'Benefits' } },
  { id: 'kalender', label: { de: 'Kalender und Bankarbeitstage', en: 'Calendars and bank business days' }, short: { de: 'Kalender', en: 'Calendar' } },
];
export const label = (id: string, lang: Locale) => CORE[lang][id] ?? guideById(id)?.[lang]?.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => GUIDES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale, short = true): NavCategory[] {
  return GROUPS.map((g) => ({ label: (short ? g.short : g.label)[lang], links: g.id === 'kalender' ? [link('home', lang), ...inGroup(g.id, lang)] : inGroup(g.id, lang) })).filter((c) => c.links.length);
}
/** La Méthode n'est pas dans le menu du haut (RECETTE §10.3) : sous le titre et en bas de page. */
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => {
  const site = { label: { de: 'Diese Seite', en: 'This site' }[lang], links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) };
  return [
    { label: GROUPS[0].label[lang], links: [...inGroup('kindergeld', lang), ...inGroup('kalender', lang)] },
    { label: GROUPS[1].label[lang], links: inGroup('rente', lang) },
    { label: GROUPS[2].label[lang], links: inGroup('leistungen', lang) },
    site,
  ];
};
/** Les outils, à un clic de toute page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => [link('home', lang), ...['kindergeld-auszahlung', 'rente-auszahlung-2026', 'grundsicherungsgeld-auszahlung', 'auszahlungstermine-2027'].filter((id) => hasRoute(id, lang)).map((id) => link(id, lang))];
