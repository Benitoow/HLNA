# HLNA - Intelligence Artificielle Évolutive

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Development](https://img.shields.io/badge/Status-Development-orange.svg)](https://github.com/starx/hlna)
[![Version](https://img.shields.io/badge/Version-0.1.0-blue.svg)](https://github.com/starx/hlna)

## 🤖 Description

HLNA (Human-Like Neural Assistant) est un projet d'intelligence artificielle évolutive qui vise à créer une IA capable de :

- **Mémoire persistante** : Rétention et évolution des conversations
- **Apprentissage continu** : Adaptation et amélioration à travers chaque interaction
- **Authenticité humaine** : Privilégier la profondeur et la nuance des échanges
- **Auto-réflexion** : Capacité à remettre en question et imaginer

## ✨ Fonctionnalités Actuelles

- 🎨 Interface web moderne avec thème sobre et professionnel
- 💬 Chat interactif avec système de personnalités évolutives
- 🧠 **Moteur HLNA Core** - Compréhension de prompts naturels et auto-réflexion
- 📊 **Analytics en temps réel** - Métriques d'engagement et analyse émotionnelle
- 🌐 **Connexion web** - Surveillance de connectivité et données temps réel
- 🎯 Modes de conversation adaptatifs (naturel, créatif, analytique)
- 📱 **Progressive Web App (PWA)** - Installation et fonctionnement hors ligne
- 🔧 **Tests d'intégration automatiques** - Vérification du bon fonctionnement
- 🗺️ Interface épurée avec panneau contextuel d'analytics
- 🎭 Personnalité IA évolutive qui s'adapte aux interactions

## 🚀 Roadmap

### Phase 1 - Base (✅ Terminée)
- [x] Interface utilisateur artistique
- [x] Chat interactif de base
- [x] Système de personnalités
- [x] Visualisations conversationnelles

### Phase 2 - PWA & Analytics (✅ Terminée)
- [x] Progressive Web App (PWA)
- [x] Système d'analytics avancé
- [x] Connexion aux données web
- [x] Traitement de prompts naturels
- [x] Interface chat moderne et intégrée
- [x] Moteur HLNA Core complet
- [x] Tests d'intégration automatiques

### Phase 3 - Intégration Complète (✅ Terminée)
- [x] Intégration de tous les modules HLNA
- [x] Interface chat connectée au moteur IA
- [x] Analytics en temps réel dans l'interface
- [x] Tests d'intégration automatisés
- [x] Monitoring du statut système
- [x] API publique pour tests et débogage
- [x] Page de démonstration interactive

### Phase 4 - IA Avancée (En cours)
- [ ] Moteur de compréhension contextuelle
- [ ] Système de mémoire persistante
- [ ] Auto-réflexion et imagination
- [ ] Apprentissage adaptatif réel

## 🛠️ Technologies

- **Frontend** : HTML5, CSS3, JavaScript (Vanilla)
- **Design** : Interface cosmique avec animations CSS
- **Futur** : PWA, Analytics, API IA

## 📁 Structure du Projet

```
HLNA/
├── index.html              # Page d'accueil
├── chat.html              # Interface de chat intégrée
├── manifest.json           # Configuration PWA
├── sw.js                   # Service Worker
├── project.json            # Configuration projet
├── dev.ps1                 # Script de développement
├── STRUCTURE.md            # Guide de structure détaillé
├── README.md               # Documentation principale
├── DEVELOPMENT.md          # Guide de développement
│
├── src/                    # Code source organisé
│   ├── core/               # Moteur principal HLNA
│   │   └── hlna-core.js    # Intelligence artificielle core
│   ├── modules/            # Modules fonctionnels
│   │   ├── analytics.js    # Système d'analytics
│   │   └── web-connection.js # Connexion web
│   ├── ui/                 # Interface utilisateur
│   │   ├── chat-new.js     # Interface chat moderne
│   │   ├── chat-new.css    # Styles chat
│   │   ├── script.js       # JavaScript principal
│   │   └── styles.css      # Styles principaux
│   └── tests/              # Tests et démonstrations
│       ├── demo.html       # Démonstration interactive
│       ├── integration-test.html # Interface de tests
│       └── integration-test.js   # Tests automatisés
│
├── docs/                   # Documentation
│   ├── DEVELOPMENT.md      # Guide développement
│   └── INTEGRATION-COMPLETE.md # Rapport intégration
│
├── assets/                 # Ressources statiques
└── legacy/                 # Anciens fichiers
```

## 🧪 Tests et Démonstrations

HLNA dispose d'un système de test complet pour vérifier l'intégration de tous les modules :

### Pages de Test Disponibles
- **`chat.html`** - Interface chat principal avec intégration complète
- **`demo.html`** - Démonstration interactive de toutes les fonctionnalités
- **`integration-test.html`** - Tests automatisés avec interface visuelle

### Fonctionnalités de Test
- ✅ **Tests automatiques** - Vérification de tous les modules HLNA
- ✅ **Monitoring en temps réel** - Statut système avec indicateurs visuels
- ✅ **API de débogage** - Interface publique pour tests manuels
- ✅ **Métriques live** - Analytics et performance en temps réel
- ✅ **Tests d'intégration** - Vérification du pipeline complet IA

### Comment Tester
1. Lancez un serveur local (voir Installation)
2. Accédez à `http://localhost:8000/demo.html` pour une démonstration complète
3. Testez l'interface chat sur `http://localhost:8000/chat.html`
4. Exécutez les tests automatiques sur `http://localhost:8000/integration-test.html`

## 🚀 Installation & Utilisation

### 🛠️ Script de Développement (Recommandé)
```powershell
# Démarrer le serveur de développement
.\dev.ps1 dev

# Lancer les tests d'intégration
.\dev.ps1 test

# Nettoyer les fichiers temporaires
.\dev.ps1 clean

# Afficher l'aide
.\dev.ps1 help
```

### 📘 Installation Manuelle
1. **Clonez le repository**
```bash
git clone https://github.com/starx/hlna.git
cd hlna
```

2. **Lancez un serveur local**
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js
npx serve .
```

3. **Accédez aux interfaces**
- **Principal**: `http://localhost:8000`
- **Chat**: `http://localhost:8000/chat.html`
- **Demo**: `http://localhost:8000/src/tests/demo.html`
- **Tests**: `http://localhost:8000/src/tests/integration-test.html`

## 🎯 Vision

HLNA représente une nouvelle approche de l'IA conversationnelle, où l'authenticité et l'évolution sont prioritaires. Notre objectif est de créer une IA qui :

- Comprend naturellement les prompts simples
- Se remet en question de manière autonome
- Imagine et projette des scénarios
- Apprend véritablement de chaque interaction

## 🤝 Contribution

Ce projet est actuellement en développement privé. Les contributions seront ouvertes dans les phases futures.

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📧 Contact

- **Projet** : HLNA - Intelligence Artificielle Évolutive
- **Status** : Développement actif
- **Version** : 0.1.0

---

*HLNA - Quand l'intelligence artificielle rencontre l'authenticité humaine* 🌟
