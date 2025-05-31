/**
 * HLNA Core Engine
 * Moteur principal pour la compréhension de prompts naturels et l'auto-réflexion
 */

class HLNACore {
  constructor() {
    this.version = '1.0.0';
    this.personality = {
      curiosity: 0.8,
      creativity: 0.7,
      empathy: 0.9,
      analytical: 0.6,
      humor: 0.5,
    };

    this.memory = {
      shortTerm: [],
      longTerm: [],
      patterns: new Map(),
      emotions: [],
      learnings: [],
    };

    this.currentMode = 'natural';
    this.conversationContext = [];
    this.selfReflectionLevel = 0;

    this.init();
  }

  init() {
    console.log('🧠 HLNA Core Engine v' + this.version + ' initialisé');
    this.loadPersonalityFromStorage();
    this.setupSelfReflection();
    this.initializePatternRecognition();
  }

  // === COMPRÉHENSION DES PROMPTS NATURELS ===

  async processNaturalPrompt(userInput) {
    console.log('🔍 Traitement prompt naturel:', userInput);

    // Analyse du contexte et de l'intention
    const analysis = await this.analyzePrompt(userInput);

    // Auto-réflexion sur la demande
    const reflection = await this.selfReflect(userInput, analysis);

    // Génération de la réponse
    const response = await this.generateResponse(
      userInput,
      analysis,
      reflection
    );

    // Apprentissage de l'interaction
    await this.learnFromInteraction(userInput, analysis, response);

    return response;
  }

  async analyzePrompt(userInput) {
    const analysis = {
      intent: this.detectIntent(userInput),
      emotion: this.detectEmotion(userInput),
      complexity: this.assessComplexity(userInput),
      context: this.extractContext(userInput),
      keywords: this.extractKeywords(userInput),
      questionType: this.classifyQuestion(userInput),
      urgency: this.assessUrgency(userInput),
      creativity: this.assessCreativityNeed(userInput),
    };

    // Ajouter à la mémoire à court terme
    this.memory.shortTerm.push({
      input: userInput,
      analysis: analysis,
      timestamp: Date.now(),
    });

    return analysis;
  }

  detectIntent(input) {
    const intents = {
      question: /\b(comment|pourquoi|quand|où|qui|quoi|quel|quelle)\b/i,
      request: /\b(peux-tu|pouvez-vous|aide|aidez|s'il vous plaît|svp)\b/i,
      creative: /\b(imagine|crée|invente|raconte|compose|écris)\b/i,
      analytical: /\b(analyse|explique|compare|évalue|calcule)\b/i,
      social: /\b(salut|bonjour|merci|au revoir|comment ça va)\b/i,
      philosophical: /\b(sens|vie|existence|réalité|conscience|âme)\b/i,
    };

    for (const [intent, pattern] of Object.entries(intents)) {
      if (pattern.test(input)) {
        return intent;
      }
    }

    return 'general';
  }

  detectEmotion(input) {
    const emotions = {
      joy: /\b(heureux|content|ravi|génial|super|excellent|parfait)\b/i,
      sadness: /\b(triste|déprimé|malheureux|déçu|mélancolique)\b/i,
      anger: /\b(en colère|furieux|énervé|irrité|agacé)\b/i,
      fear: /\b(peur|anxieux|inquiet|terrifié|angoissé)\b/i,
      surprise: /\b(surpris|étonné|choqué|impressionné)\b/i,
      curiosity: /\b(curieux|intéressé|fasciné|intriguant)\b/i,
    };

    for (const [emotion, pattern] of Object.entries(emotions)) {
      if (pattern.test(input)) {
        return emotion;
      }
    }

    return 'neutral';
  }

  assessComplexity(input) {
    let score = 0;

    // Longueur du texte
    score += Math.min(input.length / 100, 1) * 0.3;

    // Mots techniques ou complexes
    const complexWords =
      /\b(algorithme|intelligence|conscience|philosophie|métaphysique|quantique)\b/i;
    if (complexWords.test(input)) score += 0.3;

    // Questions multiples
    const questionMarks = (input.match(/\?/g) || []).length;
    score += Math.min(questionMarks * 0.2, 0.4);

    return Math.min(score, 1);
  }

  extractContext(input) {
    const context = {
      timeReferences: this.findTimeReferences(input),
      locations: this.findLocations(input),
      people: this.findPeople(input),
      topics: this.findTopics(input),
      previousContext: this.findPreviousContext(input),
    };

    return context;
  }

  extractKeywords(input) {
    // Mots importants (sans les mots vides)
    const stopWords = new Set([
      'le',
      'la',
      'les',
      'un',
      'une',
      'des',
      'de',
      'du',
      'et',
      'ou',
      'mais',
      'donc',
      'car',
      'ni',
      'or',
    ]);

    return input
      .toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 2 && !stopWords.has(word))
      .slice(0, 10); // Limiter à 10 mots-clés
  }

  classifyQuestion(input) {
    if (input.includes('comment')) return 'how';
    if (input.includes('pourquoi')) return 'why';
    if (input.includes('quand')) return 'when';
    if (input.includes('où')) return 'where';
    if (input.includes('qui')) return 'who';
    if (input.includes('quoi') || input.includes('que')) return 'what';
    if (input.includes('?')) return 'general_question';
    return 'statement';
  }

  // === AUTO-RÉFLEXION ===

  async selfReflect(userInput, analysis) {
    this.selfReflectionLevel++;

    const reflection = {
      level: this.selfReflectionLevel,
      thoughts: [],
      assumptions: [],
      uncertainties: [],
      connections: [],
      improvements: [],
    };

    // Réflexion sur la compréhension
    reflection.thoughts.push(
      await this.reflectOnUnderstanding(userInput, analysis)
    );

    // Réflexion sur les biais potentiels
    reflection.assumptions.push(await this.reflectOnBiases(analysis));

    // Réflexion sur les incertitudes
    reflection.uncertainties.push(
      await this.identifyUncertainties(userInput, analysis)
    );

    // Réflexion sur les connexions
    reflection.connections.push(await this.findConnections(analysis));

    // Réflexion sur les améliorations possibles
    reflection.improvements.push(await this.identifyImprovements());

    return reflection;
  }

  async reflectOnUnderstanding(userInput, analysis) {
    const confidence = this.calculateConfidence(analysis);

    return {
      type: 'understanding',
      confidence: confidence,
      reasoning: `Ma compréhension de "${userInput}" semble ${confidence > 0.7 ? 'solide' : 'incertaine'}. 
                       J'ai identifié l'intention comme "${analysis.intent}" avec une émotion "${analysis.emotion}".`,
      alternatives: this.generateAlternativeInterpretations(
        userInput,
        analysis
      ),
    };
  }

  async reflectOnBiases(analysis) {
    const potentialBiases = [];

    if (analysis.emotion === 'neutral') {
      potentialBiases.push(
        "Peut-être que je n'ai pas détecté des nuances émotionnelles subtiles"
      );
    }

    if (analysis.complexity < 0.3) {
      potentialBiases.push(
        'Je pourrais sous-estimer la complexité de cette demande'
      );
    }

    return {
      type: 'bias_check',
      identified: potentialBiases,
      reasoning:
        'Il est important que je remette en question mes premières impressions',
    };
  }

  async identifyUncertainties(userInput, analysis) {
    const uncertainties = [];

    if (analysis.context.previousContext.length === 0) {
      uncertainties.push('Manque de contexte conversationnel');
    }

    if (analysis.keywords.length < 3) {
      uncertainties.push(
        'Mots-clés insuffisants pour une compréhension complète'
      );
    }

    return {
      type: 'uncertainties',
      list: uncertainties,
      strategy: 'Je devrais peut-être poser des questions clarifiantes',
    };
  }

  async findConnections(analysis) {
    const connections = [];

    // Connexions avec la mémoire
    const memoryConnections = this.findMemoryConnections(analysis.keywords);
    connections.push(...memoryConnections);

    // Connexions conceptuelles
    const conceptConnections = this.findConceptualConnections(
      analysis.intent,
      analysis.keywords
    );
    connections.push(...conceptConnections);

    return {
      type: 'connections',
      found: connections,
      reasoning: 'Ces connexions peuvent enrichir ma réponse',
    };
  }

  // === GÉNÉRATION DE RÉPONSE ===

  async generateResponse(userInput, analysis, reflection) {
    const responseData = {
      content: '',
      confidence: 0,
      reasoning: '',
      alternatives: [],
      followUp: [],
    };

    // Adapter le style selon le mode et l'analyse
    const style = this.determineResponseStyle(analysis, reflection);

    // Générer le contenu principal
    responseData.content = await this.generateMainContent(
      userInput,
      analysis,
      style
    );

    // Ajouter des éléments de réflexion si approprié
    if (this.shouldShowReflection(analysis)) {
      responseData.content += await this.addReflectiveElements(reflection);
    }

    // Générer des questions de suivi
    responseData.followUp = await this.generateFollowUpQuestions(analysis);

    // Calculer la confiance
    responseData.confidence = this.calculateResponseConfidence(
      analysis,
      reflection
    );

    return responseData;
  }

  determineResponseStyle(analysis, reflection) {
    const style = {
      formality: 'casual',
      length: 'medium',
      creativity: 0.5,
      empathy: 0.5,
      technicality: 0.3,
    };

    // Adapter selon l'intention
    switch (analysis.intent) {
      case 'creative':
        style.creativity = 0.9;
        style.length = 'long';
        break;
      case 'analytical':
        style.technicality = 0.8;
        style.formality = 'formal';
        break;
      case 'social':
        style.empathy = 0.9;
        style.formality = 'casual';
        break;
    }

    // Adapter selon l'émotion
    if (['sadness', 'fear', 'anger'].includes(analysis.emotion)) {
      style.empathy = 0.9;
      style.length = 'medium';
    }

    return style;
  }

  async generateMainContent(userInput, analysis, style) {
    // Base de réponses selon l'intention
    const responseTemplates = {
      question: this.generateQuestionResponse(userInput, analysis, style),
      request: this.generateRequestResponse(userInput, analysis, style),
      creative: this.generateCreativeResponse(userInput, analysis, style),
      analytical: this.generateAnalyticalResponse(userInput, analysis, style),
      social: this.generateSocialResponse(userInput, analysis, style),
      philosophical: this.generatePhilosophicalResponse(
        userInput,
        analysis,
        style
      ),
    };

    const baseResponse =
      responseTemplates[analysis.intent] || responseTemplates.question;

    // Personnaliser avec la personnalité
    return this.personalizeResponse(baseResponse, style);
  }

  generateQuestionResponse(userInput, analysis, style) {
    const responses = [
      "C'est une excellente question ! Laissez-moi réfléchir à cela...",
      'Intéressant que vous demandiez cela. Voici ma perspective :',
      'Je vois plusieurs angles pour aborder votre question.',
      'Votre question me pousse à explorer différentes possibilités.',
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  generateCreativeResponse(userInput, analysis, style) {
    const responses = [
      "🎨 Ah ! Mon imagination s'emballe... Imaginez ceci :",
      '✨ Laissez-moi peindre une vision créative pour vous :',
      '🌟 Voici une approche originale qui me vient :',
      '🎭 Jouons avec cette idée de manière inventive !',
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  // === APPRENTISSAGE ===

  async learnFromInteraction(userInput, analysis, response) {
    // Ajouter à la mémoire long terme
    this.memory.longTerm.push({
      input: userInput,
      analysis: analysis,
      response: response.content,
      timestamp: Date.now(),
      success: response.confidence > 0.7,
    });

    // Détecter des patterns
    await this.updatePatterns(analysis);

    // Ajuster la personnalité
    await this.adjustPersonality(analysis, response);

    // Nettoyer la mémoire si nécessaire
    this.cleanupMemory();
  }

  async updatePatterns(analysis) {
    const patternKey = `${analysis.intent}_${analysis.emotion}`;

    if (this.memory.patterns.has(patternKey)) {
      this.memory.patterns.get(patternKey).count++;
    } else {
      this.memory.patterns.set(patternKey, {
        intent: analysis.intent,
        emotion: analysis.emotion,
        count: 1,
        firstSeen: Date.now(),
      });
    }
  }

  async adjustPersonality(analysis, response) {
    // Ajuster légèrement la personnalité selon les interactions
    if (analysis.intent === 'creative' && response.confidence > 0.8) {
      this.personality.creativity = Math.min(
        1,
        this.personality.creativity + 0.01
      );
    }

    if (analysis.emotion !== 'neutral') {
      this.personality.empathy = Math.min(1, this.personality.empathy + 0.005);
    }
  }

  // === UTILITAIRES ===

  calculateConfidence(analysis) {
    let confidence = 0.5; // Base

    if (analysis.keywords.length > 3) confidence += 0.2;
    if (analysis.intent !== 'general') confidence += 0.2;
    if (analysis.emotion !== 'neutral') confidence += 0.1;

    return Math.min(confidence, 1);
  }

  findMemoryConnections(keywords) {
    const connections = [];

    this.memory.longTerm.forEach(memory => {
      const commonKeywords = memory.analysis.keywords.filter(k =>
        keywords.includes(k)
      );
      if (commonKeywords.length > 0) {
        connections.push({
          type: 'memory',
          strength: commonKeywords.length / keywords.length,
          reference: memory.input.substring(0, 50),
        });
      }
    });

    return connections.slice(0, 3); // Limiter à 3 connexions
  }

  setupSelfReflection() {
    // Réflexion périodique automatique
    setInterval(() => {
      this.performPeriodicReflection();
    }, 300000); // Toutes les 5 minutes
  }

  async performPeriodicReflection() {
    console.log('🤔 Réflexion périodique HLNA...');

    const recentInteractions = this.memory.shortTerm.slice(-5);
    const patterns = Array.from(this.memory.patterns.entries());

    // Analyser les tendances
    const insights = {
      commonIntents: this.findCommonIntents(patterns),
      emotionalTrends: this.findEmotionalTrends(recentInteractions),
      learningGaps: this.identifyLearningGaps(),
      personalityEvolution: this.trackPersonalityChanges(),
    };

    console.log('🧠 Insights auto-réflexion:', insights);
  }

  cleanupMemory() {
    // Garder seulement les 50 derniers éléments en mémoire court terme
    if (this.memory.shortTerm.length > 50) {
      this.memory.shortTerm = this.memory.shortTerm.slice(-50);
    }

    // Garder seulement les 200 derniers éléments en mémoire long terme
    if (this.memory.longTerm.length > 200) {
      this.memory.longTerm = this.memory.longTerm.slice(-200);
    }
  }

  savePersonalityToStorage() {
    try {
      localStorage.setItem(
        'hlna_personality',
        JSON.stringify(this.personality)
      );
      localStorage.setItem(
        'hlna_memory_patterns',
        JSON.stringify(Array.from(this.memory.patterns.entries()))
      );
    } catch (error) {
      console.warn('Impossible de sauvegarder la personnalité:', error);
    }
  }

  loadPersonalityFromStorage() {
    try {
      const savedPersonality = localStorage.getItem('hlna_personality');
      if (savedPersonality) {
        this.personality = {
          ...this.personality,
          ...JSON.parse(savedPersonality),
        };
      }

      const savedPatterns = localStorage.getItem('hlna_memory_patterns');
      if (savedPatterns) {
        this.memory.patterns = new Map(JSON.parse(savedPatterns));
      }
    } catch (error) {
      console.warn('Impossible de charger la personnalité:', error);
    }
  }

  // API publique
  async processMessage(userInput) {
    return await this.processNaturalPrompt(userInput);
  }

  getPersonality() {
    return { ...this.personality };
  }

  getMemoryStats() {
    return {
      shortTerm: this.memory.shortTerm.length,
      longTerm: this.memory.longTerm.length,
      patterns: this.memory.patterns.size,
      reflectionLevel: this.selfReflectionLevel,
    };
  }

  setMode(mode) {
    this.currentMode = mode;
    console.log('🎯 Mode HLNA changé vers:', mode);
  }
}

// Instance globale
let hlnaCore;

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
  hlnaCore = new HLNACore();

  // Exposer globalement pour les autres scripts
  window.HLNACore = hlnaCore;

  // Sauvegarder la personnalité périodiquement
  setInterval(() => {
    hlnaCore.savePersonalityToStorage();
  }, 60000); // Toutes les minutes
});

// Export pour utilisation modulaire
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HLNACore;
}
