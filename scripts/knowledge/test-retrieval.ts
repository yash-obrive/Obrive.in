import fs from 'fs';
import path from 'path';
import { RetrievalEngine } from '../../src/lib/knowledge/retrieval';

async function main() {
  const graphPath = path.join(process.cwd(), 'src/data/obrive-knowledge-graph.json');
  const dataPath = path.join(process.cwd(), 'src/data/internal-canonical-knowledge.json');
  
  if (!fs.existsSync(graphPath) || !fs.existsSync(dataPath)) {
    console.error('Graph or data not found');
    process.exit(1);
  }

  const graph = JSON.parse(fs.readFileSync(graphPath, 'utf-8'));
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const engine = new RetrievalEngine(graph, data.entities);

  const queries = [
    "What services does Obrive provide?",
    "What does Obrive's Augmented Reality service include?",
    "What are the capabilities of Obrive's AR service?",
    "Which industries/sectors are explicitly connected to AR Development?",
    "Which use cases are connected to AR Development?",
    "Which technologies are explicitly associated with AR Development?",
    "Which technical tools/platforms are mentioned in AR-related content?",
    "Which case studies are related to AR?",
    "Which FAQs are related to AR?",
    "What solutions does Obrive provide for Manufacturing?",
    "What products does Obrive offer?",
    "What is OBPARK?",
    "What does Obrive publicly say about OBCREW?",
    "What public pricing information exists?",
    "How can someone contact Obrive?"
  ];

  console.log("=========================================");
  console.log("1. EXECUTING 15 RETRIEVAL TEST QUERIES");
  console.log("=========================================\n");

  for (const q of queries) {
    const result = engine.retrieve(q);
    console.log(`QUERY: ${result.query}`);
    console.log(`INTENT: ${result.intent}`);
    console.log(`RESOLVED ENTITIES: ${result.resolvedEntities.join(', ')}`);
    console.log(`EDGES TRAVERSED: ${result.relationshipsTraversed.length}`);
    console.log(`RETRIEVED ENTITIES: ${result.entities.length}`);
    console.log(`SOURCES: ${result.sources.length}`);
    console.log(`UNRESOLVED: ${result.unresolvedRelationships.length}`);
    console.log("-----------------------------------------");
  }

  console.log("\n=========================================");
  console.log("2. ALL-SERVICES COMPLETENESS TEST");
  console.log("=========================================\n");

  const services = graph.indexes.byEntityType['service'] || [];
  console.log(`Testing ALL_RELATED_INFORMATION for ${services.length} services...`);

  for (const s of services) {
    const cleanS = s.includes(':') ? s.split(':').slice(1).join(':') : s;
    const phrase = cleanS.split('-').join(' ');
    // query-resolver fallback mapping "what is <service> all"
    const result = engine.retrieve(`tell me everything about ${phrase}`);
    
    // Check if it reached connected things
    const targetTypes = new Set(result.relationshipsTraversed.map(e => e.type));
    console.log(`[${s}] -> Found types: ${Array.from(targetTypes).join(', ') || 'none'}`);
  }
}

main().catch(console.error);
