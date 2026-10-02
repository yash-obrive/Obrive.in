import { GraphEntity, GraphRelationship, KnowledgeGraph, RelationshipProvenance } from './types';

export class GraphBuilder {
  private entities: Record<string, GraphEntity> = {};
  private edges: GraphRelationship[] = [];
  
  private edgeMap: Map<string, GraphRelationship> = new Map();

  private safeResolveTarget(slug: string): string | null {
    if (this.entities[slug]) return slug;
    const prefixes = ['service', 'product', 'industry', 'use_case', 'technology', 'case_study', 'faq', 'blog', 'pricing_package', 'contact_info'];
    for (const p of prefixes) {
      if (this.entities[`${p}:${slug}`]) return `${p}:${slug}`;
    }
    return null;
  }

  private sourceToServiceMap: Record<string, string> = {
    '3d-design-development.ts': 'service:3d-design-development',
    'aeo-service.ts': 'service:aeo-service',
    'ai-consulting.ts': 'service:ai-consulting',
    'ar-development.ts': 'service:augmented-reality-development',
    'content-marketing-service.ts': 'service:content-marketing-service',
    'geo-service.ts': 'service:geo-service',
    'mixed-reality-development.ts': 'service:mixed-reality-development',
    'mobile-app-design-service.ts': 'service:mobile-app-design-service',
    'mobile-app-development.ts': 'service:mobile-app-development',
    'seo-service.ts': 'service:seo-service',
    'spatial-computing-development.ts': 'service:spatial-computing-app-development',
    'vr-development.ts': 'service:virtual-reality-development',
    'web-app-saas-mvp-development.ts': 'service:web-app-saas-mvp-development',
    'website-design-service.ts': 'service:website-design-service',
    'website-development-service.ts': 'service:website-development-service',
    'white-label-partnerships.ts': 'service:white-label-technology-partnerships'
  };

  build(canonicalEntities: any[]): KnowledgeGraph {
    for (const e of canonicalEntities) {
      this.entities[e.id] = {
        id: e.id,
        type: e.type,
        canonicalName: e.name || e.id,
        status: e.status
      };
    }

    for (const e of canonicalEntities) {
      if (e.status === 'excluded_from_obrive_com') continue;

      // 1. Consume existing canonical relationships
      if (Array.isArray(e.relationships)) {
        e.relationships.forEach((rel: any) => {
          let toId = rel.to || rel.target;
          if (!toId) return;
          const resolvedId = this.safeResolveTarget(toId);
          const confidence = resolvedId ? 'explicit' : 'unresolved';
          this.addEdge(e.id, resolvedId || toId, rel.type, {
            sourceFile: e.sourceRefs?.[0] || 'unknown',
            sourcePath: 'canonical_relationship',
            originalValue: toId,
            method: rel.method || 'explicit-canonical-relationship'
          }, confidence);
        });
      }

      // 2. Implicit Source File Linking
      if (Array.isArray(e.sourceRecords)) {
        e.sourceRecords.forEach((record: any) => {
          if (record.file && record.file.includes('src/constants/pages/services/')) {
            const basename = record.file.split('/').pop();
            const serviceId = this.sourceToServiceMap[basename];
            if (serviceId && this.entities[serviceId] && e.id !== serviceId) {
              // Bidirectional edge for completeness (usually child to parent)
              this.addEdge(e.id, serviceId, 'belongs-to-service', {
                sourceFile: record.file,
                sourcePath: record.path || 'implicit',
                originalValue: serviceId,
                method: 'implicit-source-file'
              }, 'explicit');
            }
          }
        });
      }

      this.extractUniversalRelationships(e);
      this.extractDocumentRelationships(e);
    }

    this.edges = Array.from(this.edgeMap.values());

    const indexes: KnowledgeGraph['indexes'] = {
      bySourceEntity: {},
      byTargetEntity: {},
      byRelationshipType: {},
      byEntityType: {}
    };

    for (const id in this.entities) {
      const type = this.entities[id].type;
      if (!indexes.byEntityType[type]) indexes.byEntityType[type] = [];
      indexes.byEntityType[type].push(id);
    }

    for (const edge of this.edges) {
      if (!indexes.bySourceEntity[edge.from]) indexes.bySourceEntity[edge.from] = [];
      indexes.bySourceEntity[edge.from].push(edge);

      if (!indexes.byTargetEntity[edge.to]) indexes.byTargetEntity[edge.to] = [];
      indexes.byTargetEntity[edge.to].push(edge);

      if (!indexes.byRelationshipType[edge.type]) indexes.byRelationshipType[edge.type] = [];
      indexes.byRelationshipType[edge.type].push(edge);
    }

    return {
      entities: this.entities,
      edges: this.edges,
      indexes
    };
  }

  private addEdge(from: string, to: string, type: string, provenance: RelationshipProvenance, confidence: 'explicit' | 'strong' | 'supported' | 'ambiguous' | 'unresolved') {
    const key = `${from}|${to}|${type}`;
    if (!this.edgeMap.has(key)) {
      this.edgeMap.set(key, {
        from,
        to,
        type,
        confidence,
        provenance: [provenance]
      });
    } else {
      const existing = this.edgeMap.get(key)!;
      existing.provenance.push(provenance);
      if (confidence === 'explicit' && existing.confidence !== 'explicit') {
        existing.confidence = 'explicit';
      }
    }
  }

  private extractUniversalRelationships(e: any) {
    const raw = e.content?.raw;
    if (!raw) return;
    const fromId = e.id;
    const sourceFile = e.sourceRefs?.[0] || 'unknown';

    const connectArray = (arr: any[], typeName: string) => {
      if (!Array.isArray(arr)) return;
      arr.forEach((item, index) => {
        let slug = typeof item === 'string' ? item : item.slug || item.id;
        if (!slug) return;
        const resolvedId = this.safeResolveTarget(slug);
        let confidence: 'explicit' | 'unresolved' = resolvedId ? 'explicit' : 'unresolved';

        this.addEdge(fromId, resolvedId || slug, `related-${typeName}`, {
          sourceFile,
          sourcePath: `content.raw.${typeName}s[${index}]`,
          originalValue: slug,
          method: 'explicit-structured-field'
        }, confidence);
      });
    };

    connectArray(raw.industries, 'industry');
    connectArray(raw.useCases, 'use_case');
    connectArray(raw.technologies, 'technology');
    connectArray(raw.products, 'product');
    connectArray(raw.services, 'service');
    connectArray(raw.caseStudies, 'case_study');
    
    if (Array.isArray(raw.faqs)) {
      raw.faqs.forEach((faq: any, i: number) => {
        if (faq.id) {
          const resolvedId = this.safeResolveTarget(faq.id);
          if (resolvedId) {
            this.addEdge(fromId, resolvedId, 'related-faq', {
              sourceFile,
              sourcePath: `content.raw.faqs[${i}]`,
              originalValue: faq.id,
              method: 'explicit-structured-field'
            }, 'explicit');
          }
        }
      });
    }
  }

  private extractDocumentRelationships(e: any) {
    // For case studies or documents that have singular links
    const raw = e.content?.raw;
    if (!raw) return;
    const fromId = e.id;
    const sourceFile = e.sourceRefs?.[0] || 'unknown';

    if (raw.service && !Array.isArray(raw.service)) {
      const slug = raw.service.slug || raw.service;
      const resolvedId = this.safeResolveTarget(slug);
      const confidence = resolvedId ? 'explicit' : 'unresolved';
      this.addEdge(fromId, resolvedId || slug, 'related-service', {
        sourceFile,
        sourcePath: 'content.raw.service',
        originalValue: slug,
        method: 'document-frontmatter'
      }, confidence);
    }
    
    if (raw.industry && !Array.isArray(raw.industry)) {
      const slug = raw.industry.slug || raw.industry;
      const resolvedId = this.safeResolveTarget(slug);
      const confidence = resolvedId ? 'explicit' : 'unresolved';
      this.addEdge(fromId, resolvedId || slug, 'related-industry', {
        sourceFile,
        sourcePath: 'content.raw.industry',
        originalValue: slug,
        method: 'document-frontmatter'
      }, confidence);
    }
  }
}
