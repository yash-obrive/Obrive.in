import fs from 'fs';
import path from 'path';
import { GraphBuilder } from '../../src/lib/knowledge/graph-builder';

async function main() {
  const dataPath = path.join(process.cwd(), 'src/data/internal-canonical-knowledge.json');
  const outPath = path.join(process.cwd(), 'src/data/obrive-knowledge-graph.json');

  console.log('Loading canonical dataset from:', dataPath);
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const entities = data.entities || [];

  console.log(`Loaded ${entities.length} canonical entities.`);

  const builder = new GraphBuilder();
  const graph = builder.build(entities);

  console.log(`Graph built.
- Graph Entities: ${Object.keys(graph.entities).length}
- Logical Canonical Edges: ${graph.edges.length}
- Reverse-indexed Edge References: ${Object.values(graph.indexes.byTargetEntity).reduce((a, b) => a + b.length, 0)}
`);

  fs.writeFileSync(outPath, JSON.stringify(graph, null, 2));
  console.log('Knowledge graph saved to:', outPath);
}

main().catch(console.error);
