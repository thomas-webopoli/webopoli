# 🌱 Optimisation Éco-Index WebOpoli

## Objectif : Obtenir le label Éco-Site

### Situation initiale
| Métrique | Valeur | Cible | Statut |
|----------|--------|-------|--------|
| Poids page | 2.775 Mo | < 1.024 Mo | ❌ |
| Complexité DOM | 674 éléments | < 600 | ⚠️ |
| Requêtes | 32 | < 40 | ✅ |

---

## Optimisations appliquées

### 1. 🖼️ Images (impact majeur)

**Problème** : Images dans `/public/images/projets/` = 2.34 Mo

**Solutions** :
- ✅ Utilisation de `next/image` avec optimisation automatique
- ✅ Propriété `loading="lazy"` pour chargement différé
- ✅ Propriété `quality={75}` pour compression
- ✅ Attribut `sizes` pour servir la bonne taille selon l'écran
- 🔧 Script `npm run optimize-images` pour réduire les sources à 600px

**Commande à exécuter** :
```bash
npm install  # Installe sharp
npm run optimize-images
```

**Gain estimé** : ~1.5 Mo (images de 2.34 Mo → ~500 Ko)

---

### 2. 🎨 Polices (impact moyen)

**Avant** : Google Fonts externe (DM Sans + Playfair Display) = ~300 Ko

**Après** : Polices système natives
- `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`
- `Georgia, 'Times New Roman', Times, serif`

**Gain** : ~300 Ko + 2 requêtes HTTP en moins

---

### 3. 🎬 Animations (impact moyen)

**Avant** : Framer Motion (~130 Ko gzipped) avec animations sur TOUS les éléments

**Après** : 
- Animations CSS natives légères
- Suppression des `motion.div` sur les éléments statiques
- Animations uniquement où nécessaire (Hero)

**Gain** : ~100 Ko JavaScript

---

### 4. 🏗️ Complexité DOM

**Optimisations** :
- ✅ Réalisations : Affichage de 6 projets par défaut (bouton "Voir plus")
- ✅ Suppression des tags sur les cartes projets
- ✅ Utilisation de `<ul>/<li>` au lieu de `<div>` imbriquées
- ✅ Simplification des structures HTML
- ✅ Suppression des `motion.*` wrapper inutiles

**Gain estimé** : ~100-150 éléments DOM

---

### 5. ⚡ Cache et Performance

**next.config.js** :
```javascript
// Headers de cache agressifs
headers: [
  {
    source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2)',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
  },
]

// Optimisation images
images: {
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 31536000,
}
```

---

## Étapes pour déployer

```bash
# 1. Installer les dépendances
npm install

# 2. Optimiser les images sources
npm run optimize-images

# 3. Vérifier le build
npm run build

# 4. Tester en local
npm start

# 5. Commiter et déployer
git add .
git commit -m "perf: optimisations éco-index pour label éco-site"
git push origin main
```

---

## Résultats attendus

| Métrique | Avant | Après (estimé) | Cible |
|----------|-------|----------------|-------|
| Poids page | 2.775 Mo | ~800 Ko | < 1.024 Mo |
| Complexité DOM | 674 | ~500 | < 600 |
| Requêtes | 32 | ~25 | < 40 |

**Score EcoIndex attendu** : B ou A (contre C/D actuellement)

---

## Vérification

Après déploiement, tester sur :
- https://www.ecoindex.fr/
- https://pagespeed.web.dev/ (Lighthouse)
- https://yellowlab.tools/

---

## Notes techniques

### Fichiers modifiés
- `src/app/globals.css` - Polices système, animations CSS
- `src/components/*.tsx` - Tous les composants (suppression framer-motion)
- `next.config.js` - Optimisation images et cache
- `package.json` - Script optimize-images

### Accessibilité maintenue
- ✅ `aria-label` sur les boutons
- ✅ `aria-hidden` sur les icônes décoratives
- ✅ Structure sémantique (`<header>`, `<nav>`, `<article>`, `<address>`)
- ✅ Labels sur les formulaires
