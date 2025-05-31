/**
 * HLNA Chat Interface Moderne
 * Gestion de l'interface chat repensée et sobre
 */

class HLNAChatInterface {
    constructor() {
        this.hlnaCore = null;
        this.analytics = null;
        this.webConnection = null;
        this.init();
        this.setupEventListeners();
        this.setupAnalytics();
        this.messageCount = 0;
        this.conversationMemory = [];
        this.currentMode = 'natural';
        this.sessionStartTime = Date.now();
        
        // Attendre que les modules soient chargés
        this.waitForModules();
    }    init() {
        console.log('🚀 HLNA Chat Interface initialisée');
        this.updateSessionTimer();
        this.simulateInitialAnalytics();
    }

    waitForModules() {
        // Attendre que les modules globaux soient disponibles
        const checkModules = () => {
            if (window.HLNACore && window.HLNAAnalytics && window.HLNAWebConnection) {
                this.hlnaCore = window.HLNACore;
                this.analytics = window.HLNAAnalytics;
                this.webConnection = window.HLNAWebConnection;
                
                console.log('🔗 Modules HLNA connectés à l\'interface chat');
                
                // Configurer les callbacks
                this.setupModuleCallbacks();
            } else {
                setTimeout(checkModules, 100);
            }
        };
        checkModules();
    }

    setupModuleCallbacks() {
        // Écouter les événements des modules
        if (this.analytics) {
            this.analytics.track('chat_interface_loaded', {
                timestamp: Date.now(),
                mode: this.currentMode
            });
        }
        
        // Mettre à jour les indicateurs de statut
        this.updateSystemStatus();
        
        // Vérifier périodiquement le statut des modules
        setInterval(() => {
            this.updateSystemStatus();
        }, 5000);
    }

    updateSystemStatus() {
        const coreStatus = document.getElementById('core-status');
        const analyticsStatus = document.getElementById('analytics-status');
        const webStatus = document.getElementById('web-status');
        
        if (coreStatus) {
            coreStatus.className = `status-indicator core ${this.hlnaCore ? 'online' : 'error'}`;
            coreStatus.title = this.hlnaCore ? 'HLNA Core: Actif' : 'HLNA Core: Non disponible';
        }
        
        if (analyticsStatus) {
            analyticsStatus.className = `status-indicator analytics ${this.analytics ? 'online' : 'error'}`;
            analyticsStatus.title = this.analytics ? 'Analytics: Actif' : 'Analytics: Non disponible';
        }
        
        if (webStatus) {
            const isOnline = this.webConnection?.getConnectionInfo()?.isOnline;
            webStatus.className = `status-indicator web ${isOnline ? 'online' : 'error'}`;
            webStatus.title = isOnline ? 'Connexion Web: En ligne' : 'Connexion Web: Hors ligne';
        }
    }

    setupEventListeners() {
        // Éléments DOM
        this.chatInput = document.getElementById('chat-input-new');
        this.sendBtn = document.getElementById('send-btn-new');
        this.voiceBtn = document.getElementById('voice-btn');
        this.menuToggle = document.getElementById('menu-toggle');
        this.contextPanel = document.getElementById('context-panel');
        this.closePanel = document.getElementById('close-panel');
        this.mobileOverlay = document.getElementById('mobile-overlay');
        this.messagesContainer = document.getElementById('messages-container');
        this.typingIndicator = document.getElementById('typing-indicator-new');

        // Auto-resize du textarea
        if (this.chatInput) {
            this.chatInput.addEventListener('input', (e) => {
                this.handleInputChange(e);
            });

            this.chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Bouton d'envoi
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        // Bouton vocal (simulation)
        if (this.voiceBtn) {
            this.voiceBtn.addEventListener('click', () => {
                this.toggleVoiceInput();
            });
        }

        // Menu contextuel
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => {
                this.toggleContextPanel();
            });
        }

        if (this.closePanel) {
            this.closePanel.addEventListener('click', () => {
                this.closeContextPanel();
            });
        }

        if (this.mobileOverlay) {
            this.mobileOverlay.addEventListener('click', () => {
                this.closeContextPanel();
            });
        }

        // Chips de démarrage rapide
        this.setupQuickStarters();

        // Modes de conversation
        this.setupModeSelectors();

        // Actions rapides
        this.setupQuickActions();
    }

    handleInputChange(e) {
        // Auto-resize
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';

        // Activer/désactiver le bouton d'envoi
        const hasText = e.target.value.trim().length > 0;
        if (this.sendBtn) {
            this.sendBtn.disabled = !hasText;
            this.sendBtn.classList.toggle('active', hasText);
        }

        // Simulation d'analyse de sentiment en temps réel
        this.analyzeSentiment(e.target.value);
    }    analyzeSentiment(text) {
        if (!text) return;

        // Utiliser HLNACore pour une vraie analyse si disponible
        let emotion = 'Neutre';
        let complexity = Math.min(text.length / 50, 1);
        
        if (this.hlnaCore) {
            try {
                // Analyse rapide du texte avec HLNA Core
                const detectedEmotion = this.hlnaCore.detectEmotion(text);
                const emotionMap = {
                    'joy': 'Positif',
                    'sadness': 'Mélancolique', 
                    'anger': 'Intense',
                    'fear': 'Inquiet',
                    'surprise': 'Surpris',
                    'curiosity': 'Curieux',
                    'neutral': 'Neutre'
                };
                emotion = emotionMap[detectedEmotion] || 'Neutre';
                
                // Analyse de complexité plus précise
                complexity = this.hlnaCore.assessComplexity(text);
            } catch (error) {
                console.warn('Erreur analyse sentiment HLNA Core:', error);
                // Fallback vers simulation
                const emotions = ['Neutre', 'Positif', 'Curieux', 'Analytique', 'Créatif'];
                emotion = emotions[Math.floor(Math.random() * emotions.length)];
            }
        } else {
            // Simulation d'analyse de sentiment
            const emotions = ['Neutre', 'Positif', 'Curieux', 'Analytique', 'Créatif'];
            emotion = emotions[Math.floor(Math.random() * emotions.length)];
        }
        
        const emotionMetric = document.getElementById('emotion-metric');
        if (emotionMetric) {
            emotionMetric.textContent = emotion;
        }

        // Mise à jour de la complexité
        const complexityFill = document.getElementById('complexity-fill');
        if (complexityFill) {
            complexityFill.style.width = `${complexity * 100}%`;
        }
        
        // Analytics en temps réel
        if (this.analytics) {
            this.analytics.track('sentiment_analysis', {
                emotion: emotion,
                complexity: complexity,
                textLength: text.length,
                timestamp: Date.now()
            });
        }
    }sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message || !this.messagesContainer) return;

        // Analytics - tracking du message utilisateur
        if (this.analytics) {
            this.analytics.trackMessage('user_message', message);
            this.analytics.track('user_interaction', {
                action: 'send_message',
                messageLength: message.length,
                mode: this.currentMode,
                timestamp: Date.now()
            });
        }

        // Ajouter le message utilisateur
        this.addUserMessage(message);

        // Effacer l'input
        this.chatInput.value = '';
        this.chatInput.style.height = 'auto';
        this.sendBtn.disabled = true;
        this.sendBtn.classList.remove('active');

        // Faire défiler vers le bas
        this.scrollToBottom();

        // Simuler une réponse HLNA
        this.simulateHLNAResponse(message);

        // Mettre à jour les statistiques
        this.updateStats();

        // Ajouter à la mémoire
        this.addToMemory(message);
    }

    addUserMessage(message) {
        const userMessage = document.createElement('div');
        userMessage.className = 'message-user animate-fadeInUp';
        userMessage.innerHTML = `
            <div class="message-content">
                <div class="message-text">${this.formatMessage(message)}</div>
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
            <div class="message-avatar">Vous</div>
        `;
        this.messagesContainer.appendChild(userMessage);
    }

    addHLNAMessage(message) {
        const hlnaMessage = document.createElement('div');
        hlnaMessage.className = 'message-hlna animate-fadeInUp';
        hlnaMessage.innerHTML = `
            <div class="message-avatar">H</div>
            <div class="message-content">
                <div class="message-text">${this.formatMessage(message)}</div>
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;
        this.messagesContainer.appendChild(hlnaMessage);
        this.scrollToBottom();
    }

    formatMessage(message) {
        // Formatage basique (liens, markdown simple)
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }    async simulateHLNAResponse(userMessage) {
        // Afficher l'indicateur de frappe
        this.showTypingIndicator();

        // Simuler un délai de réflexion
        const thinkingTime = 1500 + Math.random() * 2000;
        
        setTimeout(async () => {
            this.hideTypingIndicator();
            
            let response;
            
            // Utiliser HLNACore si disponible, sinon fallback
            if (this.hlnaCore) {
                try {
                    console.log('🧠 Traitement avec HLNA Core...');
                    const coreResponse = await this.hlnaCore.processMessage(userMessage);
                    response = coreResponse.content || this.generateResponse(userMessage);
                    
                    // Log analytics si disponible
                    if (this.analytics) {
                        this.analytics.track('message_processed_by_core', {
                            confidence: coreResponse.confidence,
                            reasoning: coreResponse.reasoning,
                            mode: this.currentMode
                        });
                    }
                    
                } catch (error) {
                    console.warn('⚠️ Erreur HLNA Core, fallback:', error);
                    response = this.generateResponse(userMessage);
                }
            } else {
                response = this.generateResponse(userMessage);
            }

            this.addHLNAMessage(response);
            this.updateEngagement();
            
            // Analytics
            if (this.analytics) {
                this.analytics.trackMessage('hlna_response', response, thinkingTime);
            }
        }, thinkingTime);
    }

    generateResponse(userMessage) {
        const responses = {
            natural: [
                "C'est une question fascinante ! Laissez-moi réfléchir à cela...",
                "Intéressant. Je vois plusieurs angles d'approche pour cela.",
                "Votre perspective m'intrigue. Voici comment je l'envisage :",
                "J'apprécie votre approche. Dans mon expérience simulative...",
                "C'est exactement le genre de défi intellectuel que j'adore !",
            ],
            creative: [
                "🎨 Ah ! Mon côté créatif s'emballe... Imaginez ceci :",
                "✨ Laissez-moi peindre une vision pour vous...",
                "🌟 Une idée innovante me vient : et si nous...",
                "🎭 Jouons avec cette concept de manière originale !",
                "🚀 Votre question déclenche mille possibilités créatives !",
            ],
            analytical: [
                "🔍 Analysons cela méthodiquement...",
                "📊 Les données suggèrent plusieurs pistes :",
                "🔬 D'un point de vue analytique, nous observons :",
                "⚡ Décortiquons les éléments clés de votre question :",
                "🎯 Concentrons-nous sur les aspects mesurables :",
            ]
        };

        const modeResponses = responses[this.currentMode] || responses.natural;
        return modeResponses[Math.floor(Math.random() * modeResponses.length)];
    }

    showTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.style.display = 'flex';
            this.scrollToBottom();
        }
    }

    hideTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.style.display = 'none';
        }
    }

    toggleContextPanel() {
        if (this.contextPanel) {
            this.contextPanel.classList.toggle('active');
            this.mobileOverlay.classList.toggle('active');
        }
    }

    closeContextPanel() {
        if (this.contextPanel) {
            this.contextPanel.classList.remove('active');
            this.mobileOverlay.classList.remove('active');
        }
    }

    setupQuickStarters() {
        document.querySelectorAll('.starter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const text = chip.textContent.replace(/^[^\s]+\s/, '');
                this.chatInput.value = text;
                this.chatInput.focus();
                this.chatInput.dispatchEvent(new Event('input'));
            });
        });
    }    setupModeSelectors() {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Retirer la classe active de tous les boutons
                document.querySelectorAll('.mode-btn').forEach(b => 
                    b.classList.remove('active')
                );
                
                // Ajouter la classe active au bouton cliqué
                btn.classList.add('active');
                
                // Mettre à jour le mode
                const newMode = btn.dataset.mode || 'natural';
                this.currentMode = newMode;
                console.log('Mode HLNA changé vers:', this.currentMode);
                
                // Informer HLNACore du changement de mode
                if (this.hlnaCore) {
                    this.hlnaCore.setMode(newMode);
                }
                
                // Analytics
                if (this.analytics) {
                    this.analytics.trackModeChange(newMode);
                }
                
                // Mettre à jour l'interface
                this.updateModeDisplay();
            });
        });
    }

    setupQuickActions() {
        document.querySelectorAll('.action-btn-small').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.textContent.trim();
                const prompts = {
                    '✨ Inspire-moi': 'Inspire-moi avec quelque chose de créatif et original',
                    '🔍 Analyse': 'Aide-moi à analyser cette situation en profondeur',
                    '📚 Histoire': 'Raconte-moi une histoire captivante',
                    '🎨 Créatif': 'Aidons-nous à créer quelque chose ensemble'
                };
                
                const prompt = prompts[action] || action;
                this.chatInput.value = prompt;
                this.chatInput.focus();
                this.chatInput.dispatchEvent(new Event('input'));
            });
        });
    }

    updateModeDisplay() {
        // Simulation de changement visuel selon le mode
        const modeDescriptions = {
            natural: 'Mode naturel actif - Conversation fluide et adaptative',
            creative: 'Mode créatif actif - Imagination et innovation',
            analytical: 'Mode analytique actif - Analyse approfondie et logique'
        };

        console.log(modeDescriptions[this.currentMode] || 'Mode inconnu');
    }

    toggleVoiceInput() {
        // Simulation de reconnaissance vocale
        this.voiceBtn.classList.toggle('active');
        
        if (this.voiceBtn.classList.contains('active')) {
            this.voiceBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2"/>
                </svg>
            `;
            console.log('🎤 Reconnaissance vocale activée (simulation)');
            
            // Simuler la fin de l'enregistrement après 3 secondes
            setTimeout(() => {
                this.stopVoiceInput();
            }, 3000);
        } else {
            this.stopVoiceInput();
        }
    }

    stopVoiceInput() {
        this.voiceBtn.classList.remove('active');
        this.voiceBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" stroke-width="2"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" stroke-width="2"/>
            </svg>
        `;
        console.log('🎤 Reconnaissance vocale désactivée');
    }    updateStats() {
        this.messageCount++;
        
        // Mettre à jour les statistiques en temps réel avec les vraies données analytics
        if (this.analytics) {
            const metrics = this.analytics.getMetrics();
            const sessionInfo = this.analytics.getSessionInfo();
            
            // Mettre à jour l'affichage des métriques
            const sessionTime = Math.floor((Date.now() - sessionInfo.startTime) / 1000 / 60);
            
            this.updateElement('session-time', `${sessionTime}m`);
            this.updateElement('message-count', metrics.messages || this.messageCount);
            this.updateElement('engagement-metric', this.getEngagementFromMetrics(metrics));
            
            // Mettre à jour la barre de progression d'apprentissage
            this.updateProgressBar('learning-progress', metrics.learningProgress || 0);
        }
        
        // Fallback simulation si pas d'analytics
        if (!this.analytics) {
            // Simulation de mise à jour des stats dans le panneau contextuel
            const sessionTime = Math.floor((Date.now() - this.sessionStartTime) / 1000 / 60);
            this.updateElement('session-time', `${sessionTime}m`);
            this.updateElement('message-count', this.messageCount);
        }
    }

    getEngagementFromMetrics(metrics) {
        const score = metrics.userEngagement || 0;
        if (score > 80) return 'Très engagé';
        if (score > 60) return 'Engagé';
        if (score > 40) return 'Modéré';
        if (score > 20) return 'Passif';
        return 'Déconnecté';
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    updateProgressBar(id, percentage) {
        const element = document.getElementById(id);
        if (element) {
            element.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
        }
    }

    addToMemory(message) {
        this.conversationMemory.push({
            message: message,
            timestamp: Date.now(),
            emotion: document.getElementById('emotion-metric')?.textContent || 'Neutre'
        });

        // Limiter la mémoire à 10 éléments
        if (this.conversationMemory.length > 10) {
            this.conversationMemory.shift();
        }

        this.updateMemoryDisplay();
    }

    updateMemoryDisplay() {
        const memoryItems = document.getElementById('memory-items');
        if (memoryItems && this.conversationMemory.length > 0) {
            const recentMemory = this.conversationMemory.slice(-3);
            memoryItems.innerHTML = recentMemory
                .map(item => `<div class="memory-item">${item.message.substring(0, 30)}...</div>`)
                .join('');
        }
    }

    updateEngagement() {
        const engagementMetric = document.getElementById('engagement-metric');
        const engagements = ['Actif', 'Très engagé', 'Concentré', 'Curieux'];
        if (engagementMetric) {
            engagementMetric.textContent = engagements[Math.floor(Math.random() * engagements.length)];
        }
    }

    updateSessionTimer() {
        setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.sessionStartTime) / 60000);
            // Mise à jour des statistiques de session
        }, 60000);
    }

    setupAnalytics() {
        // Simulation d'analytics en temps réel
        setInterval(() => {
            this.simulateAnalyticsUpdate();
        }, 5000);
    }

    simulateAnalyticsUpdate() {
        // Simulation de mise à jour des métriques
        const complexityFill = document.getElementById('complexity-fill');
        if (complexityFill && Math.random() > 0.7) {
            const randomComplexity = Math.random() * 100;
            complexityFill.style.width = `${randomComplexity}%`;
        }
    }

    simulateInitialAnalytics() {
        // Initialiser les métriques avec des valeurs de base
        setTimeout(() => {
            const complexityFill = document.getElementById('complexity-fill');
            if (complexityFill) {
                complexityFill.style.width = '20%';
            }
        }, 1000);
    }

    scrollToBottom() {
        if (this.messagesContainer) {
            setTimeout(() => {
                this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
            }, 100);
        }
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new HLNAChatInterface();
});

// Export pour utilisation modulaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HLNAChatInterface;
}
