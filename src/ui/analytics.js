/**
 * HLNA Analytics System
 * Système d'analyse en temps réel pour HLNA
 */

class HLNAAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.events = [];
        this.metrics = {
            conversations: 0,
            messages: 0,
            avgResponseTime: 0,
            userEngagement: 0,
            emotionalTone: 'neutral',
            learningProgress: 0
        };
        
        this.init();
    }

    init() {
        console.log('📊 HLNA Analytics System activé');
        this.trackSession();
        this.setupEventListeners();
        this.startRealTimeMetrics();
    }

    generateSessionId() {
        return 'hlna_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    trackSession() {
        this.logEvent('session_start', {
            sessionId: this.sessionId,
            timestamp: this.startTime,
            userAgent: navigator.userAgent,
            language: navigator.language,
            screenResolution: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
    }

    setupEventListeners() {
        // Tracking des interactions utilisateur
        document.addEventListener('click', (e) => {
            this.trackClick(e);
        });

        // Tracking du temps passé sur les éléments
        document.addEventListener('focus', (e) => {
            this.trackFocus(e);
        }, true);

        // Tracking de la fermeture de session
        window.addEventListener('beforeunload', () => {
            this.trackSessionEnd();
        });

        // Tracking des erreurs
        window.addEventListener('error', (e) => {
            this.trackError(e);
        });
    }

    trackClick(event) {
        const element = event.target;
        const elementData = {
            tagName: element.tagName,
            className: element.className,
            id: element.id,
            textContent: element.textContent?.substring(0, 50),
            position: {
                x: event.clientX,
                y: event.clientY
            }
        };

        this.logEvent('user_click', elementData);
    }

    trackFocus(event) {
        const element = event.target;
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)) {
            this.logEvent('element_focus', {
                elementType: element.tagName,
                elementId: element.id,
                elementName: element.name
            });
        }
    }

    trackMessage(type, content, responseTime = null) {
        this.metrics.messages++;
        
        if (responseTime) {
            this.updateAverageResponseTime(responseTime);
        }

        this.logEvent('message_sent', {
            messageType: type,
            contentLength: content.length,
            responseTime: responseTime,
            conversationLength: this.metrics.messages,
            emotionalTone: this.analyzeEmotionalTone(content)
        });

        this.updateEngagementScore();
    }

    trackConversation(action) {
        if (action === 'start') {
            this.metrics.conversations++;
            this.logEvent('conversation_start', {
                conversationId: this.generateConversationId(),
                sessionDuration: Date.now() - this.startTime
            });
        } else if (action === 'end') {
            this.logEvent('conversation_end', {
                messageCount: this.metrics.messages,
                duration: Date.now() - this.startTime
            });
        }
    }

    trackModeChange(mode) {
        this.logEvent('mode_change', {
            newMode: mode,
            timestamp: Date.now(),
            sessionDuration: Date.now() - this.startTime
        });
    }

    trackError(error) {
        this.logEvent('error_occurred', {
            message: error.message,
            filename: error.filename,
            lineno: error.lineno,
            colno: error.colno,
            stack: error.error?.stack
        });
    }

    trackSessionEnd() {
        const sessionDuration = Date.now() - this.startTime;
        this.logEvent('session_end', {
            sessionDuration: sessionDuration,
            totalMessages: this.metrics.messages,
            totalConversations: this.metrics.conversations,
            avgResponseTime: this.metrics.avgResponseTime,
            engagementScore: this.metrics.userEngagement
        });

        // Sauvegarder les données localement
        this.saveToLocalStorage();
    }

    analyzeEmotionalTone(text) {
        // Analyse simple du ton émotionnel
        const positiveWords = ['bon', 'bien', 'super', 'génial', 'parfait', 'excellent', 'merci', 'bravo'];
        const negativeWords = ['mauvais', 'mal', 'problème', 'erreur', 'bug', 'nul', 'terrible'];
        const questionWords = ['comment', 'pourquoi', 'quand', 'où', 'qui', 'quoi', '?'];

        const words = text.toLowerCase().split(' ');
        let positiveScore = 0;
        let negativeScore = 0;
        let questionScore = 0;

        words.forEach(word => {
            if (positiveWords.some(pw => word.includes(pw))) positiveScore++;
            if (negativeWords.some(nw => word.includes(nw))) negativeScore++;
            if (questionWords.some(qw => word.includes(qw))) questionScore++;
        });

        if (questionScore > 0) return 'curious';
        if (positiveScore > negativeScore) return 'positive';
        if (negativeScore > positiveScore) return 'negative';
        return 'neutral';
    }

    updateAverageResponseTime(responseTime) {
        if (this.metrics.messages === 1) {
            this.metrics.avgResponseTime = responseTime;
        } else {
            this.metrics.avgResponseTime = (this.metrics.avgResponseTime + responseTime) / 2;
        }
    }

    updateEngagementScore() {
        // Score d'engagement basé sur plusieurs facteurs
        const sessionTime = (Date.now() - this.startTime) / 1000 / 60; // en minutes
        const messageFrequency = this.metrics.messages / Math.max(sessionTime, 1);
        const responseSpeed = Math.max(0, 100 - this.metrics.avgResponseTime / 1000);
        
        this.metrics.userEngagement = Math.min(100, 
            (messageFrequency * 20) + 
            (responseSpeed * 0.3) + 
            (this.metrics.conversations * 10)
        );
    }

    startRealTimeMetrics() {
        // Mise à jour des métriques en temps réel
        setInterval(() => {
            this.updateRealTimeDisplay();
        }, 2000);
    }

    updateRealTimeDisplay() {
        // Mettre à jour l'affichage en temps réel si les éléments existent
        const sessionTime = Math.floor((Date.now() - this.startTime) / 1000 / 60);
        
        // Éléments de l'interface chat
        this.updateElement('session-time', `${sessionTime}m`);
        this.updateElement('message-count', this.metrics.messages);
        this.updateElement('engagement-metric', this.getEngagementLevel());
        this.updateElement('emotion-metric', this.capitalizeFirst(this.metrics.emotionalTone));
        
        // Barres de progression
        this.updateProgressBar('complexity-fill', this.calculateComplexity());
        this.updateProgressBar('learning-progress', this.metrics.learningProgress);
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

    calculateComplexity() {
        // Calcul de la complexité basé sur la longueur des messages et le vocabulaire
        if (this.metrics.messages === 0) return 0;
        
        const avgWordsPerMessage = this.events
            .filter(e => e.type === 'message_sent')
            .reduce((acc, e) => acc + (e.data.contentLength / 5), 0) / this.metrics.messages;
        
        return Math.min(100, avgWordsPerMessage * 2);
    }

    getEngagementLevel() {
        const score = this.metrics.userEngagement;
        if (score > 80) return 'Très engagé';
        if (score > 60) return 'Engagé';
        if (score > 40) return 'Modéré';
        if (score > 20) return 'Passif';
        return 'Déconnecté';
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    generateConversationId() {
        return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }

    logEvent(type, data) {
        const event = {
            type: type,
            timestamp: Date.now(),
            sessionId: this.sessionId,
            data: data
        };

        this.events.push(event);
        
        // Limiter à 1000 événements pour éviter la surcharge mémoire
        if (this.events.length > 1000) {
            this.events = this.events.slice(-500);
        }

        // Log en développement
        if (this.isDevelopment()) {
            console.log('📊 Analytics Event:', event);
        }
    }

    isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.hostname === '';
    }

    saveToLocalStorage() {
        try {
            const analyticsData = {
                sessionId: this.sessionId,
                metrics: this.metrics,
                events: this.events.slice(-100), // Garder seulement les 100 derniers événements
                lastSaved: Date.now()
            };
            
            localStorage.setItem('hlna_analytics', JSON.stringify(analyticsData));
        } catch (error) {
            console.warn('Impossible de sauvegarder les analytics:', error);
        }
    }

    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('hlna_analytics');
            if (saved) {
                const data = JSON.parse(saved);
                return data;
            }
        } catch (error) {
            console.warn('Impossible de charger les analytics:', error);
        }
        return null;
    }

    exportAnalytics() {
        const exportData = {
            session: {
                id: this.sessionId,
                startTime: this.startTime,
                duration: Date.now() - this.startTime
            },
            metrics: this.metrics,
            events: this.events,
            summary: this.generateSummary()
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hlna_analytics_${this.sessionId}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    generateSummary() {
        const sessionDuration = Date.now() - this.startTime;
        
        return {
            totalSessionTime: sessionDuration,
            totalMessages: this.metrics.messages,
            totalConversations: this.metrics.conversations,
            averageResponseTime: this.metrics.avgResponseTime,
            engagementScore: this.metrics.userEngagement,
            dominantEmotionalTone: this.getDominantEmotion(),
            peakActivity: this.getPeakActivityTime(),
            userBehaviorPatterns: this.analyzeUserPatterns()
        };
    }

    getDominantEmotion() {
        const emotions = this.events
            .filter(e => e.type === 'message_sent' && e.data.emotionalTone)
            .map(e => e.data.emotionalTone);
        
        const emotionCounts = emotions.reduce((acc, emotion) => {
            acc[emotion] = (acc[emotion] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(emotionCounts).reduce((a, b) => 
            emotionCounts[a] > emotionCounts[b] ? a : b, 'neutral'
        );
    }

    getPeakActivityTime() {
        const hours = this.events.map(e => new Date(e.timestamp).getHours());
        const hourCounts = hours.reduce((acc, hour) => {
            acc[hour] = (acc[hour] || 0) + 1;
            return acc;
        }, {});

        const peakHour = Object.keys(hourCounts).reduce((a, b) => 
            hourCounts[a] > hourCounts[b] ? a : b, '0'
        );

        return `${peakHour}h`;
    }

    analyzeUserPatterns() {
        return {
            averageMessageLength: this.events
                .filter(e => e.type === 'message_sent')
                .reduce((acc, e) => acc + e.data.contentLength, 0) / this.metrics.messages || 0,
            mostUsedFeatures: this.getMostUsedFeatures(),
            conversationPacing: this.metrics.messages / Math.max(1, this.metrics.conversations)
        };
    }

    getMostUsedFeatures() {
        const features = this.events
            .filter(e => e.type === 'user_click')
            .map(e => e.data.className)
            .filter(className => className);

        const featureCounts = features.reduce((acc, feature) => {
            acc[feature] = (acc[feature] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(featureCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([feature, count]) => ({ feature, count }));
    }

    // API publique pour les autres modules
    track(eventType, data) {
        this.logEvent(eventType, data);
    }

    getMetrics() {
        return { ...this.metrics };
    }

    getSessionInfo() {
        return {
            sessionId: this.sessionId,
            startTime: this.startTime,
            duration: Date.now() - this.startTime
        };
    }
}

// Instance globale
let hlnaAnalytics;

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    hlnaAnalytics = new HLNAAnalytics();
    
    // Exposer globalement pour les autres scripts
    window.HLNAAnalytics = hlnaAnalytics;
});

// Export pour utilisation modulaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HLNAAnalytics;
}
