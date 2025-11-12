/**
 * AI Assistant for Entity Analysis
 * 
 * Provides AI/LLM-assisted analysis, summaries, and recommendations
 * to help entities understand their capabilities and market position.
 */

export class AIAssistant {
  constructor(ragGenerator, marketAnalyzer) {
    this.ragGenerator = ragGenerator;
    this.marketAnalyzer = marketAnalyzer;
  }

  /**
   * Generate comprehensive entity summary with AI insights
   */
  generateEntitySummary(entity, options = {}) {
    const {
      includeMarketAnalysis = true,
      includeForecasting = true,
      includeRecommendations = true,
      marketContext = null
    } = options;

    const summary = {
      entity: {
        id: entity.id || entity.title,
        title: entity.title || entity.name,
        type: entity.type || 'service'
      },
      coreIdentity: {
        what: entity.rag?.learnableSummary || 'No summary available',
        purpose: entity.purpose || 'Not specified',
        capabilities: entity.capabilities?.map(c => 
          typeof c === 'string' ? c : c.capability || c.ability
        ) || [],
        outcomes: entity.outcomes?.map(o => 
          typeof o === 'string' ? o : o.result
        ) || []
      },
      marketPosition: null,
      forecasting: null,
      recommendations: [],
      insights: [],
      neverSeenBefore: []
    };

    // Generate RAG context if missing
    if (!entity.rag) {
      try {
        let ragContext;
        if (entity.type === 'resource' || entity.category) {
          ragContext = this.ragGenerator.generateResourceContext(entity);
        } else if (entity.category && entity.category.includes('service')) {
          ragContext = this.ragGenerator.generateServiceContext(entity);
        }
        
        if (ragContext) {
          entity.rag = ragContext;
        }
      } catch (e) {
        console.warn('Could not generate RAG context:', e.message);
      }
    }

    // Market analysis
    if (includeMarketAnalysis && marketContext) {
      const marketFit = this.marketAnalyzer.analyzeMarketFit(entity, marketContext);
      summary.marketPosition = {
        fitScore: marketFit.marketFit.score,
        strengths: marketFit.marketFit.strengths,
        opportunities: marketFit.marketFit.opportunities,
        uniqueValue: marketFit.marketPositioning.uniqueValue
      };
    }

    // Forecasting
    if (includeForecasting && marketContext) {
      const marketFit = this.marketAnalyzer.analyzeMarketFit(entity, marketContext);
      summary.forecasting = {
        demandProjection: marketFit.forecasting.demandProjection,
        growthPotential: marketFit.forecasting.growthPotential,
        timeframe: marketFit.forecasting.growthPotential.timeframe
      };
    }

    // Generate insights
    summary.insights = this.generateInsights(entity);

    // Generate "never seen before" perspectives
    summary.neverSeenBefore = this.generateNovelPerspectives(entity);

    // Recommendations
    if (includeRecommendations) {
      summary.recommendations = this.generateAIRecommendations(entity, summary);
    }

    return summary;
  }

  /**
   * Generate AI insights about entity
   */
  generateInsights(entity) {
    const insights = [];

    // Capability insights
    if (entity.capabilities && entity.capabilities.length > 0) {
      const uniqueCombinations = this.findUniqueCapabilityCombinations(entity);
      if (uniqueCombinations.length > 0) {
        insights.push({
          type: 'capability-combination',
          insight: `Unique combination of capabilities: ${uniqueCombinations.join(', ')}`,
          value: 'This combination may be rare in the market, creating competitive advantage'
        });
      }
    }

    // Outcome insights
    if (entity.outcomes && entity.outcomes.length > 0) {
      insights.push({
        type: 'outcome-value',
        insight: `Produces ${entity.outcomes.length} distinct outcomes`,
        value: 'Multiple outcomes increase value proposition and market appeal'
      });
    }

    // Use case insights
    if (entity.useCases && entity.useCases.length > 0) {
      const frequency = entity.useCases.map(uc => 
        typeof uc === 'string' ? uc : uc.frequency
      );
      const mostCommon = frequency.filter(f => f === 'daily' || f === 'weekly').length;
      
      if (mostCommon > 0) {
        insights.push({
          type: 'use-frequency',
          insight: `High-frequency use cases indicate strong market demand`,
          value: 'Regular use suggests stable revenue potential'
        });
      }
    }

    return insights;
  }

  /**
   * Find unique capability combinations
   */
  findUniqueCapabilityCombinations(entity) {
    if (!entity.capabilities || entity.capabilities.length < 2) {
      return [];
    }

    const capabilities = entity.capabilities.map(c => 
      typeof c === 'string' ? c : c.capability || c.ability
    );

    // Find pairs that might be unique
    const combinations = [];
    for (let i = 0; i < capabilities.length - 1; i++) {
      for (let j = i + 1; j < capabilities.length; j++) {
        combinations.push(`${capabilities[i]} + ${capabilities[j]}`);
      }
    }

    return combinations.slice(0, 3);
  }

  /**
   * Generate novel perspectives (ways entity has never been seen before)
   */
  generateNovelPerspectives(entity) {
    const perspectives = [];

    // Cross-domain application
    if (entity.useCases && entity.useCases.length > 0) {
      const domains = this.extractDomains(entity.useCases);
      if (domains.length >= 2) {
        perspectives.push({
          perspective: `Cross-domain applicability: ${domains.join(' and ')}`,
          description: 'This entity can be applied across multiple domains, creating unique market positioning',
          value: 'Expands addressable market and reduces dependency on single domain'
        });
      }
    }

    // Capability stacking
    if (entity.capabilities && entity.capabilities.length >= 3) {
      perspectives.push({
        perspective: 'Capability stacking potential',
        description: 'Multiple capabilities can be combined for compound value creation',
        value: 'Enables premium pricing and unique value propositions'
      });
    }

    // Outcome multiplication
    if (entity.outcomes && entity.outcomes.length >= 3) {
      perspectives.push({
        perspective: 'Outcome multiplication effect',
        description: 'Single application produces multiple valuable outcomes',
        value: 'Increases customer ROI and competitive differentiation'
      });
    }

    // Relationship leverage
    if (entity.rag && entity.rag.relatedEntities && entity.rag.relatedEntities.length > 0) {
      perspectives.push({
        perspective: 'Relationship leverage opportunity',
        description: 'Can leverage relationships with other entities for expanded capabilities',
        value: 'Enables ecosystem positioning and partnership opportunities'
      });
    }

    return perspectives;
  }

  /**
   * Extract domains from use cases
   */
  extractDomains(useCases) {
    const domainKeywords = {
      'residential': ['home', 'house', 'residential', 'domestic'],
      'commercial': ['commercial', 'business', 'office', 'retail'],
      'industrial': ['industrial', 'manufacturing', 'factory', 'production'],
      'digital': ['digital', 'online', 'web', 'software', 'app'],
      'healthcare': ['health', 'medical', 'hospital', 'clinic'],
      'education': ['education', 'school', 'learning', 'training']
    };

    const foundDomains = new Set();
    
    useCases.forEach(uc => {
      const scenario = typeof uc === 'string' ? uc : uc.scenario;
      Object.keys(domainKeywords).forEach(domain => {
        if (domainKeywords[domain].some(keyword => 
          scenario.toLowerCase().includes(keyword)
        )) {
          foundDomains.add(domain);
        }
      });
    });

    return Array.from(foundDomains);
  }

  /**
   * Generate AI-powered recommendations
   */
  generateAIRecommendations(entity, summary) {
    const recommendations = [];

    // Data completeness
    if (!entity.rag || !entity.rag.semanticContext) {
      recommendations.push({
        type: 'data-enhancement',
        priority: 'critical',
        action: 'Generate complete RAG context',
        reason: 'Enables AI-assisted analysis and market positioning',
        impact: 'Unlocks full potential for AI-powered insights and recommendations'
      });
    }

    // Market positioning
    if (summary.marketPosition && summary.marketPosition.fitScore < 70) {
      recommendations.push({
        type: 'market-positioning',
        priority: 'high',
        action: 'Refine market positioning to improve fit score',
        reason: `Current fit score: ${summary.marketPosition.fitScore}/100`,
        impact: 'Better market alignment increases opportunity capture'
      });
    }

    // Capability expansion
    if (summary.coreIdentity.capabilities.length < 3) {
      recommendations.push({
        type: 'capability-expansion',
        priority: 'medium',
        action: 'Document and expand capability set',
        reason: 'More capabilities increase market flexibility',
        impact: 'Enables positioning in multiple market segments'
      });
    }

    // Novel perspective leverage
    if (summary.neverSeenBefore.length > 0) {
      recommendations.push({
        type: 'strategic-leverage',
        priority: 'high',
        action: 'Leverage unique perspectives for market differentiation',
        reason: `Found ${summary.neverSeenBefore.length} novel perspectives`,
        impact: 'Creates competitive advantage and unique market position'
      });
    }

    return recommendations;
  }

  /**
   * Analyze entity for specific situation
   */
  analyzeForSituation(entity, situation) {
    const projection = this.marketAnalyzer.projectForSituation(entity, situation);
    
    const analysis = {
      situation: situation.context,
      entity: {
        id: entity.id || entity.title,
        title: entity.title || entity.name
      },
      fit: projection.fit,
      projectedOutcomes: projection.projectedOutcomes,
      recommendations: projection.recommendations,
      aiInsights: this.generateSituationInsights(entity, situation, projection)
    };

    return analysis;
  }

  /**
   * Generate insights for specific situation
   */
  generateSituationInsights(entity, situation, projection) {
    const insights = [];

    if (projection.fit.score >= 80) {
      insights.push({
        type: 'high-fit',
        insight: 'Entity is exceptionally well-suited for this situation',
        confidence: 'high',
        reasoning: `Can handle ${projection.fit.canHandle.length} of ${situation.requirements.length} requirements directly`
      });
    }

    if (entity.rag && entity.rag.contextualExamples) {
      const relevantExamples = entity.rag.contextualExamples.filter(ex => 
        ex.scenario.toLowerCase().includes(situation.context.toLowerCase().substring(0, 20))
      );
      
      if (relevantExamples.length > 0) {
        insights.push({
          type: 'proven-track-record',
          insight: 'Has proven success in similar situations',
          confidence: 'high',
          reasoning: `Found ${relevantExamples.length} relevant examples`
        });
      }
    }

    if (projection.fit.adaptations.length > 0) {
      insights.push({
        type: 'adaptation-needed',
        insight: 'Minor adaptations can improve fit',
        confidence: 'medium',
        reasoning: projection.fit.adaptations[0].gap
      });
    }

    return insights;
  }

  /**
   * Generate market forecast with precision
   */
  generatePrecisionForecast(entity, marketContext, timeframe = '12 months') {
    const marketFit = this.marketAnalyzer.analyzeMarketFit(entity, marketContext);
    
    const forecast = {
      entity: {
        id: entity.id || entity.title,
        title: entity.title || entity.name
      },
      timeframe: timeframe,
      marketContext: {
        type: marketContext.marketType,
        demand: marketContext.demandLevel,
        competition: marketContext.competitionLevel
      },
      projections: {
        demand: marketFit.forecasting.demandProjection,
        growth: marketFit.forecasting.growthPotential,
        marketFit: marketFit.marketFit.score,
        opportunities: marketFit.marketFit.opportunities.length
      },
      precision: {
        confidence: this.calculateConfidence(entity, marketContext),
        factors: this.identifyForecastFactors(entity, marketContext),
        risks: marketFit.forecasting.riskFactors
      },
      recommendations: marketFit.forecasting.recommendations
    };

    return forecast;
  }

  /**
   * Calculate forecast confidence
   */
  calculateConfidence(entity, marketContext) {
    let confidence = 50; // Base confidence

    // More data = higher confidence
    if (entity.rag && entity.rag.semanticContext) confidence += 15;
    if (entity.capabilities && entity.capabilities.length >= 3) confidence += 10;
    if (entity.outcomes && entity.outcomes.length >= 2) confidence += 10;
    if (entity.rag && entity.rag.contextualExamples && entity.rag.contextualExamples.length >= 2) confidence += 15;

    // Market context clarity
    if (marketContext.demandLevel && marketContext.competitionLevel) confidence += 10;

    return Math.min(100, confidence);
  }

  /**
   * Identify factors affecting forecast
   */
  identifyForecastFactors(entity, marketContext) {
    const factors = [];

    if (entity.capabilities && entity.capabilities.length >= 5) {
      factors.push({
        factor: 'Diverse capability set',
        impact: 'positive',
        weight: 'high'
      });
    }

    if (marketContext.demandLevel === 'very-high') {
      factors.push({
        factor: 'Very high market demand',
        impact: 'positive',
        weight: 'high'
      });
    }

    if (marketContext.competitionLevel === 'high') {
      factors.push({
        factor: 'High competition',
        impact: 'negative',
        weight: 'medium'
      });
    }

    if (entity.rag && entity.rag.contextualExamples && entity.rag.contextualExamples.length === 0) {
      factors.push({
        factor: 'Limited proven track record',
        impact: 'negative',
        weight: 'medium'
      });
    }

    return factors;
  }
}

