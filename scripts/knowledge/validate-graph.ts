import fs from 'fs';
import path from 'path';
import { KnowledgeGraph } from '../../src/lib/knowledge/types';

async function main() {
  const graphPath = path.join(process.cwd(), 'src/data/obrive-knowledge-graph.json');
  if (!fs.existsSync(graphPath)) {
    console.error('Graph not found:', graphPath);
    process.exit(1);
  }

  const graph: KnowledgeGraph = JSON.parse(fs.readFileSync(graphPath, 'utf-8'));
  
  let errors = 0;

  // Validate edges
  for (const edge of graph.edges) {
    if (!graph.entities[edge.from]) {
      console.error(`Edge from missing entity: ${edge.from}`);
      errors++;
    }
    
    // An edge might point to an unresolved entity which is fine if it was marked unresolved, 
    // but graph-builder shouldn't create active graph nodes for unresolved things unless explicitly wanted.
    // In our logic, unresolved edges point to targets that aren't in `graph.entities`.
    if (!graph.entities[edge.to] && edge.confidence !== 'unresolved') {
      console.error(`Edge to missing active entity: ${edge.to} (marked as ${edge.confidence})`);
      errors++;
    }

    if (!edge.provenance || edge.provenance.length === 0) {
      console.error(`Edge missing provenance: ${edge.from} -> ${edge.to}`);
      errors++;
    }

    if (!edge.confidence) {
      console.error(`Edge missing confidence: ${edge.from} -> ${edge.to}`);
      errors++;
    }
  }

  if (errors > 0) {
    console.error(`Validation FAILED with ${errors} errors.`);
    process.exit(1);
  } else {
    console.log('Graph validation passed.');
  }
}

main().catch(console.error);
