# Employee Mood Tracker

Un baromètre d'humeur pour suivre le bien-être des employés avec Supabase et Next.js.

## Déploiement GitHub Actions

### 1. Configuration des secrets GitHub

Dans votre dépôt GitHub, allez dans **Settings > Secrets and variables > Actions** et ajoutez :

- `VERCEL_TOKEN` : Token d'API Vercel (depuis vercel.com/account/tokens)
- `ORG_ID` : ID de votre organisation Vercel
- `PROJECT_ID` : ID de votre projet Vercel

### 2. Variables d'environnement Vercel

Ajoutez ces variables dans votre projet Vercel :

- `SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 3. Base de données Supabase

Exécutez les scripts SQL dans l'ordre :
1. `scripts/01-create-mood-tables.sql`
2. `scripts/02-create-update-trigger.sql`
3. `scripts/03-seed-sample-mood-data.sql`

## Développement local

\`\`\`bash
npm install
npm run dev
\`\`\`

## Fonctionnalités

- Saisie d'humeur matinale
- Bilan du soir
- Tableau de bord avec statistiques
- Stockage sécurisé avec Supabase
