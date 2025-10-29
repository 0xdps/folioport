import type { PortfolioConfig, PortfolioData, SchemaData } from '../../types/index.js';

export function generateSchema(config: PortfolioConfig, data: PortfolioData): SchemaData {
  const { site, social } = config;
  const { hero, about } = data as any; // Using any for now since data structure varies
  
  const schema: SchemaData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: hero?.name || config.name,
    url: site?.url || config.url,
    email: hero?.email || config.author?.email,
    jobTitle: hero?.tagline,
    description: about?.paragraphs?.[0] || hero?.description || config.description,
    knowsAbout: about?.skills || []
  };

  // Add social media links
  if (social) {
    const sameAs: string[] = [];
    
    if (social.github) {
      sameAs.push(`https://github.com/${social.github}`);
    }
    if (social.linkedin) {
      sameAs.push(`https://linkedin.com/in/${social.linkedin}`);
    }
    if (social.twitter) {
      sameAs.push(`https://twitter.com/${social.twitter}`);
    }
    if (social.medium) {
      sameAs.push(`https://medium.com/@${social.medium}`);
    }
    
    if (sameAs.length > 0) {
      schema.sameAs = sameAs;
    }
  }

  return schema;
}

export function generateSchemaTag(schema: SchemaData): string {
  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

