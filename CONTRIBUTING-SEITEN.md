# Ajouter ou étoffer une page de DE Auszahlungstermine

Cette notice s'adresse aux agents qui prolongent le site. Lisez-la en entier avant d'écrire, avec `~/Documents/GitHub/RECETTE-SITE.md` (§0, §3, §6, §7, §9.3, §11, §21, §26).

## Principe

Une page = **un fichier** `src/content/guides/<id>.ts` (`defineGuide`). Ce fichier porte l'allemand (`de`) et l'anglais (`en`) côte à côte : slug, titre, description, H1, chapeau, bloc citable (`resume`), FAQ, corps, sources, outil de tête (`tool`, `toolArg`), compte à rebours facultatif (`countdown`) et pages liées. L'`id` est le nom du fichier ; il doit figurer dans `src/lib/planned.ts`. Groupes : `kindergeld`, `rente`, `leistungen`, `kalender`.

Routes, menus, sitemap, hreflang, `llms.txt` et schémas lisent ces fichiers : **ne touchez à aucun fichier du cœur pour ajouter une page.** Le site compte 26 guides × 2 langues, 2 accueils, les pages de service et les pages `/embed/`.

Modèles à suivre : `grundsicherungsgeld-auszahlung.ts` (prestation), `auszahlungstermine-2027.ts` (vue d'ensemble), `bankarbeitstage-2027.ts` (calendrier). Les tableaux partagés sont dans `src/content/guides/_tabellen.ts`.

## Les outils

Déclaratifs, dans `src/lib/tool-specs.ts`, rendus par `calc/SpecTool.tsx`. Ce sont aussi les seuls admis en mini-simulateur (`h.mini(kind, { p: [ids des champs], d: {valeurs}, t: 'titre' })`).

| `tool` | Rôle |
|---|---|
| `kg` (`monat`, `endziffer`) | Kindergeld et Kinderzuschlag : tableau officiel de la Familienkasse |
| `re` (`monat`, `beginn` = `nach`/`vor`) | Rente, § 118 SGB VI ou § 272a SGB VI |
| `r1` | Première rente après un début de rente |
| `gs` (`monat`) | Grundsicherungsgeld (früher Bürgergeld), § 42 SGB II |
| `alg` (`monat`) | Arbeitslosengeld, § 337 SGB III, premier jour ouvré du mois suivant |
| `vo` (`leistung` = `wohngeld`/`bafoeg`, `monat`) | Paiement d'avance : fenêtre autour du 1er, jour exact fixé par l'administration |
| `eg` (`tag`, `gmonat`, `gjahr`, `dauer`) | Elterngeld : Lebensmonate (§§ 4, 6 BEEG) |
| `bat` (`jahr`, `m`) | Bankarbeitstage, fériés nationaux, TARGET |
| `mo` (`monat`, `endziffer`) | Tous les paiements d'un mois, triés par date |
| `meine` | Calendrier personnel de l'accueil (`az/MeineZahlungen.tsx`), export ICS |

Le moteur est `src/lib/engine/zahltermine.ts` (fonctions pures). **Il reproduit sans écart les douze dates 2026 de la Deutsche Rentenversicherung** ; `tests/zahltermine.test.ts` le vérifie avec les jours de fermeture TARGET de la BCE, Pâques (Gauss, contrôlé par Meeus) et des échantillons du tableau de la Familienkasse.

**Rien n'est envoyé ni stocké** : aucun outil ne fait de requête réseau avec une saisie ; le fichier .ics est créé dans le navigateur.

## Les données

`src/data/params-2026.json` : tableaux Kindergeld 2026 et 2027 **recopiés** de la Familienkasse (jamais extrapolés), liste DRV 2026, hausse des rentes au 1er juillet 2026, réforme du Grundsicherungsgeld, jours TARGET et les **sources** (clés de `sources` et `h.src`). Tout chiffre et toute date d'une page viennent de là ou du moteur (`K.P`, `K.renteNach`, `K.kindergeld`, `h.dl`…), jamais tapés à la main.

## Rédaction

- Titre 50 à 60 caractères, terme clé d'abord (jamais « German … » en tête) ; description 150 à 160 ; `resume` = un seul paragraphe de 120 mots ou plus ; 3 à 5 FAQ de 40 à 90 mots, chaque question unique sur le site ; corps avec au moins un `h.mini`.
- « Bürgergeld » n'apparaît que sous la forme « Grundsicherungsgeld (früher Bürgergeld) » / « (formerly Bürgergeld) ».
- Montants : ce site donne les **dates**, pas les montants ; aucun calculateur de montant, aucun lien vers un autre site du portefeuille.
- Wohngeld, BAföG, Elterngeld : la loi ne fixe pas de jour ; écrire la fenêtre et dire que l'administration fixe le jour.
- Anglais : pour un expatrié en Allemagne ; les termes allemands (Kindergeld, Endziffer, Familienkasse) sont gardés et expliqués.

## Mise à jour

1. Janvier 2027 : la DRV publie sa liste 2027. La comparer au calcul ; ajouter `tabelle2027` et étendre `drvTabelle`.
2. Fin 2027 : la Familienkasse publie les dates 2028 ; les recopier dans `kindergeld.termine`.
3. Kindergeld 2027 (projet de loi) et Regelbedarf 2027 : relire l'état du vote et mettre à jour `params-2026.json`.
4. Chaque année : jours TARGET de la BCE.
5. Après chaque modification : `npm run check` (0 défaut attendu).
