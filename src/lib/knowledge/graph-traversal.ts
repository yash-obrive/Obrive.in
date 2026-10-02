import { GraphRelationship, GraphTraversalOptions, KnowledgeGraph } from './types';

export class GraphTraversal {
  constructor(private graph: KnowledgeGraph) {}

  traverse(startEntityId: string, options: GraphTraversalOptions): { edges: GraphRelationship[], entities: string[] } {
    const visitedEdges = new Set<string>();
    const visitedEntities = new Set<string>();
    const resultEdges: GraphRelationship[] = [];
    const resultEntities: string[] = [];
    
    // Safety against missing entity
    if (!this.graph.entities[startEntityId]) {
      return { edges: [], entities: [] };
    }

    const queue: { id: string, depth: number }[] = [{ id: startEntityId, depth: 0 }];
    visitedEntities.add(startEntityId);
    resultEntities.push(startEntityId);

    const confThreshold = options.confidenceThreshold || ['explicit', 'strong', 'supported'];

    while (queue.length > 0) {
      // Respect maxResults
      if (options.maxResults && resultEntities.length >= options.maxResults) {
        break;
      }

      const { id, depth } = queue.shift()!;

      if (depth >= options.maxDepth) continue;

      // Find all outgoing edges
      const forwardEdges = this.graph.indexes.bySourceEntity[id] || [];
      // Find all incoming edges (reverse traversal)
      const backwardEdges = this.graph.indexes.byTargetEntity[id] || [];

      // Unified edge processing
      const processEdges = (edges: GraphRelationship[], isReverse: boolean) => {
        for (const edge of edges) {
          if (!confThreshold.includes(edge.confidence)) continue;

          // In standard directional filtering, we might care about edge types.
          // Since we are traversing backwards too, we just ensure the edge logic is preserved.
          if (options.relationshipTypes && !options.relationshipTypes.includes(edge.type)) {
            continue;
          }

          const targetId = isReverse ? edge.from : edge.to;
          
          if (options.entityTypeFilters && this.graph.entities[targetId]) {
             if (!options.entityTypeFilters.includes(this.graph.entities[targetId].type)) {
                continue;
             }
          }

          const edgeKey = `${edge.from}|${edge.to}|${edge.type}`;
          
          if (!visitedEdges.has(edgeKey)) {
            visitedEdges.add(edgeKey);
            resultEdges.push(edge);
          }

          if (!visitedEntities.has(targetId)) {
            visitedEntities.add(targetId);
            resultEntities.push(targetId);
            queue.push({ id: targetId, depth: depth + 1 });
          }
        }
      };

      processEdges(forwardEdges, false);
      processEdges(backwardEdges, true);
    }

    return {
      edges: resultEdges,
      entities: resultEntities
    };
  }
}
