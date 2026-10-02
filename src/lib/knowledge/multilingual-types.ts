import type { LanguageCode } from '@config/languages';

// ─── Translation Status ────────────────────────────────────────────────────

export type TranslationStatus = 
  | 'translated'       // confirmed localized value from dictionary
  | 'missing'          // no translation found in dictionary
  | 'language_neutral' // value is inherently language-neutral (brand name, URL, email, etc.)
  | 'excluded';        // entity/locale is excluded (e.g. India)

// ─── Localized Field ────────────────────────────────────────────────────────

export interface LocalizedField {
  value: string | null;
  status: TranslationStatus;
  sourceKey?: string;        // English source key used for lookup
  dictFile?: string;         // e.g. "src/dictionaries/ar.json"
}

// ─── Localized Entity Representation ────────────────────────────────────────

export interface LocalizedEntityRepresentation {
  entityId: string;
  locale: LanguageCode;
  direction: 'ltr' | 'rtl';
  translationSource: {
    file: string;
    method: 'dictionary_lookup';
  };
  localizedName: LocalizedField;
  localizedDescription: LocalizedField;
  localizedDescription2?: LocalizedField;
  localizedHero?: {
    title: LocalizedField;
    description: LocalizedField;
    description2?: LocalizedField;
    ctaButtons?: {
      primary: LocalizedField;
      secondary: LocalizedField;
    };
  };
  localizedKeyBenefits?: Array<{
    title: LocalizedField;
    description: LocalizedField;
  }>;
  localizedProcessSteps?: Array<{
    step: string;
    title: LocalizedField;
    description: LocalizedField;
  }>;
  localizedServiceSections?: Array<{
    id: string;
    title: LocalizedField;
    subtitle?: LocalizedField;
    description: LocalizedField;
    items?: LocalizedField[];
    footer?: LocalizedField;
  }>;
  localizedFAQ?: {
    question: LocalizedField;
    answer: LocalizedField;
  };
  localizedCaseStudy?: {
    title: LocalizedField;
    overview?: LocalizedField;
    challenge?: LocalizedField;
    approach?: LocalizedField;
    outcome_snapshot?: LocalizedField;
    testimonial?: LocalizedField;
  };
  localizedBlog?: {
    title: LocalizedField;
  };
  localizedLabels?: Record<string, LocalizedField>;
  localizedSEO?: {
    title?: LocalizedField;
    description?: LocalizedField;
  };
  localizedCTA?: {
    primary?: LocalizedField;
    secondary?: LocalizedField;
  };
  sidebarLinks?: Array<{
    id: string;
    label: LocalizedField;
  }>;
  publicRoute?: string;
  canonicalUrl?: string;
  overallStatus: 'complete' | 'partial' | 'missing' | 'excluded';
  translatedCount: number;
  missingCount: number;
  languageNeutralCount: number;
}

// ─── Entity Localizations (all locales for one entity) ──────────────────────

export type EntityLocalizations = {
  [locale in LanguageCode]?: LocalizedEntityRepresentation;
};

// ─── Full Multilingual Knowledge Structure ──────────────────────────────────

export interface MultilingualKnowledge {
  schemaVersion: '5.0';
  generatedAt: string;
  canonicalEntityCount: number;
  localizedLocales: LanguageCode[];
  excludedLocales: string[];
  entityLocalizations: Record<string, EntityLocalizations>;
  countryLanguageMap: Record<string, {
    country: string;
    defaultLanguage: LanguageCode;
    supportedLanguages: LanguageCode[];
    hreflang: string;
    excluded: boolean;
  }>;
  indiaExcluded: boolean;
  summary: {
    totalEntityLocalizations: number;
    byLocale: Record<string, {
      total: number;
      complete: number;
      partial: number;
      missing: number;
    }>;
  };
}

// ─── Multilingual Query Result ───────────────────────────────────────────────

export interface MultilingualQueryResult {
  query: string;
  queryLocale: LanguageCode;
  intent: string;
  resolvedEntityIds: string[];
  localizedEntities: LocalizedEntityRepresentation[];
  relatedEntityIds: string[];
  sources: string[];
}
