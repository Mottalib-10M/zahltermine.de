/**
 * Trousse de rédaction : tout chiffre et toute date écrits dans une page viennent d'ici, jamais tapés à la main.
 *   K.P                         paramètres datés (params-2026.json)
 *   K.renteNach, K.grundsicherung, K.alg, K.kindergeld, K.lebensmonat …   moteur (engine/zahltermine.ts)
 *   K.ostersonntag, K.fromIso, K.toIso …                                 calendrier (engine/feiertage.ts)
 *   K.tool(kind, lang, args, valeurs)  lance un simulateur de tool-specs.ts et rend sa carte de résultat
 */
import P from '../data/params-2026.json';
import { ostersonntag, fromIso, toIso, weekday, isWeekend, dayNum } from './engine/feiertage';
import * as Z from './engine/zahltermine';
import { runTool } from './tool-specs';
import { LAST_UPDATED } from '../data/site-config';

export const KIT = { P, ostersonntag, fromIso, toIso, weekday, isWeekend, dayNum, ...Z, tool: runTool, LESEDATUM: LAST_UPDATED };
export type Kit = typeof KIT;
