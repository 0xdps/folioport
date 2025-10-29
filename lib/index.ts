export { Builder } from './core/builder.js';
export { generateSEO, generateMetaTags } from './core/seo-generator.js';
export { generateSchema, generateSchemaTag } from './core/schema-generator.js';
export { optimizeAssets } from './core/asset-optimizer.js';
export { logger } from './utils/logger.js';
export { validateConfig, validateData, validateProjectName } from './utils/validators.js';
export * as fileUtils from './utils/file-utils.js';

// Re-export types for convenience
export type {
  PortfolioConfig,
  PortfolioData,
  Project,
  Experience,
  Education,
  Skill,
  Testimonial,
  BlogPost,
  ContactInfo,
  BuildOptions,
  DevOptions,
  InitOptions,
  ConfigLoadResult,
  SEOData,
  SchemaData
} from '../types/index.js';

