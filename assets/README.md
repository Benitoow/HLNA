# 🎨 HLNA Assets Directory

## 📁 Structure des Ressources

```
assets/
├── 📂 images/          # Images et icônes
│   ├── 📂 icons/       # Icônes interface
│   ├── 📂 logos/       # Logos HLNA
│   └── 📂 ui/          # Images interface
├── 📂 fonts/           # Polices personnalisées
├── 📂 audio/           # Fichiers audio
│   ├── 📂 notifications/ # Sons notifications
│   └── 📂 voice/       # Synthèse vocale
├── 📂 data/            # Données statiques
│   ├── 📂 models/      # Modèles pré-entraînés
│   └── 📂 configs/     # Configurations
└── 📂 themes/          # Thèmes interface
    ├── 📂 dark/        # Thème sombre
    └── 📂 light/       # Thème clair
```

## 🎯 Types de Ressources

### Images & Icônes
- **Format**: PNG, SVG (préféré), WebP
- **Tailles**: 16x16, 32x32, 64x64, 128x128, 256x256
- **Optimisation**: Compression automatique

### Polices
- **Format**: WOFF2 (principal), WOFF (fallback)
- **Styles**: Regular, Bold, Light
- **Licence**: Open Source uniquement

### Audio
- **Format**: MP3, WebM
- **Qualité**: 128kbps pour notifications, 320kbps pour voix
- **Durée**: < 3s pour notifications

### Données
- **Format**: JSON, YAML
- **Compression**: Gzip activé
- **Validation**: Schema obligatoire

## 🔧 Utilisation

```javascript
// Images
const icon = '/assets/images/icons/chat-32.svg';
const logo = '/assets/images/logos/hlna-main.png';

// Audio
const notification = '/assets/audio/notifications/message.mp3';

// Données
const config = '/assets/data/configs/ui-settings.json';
```

## 📝 Guidelines

1. **Nommage**: kebab-case (chat-icon-32.svg)
2. **Organisation**: Sous-dossiers par type/taille
3. **Optimisation**: Outils de compression obligatoires
4. **Documentation**: Chaque dossier doit avoir un README
5. **Licence**: Toutes les ressources doivent être libres

## 🚀 Optimisation

- **Images**: ImageOptim, TinyPNG
- **SVG**: SVGO
- **Audio**: Audacity, FFmpeg
- **Fonts**: FontSquirrel Webfont Generator
