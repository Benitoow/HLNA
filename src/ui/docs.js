// Documentation functionality
class DocsNavigation {
    constructor() {
        this.initializeNavigation();
        this.initializeTabs();
        this.initializeCodeCopy();
        this.initializeScrollSpy();
    }

    initializeNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active navigation
                    this.updateActiveNav(link);
                }
            });
        });
    }

    updateActiveNav(activeLink) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked item
        activeLink.classList.add('active');
    }

    initializeTabs() {
        // Tab functionality for integration examples
        window.showTab = (tabName) => {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Remove active class from all tab buttons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab content
            const tabContent = document.getElementById(tabName);
            if (tabContent) {
                tabContent.classList.add('active');
            }
            
            // Add active class to clicked button
            event.target.classList.add('active');
        };
    }

    initializeCodeCopy() {
        // Copy to clipboard functionality
        window.copyCode = (button) => {
            const codeBlock = button.closest('.code-example').querySelector('code');
            const text = codeBlock.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                const originalText = button.textContent;
                button.textContent = 'Copié !';
                button.style.background = 'rgba(50, 205, 50, 0.2)';
                button.style.borderColor = '#32CD32';
                button.style.color = '#32CD32';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    button.style.borderColor = '';
                    button.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Erreur lors de la copie:', err);
                button.textContent = 'Erreur';
                setTimeout(() => {
                    button.textContent = 'Copier';
                }, 2000);
            });
        };
    }

    initializeScrollSpy() {
        // Scroll spy to update navigation based on current section
        const sections = document.querySelectorAll('.doc-section');
        const navItems = document.querySelectorAll('.nav-item');
        
        const observerOptions = {
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const correspondingNavItem = document.querySelector(`.nav-item[href="#${id}"]`);
                    
                    if (correspondingNavItem) {
                        // Remove active class from all nav items
                        navItems.forEach(item => item.classList.remove('active'));
                        // Add active class to current section's nav item
                        correspondingNavItem.classList.add('active');
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Search functionality for documentation
class DocsSearch {
    constructor() {
        this.createSearchInterface();
        this.initializeSearch();
    }

    createSearchInterface() {
        // Add search box to sidebar
        const sidebar = document.querySelector('.sidebar-content');
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <input type="text" id="docs-search" placeholder="Rechercher dans la documentation..." />
                <div class="search-icon">🔍</div>
            </div>
            <div class="search-results" id="search-results" style="display: none;"></div>
        `;
        
        sidebar.insertBefore(searchContainer, sidebar.firstChild);
        
        // Add search styles
        const searchStyles = `
            .search-container {
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid rgba(255, 215, 0, 0.2);
            }
            
            .search-box {
                position: relative;
                margin-bottom: 1rem;
            }
            
            #docs-search {
                width: 100%;
                padding: 0.75rem 2.5rem 0.75rem 1rem;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 215, 0, 0.3);
                border-radius: 25px;
                color: var(--pure-white);
                font-size: 0.9rem;
                outline: none;
                transition: all 0.3s ease;
            }
            
            #docs-search:focus {
                border-color: var(--primary-yellow);
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
            }
            
            #docs-search::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }
            
            .search-icon {
                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
                opacity: 0.6;
            }
            
            .search-results {
                background: rgba(0, 0, 0, 0.9);
                border: 1px solid rgba(255, 215, 0, 0.3);
                border-radius: 10px;
                max-height: 300px;
                overflow-y: auto;
                backdrop-filter: blur(10px);
            }
            
            .search-result-item {
                padding: 0.75rem 1rem;
                border-bottom: 1px solid rgba(255, 215, 0, 0.1);
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .search-result-item:hover {
                background: rgba(255, 215, 0, 0.1);
            }
            
            .search-result-item:last-child {
                border-bottom: none;
            }
            
            .result-title {
                color: var(--primary-yellow);
                font-weight: 500;
                font-size: 0.9rem;
                margin-bottom: 0.25rem;
            }
            
            .result-snippet {
                color: rgba(255, 255, 255, 0.7);
                font-size: 0.8rem;
                line-height: 1.4;
            }
            
            .result-highlight {
                background: rgba(255, 215, 0, 0.3);
                color: var(--primary-yellow);
                padding: 0 0.25rem;
                border-radius: 3px;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = searchStyles;
        document.head.appendChild(styleSheet);
    }

    initializeSearch() {
        const searchInput = document.getElementById('docs-search');
        const searchResults = document.getElementById('search-results');
        let searchTimeout;
        
        // Create search index
        this.searchIndex = this.buildSearchIndex();
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                this.performSearch(query, searchResults);
            }, 300);
        });
        
        // Hide search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
    }

    buildSearchIndex() {
        const index = [];
        const sections = document.querySelectorAll('.doc-section');
        
        sections.forEach(section => {
            const id = section.getAttribute('id');
            const title = section.querySelector('h1, h2')?.textContent || '';
            const content = section.textContent || '';
            
            // Index headings separately
            const headings = section.querySelectorAll('h1, h2, h3, h4');
            headings.forEach(heading => {
                index.push({
                    id,
                    title: heading.textContent,
                    content: heading.textContent,
                    type: 'heading',
                    element: heading
                });
            });
            
            // Index paragraphs
            const paragraphs = section.querySelectorAll('p');
            paragraphs.forEach(p => {
                if (p.textContent.length > 20) {
                    index.push({
                        id,
                        title,
                        content: p.textContent,
                        type: 'paragraph',
                        element: p
                    });
                }
            });
        });
        
        return index;
    }

    performSearch(query, resultsContainer) {
        const results = this.searchIndex.filter(item => {
            return item.content.toLowerCase().includes(query.toLowerCase());
        });
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-result-item">
                    <div class="result-title">Aucun résultat</div>
                    <div class="result-snippet">Essayez avec d'autres mots-clés</div>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = results.slice(0, 8).map(result => {
                const snippet = this.createSnippet(result.content, query);
                return `
                    <div class="search-result-item" onclick="scrollToElement('${result.id}')">
                        <div class="result-title">${result.title}</div>
                        <div class="result-snippet">${snippet}</div>
                    </div>
                `;
            }).join('');
        }
        
        resultsContainer.style.display = 'block';
    }

    createSnippet(content, query) {
        const queryRegex = new RegExp(`(${query})`, 'gi');
        const index = content.toLowerCase().indexOf(query.toLowerCase());
        
        if (index === -1) return content.substring(0, 100) + '...';
        
        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + query.length + 50);
        let snippet = content.substring(start, end);
        
        if (start > 0) snippet = '...' + snippet;
        if (end < content.length) snippet = snippet + '...';
        
        return snippet.replace(queryRegex, '<span class="result-highlight">$1</span>');
    }
}

// Global function to scroll to elements from search results
window.scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update navigation
        const navItem = document.querySelector(`.nav-item[href="#${elementId}"]`);
        if (navItem) {
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            navItem.classList.add('active');
        }
        
        // Hide search results
        document.getElementById('search-results').style.display = 'none';
    }
};

// Animation for documentation elements
class DocsAnimations {
    constructor() {
        this.initializeAnimations();
    }

    initializeAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe various elements for animation
        const animatedElements = document.querySelectorAll(`
            .info-card,
            .highlight-card,
            .endpoint-card,
            .model-card-docs,
            .example-card,
            .support-card,
            .code-example
        `);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(el);
        });
    }
}

// Initialize all documentation functionality
document.addEventListener('DOMContentLoaded', () => {
    new DocsNavigation();
    new DocsSearch();
    new DocsAnimations();
    
    // Add syntax highlighting for code blocks (basic)
    document.querySelectorAll('code').forEach(block => {
        const content = block.textContent;
        
        // Basic JSON highlighting
        if (content.includes('{') && content.includes('}')) {
            let highlighted = content
                .replace(/(".*?")/g, '<span style="color: #98C379;">$1</span>')
                .replace(/(\b\d+\b)/g, '<span style="color: #D19A66;">$1</span>')
                .replace(/(\btrue\b|\bfalse\b|\bnull\b)/g, '<span style="color: #56B6C2;">$1</span>');
            
            block.innerHTML = highlighted;
        }
        
        // Basic JavaScript highlighting
        if (content.includes('const ') || content.includes('function ') || content.includes('import ')) {
            let highlighted = content
                .replace(/\b(const|let|var|function|import|export|from|async|await)\b/g, '<span style="color: #C678DD;">$1</span>')
                .replace(/('.*?'|".*?")/g, '<span style="color: #98C379;">$1</span>')
                .replace(/\/\/.*$/gm, '<span style="color: #5C6370; font-style: italic;">$&</span>');
            
            block.innerHTML = highlighted;
        }
    });
});
