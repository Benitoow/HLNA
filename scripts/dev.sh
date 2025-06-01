#!/bin/bash
# 🚀 HLNA Development Script - Bash
# Version: 2.0.0
# Enhanced automation pour le développement HLNA

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"
SOURCE_DIR="$PROJECT_ROOT/src"
DOCS_DIR="$PROJECT_ROOT/docs"
ASSETS_DIR="$PROJECT_ROOT/assets"
DEFAULT_PORT=8000

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Fonctions utilitaires
print_color() {
    echo -e "${1}${2}${NC}"
}

show_header() {
    print_color $GREEN "
 ██╗  ██╗██╗     ███╗   ██╗ █████╗ 
 ██║  ██║██║     ████╗  ██║██╔══██╗
 ███████║██║     ██╔██╗ ██║███████║
 ██╔══██║██║     ██║╚██╗██║██╔══██║
 ██║  ██║███████╗██║ ╚████║██║  ██║
 ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝
                                   
 🤖 Human-Level Natural Assistant
 📦 Version 2.0 - Structure Modulaire
"
}

start_dev_server() {
    local port=${1:-$DEFAULT_PORT}
    
    print_color $CYAN "🚀 Démarrage du serveur de développement..."
    print_color $YELLOW "📍 Port: $port"
    print_color $YELLOW "📂 Répertoire: $PROJECT_ROOT"
    
    # Vérifier si Python est disponible
    if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
        print_color $RED "❌ Python n'est pas installé ou non trouvé dans PATH"
        return 1
    fi
    
    # Afficher les URLs disponibles
    print_color $GREEN "
📖 URLs Disponibles:
   🏠 Accueil:          http://localhost:$port/
   💬 Chat:             http://localhost:$port/chat.html
   🧪 Tests:            http://localhost:$port/tests/demo.html
   📊 Intégration:      http://localhost:$port/tests/integration-test.html
   📚 Documentation:    http://localhost:$port/docs/
"
    
    # Démarrer le serveur
    cd "$PROJECT_ROOT"
    if command -v python3 &> /dev/null; then
        python3 -m http.server $port
    else
        python -m http.server $port
    fi
}

start_file_watcher() {
    print_color $CYAN "👀 Surveillance des fichiers activée..."
    print_color $YELLOW "📁 Dossiers surveillés: src/, docs/, assets/"
    
    # Vérifier si fswatch est disponible
    if command -v fswatch &> /dev/null; then
        print_color $GREEN "🔄 Utilisation de fswatch pour la surveillance..."
        fswatch -o "$SOURCE_DIR" "$DOCS_DIR" "$ASSETS_DIR" | while read f; do
            print_color $BLUE "📝 Changement détecté - $(date)"
        done
    elif command -v inotifywait &> /dev/null; then
        print_color $GREEN "🔄 Utilisation d'inotifywait pour la surveillance..."
        inotifywait -m -r -e modify,create,delete "$SOURCE_DIR" "$DOCS_DIR" "$ASSETS_DIR" | while read path action file; do
            print_color $BLUE "📝 $action: $path$file - $(date)"
        done
    else
        print_color $YELLOW "⚠️  Aucun outil de surveillance trouvé (fswatch, inotifywait)"
        print_color $GREEN "💡 Utilisez VS Code Live Server pour le rechargement automatique"
    fi
}

test_project() {
    print_color $CYAN "🧪 Exécution des tests..."
    
    local all_exists=true
    
    # Vérifier la structure
    required_dirs=("src" "src/core" "src/modules" "src/ui" "tests" "docs" "assets")
    
    for dir in "${required_dirs[@]}"; do
        if [ -d "$PROJECT_ROOT/$dir" ]; then
            print_color $GREEN "✅ $dir - Existe"
        else
            print_color $RED "❌ $dir - Manquant"
            all_exists=false
        fi
    done
    
    # Vérifier les fichiers principaux
    required_files=("index.html" "chat.html" "src/core/hlna-core.js" "src/modules/analytics.js" "src/ui/script.js")
    
    for file in "${required_files[@]}"; do
        if [ -f "$PROJECT_ROOT/$file" ]; then
            print_color $GREEN "✅ $file - Existe"
        else
            print_color $RED "❌ $file - Manquant"
            all_exists=false
        fi
    done
    
    if [ "$all_exists" = true ]; then
        print_color $GREEN "🎉 Structure du projet validée avec succès!"
    else
        print_color $RED "⚠️  Des éléments manquent dans la structure"
        return 1
    fi
}

show_status() {
    print_color $CYAN "📊 Statut du projet HLNA"
    print_color $GREEN "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Informations générales
    print_color $YELLOW "📂 Répertoire: $PROJECT_ROOT"
    print_color $YELLOW "🏗️  Structure: Modulaire (src/, docs/, assets/)"
    
    if [ -d ".git" ]; then
        git_status="Initialisé"
        if command -v git &> /dev/null; then
            branch=$(git branch --show-current 2>/dev/null || echo "unknown")
            git_status="$git_status (branche: $branch)"
        fi
    else
        git_status="Non initialisé"
    fi
    print_color $YELLOW "📝 Git: $git_status"
    
    # Statistiques des fichiers
    js_files=$(find "$SOURCE_DIR" -name "*.js" 2>/dev/null | wc -l)
    css_files=$(find "$SOURCE_DIR" -name "*.css" 2>/dev/null | wc -l)
    html_files=$(find "$PROJECT_ROOT" -maxdepth 1 -name "*.html" 2>/dev/null | wc -l)
    doc_files=$(find "$DOCS_DIR" -name "*.md" 2>/dev/null | wc -l)
    asset_files=$(find "$ASSETS_DIR" -type f 2>/dev/null | wc -l)
    
    print_color $GREEN "
📈 Statistiques:
   📄 Fichiers JS:    $js_files
   🎨 Fichiers CSS:   $css_files  
   🌐 Fichiers HTML:  $html_files
   📚 Documentation:  $doc_files fichiers
   🎯 Assets:         $asset_files fichiers
"
}

open_browser() {
    local url=${1:-"http://localhost:$DEFAULT_PORT"}
    local browser=${2:-"default"}
    
    print_color $CYAN "🌐 Ouverture du navigateur..."
    print_color $YELLOW "🔗 URL: $url"
    
    case "$browser" in
        "chrome")
            if command -v google-chrome &> /dev/null; then
                google-chrome "$url"
            elif command -v chrome &> /dev/null; then
                chrome "$url"
            else
                print_color $RED "❌ Chrome non trouvé"
            fi
            ;;
        "firefox")
            if command -v firefox &> /dev/null; then
                firefox "$url"
            else
                print_color $RED "❌ Firefox non trouvé"
            fi
            ;;
        *)
            # Utiliser xdg-open sur Linux, open sur macOS
            if command -v xdg-open &> /dev/null; then
                xdg-open "$url"
            elif command -v open &> /dev/null; then
                open "$url"
            else
                print_color $RED "❌ Impossible d'ouvrir le navigateur automatiquement"
                print_color $YELLOW "👆 Ouvrez manuellement: $url"
            fi
            ;;
    esac
}

show_help() {
    print_color $CYAN "
🔧 HLNA Development Tools - Aide

Usage: ./dev.sh [action] [options]

📋 Actions disponibles:
   server [port]    Démarre le serveur de développement (défaut: 8000)
   test            Execute les tests et validations  
   status          Affiche le statut du projet
   watch           Active la surveillance des fichiers
   browser [url]   Ouvre le navigateur (nécessite serveur actif)
   clean           Nettoie les fichiers temporaires
   help            Affiche cette aide

📖 Exemples:
   ./dev.sh server 3000
   ./dev.sh test
   ./dev.sh browser http://localhost:8000/chat.html
   ./dev.sh status

🌐 URLs de développement:
   http://localhost:8000/                          - Accueil
   http://localhost:8000/chat.html                 - Interface Chat
   http://localhost:8000/tests/demo.html       - Démonstration
   http://localhost:8000/tests/integration-test.html - Tests

🔧 Dépendances optionnelles:
   fswatch ou inotifywait  - Surveillance des fichiers
   git                     - Gestion de version
   python3                 - Serveur de développement
"
}

# Main execution
show_header

case "${1:-help}" in
    "server")
        start_dev_server "${2:-$DEFAULT_PORT}"
        ;;
    "test")
        test_project
        ;;
    "status")
        show_status
        ;;
    "watch")
        start_file_watcher
        ;;
    "browser")
        open_browser "${2:-http://localhost:$DEFAULT_PORT}" "${3:-default}"
        ;;
    "clean")
        print_color $CYAN "🧹 Nettoyage des fichiers temporaires..."
        # Nettoyer les fichiers temporaires courants
        find "$PROJECT_ROOT" -name ".DS_Store" -delete 2>/dev/null
        find "$PROJECT_ROOT" -name "Thumbs.db" -delete 2>/dev/null
        find "$PROJECT_ROOT" -name "*.tmp" -delete 2>/dev/null
        print_color $GREEN "✅ Nettoyage terminé"
        ;;
    "help"|*)
        show_help
        ;;
esac

print_color $GREEN "\n🎯 Script terminé. Merci d'utiliser HLNA!"