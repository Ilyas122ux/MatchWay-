# Mundial Experience 2030

Plateforme intelligente pour la Coupe du Monde 2030 (Maroc, Espagne, Portugal)

## Description

Mundial Experience 2030 est une plateforme web complète dédiée à la gestion et à l'amélioration de l'expérience des spectateurs lors de la Coupe du Monde 2030. La plateforme offre des services essentiels comme la billetterie, la gestion des transports, l'hébergement et des informations en temps réel.

## Fonctionnalités principales

- 🔐 Authentification sécurisée
- 🎫 Billetterie intelligente
- 🚌 Gestion des transports
- 🏨 Réservation d'hébergement
- 📱 Interface responsive
- 🌐 Support multilingue
- 📊 Tableau de bord utilisateur
- 💬 Chat communautaire

## Technologies utilisées

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome
- Responsive Design

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- Socket.IO

## Prérequis

- Node.js (v14 ou supérieur)
- MySQL (v8 ou supérieur)
- npm ou yarn

## Installation

1. Cloner le repository
```bash
git clone https://github.com/votre-username/mundial-experience-2030.git
cd mundial-experience-2030
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer la base de données
- Créer une base de données MySQL nommée `mundial_experience`
- Importer le fichier `database.sql`
- Configurer les variables d'environnement dans le fichier `.env`

4. Démarrer le serveur
```bash
npm start
```

## Structure du projet

```
mundial-experience-2030/
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── index.html
├── routes/
│   ├── auth.js
│   ├── tickets.js
│   ├── transport.js
│   └── events.js
├── database.sql
├── server.js
├── package.json
└── README.md
```

## Configuration

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
DB_HOST=localhost
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=mundial_experience
PORT=3000
JWT_SECRET=votre_secret_jwt
```

## API Endpoints

### Authentication
- POST /api/auth/register - Inscription
- POST /api/auth/login - Connexion
- GET /api/auth/verify - Vérification du token

### Billets
- GET /api/tickets - Liste des billets
- POST /api/tickets - Achat de billet
- GET /api/tickets/:id - Détails d'un billet

### Transport
- GET /api/transport - Liste des transports
- POST /api/transport/book - Réservation de transport
- GET /api/transport/:id - Détails d'un transport

### Événements
- GET /api/events - Liste des événements
- GET /api/events/:id - Détails d'un événement

## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Contact

Pour toute question ou suggestion, n'hésitez pas à nous contacter à l'adresse : contact@mundial-experience-2030.com 