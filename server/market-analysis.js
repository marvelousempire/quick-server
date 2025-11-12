/**
 * Market Analysis & Forecasting System
 * 
 * Analyzes entity capabilities in market contexts, provides forecasting,
 * and generates precision projections for businesses, sole proprietors, and contractors.
 */

export class MarketAnalyzer {
  /**
   * Analyze how an entity fits into a specific market
   */
  analyzeMarketFit(entity, marketContext) {
    const {
      marketType, // e.g., 'local', 'regional', 'national', 'online', 'niche'
      competitionLevel, // 'low', 'medium', 'high'
      demandLevel, // 'low', 'medium', 'high', 'very-high'
      marketTrends = [], // Array of trend strings
      targetAudience = [] // Array of audience segments
    } = marketContext;

    const analysis = {
      entityId: entity.id || entity.title,
      entityType: entity.type || 'service',
      marketFit: {
        score: 0, // 0-100
        strengths: [],
        gaps: [],
        opportunities: [],
        threats: []
      },
      capabilityMatch: {
        required: [],
        available: [],
        missing: [],
        surplus: []
      },
      marketPositioning: {
        uniqueValue: '',
        differentiation: [],
        competitiveAdvantage: []
      },
      forecasting: {
        demandProjection: '',
        growthPotential: '',
        riskFactors: [],
        recommendations: []
      },
      situationAnalysis: {
        bestFitScenarios: [],
        adaptationNeeded: [],
        optimizationOpportunities: []
      }
    };

    // Analyze capabilities against market needs
    if (entity.capabilities && entity.capabilities.length > 0) {
      analysis.capabilityMatch.available = entity.capabilities.map(c => 
        typeof c === 'string' ? c : c.capability || c.ability
      );
    }

    // Analyze outcomes against market demand
    if (entity.outcomes && entity.outcomes.length > 0) {
      const outcomes = entity.outcomes.map(o => typeof o === 'string' ? o : o.result);
      analysis.marketPositioning.uniqueValue = outcomes.join(', ');
    }

    // Generate market fit score
    let score = 50; // Base score
    
    // Adjust based on capabilities
    if (analysis.capabilityMatch.available.length > 0) {
      score += Math.min(analysis.capabilityMatch.available.length * 5, 30);
    }
    
    // Adjust based on demand
    if (demandLevel === 'very-high') score += 15;
    else if (demandLevel === 'high') score += 10;
    else if (demandLevel === 'medium') score += 5;
    
    // Adjust based on competition
    if (competitionLevel === 'low') score += 10;
    else if (competitionLevel === 'high') score -= 10;
    
    analysis.marketFit.score = Math.max(0, Math.min(100, score));

    // Identify strengths
    if (entity.rag && entity.rag.learnableSummary) {
      analysis.marketFit.strengths.push(entity.rag.learnableSummary);
    }
    
    if (entity.capabilities && entity.capabilities.length > 0) {
      analysis.marketFit.strengths.push(
        `Strong capability set: ${analysis.capabilityMatch.available.slice(0, 3).join(', ')}`
      );
    }

    // Identify opportunities
    if (demandLevel === 'high' || demandLevel === 'very-high') {
      analysis.marketFit.opportunities.push('High market demand for these capabilities');
    }
    
    if (competitionLevel === 'low') {
      analysis.marketFit.opportunities.push('Low competition in this market segment');
    }

    // Generate forecasting
    analysis.forecasting.demandProjection = this.generateDemandProjection(
      entity, demandLevel, marketTrends
    );
    
    analysis.forecasting.growthPotential = this.assessGrowthPotential(
      entity, marketContext
    );

    // Generate recommendations
    analysis.forecasting.recommendations = this.generateRecommendations(
      entity, marketContext, analysis
    );

    // Situation-based analysis
    analysis.situationAnalysis.bestFitScenarios = this.identifyBestFitScenarios(
      entity, marketContext
    );

    return analysis;
  }

  /**
   * Forecast demand for entity capabilities
   */
  generateDemandProjection(entity, demandLevel, trends) {
    const baseProjection = {
      'very-high': 'Very high demand expected. Market is actively seeking these capabilities.',
      'high': 'High demand expected. Strong market interest in these capabilities.',
      'medium': 'Moderate demand expected. Steady market interest.',
      'low': 'Lower demand expected. Niche market opportunity.'
    };

    let projection = baseProjection[demandLevel] || baseProjection['medium'];

    if (trends && trends.length > 0) {
      const trendImpact = trends.some(t => 
        t.toLowerCase().includes('growing') || 
        t.toLowerCase().includes('increasing') ||
        t.toLowerCase().includes('expanding')
      ) ? 'Trending upward' : 'Stable';

      projection += ` Market trends indicate ${trendImpact.toLowerCase()}.`;
    }

    return projection;
  }

  /**
   * Assess growth potential
   */
  assessGrowthPotential(entity, marketContext) {
    const { demandLevel, competitionLevel, marketType } = marketContext;
    
    let potential = 'moderate';
    
    if (demandLevel === 'very-high' && competitionLevel === 'low') {
      potential = 'very-high';
    } else if (demandLevel === 'high' && competitionLevel !== 'high') {
      potential = 'high';
    } else if (demandLevel === 'low' || competitionLevel === 'high') {
      potential = 'low';
    }

    const reasons = [];
    
    if (entity.capabilities && entity.capabilities.length >= 5) {
      reasons.push('diverse capability set');
    }
    
    if (entity.rag && entity.rag.contextualExamples && entity.rag.contextualExamples.length >= 3) {
      reasons.push('proven track record');
    }

    return {
      level: potential,
      reasons: reasons.length > 0 ? reasons.join(', ') : 'standard market conditions',
      timeframe: potential === 'very-high' ? '6-12 months' : 
                  potential === 'high' ? '12-18 months' : 
                  '18-24 months'
    };
  }

  /**
   * Generate actionable recommendations
   */
  generateRecommendations(entity, marketContext, analysis) {
    const recommendations = [];

    // Capability-based recommendations
    if (analysis.capabilityMatch.available.length < 3) {
      recommendations.push({
        type: 'capability-expansion',
        priority: 'high',
        action: 'Consider expanding capability set to better match market demands',
        impact: 'Increase market fit score and competitive positioning'
      });
    }

    // Market positioning recommendations
    if (analysis.marketFit.score < 60) {
      recommendations.push({
        type: 'market-positioning',
        priority: 'high',
        action: 'Refine unique value proposition to better differentiate in market',
        impact: 'Improve market visibility and customer acquisition'
      });
    }

    // Demand-based recommendations
    if (marketContext.demandLevel === 'very-high') {
      recommendations.push({
        type: 'demand-optimization',
        priority: 'medium',
        action: 'Scale operations to meet high market demand',
        impact: 'Capture market opportunity and maximize revenue potential'
      });
    }

    // Competition-based recommendations
    if (marketContext.competitionLevel === 'high') {
      recommendations.push({
        type: 'competitive-advantage',
        priority: 'high',
        action: 'Emphasize unique capabilities and outcomes to stand out',
        impact: 'Differentiate from competitors and win market share'
      });
    }

    return recommendations;
  }

  /**
   * Identify best-fit scenarios for entity
   */
  identifyBestFitScenarios(entity, marketContext) {
    const scenarios = [];

    if (entity.useCases && entity.useCases.length > 0) {
      entity.useCases.forEach(uc => {
        const scenario = typeof uc === 'string' ? uc : uc.scenario;
        scenarios.push({
          scenario: scenario,
          fitScore: 85,
          reasoning: 'Entity has proven use case in this scenario',
          marketAlignment: 'high'
        });
      });
    }

    if (entity.rag && entity.rag.contextualExamples) {
      entity.rag.contextualExamples.forEach(example => {
        scenarios.push({
          scenario: example.scenario,
          fitScore: 90,
          reasoning: 'Real-world example demonstrates successful application',
          marketAlignment: 'very-high'
        });
      });
    }

    return scenarios.slice(0, 5); // Top 5 scenarios
  }

  /**
   * Project capabilities for a specific situation
   */
  projectForSituation(entity, situation) {
    const {
      context, // Situation description
      requirements = [], // Required capabilities
      constraints = [], // Limitations or constraints
      goals = [] // Desired outcomes
    } = situation;

    const projection = {
      entityId: entity.id || entity.title,
      situation: context,
      fit: {
        score: 0,
        canHandle: [],
        cannotHandle: [],
        adaptations: []
      },
      projectedOutcomes: [],
      recommendations: [],
      riskFactors: []
    };

    // Check capability match
    if (entity.capabilities && entity.capabilities.length > 0) {
      const available = entity.capabilities.map(c => 
        typeof c === 'string' ? c : c.capability || c.ability
      );
      
      requirements.forEach(req => {
        const match = available.some(cap => 
          cap.toLowerCase().includes(req.toLowerCase()) ||
          req.toLowerCase().includes(cap.toLowerCase())
        );
        
        if (match) {
          projection.fit.canHandle.push(req);
        } else {
          projection.fit.cannotHandle.push(req);
        }
      });
    }

    // Calculate fit score
    if (requirements.length > 0) {
      projection.fit.score = Math.round(
        (projection.fit.canHandle.length / requirements.length) * 100
      );
    } else {
      projection.fit.score = 70; // Default if no specific requirements
    }

    // Project outcomes
    if (entity.outcomes && entity.outcomes.length > 0) {
      projection.projectedOutcomes = entity.outcomes
        .slice(0, 3)
        .map(o => typeof o === 'string' ? o : o.result);
    }

    // Identify adaptations needed
    if (projection.fit.cannotHandle.length > 0) {
      projection.fit.adaptations.push({
        gap: `Missing: ${projection.fit.cannotHandle.join(', ')}`,
        solution: 'Consider partnering, training, or acquiring additional capabilities'
      });
    }

    // Generate recommendations
    if (projection.fit.score >= 80) {
      projection.recommendations.push({
        action: 'Entity is well-suited for this situation',
        confidence: 'high',
        nextSteps: 'Proceed with confidence, leveraging existing capabilities'
      });
    } else if (projection.fit.score >= 60) {
      projection.recommendations.push({
        action: 'Entity can handle most requirements with minor adaptations',
        confidence: 'medium',
        nextSteps: 'Address identified gaps before proceeding'
      });
    } else {
      projection.recommendations.push({
        action: 'Significant adaptations or partnerships needed',
        confidence: 'low',
        nextSteps: 'Consider alternative approaches or capability expansion'
      });
    }

    return projection;
  }

  /**
   * Generate comprehensive entity analysis
   */
  generateEntityAnalysis(entity, marketContexts = []) {
    const analysis = {
      entity: {
        id: entity.id || entity.title,
        title: entity.title || entity.name,
        type: entity.type || 'service'
      },
      capabilities: {
        summary: entity.rag?.learnableSummary || 'No summary available',
        full: entity.capabilities || [],
        strengths: [],
        gaps: []
      },
      marketAnalysis: [],
      situationProjections: [],
      optimization: {
        recommendations: [],
        potentialImprovements: [],
        strategicAdvantages: []
      }
    };

    // Analyze capabilities
    if (entity.capabilities && entity.capabilities.length > 0) {
      analysis.capabilities.strengths = entity.capabilities
        .slice(0, 5)
        .map(c => typeof c === 'string' ? c : c.capability || c.ability);
    }

    // Market analysis for each context
    if (marketContexts.length > 0) {
      marketContexts.forEach(context => {
        const marketFit = this.analyzeMarketFit(entity, context);
        analysis.marketAnalysis.push(marketFit);
      });
    } else {
      // Default market analysis
      const defaultContext = {
        marketType: 'general',
        competitionLevel: 'medium',
        demandLevel: 'medium',
        marketTrends: [],
        targetAudience: []
      };
      analysis.marketAnalysis.push(this.analyzeMarketFit(entity, defaultContext));
    }

    // Generate optimization recommendations
    analysis.optimization.recommendations = this.generateOptimizationRecommendations(entity);
    
    // Identify strategic advantages
    analysis.optimization.strategicAdvantages = this.identifyStrategicAdvantages(entity);

    return analysis;
  }

  /**
   * Generate optimization recommendations
   */
  generateOptimizationRecommendations(entity) {
    const recommendations = [];

    // RAG context optimization
    if (!entity.rag || !entity.rag.semanticContext) {
      recommendations.push({
        type: 'data-enhancement',
        priority: 'high',
        action: 'Generate RAG context for better AI-assisted analysis',
        impact: 'Enable precise market analysis and situation-based recommendations'
      });
    }

    // Capability documentation
    if (!entity.capabilities || entity.capabilities.length === 0) {
      recommendations.push({
        type: 'capability-documentation',
        priority: 'high',
        action: 'Document all capabilities to enable accurate market positioning',
        impact: 'Improve market fit analysis and opportunity identification'
      });
    }

    // Outcome documentation
    if (!entity.outcomes || entity.outcomes.length === 0) {
      recommendations.push({
        type: 'outcome-documentation',
        priority: 'medium',
        action: 'Document expected outcomes to demonstrate value proposition',
        impact: 'Strengthen market positioning and customer communication'
      });
    }

    return recommendations;
  }

  /**
   * Identify strategic advantages
   */
  identifyStrategicAdvantages(entity) {
    const advantages = [];

    if (entity.rag && entity.rag.keyConcepts && entity.rag.keyConcepts.length >= 10) {
      advantages.push({
        advantage: 'Rich semantic context',
        description: 'Well-documented for AI analysis and market positioning',
        value: 'high'
      });
    }

    if (entity.capabilities && entity.capabilities.length >= 5) {
      advantages.push({
        advantage: 'Diverse capability set',
        description: 'Multiple capabilities enable flexibility in market positioning',
        value: 'high'
      });
    }

    if (entity.rag && entity.rag.contextualExamples && entity.rag.contextualExamples.length >= 3) {
      advantages.push({
        advantage: 'Proven track record',
        description: 'Multiple real-world examples demonstrate reliability',
        value: 'medium'
      });
    }

    return advantages;
  }
}

