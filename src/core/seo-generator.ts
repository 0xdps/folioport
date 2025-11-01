import type { PortfolioConfig, PortfolioData, SEOData } from '../types/index.js';

export function generateSEO(config: PortfolioConfig, data: PortfolioData): SEOData {
  const { site, social, seo = {} } = config;
  const { hero } = data as any; // Using any for now since data structure varies
  
  return {
    title: site?.title || `${hero?.name || config.name} Portfolio`,
    description: site?.description || hero?.description || config.description || '',
    url: site?.url || config.url,
    ogImage: seo.image || `${site?.url || config.url}/assets/og-image.jpg`,
    keywords: seo.keywords || [],
    twitterCard: 'summary_large_image',
    twitterSite: social?.twitter ? `@${social.twitter}` : undefined,
    language: site?.language || 'en',
    favicon: site?.favicon || 'favicon.svg'
  };
}

export function generateMetaTags(seoData: SEOData): string {
  return `
    <!-- Primary Meta Tags -->
    <title>${seoData.title}</title>
    <meta name="title" content="${seoData.title}">
    <meta name="description" content="${seoData.description}">
    ${seoData.keywords.length > 0 ? `<meta name="keywords" content="${seoData.keywords.join(', ')}">` : ''}

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${seoData.url}">
    <meta property="og:title" content="${seoData.title}">
    <meta property="og:description" content="${seoData.description}">
    <meta property="og:image" content="${seoData.ogImage}">

    <!-- Twitter -->
    <meta property="twitter:card" content="${seoData.twitterCard}">
    <meta property="twitter:url" content="${seoData.url}">
    <meta property="twitter:title" content="${seoData.title}">
    <meta property="twitter:description" content="${seoData.description}">
    <meta property="twitter:image" content="${seoData.ogImage}">
    ${seoData.twitterSite ? `<meta property="twitter:site" content="${seoData.twitterSite}">` : ''}
  `.trim();
}

