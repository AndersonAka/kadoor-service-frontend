# Configuration pour le déploiement sur Vercel - KADOOR SERVICE

## ✅ Configuration terminée

Le fichier `next.config.js` a été optimisé pour Vercel avec les configurations suivantes :

### 1. Optimisations Vercel
- ✅ `reactStrictMode: true` - Mode strict React activé
- ✅ Formats d'images modernes (AVIF, WebP)
- ✅ Cache des images optimisé (60s TTL)
- ✅ Optimisation des imports de packages
- ✅ Headers de sécurité HTTP

### 2. Configuration des rewrites
- Les rewrites sont configurés pour fonctionner en développement et en production
- En production sur Vercel, utilise `BACKEND_URL` ou `NEXT_PUBLIC_API_URL` pour pointer vers le backend

### 3. Headers de sécurité
- `X-DNS-Prefetch-Control`
- `Strict-Transport-Security` (HSTS)
- `X-Frame-Options`
- `X-Content-Type-Options`
- `X-XSS-Protection`
- `Referrer-Policy`

---

## 📋 Variables d'environnement requises sur Vercel

### Variables obligatoires

Dans les paramètres Vercel de votre projet, configurez ces variables d'environnement :

```
BACKEND_URL=https://votre-backend.herokuapp.com
# ou
NEXT_PUBLIC_API_URL=https://votre-backend.railway.app
```

**Important :**
- `BACKEND_URL` : URL complète du backend (sans `/api` à la fin)
- `NEXT_PUBLIC_API_URL` : URL publique du backend (utilisée côté client)
  - Si votre backend est sur `/api`, utilisez `https://backend.com/api`
  - Si votre backend est à la racine, utilisez `https://backend.com`

### Variables optionnelles

```
NEXT_PUBLIC_APP_URL=https://votre-domaine.vercel.app
NEXT_PUBLIC_DEFAULT_LOCALE=fr
```

---

## 🚀 Étapes de déploiement sur Vercel

### 1. Préparation
1. Assurez-vous que votre code est sur GitHub/GitLab/Bitbucket
2. Vérifiez que `package.json` contient Next.js 16.0.10
3. Vérifiez que toutes les dépendances sont à jour

### 2. Connexion à Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub/GitLab/Bitbucket
3. Cliquez sur "New Project"
4. Importez votre repository

### 3. Configuration du projet
- **Framework Preset** : Next.js (détecté automatiquement)
- **Root Directory** : `frontend` (si votre repo contient frontend/ et backend/)
- **Build Command** : `npm run build` (par défaut)
- **Output Directory** : `.next` (par défaut)
- **Install Command** : `npm install` (par défaut)

### 4. Variables d'environnement
Dans "Environment Variables", ajoutez :
```
BACKEND_URL=https://votre-backend-url.com
NEXT_PUBLIC_API_URL=https://votre-backend-url.com/api
NEXT_PUBLIC_APP_URL=https://votre-projet.vercel.app
```

### 5. Déploiement
1. Cliquez sur "Deploy"
2. Attendez la fin du build
3. Vercel déploiera automatiquement votre application

---

## 🔧 Configuration du fichier `vercel.json`

Un fichier `vercel.json` a été créé avec :
- Configuration du framework Next.js
- Région de déploiement (iad1 - US East)
- Référence aux variables d'environnement

**Note :** Ce fichier est optionnel. Vercel détecte automatiquement Next.js.

---

## ⚠️ Points importants pour Vercel

### 1. Backend externe
Si votre backend NestJS est hébergé séparément (Heroku, Railway, etc.) :
- Configurez `NEXT_PUBLIC_API_URL` avec l'URL complète de votre backend
- Les rewrites dans `next.config.js` fonctionneront pour le SSR
- Pour les appels API côté client, utilisez `NEXT_PUBLIC_API_URL` directement

### 2. CORS sur le backend
Assurez-vous que votre backend NestJS autorise les requêtes depuis votre domaine Vercel :
```typescript
// Dans votre backend (main.ts ou app.module.ts)
app.enableCors({
  origin: [
    'https://votre-projet.vercel.app',
    'http://localhost:3000', // Pour le développement
  ],
  credentials: true,
});
```

### 3. Images optimisées
- Les images sont automatiquement optimisées par Vercel
- Formats AVIF et WebP sont supportés
- Cache de 60 secondes minimum

### 4. Internationalisation (i18n)
- `next-intl` est configuré et fonctionne avec Vercel
- Les locales `fr` et `en` sont supportées
- Le routage multilingue fonctionne automatiquement

---

## 🐛 Dépannage

### Problème : Erreur 404 sur les routes API
**Solution :** Vérifiez que `BACKEND_URL` ou `NEXT_PUBLIC_API_URL` est correctement configuré dans Vercel.

### Problème : Images non chargées
**Solution :** Vérifiez que les `remotePatterns` dans `next.config.js` incluent tous les domaines d'images.

### Problème : Erreur de build
**Solution :** 
1. Vérifiez les logs de build dans Vercel
2. Testez localement avec `npm run build`
3. Vérifiez que toutes les dépendances sont compatibles avec Next.js 16

---

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Next.js sur Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Variables d'environnement Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
