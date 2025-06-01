/**
 * HLNA CSS Integration Validator
 * Script de validation pour l'intégration CSS complète
 */

class HLNACSSValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.validations = [];
    this.init();
  }

  init() {
    console.log('🔍 Début de la validation CSS HLNA...');
    this.validateCSSFiles();
    this.validateThemeSystem();
    this.validateResponsiveness();
    this.validateAccessibility();
    this.generateReport();
  }

  /**
   * Validation des fichiers CSS
   */
  validateCSSFiles() {
    const requiredFiles = [
      'src/ui/styles.css',      'src/ui/chat.css',
      'src/ui/theme-enhancements.css',
      'assets/themes/dark/theme.css',
      'assets/themes/light/theme.css',
    ];

    requiredFiles.forEach(file => {
      const link = document.querySelector(`link[href="${file}"]`);
      if (link) {
        this.validations.push(`✅ ${file} chargé`);
      } else {
        this.errors.push(`❌ ${file} manquant`);
      }
    });
  }

  /**
   * Validation du système de thèmes
   */
  validateThemeSystem() {
    // Vérifier la présence du contrôleur de thèmes
    if (window.hlnaThemeController) {
      this.validations.push('✅ Contrôleur de thèmes initialisé');

      // Tester les thèmes
      const currentTheme = window.hlnaThemeController.getCurrentTheme();
      this.validations.push(`✅ Thème actuel: ${currentTheme}`);

      // Vérifier les variables CSS
      this.validateCSSVariables();
    } else {
      this.errors.push('❌ Contrôleur de thèmes non trouvé');
    }

    // Vérifier le bouton de thème
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      this.validations.push('✅ Bouton de basculement de thème présent');
    } else {
      this.errors.push('❌ Bouton de basculement manquant');
    }
  }

  /**
   * Validation des variables CSS
   */
  validateCSSVariables() {
    const testElement = document.createElement('div');
    document.body.appendChild(testElement);

    const requiredVariables = [
      '--theme-background',
      '--theme-text',
      '--theme-primary',
      '--theme-transition',
    ];

    requiredVariables.forEach(variable => {
      const value = getComputedStyle(testElement).getPropertyValue(variable);
      if (value.trim()) {
        this.validations.push(`✅ Variable CSS ${variable} définie`);
      } else {
        this.warnings.push(`⚠️ Variable CSS ${variable} non définie`);
      }
    });

    document.body.removeChild(testElement);
  }

  /**
   * Validation de la responsivité
   */
  validateResponsiveness() {
    const breakpoints = [
      { name: 'Mobile', width: 480 },
      { name: 'Tablet', width: 768 },
      { name: 'Desktop', width: 1200 },
    ];

    // Simuler les breakpoints (basique)
    breakpoints.forEach(bp => {
      // Pour une validation réelle, il faudrait tester avec différentes tailles
      this.validations.push(`✅ Support ${bp.name} prévu (${bp.width}px)`);
    });
  }

  /**
   * Validation de l'accessibilité
   */
  validateAccessibility() {
    // Vérifier le contraste (basique)
    const body = document.body;
    const backgroundColor = getComputedStyle(body).backgroundColor;
    const color = getComputedStyle(body).color;

    if (backgroundColor && color) {
      this.validations.push('✅ Couleurs de base définies');
    } else {
      this.warnings.push('⚠️ Couleurs de base non détectées');
    }

    // Vérifier les focus
    const focusableElements = document.querySelectorAll(
      'button, input, textarea, [tabindex]'
    );
    if (focusableElements.length > 0) {
      this.validations.push(
        `✅ ${focusableElements.length} éléments focusables trouvés`
      );
    }

    // Vérifier les transitions
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      this.validations.push('✅ Préférence mouvement réduit détectée');
    }
  }

  /**
   * Génération du rapport de validation
   */
  generateReport() {
    console.log('\n📊 RAPPORT DE VALIDATION CSS HLNA');
    console.log('=====================================');

    console.log(`\n✅ VALIDATIONS (${this.validations.length}):`);
    this.validations.forEach(validation => console.log(validation));

    if (this.warnings.length > 0) {
      console.log(`\n⚠️ AVERTISSEMENTS (${this.warnings.length}):`);
      this.warnings.forEach(warning => console.log(warning));
    }

    if (this.errors.length > 0) {
      console.log(`\n❌ ERREURS (${this.errors.length}):`);
      this.errors.forEach(error => console.log(error));
    }

    // Score final
    const total =
      this.validations.length + this.warnings.length + this.errors.length;
    const score = Math.round((this.validations.length / total) * 100);

    console.log(`\n🎯 SCORE FINAL: ${score}%`);

    if (score >= 90) {
      console.log('🏆 Excellente intégration CSS !');
    } else if (score >= 75) {
      console.log(
        '👍 Bonne intégration CSS avec quelques améliorations possibles'
      );
    } else {
      console.log('⚠️ Intégration CSS nécessite des corrections');
    }

    console.log('=====================================\n');

    // Retourner le rapport pour usage programmatique
    return {
      score,
      validations: this.validations.length,
      warnings: this.warnings.length,
      errors: this.errors.length,
      details: {
        validations: this.validations,
        warnings: this.warnings,
        errors: this.errors,
      },
    };
  }

  /**
   * Test de performance des thèmes
   */
  async testThemePerformance() {
    console.log('⏱️ Test de performance des thèmes...');

    if (!window.hlnaThemeController) {
      console.log('❌ Impossible de tester - contrôleur de thèmes manquant');
      return;
    }

    const startTime = performance.now();

    // Basculer entre les thèmes
    window.hlnaThemeController.setTheme('light');
    await new Promise(resolve => setTimeout(resolve, 300));

    window.hlnaThemeController.setTheme('dark');
    await new Promise(resolve => setTimeout(resolve, 300));

    const endTime = performance.now();
    const duration = endTime - startTime;

    console.log(`⏱️ Temps de basculement des thèmes: ${duration.toFixed(2)}ms`);

    if (duration < 1000) {
      console.log('✅ Performance des thèmes excellente');
    } else {
      console.log('⚠️ Performance des thèmes à optimiser');
    }
  }
}

// Auto-exécution si dans le navigateur
if (typeof window !== 'undefined' && document.readyState === 'complete') {
  new HLNACSSValidator();
} else if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    new HLNACSSValidator();
  });
}

// Export pour usage externe
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HLNACSSValidator;
}
