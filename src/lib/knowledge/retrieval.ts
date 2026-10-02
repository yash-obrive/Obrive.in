import { GraphTraversal } from './graph-traversal';
import { QueryResolver } from './query-resolver';
import { GraphRelationship, KnowledgeGraph, RelationshipProvenance, RetrievalResult } from './types';

export class RetrievalEngine {
  private traversal: GraphTraversal;
  private resolver: QueryResolver;
  
  // We need the full raw canonical entities to append to the result
  constructor(private graph: KnowledgeGraph, private rawCanonicalEntities: any[]) {
    this.traversal = new GraphTraversal(graph);
    this.resolver = new QueryResolver(graph);
  }

  retrieve(query: string): RetrievalResult {
    const resolution = this.resolver.resolve(query);
    
    const allTraversedEdges: GraphRelationship[] = [];
    const allResolvedEntities = new Set<string>();
    const allFullEntities: any[] = [];
    const sources = new Set<string>();
    const unresolved: RelationshipProvenance[] = [];

    // Depending on intent, we might limit depth.
    // all_related_information means we want depth 1 to get all explicit connections.
    let maxDepth = 1;
    if (resolution.intent === 'relationship_lookup') maxDepth = 2; // Maybe want deeper connections

    for (const entityId of resolution.entityCandidateIds) {
      const { edges, entities } = this.traversal.traverse(entityId, {
        maxDepth,
        confidenceThreshold: ['explicit', 'strong', 'supported']
      });

      edges.forEach(e => allTraversedEdges.push(e));
      entities.forEach(e => allResolvedEntities.add(e));
    }
    
    // If no candidate matched, but it's a general lookup (e.g. "What services does Obrive provide?")
    if (resolution.entityCandidateIds.length === 0) {
       if (resolution.intent === 'service_overview') {
          // Add all services
          const services = this.graph.indexes.byEntityType['service'] || [];
          services.forEach(s => allResolvedEntities.add(s));
       } else if (resolution.intent === 'product_overview') {
          const products = this.graph.indexes.byEntityType['product'] || [];
          products.forEach(p => allResolvedEntities.add(p));
       }
    }

    for (const entityId of Array.from(allResolvedEntities)) {
      const fullEntity = this.rawCanonicalEntities.find(e => e.id === entityId);
      if (fullEntity) {
        allFullEntities.push(fullEntity);
        if (fullEntity.sourceRefs) {
          fullEntity.sourceRefs.forEach((ref: string) => sources.add(ref));
        }
      }
    }

    return {
      query,
      intent: resolution.intent,
      resolvedEntities: Array.from(allResolvedEntities),
      relationshipsTraversed: allTraversedEdges,
      entities: allFullEntities,
      sources: Array.from(sources),
      unresolvedRelationships: unresolved
    };
  }
}
