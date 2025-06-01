# HLNA Development Script - PowerShell
# Version: 2.0.0
# Enhanced automation pour le développement HLNA

param(
    [string]$Action = "help",
    [int]$Port = 8000,
    [string]$Browser = "default",
    [switch]$Verbose
)

# Configuration
$ProjectRoot = $PSScriptRoot
$SourceDir = Join-Path $ProjectRoot "src"
$DocsDir = Join-Path $ProjectRoot "docs"
$AssetsDir = Join-Path $ProjectRoot "assets"

# Couleurs pour l'affichage
function Write-ColorOutput($ForegroundColor, $Message) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    Write-Output $Message
    $host.UI.RawUI.ForegroundColor = $fc
}

function Show-Header {
    Write-ColorOutput Green @"

HLNA - Human-Level Natural Assistant
Version 2.0 - Structure Modulaire
Development Tools

"@
}

function Start-DevServer {
    param([int]$ServerPort = 8000)
    
    Write-ColorOutput Cyan "Demarrage du serveur de developpement..."
    Write-ColorOutput Yellow "Port: $ServerPort"
    Write-ColorOutput Yellow "Repertoire: $ProjectRoot"
    
    try {
        # Vérifier si Python est disponible
        $pythonCmd = Get-Command python -ErrorAction SilentlyContinue
        if (-not $pythonCmd) {
            Write-ColorOutput Red "Python n'est pas installe ou non trouve dans PATH"
            return
        }
        
        # Afficher les URLs disponibles
        Write-ColorOutput Green @"

URLs Disponibles:
   Accueil:          http://localhost:$ServerPort/
   Chat:             http://localhost:$ServerPort/chat.html   Tests:            http://localhost:$ServerPort/tests/demo.html
   Integration:      http://localhost:$ServerPort/tests/integration-test.html
   Documentation:    http://localhost:$ServerPort/docs/

"@
        
        # Démarrer le serveur
        Set-Location $ProjectRoot
        python -m http.server $ServerPort
    }
    catch {
        Write-ColorOutput Red "Erreur lors du demarrage du serveur: $_"
    }
}

function Test-Project {
    Write-ColorOutput Cyan "Execution des tests..."
    
    # Vérifier la structure
    $requiredDirs = @("src", "src/core", "src/modules", "src/ui", "tests", "docs", "assets")
    $allExists = $true
    
    foreach ($dir in $requiredDirs) {
        $fullPath = Join-Path $ProjectRoot $dir
        if (Test-Path $fullPath) {
            Write-ColorOutput Green "$dir - Existe"
        } else {
            Write-ColorOutput Red "$dir - Manquant"
            $allExists = $false
        }
    }
    
    # Vérifier les fichiers principaux
    $requiredFiles = @(
        "index.html",
        "chat.html", 
        "src/core/hlna-core.js",
        "src/modules/analytics.js",
        "src/ui/script.js"
    )
    
    foreach ($file in $requiredFiles) {
        $fullPath = Join-Path $ProjectRoot $file
        if (Test-Path $fullPath) {
            Write-ColorOutput Green "$file - Existe"
        } else {
            Write-ColorOutput Red "$file - Manquant"
            $allExists = $false
        }
    }
    
    if ($allExists) {
        Write-ColorOutput Green "Structure du projet validee avec succes!"
    } else {
        Write-ColorOutput Red "Des elements manquent dans la structure"
    }
}

function Show-Status {
    Write-ColorOutput Cyan "Statut du projet HLNA"
    Write-ColorOutput Green "=================================="
    
    # Informations générales
    Write-ColorOutput Yellow "Repertoire: $ProjectRoot"
    Write-ColorOutput Yellow "Structure: Modulaire (src/, docs/, assets/)"
    Write-ColorOutput Yellow "Git: $(if (Test-Path '.git') { 'Initialise' } else { 'Non initialise' })"
    
    # Statistiques des fichiers
    $jsFiles = (Get-ChildItem -Path $SourceDir -Filter "*.js" -Recurse -ErrorAction SilentlyContinue).Count
    $cssFiles = (Get-ChildItem -Path $SourceDir -Filter "*.css" -Recurse -ErrorAction SilentlyContinue).Count
    $htmlFiles = (Get-ChildItem -Path $ProjectRoot -Filter "*.html" -ErrorAction SilentlyContinue).Count
    
    Write-ColorOutput Green @"

Statistiques:
   Fichiers JS:    $jsFiles
   Fichiers CSS:   $cssFiles  
   Fichiers HTML:  $htmlFiles
   Documentation:  $(if (Test-Path $DocsDir) { (Get-ChildItem $DocsDir -Filter "*.md" -ErrorAction SilentlyContinue).Count } else { 0 }) fichiers
   Assets:         $(if (Test-Path $AssetsDir) { (Get-ChildItem $AssetsDir -Recurse -File -ErrorAction SilentlyContinue).Count } else { 0 }) fichiers

"@
}

function Open-Browser {
    param([string]$Url = "http://localhost:8000", [string]$BrowserType = "default")
    
    Write-ColorOutput Cyan "Ouverture du navigateur..."
    Write-ColorOutput Yellow "URL: $Url"
    
    try {
        switch ($BrowserType) {
            "chrome" { Start-Process "chrome.exe" $Url }
            "firefox" { Start-Process "firefox.exe" $Url }
            "edge" { Start-Process "msedge.exe" $Url }
            default { Start-Process $Url }
        }
    }
    catch {
        Write-ColorOutput Red "Impossible d'ouvrir le navigateur: $_"
    }
}

function Show-Help {
    Write-ColorOutput Cyan @"

HLNA Development Tools - Aide

Usage: .\dev.ps1 [Action] [Options]

Actions disponibles:
   server       Demarre le serveur de developpement
   test         Execute les tests et validations  
   status       Affiche le statut du projet
   browser      Ouvre le navigateur (necessite serveur actif)
   clean        Nettoie les fichiers temporaires
   help         Affiche cette aide

Options:
   -Port <number>     Port du serveur (defaut: 8000)
   -Browser <type>    Type de navigateur (chrome, firefox, edge, default)
   -Verbose           Mode verbeux

Exemples:
   .\dev.ps1 server -Port 3000
   .\dev.ps1 test -Verbose
   .\dev.ps1 browser -Browser chrome
   .\dev.ps1 status

URLs de developpement:
   http://localhost:8000/                          - Accueil
   http://localhost:8000/chat.html                 - Interface Chat
   http://localhost:8000/tests/demo.html       - Demonstration
   http://localhost:8000/src/tests/integration-test.html - Tests

"@
}

# Main execution
Show-Header

switch ($Action.ToLower()) {
    "server" { Start-DevServer -ServerPort $Port }
    "test" { Test-Project }
    "status" { Show-Status }
    "browser" { Open-Browser -Url "http://localhost:$Port" -BrowserType $Browser }
    "clean" { 
        Write-ColorOutput Cyan "Nettoyage des fichiers temporaires..."
        # Ajouter la logique de nettoyage ici
        Write-ColorOutput Green "Nettoyage termine"
    }
    "help" { Show-Help }
    default { Show-Help }
}

Write-ColorOutput Green "`nScript termine. Merci d'utiliser HLNA!"