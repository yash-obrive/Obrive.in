export type ConfidenceLevel = 'explicit' | 'strong' | 'supported' | 'ambiguous' | 'unresolved';

export type RelationshipProvenance = {
  sourceFile: string;
  sourcePath: string;
  originalValue: string;
  method: string;
};

export type GraphRelationship = {
  from: string;
  to: string;
  type: string; // e.g., "related-case-study", "related-industry"
  confidence: ConfidenceLevel;
  provenance: RelationshipProvenance[];
};

export type GraphEntity = {
  id: string;
  type: string;
  canonicalName: string;
  status: string;
};

export type KnowledgeGraph = {
  entities: Record<string, GraphEntity>;
  edges: GraphRelationship[];
  indexes: {
    bySourceEntity: Record<string, GraphRelationship[]>;
    byTargetEntity: Record<string, GraphRelationship[]>;
    byRelationshipType: Record<string, GraphRelationship[]>;
    byEntityType: Record<string, string[]>;
  };
};

export type QuestionIntent =
  | 'service_overview'
  | 'service_detail'
  | 'industry_overview'
  | 'product_overview'
  | 'use_case_overview'
  | 'technology_overview'
  | 'case_study_lookup'
  | 'faq_lookup'
  | 'pricing_lookup'
  | 'contact_lookup'
  | 'company_lookup'
  | 'relationship_lookup'
  | 'all_related_information'
  | 'unknown';

export type QueryResolution = {
  query: string;
  intent: QuestionIntent;
  entityCandidateIds: string[];
  confidence: ConfidenceLevel;
};

export type GraphTraversalOptions = {
  maxDepth: number;
  relationshipTypes?: string[];
  confidenceThreshold?: ConfidenceLevel[];
  entityTypeFilters?: string[];
  maxResults?: number;
};

export type RetrievalResult = {
  query: string;
  intent: QuestionIntent;
  resolvedEntities: string[];
  relationshipsTraversed: GraphRelationship[];
  entities: any[]; // Full canonical entities for final context
  sources: string[];
  unresolvedRelationships: RelationshipProvenance[];
};
