/**
 * HLNA Integration Test
 * Script de test pour vérifier l'intégration de tous les modules HLNA
 */

class HLNAIntegrationTest {
  constructor() {
    this.testResults = {
      core: { status: 'pending', message: '', tested: false },
      analytics: { status: 'pending', message: '', tested: false },
      webConnection: { status: 'pending', message: '', tested: false },
      chatInterface: { status: 'pending', message: '', tested: false },
    };

    this.init();
  }

  init() {
    console.log('🧪 HLNA Integration Test initialisé');

    // Attendre que tous les modules soient chargés
    this.waitForModules().then(() => {
      this.runTests();
    });
  }

  async waitForModules() {
    return new Promise(resolve => {
      const checkModules = () => {
        const allLoaded =
          window.HLNACore && window.HLNAAnalytics && window.HLNAWebConnection;

        if (allLoaded) {
          console.log('✅ Tous les modules HLNA sont chargés');
          resolve();
        } else {
          console.log('⏳ Attente du chargement des modules...');
          setTimeout(checkModules, 500);
        }
      };
      checkModules();
    });
  }

  async runTests() {
    console.log("🚀 Démarrage des tests d'intégration HLNA");

    await this.testHLNACore();
    await this.testAnalytics();
    await this.testWebConnection();
    await this.testChatInterface();

    this.displayResults();
  }

  async testHLNACore() {
    console.log('🧠 Test HLNA Core...');

    try {
      if (!window.HLNACore) {
        throw new Error('HLNACore non disponible');
      }

      const core = window.HLNACore;

      // Test de traitement de message
      const testMessage = 'Bonjour HLNA, comment ça va ?';
      const response = await core.processMessage(testMessage);

      if (response && response.content) {
        this.testResults.core = {
          status: 'success',
          message: `Core opérationnel. Réponse: "${response.content.substring(0, 50)}..."`,
          tested: true,
        };
        console.log('✅ HLNA Core: Test réussi');
      } else {
        throw new Error('Réponse invalide du core');
      }
    } catch (error) {
      this.testResults.core = {
        status: 'error',
        message: `Erreur: ${error.message}`,
        tested: true,
      };
      console.error('❌ HLNA Core: Test échoué', error);
    }
  }

  async testAnalytics() {
    console.log('📊 Test Analytics...');

    try {
      if (!window.HLNAAnalytics) {
        throw new Error('HLNAAnalytics non disponible');
      }

      const analytics = window.HLNAAnalytics;

      // Test de tracking
      analytics.track('test_event', { test: true });

      // Test de récupération des métriques
      const metrics = analytics.getMetrics();

      if (metrics) {
        this.testResults.analytics = {
          status: 'success',
          message: `Analytics opérationnel. ${metrics.messages || 0} messages trackés.`,
          tested: true,
        };
        console.log('✅ Analytics: Test réussi');
      } else {
        throw new Error('Métriques non disponibles');
      }
    } catch (error) {
      this.testResults.analytics = {
        status: 'error',
        message: `Erreur: ${error.message}`,
        tested: true,
      };
      console.error('❌ Analytics: Test échoué', error);
    }
  }

  async testWebConnection() {
    console.log('🌐 Test Web Connection...');

    try {
      if (!window.HLNAWebConnection) {
        throw new Error('HLNAWebConnection non disponible');
      }

      const webConnection = window.HLNAWebConnection;

      // Test de récupération d'infos de connexion
      const connectionInfo = webConnection.getConnectionInfo();

      if (connectionInfo) {
        this.testResults.webConnection = {
          status: 'success',
          message: `Web Connection opérationnel. Status: ${connectionInfo.status || 'unknown'}`,
          tested: true,
        };
        console.log('✅ Web Connection: Test réussi');
      } else {
        throw new Error('Informations de connexion non disponibles');
      }
    } catch (error) {
      this.testResults.webConnection = {
        status: 'error',
        message: `Erreur: ${error.message}`,
        tested: true,
      };
      console.error('❌ Web Connection: Test échoué', error);
    }
  }

  async testChatInterface() {
    console.log('💬 Test Chat Interface...');

    try {
      // Vérifier que l'interface est présente
      const chatInput = document.getElementById('chat-input-new');
      const sendBtn = document.getElementById('send-btn-new');
      const messagesContainer = document.getElementById('messages-container');

      if (!chatInput || !sendBtn || !messagesContainer) {
        throw new Error("Éléments d'interface manquants");
      }

      this.testResults.chatInterface = {
        status: 'success',
        message: 'Interface chat opérationnelle. Tous les éléments présents.',
        tested: true,
      };
      console.log('✅ Chat Interface: Test réussi');
    } catch (error) {
      this.testResults.chatInterface = {
        status: 'error',
        message: `Erreur: ${error.message}`,
        tested: true,
      };
      console.error('❌ Chat Interface: Test échoué', error);
    }
  }

  displayResults() {
    console.log("\n📋 RÉSULTATS DES TESTS D'INTÉGRATION HLNA");
    console.log('================================================');

    let allPassed = true;

    Object.entries(this.testResults).forEach(([module, result]) => {
      const status = result.status === 'success' ? '✅' : '❌';
      console.log(`${status} ${module.toUpperCase()}: ${result.message}`);

      if (result.status !== 'success') {
        allPassed = false;
      }
    });

    console.log('================================================');

    if (allPassed) {
      console.log('🎉 TOUS LES TESTS SONT PASSÉS ! HLNA est prêt.');
      this.createSuccessIndicator();
    } else {
      console.log(
        '⚠️ Certains tests ont échoué. Vérifiez les erreurs ci-dessus.'
      );
      this.createErrorIndicator();
    }
  }

  createSuccessIndicator() {
    // Créer un indicateur visuel de succès
    const indicator = document.createElement('div');
    indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            animation: slideIn 0.3s ease-out;
        `;
    indicator.innerHTML = '🎉 HLNA Intégration réussie !';

    document.body.appendChild(indicator);

    // Supprimer après 5 secondes
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }
    }, 5000);
  }

  createErrorIndicator() {
    // Créer un indicateur visuel d'erreur
    const indicator = document.createElement('div');
    indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        `;
    indicator.innerHTML = "⚠️ Erreurs d'intégration détectées";

    document.body.appendChild(indicator);

    // Supprimer après 8 secondes
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }
    }, 8000);
  } // API publique pour tests manuels
  getResults() {
    return this.testResults;
  }

  // API publique pour tests automatisés avec retour de résultats
  async runTestsAndGetResults() {
    console.log('🔄 Exécution des tests via API publique...');

    // Réinitialiser les résultats
    this.testResults = {
      core: { status: 'pending', message: '', tested: false },
      analytics: { status: 'pending', message: '', tested: false },
      webConnection: { status: 'pending', message: '', tested: false },
      chatInterface: { status: 'pending', message: '', tested: false },
    };

    await this.testHLNACore();
    await this.testAnalytics();
    await this.testWebConnection();
    await this.testChatInterface();

    // Convertir les résultats au format attendu par la page de test
    const formattedResults = {};
    Object.entries(this.testResults).forEach(([moduleName, result]) => {
      formattedResults[moduleName] = {
        success: result.status === 'success',
        message: result.message,
        details: result.tested ? 'Test completed' : 'Test not run',
      };
    });

    return formattedResults;
  }

  async retestModule(moduleName) {
    console.log(`🔄 Nouveau test pour ${moduleName}...`);

    switch (moduleName) {
      case 'core':
        await this.testHLNACore();
        break;
      case 'analytics':
        await this.testAnalytics();
        break;
      case 'webConnection':
        await this.testWebConnection();
        break;
      case 'chatInterface':
        await this.testChatInterface();
        break;
      default:
        console.error('Module non reconnu:', moduleName);
        return;
    }

    console.log(`✅ Nouveau test ${moduleName} terminé`);
  }
}

// Styles pour l'animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Instance globale
let hlnaIntegrationTest;

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
  // Attendre un peu que les autres modules se chargent
  setTimeout(() => {
    hlnaIntegrationTest = new HLNAIntegrationTest();

    // Exposer globalement pour debug et API publique
    window.HLNAIntegrationTest = {
      runTests: () => hlnaIntegrationTest.runTestsAndGetResults(),
      getResults: () => hlnaIntegrationTest.getResults(),
      retestModule: moduleName => hlnaIntegrationTest.retestModule(moduleName),
      instance: hlnaIntegrationTest,
    };

    console.log('✅ HLNA Integration Test API exposée globalement');
  }, 1000);
});

// Export pour utilisation modulaire
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HLNAIntegrationTest;
}
