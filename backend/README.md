# Backend - Guide d'Utilisation

Ce guide explique comment configurer, exécuter et interagir avec le backend JSON server.

## Installation

### Prérequis

- Node.js installé sur votre machine
- Git pour cloner le repository

### Installation

1. Clonez le repository:

```sh
git clone https://github.com/Disiz-The-World/backend.git
```

2. Naviguez vers le répertoire du projet:

```sh
cd backend
```

3. Installez les dépendances:

```sh
npm install
```

## Démarrage du Serveur

Lancez le serveur JSON avec la commande suivante:

```sh
npx json-server db.json --static public
```

Cette commande:

- Démarre le serveur (port par défaut: 3000)
- Sert le contenu de la base de données depuis `db.json`
- Sert les fichiers statiques depuis le répertoire `public`

## Points d'accès API

Le serveur fournit les points d'accès REST API suivants:

### Balades

- **Obtenir toutes les balades**: `GET /balades`
- **Obtenir une balade spécifique**: `GET /balades/:id`
- **Créer une nouvelle balade**: `POST /balades`
- **Mettre à jour une balade**: `PUT /balades/:id`
- **Mettre à jour partiellement une balade**: `PATCH /balades/:id`
- **Supprimer une balade**: `DELETE /balades/:id`

### Tags

- **Obtenir tous les tags**: `GET /tags`
- **Obtenir un tag spécifique**: `GET /tags/:id`
- **Créer un nouveau tag**: `POST /tags`
- **Mettre à jour un tag**: `PUT /tags/:id`
- **Mettre à jour partiellement un tag**: `PATCH /tags/:id`
- **Supprimer un tag**: `DELETE /tags/:id`

### Utilisateurs

- **Obtenir tous les utilisateurs**: `GET /users`
- **Obtenir un utilisateur spécifique**: `GET /users/:id`
- **Créer un nouvel utilisateur**: `POST /users`
- **Mettre à jour un utilisateur**: `PUT /users/:id`
- **Mettre à jour partiellement un utilisateur**: `PATCH /users/:id`
- **Supprimer un utilisateur**: `DELETE /users/:id`

## Interaction plus avancées avec les données

### Filtrage

Filtrez les ressources en ajoutant des paramètres de requête:

```
GET /balades?tagIds=1
GET /balades?duration_gte=60&duration_lte=90
```

### Tri

Triez les ressources par champs spécifiques:

```
GET /balades?_sort=duration&_order=asc
```

### Pagination

Paginez les résultats avec `_page` et `_limit`:

```
GET /balades?_page=1&_limit=10
```

## Fichiers Statiques

Les fichiers statiques (images, etc.) sont servis depuis le répertoire `public`. Selon la structure des fichiers, vous pouvez accéder à:

- Images des balades: `/1/preview.png`, `/1/map.png`, `/1/1.png`, etc.
- Autres ressources statiques dans le dossier `public`

## Structure des Données

### Balades

```json
{
  "id": 1,
  "name": "Nom de la balade",
  "catchPhrase": "Description courte",
  "duration": 75,         // en minutes
  "location": 1510,       // code postal
  "previewPath": "/1/preview.png",
  "map": "/1/map.png",
  "infos": [...],         // tableau d'objets d'information
  "favoriteIds": [...],   // tableau d'IDs des utilisateurs qui ont mis en favori
  "ratings": [...],       // tableau des évaluations de la balade (la moyenne de ceci donne la note de la balade)
  "content": {            // structure détaillée du contenu
    "details": "...",
    "sections": [...]
  },
  "attributions": {...},  // crédits
  "seeMore": [...],       // ressources supplémentaires
  "tagIds": [...]         // tableau d'IDs de tags
}
```

### Tags

```json
{
  "id": 1,
  "name": "Nom du tag",
  "icon": "e530" // code d'icône (Google Material Icons)
}
```

### Utilisateurs

```json
{
  "id": 1,
  "username": "nom d'utilisateur",
  "password": "mot de passe",
  "profilePicture": ""
}
```
