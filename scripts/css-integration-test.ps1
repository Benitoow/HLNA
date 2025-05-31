# HLNA CSS Integration Test Script
# PowerShell version for Windows systems

Write-Host "=== HLNA CSS Integration Test ===" -ForegroundColor Cyan
Write-Host ""

# Test 1: Check file existence
Write-Host "1. Checking CSS files existence..." -ForegroundColor Yellow

$cssFiles = @(
    "src/ui/styles.css",
    "src/ui/chat-new.css", 
    "src/ui/theme-enhancements.css",
    "assets/themes/dark/theme.css",
    "assets/themes/light/theme.css"
)

$allFilesExist = $true
foreach ($file in $cssFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file - NOT FOUND" -ForegroundColor Red
        $allFilesExist = $false
    }
}

# Test 2: Check JavaScript files
Write-Host "`n2. Checking JavaScript files..." -ForegroundColor Yellow

$jsFiles = @(
    "src/ui/theme-controller.js",
    "src/ui/chat-new.js"
)

foreach ($file in $jsFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file - NOT FOUND" -ForegroundColor Red
        $allFilesExist = $false
    }
}

# Test 3: Check theme configuration
Write-Host "`n3. Checking theme configuration..." -ForegroundColor Yellow

if (Test-Path "assets/themes/theme-config.json") {
    Write-Host "✅ Theme configuration file exists" -ForegroundColor Green
    try {
        $themeConfig = Get-Content "assets/themes/theme-config.json" | ConvertFrom-Json
        Write-Host "✅ Theme configuration is valid JSON" -ForegroundColor Green
        Write-Host "   Available themes: $($themeConfig.themes.Count)" -ForegroundColor Cyan
    } catch {
        Write-Host "❌ Theme configuration JSON is invalid" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Theme configuration not found" -ForegroundColor Red
}

# Test 4: Check server status
Write-Host "`n4. Testing server connection..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/chat.html" -Method Head -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Server is running and chat.html is accessible" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Server is not running or chat.html is not accessible" -ForegroundColor Red
    Write-Host "   Make sure to run: python -m http.server 8080" -ForegroundColor Yellow
}

# Test 5: CSS Content validation
Write-Host "`n5. Validating CSS content..." -ForegroundColor Yellow

if (Test-Path "src/ui/theme-enhancements.css") {
    $themeCSS = Get-Content "src/ui/theme-enhancements.css" -Raw
    if ($themeCSS -match "transition.*theme") {
        Write-Host "✅ Theme transitions found in CSS" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Theme transitions not found in CSS" -ForegroundColor Yellow
    }
    
    if ($themeCSS -match "data-theme") {
        Write-Host "✅ Theme data attributes found" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Theme data attributes not found" -ForegroundColor Yellow
    }
}

# Test 6: JavaScript Content validation
Write-Host "`n6. Validating JavaScript content..." -ForegroundColor Yellow

if (Test-Path "src/ui/theme-controller.js") {
    $themeJS = Get-Content "src/ui/theme-controller.js" -Raw
    if ($themeJS -match "toggleTheme") {
        Write-Host "✅ Theme toggle function found" -ForegroundColor Green
    } else {
        Write-Host "❌ Theme toggle function not found" -ForegroundColor Red
    }
    
    if ($themeJS -match "localStorage") {
        Write-Host "✅ Theme persistence found" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Theme persistence not found" -ForegroundColor Yellow
    }
    
    if ($themeJS -match "addEventListener.*keydown") {
        Write-Host "✅ Keyboard shortcuts found" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Keyboard shortcuts not found" -ForegroundColor Yellow
    }
}

# Summary
Write-Host "`n=== Test Summary ===" -ForegroundColor Cyan
if ($allFilesExist) {
    Write-Host "✅ All core files are present" -ForegroundColor Green
    Write-Host "🚀 CSS Integration appears to be complete!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "1. Open http://localhost:8080/chat.html in your browser" -ForegroundColor White
    Write-Host "2. Test theme switching with the button or Ctrl+Shift+T" -ForegroundColor White
    Write-Host "3. Verify responsive behavior on different screen sizes" -ForegroundColor White
} else {
    Write-Host "❌ Some files are missing - check the errors above" -ForegroundColor Red
}

Write-Host "`n=== End of Test ===" -ForegroundColor Cyan
