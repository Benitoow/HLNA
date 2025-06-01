// HLNA Project Validation Script
// Validation complète du projet HLNA avec Node.js

const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('🚀 HLNA Project Validation - Node.js Edition\n');

// Configuration des fichiers à vérifier
const requiredFiles = {
    css: [
        'src/ui/styles.css',        'src/ui/chat.css', 
        'src/ui/theme-enhancements.css',
        'assets/themes/dark/theme.css',
        'assets/themes/light/theme.css'
    ],    js: [
        'src/ui/theme-controller.js',
        'src/ui/chat.js',
        'src/core/hlna-core.js',
        'src/modules/analytics.js',
        'src/modules/web-connection.js'
    ],    html: [
        'index.html',
        'chat.html',
        'tests/demo.html',
        'tests/final-integration-test.html'
    ],    config: [
        'package.json',
        'public/manifest.json',
        'assets/themes/theme-config.json'
    ]
};

// Fonction de validation des fichiers
function validateFiles(fileList, type) {
    console.log(`📁 Validation des fichiers ${type.toUpperCase()}:`);
    let allValid = true;
    
    fileList.forEach(file => {
        if (fs.existsSync(file)) {
            console.log(`  ✅ ${file}`);
        } else {
            console.log(`  ❌ ${file} - MANQUANT`);
            allValid = false;
        }
    });
    
    return allValid;
}

// Fonction de validation du contenu
function validateContent() {
    console.log('\n🔍 Validation du contenu:');
    
    // Vérification theme-controller.js
    try {
        const themeController = fs.readFileSync('src/ui/theme-controller.js', 'utf8');
        const hasToggle = themeController.includes('toggleTheme');
        const hasPersistence = themeController.includes('localStorage');
        const hasKeyboard = themeController.includes('Ctrl+Shift+T') || themeController.includes('keydown');
        
        console.log(`  ${hasToggle ? '✅' : '❌'} Fonction de basculement de thème`);
        console.log(`  ${hasPersistence ? '✅' : '❌'} Persistance du thème`);
        console.log(`  ${hasKeyboard ? '✅' : '❌'} Raccourcis clavier`);
        
        return hasToggle && hasPersistence && hasKeyboard;
    } catch (error) {
        console.log('  ❌ Erreur lors de la lecture de theme-controller.js');
        return false;
    }
}

// Fonction de test du serveur
function testServer(callback) {
    console.log('\n🌐 Test de connectivité serveur:');
    
    const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/index.html',
        method: 'GET',
        timeout: 3000
    };
    
    const req = http.request(options, (res) => {
        if (res.statusCode === 200) {
            console.log('  ✅ Serveur accessible sur localhost:8080');
            callback(true);
        } else {
            console.log(`  ❌ Serveur répond avec le code ${res.statusCode}`);
            callback(false);
        }
    });
    
    req.on('error', (error) => {
        console.log('  ⚠️  Serveur non accessible (normal si arrêté)');
        console.log('  💡 Lancez: npm run start pour démarrer le serveur');
        callback(false);
    });
    
    req.setTimeout(3000, () => {
        console.log('  ⚠️  Timeout de connexion au serveur');
        callback(false);
    });
    
    req.end();
}

// Fonction de validation du package.json
function validatePackageJson() {
    console.log('\n📦 Validation package.json:');
    
    try {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        
        const hasName = packageJson.name === 'hlna-ai';
        const hasScripts = packageJson.scripts && Object.keys(packageJson.scripts).length > 5;
        const hasDevDeps = packageJson.devDependencies && Object.keys(packageJson.devDependencies).length > 0;
        
        console.log(`  ${hasName ? '✅' : '❌'} Nom du projet correct`);
        console.log(`  ${hasScripts ? '✅' : '❌'} Scripts npm configurés`);
        console.log(`  ${hasDevDeps ? '✅' : '❌'} Dépendances de développement`);
        
        return hasName && hasScripts;
    } catch (error) {
        console.log('  ❌ Erreur lors de la lecture de package.json');
        return false;
    }
}

// Fonction de génération du rapport
function generateReport(results) {
    console.log('\n📊 RAPPORT DE VALIDATION:');
    console.log('═'.repeat(50));
    
    const totalTests = Object.keys(results).length;
    const passedTests = Object.values(results).filter(Boolean).length;
    const successRate = Math.round((passedTests / totalTests) * 100);
    
    console.log(`📈 Taux de réussite: ${successRate}% (${passedTests}/${totalTests})`);
    
    Object.entries(results).forEach(([test, passed]) => {
        console.log(`${passed ? '✅' : '❌'} ${test}`);
    });
    
    if (successRate === 100) {
        console.log('\n🎉 VALIDATION COMPLÈTE - PROJET PRÊT POUR LE DÉVELOPPEMENT!');
        console.log('\n🚀 Commandes disponibles:');
        console.log('  npm start     - Lancer le serveur principal');
        console.log('  npm run dev   - Mode développement avec watch');
        console.log('  npm test      - Lancer les tests');
        console.log('  npm run demo  - Mode démonstration');
    } else {
        console.log('\n⚠️  VALIDATION PARTIELLE - Certains éléments nécessitent attention');
    }
    
    console.log('\n═'.repeat(50));
}

// Exécution principale
async function runValidation() {
    const results = {};
    
    // Validation des fichiers
    results['Fichiers CSS'] = validateFiles(requiredFiles.css, 'css');
    results['Fichiers JavaScript'] = validateFiles(requiredFiles.js, 'js');
    results['Fichiers HTML'] = validateFiles(requiredFiles.html, 'html');
    results['Fichiers de configuration'] = validateFiles(requiredFiles.config, 'config');
    
    // Validation du contenu
    results['Contenu theme-controller'] = validateContent();
    
    // Validation package.json
    results['Configuration NPM'] = validatePackageJson();
    
    // Test serveur (asynchrone)
    return new Promise((resolve) => {
        testServer((serverOk) => {
            results['Connectivité serveur'] = serverOk;
            generateReport(results);
            resolve(results);
        });
    });
}

// Lancement de la validation
if (require.main === module) {
    runValidation().then(() => {
        console.log('\n✨ Validation terminée - HLNA Project Node.js Ready!');
    }).catch(error => {
        console.error('❌ Erreur lors de la validation:', error);
        process.exit(1);
    });
}

module.exports = { runValidation, validateFiles, validateContent };
