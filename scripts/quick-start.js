#!/usr/bin/env node

// HLNA Quick Start Script
// Script de démarrage rapide pour le projet HLNA

const { spawn } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 HLNA Quick Start Menu');
console.log('═'.repeat(30));
console.log('1. Démarrer le serveur principal (npm start)');
console.log('2. Mode développement avec surveillance (npm run dev)');
console.log('3. Page de démonstration (npm run demo)');
console.log('4. Tests complets (npm test)');
console.log('5. Validation du projet (npm run validate)');
console.log('6. Test des thèmes (npm run theme-test)');
console.log('7. Quitter');
console.log('═'.repeat(30));

function askChoice() {
  rl.question('Choisissez une option (1-7): ', (answer) => {
    switch(answer.trim()) {
      case '1':
        runCommand('npm', ['start']);
        break;
      case '2':
        runCommand('npm', ['run', 'dev']);
        break;
      case '3':
        runCommand('npm', ['run', 'demo']);
        break;
      case '4':
        runCommand('npm', ['test']);
        break;
      case '5':
        runCommand('npm', ['run', 'validate']);
        break;
      case '6':
        runCommand('npm', ['run', 'theme-test']);
        break;
      case '7':
        console.log('👋 Au revoir !');
        rl.close();
        return;
      default:
        console.log('❌ Option invalide, veuillez choisir entre 1 et 7.');
        askChoice();
        return;
    }
  });
}

function runCommand(command, args) {
  console.log(`\n🔄 Exécution: ${command} ${args.join(' ')}`);
  console.log('─'.repeat(40));
  
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: true
  });
  
  child.on('close', (code) => {
    console.log(`\n✅ Commande terminée avec le code: ${code}`);
    console.log('─'.repeat(40));
    
    rl.question('Appuyez sur Entrée pour revenir au menu...', () => {
      console.clear();
      console.log('🚀 HLNA Quick Start Menu');
      console.log('═'.repeat(30));
      console.log('1. Démarrer le serveur principal (npm start)');
      console.log('2. Mode développement avec surveillance (npm run dev)');
      console.log('3. Page de démonstration (npm run demo)');
      console.log('4. Tests complets (npm test)');
      console.log('5. Validation du projet (npm run validate)');
      console.log('6. Test des thèmes (npm run theme-test)');
      console.log('7. Quitter');
      console.log('═'.repeat(30));
      askChoice();
    });
  });
  
  child.on('error', (error) => {
    console.error(`❌ Erreur: ${error.message}`);
    askChoice();
  });
}

// Démarrage du menu
askChoice();
