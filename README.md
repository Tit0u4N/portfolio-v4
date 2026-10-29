# Portfolio v4

Refonte technique de la v3 (Next.js) en **Astro 7 statique** + **Tailwind 4**, déployée sur **Cloudflare Workers** (static assets). Même contenu, même visuel.

## Stack

- Astro (`output: 'static'`), HTML généré au build, i18n FR `/` + EN `/en/`
- Îles React uniquement pour l'interactif : `Nav` (dock, `client:load`), `Accordion` et `ProjectGrid` (`client:visible`)
- Animations d'entrée (BlurFade, WordPullUp, shiny text) en CSS pur
- Contenu en Content Collections : `src/content/{projects,experiences,education}/{fr,en}/*.md`
- Textes d'interface : `src/i18n/ui.ts`

## Commandes

```bash
bun install --frozen-lockfile --ignore-scripts
bun run dev        # http://localhost:4321
bun run build      # astro check + build + dist/_headers (CSP)
bun run preview    # build + wrangler dev (Worker local)
bun run deploy     # build + wrangler deploy
```

Domaine canonique : `https://titouanlf.com` (racine). Surcharge possible via `SITE_URL` (env), utilisé pour canonical, hreflang, sitemap, OG.

## Sécurité supply-chain

- Versions exactes épinglées (`bunfig.toml` `exact = true`, `.npmrc save-exact`)
- `minimumReleaseAge = 14 jours` (bunfig) : aucune version, même transitive, publiée il y a moins de 14 jours
- Scripts de cycle de vie des dépendances jamais exécutés (`trustedDependencies: []`, `--ignore-scripts`). Les 2 postinstalls bloqués (`esbuild`, `workerd`) ne font que vérifier leurs binaires, déjà fournis via les paquets optionnels par plateforme
- `bun audit` en CI

## SEO

Titre/description par langue, canonical, `hreflang` (fr, en, x-default), Open Graph/Twitter, JSON-LD (`ProfilePage`, `Person`, `ItemList` des projets), sitemap i18n, `robots.txt`, un seul `<h1>`. Le markdown des projets et expériences est présent dans le HTML même quand les panneaux sont fermés (indexable sans JS).

## Déploiement (GitHub Actions)

`.github/workflows/deploy.yml` sur push `main`. À configurer :
- secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- domaine : `titouanlf.com` doit être une zone de ton compte Cloudflare ; `wrangler deploy` crée le custom domain (route dans `wrangler.jsonc`)
- `www` → racine : dans le dashboard Cloudflare, *Rules › Redirect Rules* › modèle « Redirect from WWW to root » (301, conserve chemin et query). Ajouter un enregistrement DNS proxifié pour `www` (ex. `AAAA www 100::`) pour que la règle s'applique
