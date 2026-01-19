# Diagnostic des problèmes en production

## Problèmes identifiés

1. **Pages de détails véhicules et appartements redirigent vers Not Found**
2. **Page Not Found non internationalisée** (✅ Corrigé)

## Solutions appliquées

### 1. Internationalisation de la page Not Found ✅

- Ajout des traductions dans `messages/fr.json` et `messages/en.json`
- Modification de `components/404/ErrorPageContent.jsx` pour utiliser `useTranslations`
- Modification de `components/404/Form.jsx` pour utiliser `useTranslations`
- Modification de `app/[locale]/not-found.jsx` pour utiliser `generateMetadata` avec traductions

### 2. Amélioration de la gestion des erreurs API ✅

- Amélioration de `utils/serverApi.js` avec :
  - Meilleure gestion des erreurs
  - Logs détaillés pour le diagnostic
  - Support de `NEXT_PUBLIC_API_URL` en fallback

## Vérifications à faire en production

### 1. Variables d'environnement sur Vercel

Vérifiez que les variables suivantes sont correctement configurées dans Vercel :

```bash
BACKEND_URL=https://votre-backend.onrender.com
NEXT_PUBLIC_API_URL=https://votre-backend.onrender.com/api
```

**Important :**
- `BACKEND_URL` : URL complète du backend **SANS** `/api` à la fin
- `NEXT_PUBLIC_API_URL` : URL complète du backend **AVEC** `/api` à la fin

### 2. Vérification des logs

Après le déploiement, vérifiez les logs Vercel pour voir :
- Si `BACKEND_URL` est correctement défini
- Si les appels API échouent et pourquoi
- Les messages de log `[serverApi]` pour diagnostiquer les problèmes

### 3. Test des routes

Testez les URLs suivantes en production :
- `/fr/vehicules/[id]` (devrait afficher les détails du véhicule)
- `/en/vehicles/[id]` (devrait afficher les détails du véhicule)
- `/fr/appartements/[id]` (devrait afficher les détails de l'appartement)
- `/en/apartments/[id]` (devrait afficher les détails de l'appartement)

### 4. Vérification CORS sur le backend

Assurez-vous que le backend autorise les requêtes depuis votre domaine Vercel :
- Vérifiez les en-têtes CORS dans le backend
- Ajoutez votre domaine Vercel à la liste des origines autorisées

## Problèmes potentiels restants

### Routes dynamiques

Si les pages de détails redirigent toujours vers Not Found, cela peut être dû à :

1. **Problème de routage next-intl** : Les routes dynamiques peuvent ne pas être correctement traduites
2. **Problème d'API** : L'API retourne null ou une erreur, ce qui déclenche `notFound()`

### Solution pour les routes

Si le problème persiste, vérifiez que les liens utilisent correctement le composant `Link` de `@/i18n/routing` :

```jsx
import { Link } from '@/i18n/routing';

// ✅ Correct
<Link href={`/vehicle-details/${id}`}>

// ❌ Incorrect (ne pas utiliser next/link)
import Link from 'next/link';
<Link href={`/vehicle-details/${id}`}>
```

## Prochaines étapes

1. Déployer les corrections sur Vercel
2. Vérifier les logs pour identifier les problèmes d'API
3. Tester les routes en production
4. Si le problème persiste, vérifier la configuration CORS du backend
