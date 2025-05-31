/**
 * HLNA Theme Controller
 * Gestionnaire de thèmes dynamiques pour l'interface HLNA
 */

class HLNAThemeController {
  constructor() {
    this.currentTheme = 'dark'; // Thème par défaut
    this.themes = {
      dark: {
        name: 'Sombre',
        cssFile: 'assets/themes/dark/theme.css',
        icon: 'sun',
      },
      light: {
        name: 'Clair',
        cssFile: 'assets/themes/light/theme.css',
        icon: 'moon',
      },
    };

    this.init();
  } /**
   * Initialisation du contrôleur de thèmes
   */
  init() {
    console.log('🎨 Initialisation du contrôleur de thèmes HLNA...');

    // Charger le thème sauvegardé ou par défaut
    this.loadSavedTheme();

    // Configurer les événements
    this.setupEventListeners();

    // Appliquer le thème initial
    this.applyTheme(this.currentTheme);

    // Ajouter les améliorations visuelles
    this.addPerformanceOptimizations();
    this.addThemeIndicator();
    this.addTransitionEffects();

    // Intégrer avec les autres systèmes HLNA
    this.integrateWithHLNASystems();

    console.log('✅ Contrôleur de thèmes initialisé');
  }

  /**
   * Configuration des écouteurs d'événements
   */
  setupEventListeners() {
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    // Écouter les changements de préférence système
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addListener(() => {
        if (!this.hasUserPreference()) {
          this.applySystemTheme();
        }
      });
    }

    // Écouter les raccourcis clavier
    document.addEventListener('keydown', e => {
      // Ctrl/Cmd + Shift + T pour basculer le thème
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  /**
   * Basculer entre les thèmes
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);

    // Animation de transition fluide
    this.animateThemeTransition();
  } /**
   * Définir un thème spécifique
   * @param {string} themeName - Nom du thème à appliquer
   */
  setTheme(themeName) {
    if (!this.themes[themeName]) {
      console.warn(`❌ Thème "${themeName}" non trouvé`);
      return;
    }

    const oldTheme = this.currentTheme;
    this.currentTheme = themeName;

    console.log(`🎨 Changement de thème: ${oldTheme} → ${themeName}`);

    // Appliquer le nouveau thème
    this.applyTheme(themeName);

    // Sauvegarder la préférence
    this.saveThemePreference(themeName);

    // Afficher la notification de succès
    this.showThemeChangeNotification(themeName);

    // Émettre un événement pour notifier les autres composants
    this.dispatchThemeChangeEvent(oldTheme, themeName);
  }

  /**
   * Appliquer un thème à l'interface
   * @param {string} themeName - Nom du thème à appliquer
   */
  applyTheme(themeName) {
    const theme = this.themes[themeName];

    // Mettre à jour l'attribut data-theme sur le body
    document.documentElement.setAttribute('data-theme', themeName);
    document.body.setAttribute('data-theme', themeName);

    // Activer le fichier CSS correspondant
    this.activateThemeCSS(themeName);

    // Mettre à jour l'icône du bouton de basculement
    this.updateThemeToggleIcon(theme.icon);

    // Mettre à jour la meta theme-color
    this.updateMetaThemeColor(themeName);

    // Ajouter des classes d'optimisation de performance
    this.addPerformanceOptimizations();

    // Afficher une notification de succès
    this.showThemeChangeNotification(themeName);

    // Ajouter un indicateur visuel de thème
    this.addThemeIndicator();

    // Gestion des animations de transition
    this.addTransitionEffects();

    console.log(`✨ Thème "${theme.name}" appliqué`);
  }

  /**
   * Activer le fichier CSS du thème
   * @param {string} themeName - Nom du thème
   */
  activateThemeCSS(themeName) {
    // Désactiver tous les thèmes
    Object.keys(this.themes).forEach(theme => {
      const link = document.getElementById(`theme-${theme}`);
      if (link) {
        link.disabled = true;
      }
    });

    // Activer le thème sélectionné
    const activeLink = document.getElementById(`theme-${themeName}`);
    if (activeLink) {
      activeLink.disabled = false;
    }
  }

  /**
   * Mettre à jour l'icône du bouton de basculement
   * @param {string} iconType - Type d'icône à afficher ('sun' ou 'moon')
   */
  updateThemeToggleIcon(iconType) {
    const sunIcon = document.querySelector('.theme-icon-sun');
    const moonIcon = document.querySelector('.theme-icon-moon');

    if (sunIcon && moonIcon) {
      if (iconType === 'sun') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      }
    }
  }

  /**
   * Mettre à jour la couleur de thème meta
   * @param {string} themeName - Nom du thème
   */
  updateMetaThemeColor(themeName) {
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      const colors = {
        dark: '#1a1a1a',
        light: '#ffffff',
      };
      metaTheme.setAttribute('content', colors[themeName] || '#FFD700');
    }
  }

  /**
   * Animation de transition entre thèmes
   */
  animateThemeTransition() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: ${this.currentTheme === 'dark' ? '#ffffff' : '#1a1a1a'};
            opacity: 0;
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.2s ease;
        `;

    document.body.appendChild(overlay);

    // Animation d'apparition
    requestAnimationFrame(() => {
      overlay.style.opacity = '0.1';
    });

    // Suppression après animation
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 200);
  }

  /**
   * Charger le thème sauvegardé
   */
  loadSavedTheme() {
    try {
      const savedTheme = localStorage.getItem('hlna-theme');
      if (savedTheme && this.themes[savedTheme]) {
        this.currentTheme = savedTheme;
        console.log(`📚 Thème chargé depuis le stockage: ${savedTheme}`);
      } else {
        // Utiliser le thème système si aucune préférence sauvegardée
        this.applySystemTheme();
      }
    } catch (error) {
      console.warn('⚠️ Erreur lors du chargement du thème:', error);
      this.currentTheme = 'dark'; // Fallback
    }
  }

  /**
   * Appliquer le thème basé sur la préférence système
   */
  applySystemTheme() {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      this.currentTheme = 'light';
      console.log('🌞 Thème clair détecté depuis les préférences système');
    } else {
      this.currentTheme = 'dark';
      console.log('🌙 Thème sombre détecté depuis les préférences système');
    }
  }

  /**
   * Sauvegarder la préférence de thème
   * @param {string} themeName - Nom du thème à sauvegarder
   */
  saveThemePreference(themeName) {
    try {
      localStorage.setItem('hlna-theme', themeName);
      localStorage.setItem('hlna-theme-timestamp', Date.now().toString());
      console.log(`💾 Préférence de thème sauvegardée: ${themeName}`);
    } catch (error) {
      console.warn('⚠️ Erreur lors de la sauvegarde du thème:', error);
    }
  }

  /**
   * Vérifier si l'utilisateur a une préférence de thème
   * @returns {boolean}
   */
  hasUserPreference() {
    return localStorage.getItem('hlna-theme') !== null;
  }

  /**
   * Émettre un événement de changement de thème
   * @param {string} oldTheme - Ancien thème
   * @param {string} newTheme - Nouveau thème
   */
  dispatchThemeChangeEvent(oldTheme, newTheme) {
    const event = new CustomEvent('hlna-theme-change', {
      detail: {
        oldTheme,
        newTheme,
        timestamp: Date.now(),
      },
    });

    document.dispatchEvent(event);
    console.log(
      `📡 Événement de changement de thème émis: ${oldTheme} → ${newTheme}`
    );
  }

  /**
   * Obtenir le thème actuel
   * @returns {string}
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Obtenir les informations du thème actuel
   * @returns {object}
   */
  getCurrentThemeInfo() {
    return {
      name: this.currentTheme,
      info: this.themes[this.currentTheme],
      timestamp: Date.now(),
    };
  }

  /**
   * Nettoyer et détruire le contrôleur
   */
  destroy() {
    // Supprimer les écouteurs d'événements si nécessaire
    console.log('🧹 Nettoyage du contrôleur de thèmes');
  }

  /**
   * Ajouter des classes d'optimisation de performance
   */
  addPerformanceOptimizations() {
    // Ajouter la classe d'optimisation aux éléments principaux
    const elementsToOptimize = [
      document.body,
      document.querySelector('.chat-container-new'),
      document.querySelector('.context-panel'),
      document.querySelector('.input-area-new'),
    ];

    elementsToOptimize.forEach(element => {
      if (element) {
        element.classList.add('theme-optimized');
      }
    });
  }

  /**
   * Afficher une notification de succès après changement de thème
   * @param {string} themeName - Nom du nouveau thème
   */
  showThemeChangeNotification(themeName) {
    const notification = document.createElement('div');
    notification.className = 'theme-change-success';
    notification.textContent = `Thème ${this.themes[themeName].name} activé`;

    document.body.appendChild(notification);

    // Supprimer après l'animation
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 2000);
  }

  /**
   * Ajouter un indicateur visuel de thème
   */
  addThemeIndicator() {
    if (!document.querySelector('.theme-indicator')) {
      const indicator = document.createElement('div');
      indicator.className = 'theme-indicator';
      document.body.appendChild(indicator);
    }
  }

  /**
   * Gestion des animations de transition
   */
  addTransitionEffects() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        // Ajouter classe d'animation au bouton
        themeToggle.classList.add('switching');
        setTimeout(() => {
          themeToggle.classList.remove('switching');
        }, 400);

        // Ajouter effet de transition globale
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
          document.body.classList.remove('theme-transitioning');
        }, 600);
      });
    }
  }

  /**
   * Intégration avec les autres systèmes HLNA
   */
  integrateWithHLNASystems() {
    // Écouter les événements du chat pour adapter le thème
    document.addEventListener('hlna-message-sent', () => {
      this.updateThemeBasedOnActivity();
    });

    document.addEventListener('hlna-mode-change', e => {
      this.adaptThemeToMode(e.detail.mode);
    });

    // Synchroniser avec le système d'analytics
    if (window.hlnaAnalytics) {
      document.addEventListener('hlna-theme-change', e => {
        window.hlnaAnalytics.trackThemeChange(e.detail.newTheme);
      });
    }
  }

  /**
   * Adapter le thème selon l'activité de l'utilisateur
   */
  updateThemeBasedOnActivity() {
    const hour = new Date().getHours();

    // Suggestion automatique de thème selon l'heure (si pas de préférence utilisateur)
    if (!this.hasUserPreference()) {
      if (hour >= 6 && hour < 18) {
        if (this.currentTheme !== 'light') {
          console.log('💡 Suggestion de thème clair pour la journée');
        }
      } else {
        if (this.currentTheme !== 'dark') {
          console.log('🌙 Suggestion de thème sombre pour le soir');
        }
      }
    }
  }

  /**
   * Adapter le thème selon le mode HLNA
   * @param {string} mode - Mode HLNA actuel
   */
  adaptThemeToMode(mode) {
    // Ajuster subtilement l'interface selon le mode
    const modeClasses = {
      creative: 'theme-mode-creative',
      analytical: 'theme-mode-analytical',
      natural: 'theme-mode-natural',
    };

    // Supprimer les anciennes classes de mode
    Object.values(modeClasses).forEach(className => {
      document.body.classList.remove(className);
    });

    // Ajouter la nouvelle classe de mode
    if (modeClasses[mode]) {
      document.body.classList.add(modeClasses[mode]);
    }
  }
}

// Export pour utilisation globale
window.HLNAThemeController = HLNAThemeController;

// Auto-initialisation si le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.hlnaThemeController = new HLNAThemeController();
  });
} else {
  // DOM déjà chargé
  window.hlnaThemeController = new HLNAThemeController();
}
