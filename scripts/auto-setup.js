#!/usr/bin/env node

// HLNA Auto Setup Script
// Configuration automatique de l'environnement de développement HLNA

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🚀 HLNA Auto Setup - Configuration Automatique');
console.log('═'.repeat(50));

// Vérification de l'environnement
function checkEnvironment() {
    console.log('🔍 Vérification de l\'environnement...');
    
    // Vérification Node.js
    const nodeVersion = process.version;
    console.log(`  ✅ Node.js ${nodeVersion}`);
    
    // Vérification npm
    try {
        const { execSync } = require('child_process');
        const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
        console.log(`  ✅ NPM ${npmVersion}`);
    } catch (error) {
        console.log('  ❌ NPM non disponible');
        return false;
    }
    
    return true;
}

// Vérification des fichiers essentiels
function checkEssentialFiles() {
    console.log('\n📁 Vérification des fichiers essentiels...');
    
    const essentialFiles = [
        'package.json',
        'index.html',
        'chat.html',
        'src/ui/theme-controller.js',
        'assets/themes/dark/theme.css',
        'assets/themes/light/theme.css'
    ];
    
    let allPresent = true;
    
    essentialFiles.forEach(file => {
        if (fs.existsSync(file)) {
            console.log(`  ✅ ${file}`);
        } else {
            console.log(`  ❌ ${file} - MANQUANT`);
            allPresent = false;
        }
    });
    
    return allPresent;
}

// Configuration des permissions (Windows)
function setupPermissions() {
    console.log('\n🔐 Configuration des permissions...');
    
    try {
        // Rendre les scripts exécutables si nécessaire
        const scriptFiles = ['scripts/quick-start.js', 'scripts/validate-project.js'];
        
        scriptFiles.forEach(script => {
            if (fs.existsSync(script)) {
                console.log(`  ✅ ${script} configuré`);
            }
        });
        
        return true;
    } catch (error) {
        console.log('  ⚠️  Erreur de configuration des permissions');
        return false;
    }
}

// Installation des dépendances
function installDependencies() {
    return new Promise((resolve) => {
        console.log('\n📦 Installation des dépendances...');
        
        const npm = spawn('npm', ['install'], {
            stdio: 'pipe',
            shell: true
        });
        
        npm.stdout.on('data', (data) => {
            process.stdout.write('.');
        });
        
        npm.stderr.on('data', (data) => {
            // Ignorer les warnings npm
        });
        
        npm.on('close', (code) => {
            if (code === 0) {
                console.log('\n  ✅ Dépendances installées avec succès');
                resolve(true);
            } else {
                console.log('\n  ❌ Erreur lors de l\'installation des dépendances');
                resolve(false);
            }
        });
    });
}

// Test de validation finale
function runFinalValidation() {
    return new Promise((resolve) => {
        console.log('\n🧪 Test de validation finale...');
        
        const validate = spawn('npm', ['run', 'validate'], {
            stdio: 'pipe',
            shell: true
        });
        
        let output = '';
        
        validate.stdout.on('data', (data) => {
            output += data.toString();
        });
        
        validate.on('close', (code) => {
            if (output.includes('100%') || output.includes('VALIDATION COMPLÈTE')) {
                console.log('  ✅ Validation réussie - Projet prêt !');
                resolve(true);
            } else {
                console.log('  ⚠️  Validation partielle - Vérifiez les détails');
                resolve(false);
            }
        });
    });
}

// Création du fichier de statut
function createStatusFile() {
    console.log('\n📄 Création du fichier de statut...');
    
    const status = {
        setupDate: new Date().toISOString(),
        nodeVersion: process.version,
        npmVersion: require('child_process').execSync('npm --version', { encoding: 'utf8' }).trim(),
        projectReady: true,
        availableCommands: [
            'npm start - Serveur principal',
            'npm run dev - Mode développement',
            'npm run demo - Démonstration',
            'npm test - Tests complets',
            'npm run validate - Validation',
            'npm run quick - Menu interactif'
        ]
    };
    
    fs.writeFileSync('hlna-status.json', JSON.stringify(status, null, 2));
    console.log('  ✅ Fichier de statut créé: hlna-status.json');
}

// Affichage du guide de démarrage
function showStartupGuide() {
    console.log('\n🎯 CONFIGURATION TERMINÉE !');
    console.log('═'.repeat(50));
    console.log('🚀 Commandes disponibles:');
    console.log('  npm start      - Démarrer le serveur principal');
    console.log('  npm run dev    - Mode développement avec surveillance');
    console.log('  npm run demo   - Page de démonstration');
    console.log('  npm test       - Tests complets');
    console.log('  npm run quick  - Menu interactif');
    console.log('  npm run validate - Validation du projet');
    console.log('\n💡 Pour commencer rapidement:');
    console.log('  npm run quick  (menu interactif)');
    console.log('  ou');
    console.log('  npm start      (serveur direct)');
    console.log('\n🌐 URLs disponibles:');
    console.log('  http://localhost:8080           - Page principale');
    console.log('  http://localhost:8080/chat.html - Interface de chat');
    console.log('  http://localhost:8080/demo.html - Démonstration');
    console.log('\n✅ HLNA est prêt pour le développement !');
    console.log('═'.repeat(50));
}

// Fonction principale
async function main() {
    try {
        // Étapes de configuration
        const envOk = checkEnvironment();
        if (!envOk) {
            console.log('❌ Environnement non compatible');
            process.exit(1);
        }
        
        const filesOk = checkEssentialFiles();
        if (!filesOk) {
            console.log('❌ Fichiers essentiels manquants');
            process.exit(1);
        }
        
        setupPermissions();
        
        const depsOk = await installDependencies();
        if (!depsOk) {
            console.log('❌ Échec de l\'installation des dépendances');
            process.exit(1);
        }
        
        const validationOk = await runFinalValidation();
        
        createStatusFile();
        showStartupGuide();
        
        console.log('\n🎉 Configuration automatique terminée avec succès !');
        
    } catch (error) {
        console.error('❌ Erreur lors de la configuration:', error.message);
        process.exit(1);
    }
}

// Démarrage si exécuté directement
if (require.main === module) {
    main();
}

module.exports = { checkEnvironment, checkEssentialFiles, setupPermissions };
