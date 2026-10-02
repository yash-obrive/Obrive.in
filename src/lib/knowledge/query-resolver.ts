import { KnowledgeGraph, QueryResolution, QuestionIntent } from './types';

export class QueryResolver {
  constructor(private graph: KnowledgeGraph) {}

  resolve(query: string): QueryResolution {
    const q = query.toLowerCase();
    let intent: QuestionIntent = 'unknown';
    
    // Simple heuristic intent classification
    if (q.includes('all') || q.includes('everything') || q.includes('related to') || q.includes('tell me everything')) {
      intent = 'all_related_information';
    } else if (q.includes('price') || q.includes('cost') || q.includes('pricing')) {
      intent = 'pricing_lookup';
    } else if (q.includes('contact') || q.includes('reach') || q.includes('get in touch')) {
      intent = 'contact_lookup';
    } else if (q.includes('service') || q.includes('offer')) {
      intent = 'service_overview';
    } else if (q.includes('product') || q.includes('software')) {
      intent = 'product_overview';
    } else if (q.includes('industry') || q.includes('sector')) {
      intent = 'industry_overview';
    } else if (q.includes('technology') || q.includes('tech') || q.includes('tools')) {
      intent = 'technology_overview';
    } else if (q.includes('case study') || q.includes('example') || q.includes('work')) {
      intent = 'case_study_lookup';
    } else if (q.includes('faq') || q.includes('questions')) {
      intent = 'faq_lookup';
    } else if (q.includes('use case') || q.includes('applications')) {
      intent = 'use_case_overview';
    } else if (q.includes('what is') || q.includes('who is') || q.includes('about')) {
      intent = 'company_lookup';
    } else if (q.includes('connected to') || q.includes('associated with') || q.includes('related to')) {
      intent = 'relationship_lookup';
    }

    if (intent === 'unknown' && q.includes('what')) {
      intent = 'all_related_information'; // fallback to retrieving everything about the matched entity
    }

    const entityCandidateIds: string[] = [];
    
    // Try to match canonical entities in the query
    for (const [id, entity] of Object.entries(this.graph.entities)) {
      if (eMatch(id, q)) {
        entityCandidateIds.push(id);
      }
    }
    
    // Also support exact match lookups for specific terms if no exact ID matched
    if (entityCandidateIds.length === 0) {
      if (q.includes('augmented reality') || q.includes(' ar ')) {
        entityCandidateIds.push('augmented-reality-development');
      }
      if (q.includes('virtual reality') || q.includes(' vr ')) {
        entityCandidateIds.push('virtual-reality-development');
      }
      if (q.includes('obpark')) entityCandidateIds.push('obpark');
      if (q.includes('obnest')) entityCandidateIds.push('obnest');
      if (q.includes('obnavi')) entityCandidateIds.push('obnavi');
      if (q.includes('obmove')) entityCandidateIds.push('obmove');
      if (q.includes('obcrew')) entityCandidateIds.push('obcrew');
      if (q.includes('manufacturing')) entityCandidateIds.push('manufacturing-industrial-engineering');
    }
    
    // For general listing queries
    if (entityCandidateIds.length === 0 && q.includes('services')) {
      // Just fallback to listing all services if intent is service_overview
      // We handle this loosely, an empty array might just mean "traverse the root" or "list all"
    }

    return {
      query,
      intent,
      entityCandidateIds: Array.from(new Set(entityCandidateIds)),
      confidence: entityCandidateIds.length > 0 ? 'strong' : 'ambiguous'
    };
  }
}

function eMatch(id: string, q: string): boolean {
  const slug = id.includes(':') ? id.split(':').slice(1).join(':') : id;
  if (slug.length <= 2 && !q.includes(` ${slug} `)) return false;

  try {
    const phrase = slug.split('-').join(' ');
    // Does the query contain the phrase?
    const phraseRegex = new RegExp(`\\b${phrase}\\b`, 'i');
    if (phraseRegex.test(q)) return true;
    
    // Check if the query phrase minus 'development' or 'service' matches
    const shortPhrase = phrase.replace(/\b(development|service|services|app|application)\b/gi, '').trim();
    if (shortPhrase.length > 3) {
       const shortRegex = new RegExp(`\\b${shortPhrase}\\b`, 'i');
       if (shortRegex.test(q)) return true;
    }
  } catch (e) {
  }
  
  return false;
}
