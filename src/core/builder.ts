import fs from 'fs-extra';
import path from 'path';
import Handlebars from 'handlebars';
import { minify } from 'html-minifier-terser';
import { optimizeAssets } from './asset-optimizer.js';
import { generateSEO, generateMetaTags } from './seo-generator.js';
import { generateSchema, generateSchemaTag } from './schema-generator.js';
import type { PortfolioConfig, PortfolioData, BuildOptions, InternalBuildOptions } from '../types/index.js';

export class Builder {
  private config: PortfolioConfig;
  private data: PortfolioData;
  private options: InternalBuildOptions;

  constructor(config: PortfolioConfig, data: PortfolioData, options: BuildOptions = {}) {
    this.config = config;
    this.data = data;
    this.options = {
      output: 'dist',
      minify: true,
      clean: false,
      ...options
    };
  }
  
  async build() {
    const cwd = process.cwd();
    const outputDir = path.join(cwd, this.options.output);
    
    // Clean output directory if requested
    if (this.options.clean) {
      await fs.remove(outputDir);
    }
    
    await fs.ensureDir(outputDir);
    
    // Register Handlebars helpers
    this.registerHelpers();
    
    // Register partials if they exist
    await this.registerPartials(cwd);
    
    // Compile template
    const templatePath = path.join(cwd, 'index.hbs');
    if (!await fs.pathExists(templatePath)) {
      throw new Error('Template file index.hbs not found');
    }
    
    const templateSource = await fs.readFile(templatePath, 'utf-8');
    const template = Handlebars.compile(templateSource);
    
    // Generate SEO and schema data
    const seoData = generateSEO(this.config, this.data);
    const schemaData = generateSchema(this.config, this.data);
    
    // Generate HTML
    const html = template({
      ...this.data,
      config: this.config,
      meta: seoData,
      metaTags: generateMetaTags(seoData),
      schema: schemaData,
      schemaTag: generateSchemaTag(schemaData)
    });
    
    // Minify HTML if requested
    let finalHtml = html;
    if (this.options.minify) {
      finalHtml = await minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: false,
        keepClosingSlash: true
      });
    }
    
    await fs.writeFile(path.join(outputDir, 'index.html'), finalHtml);
    
    // Copy and optimize assets
    await this.buildAssets(cwd, outputDir);
    
    // Generate sitemap
    await this.generateSitemap(outputDir);
    
    // Generate robots.txt
    await this.generateRobotsTxt(outputDir);
    
    // Copy public files
    await this.copyPublicFiles(cwd, outputDir);
  }
  
  async buildAssets(cwd: string, outputDir: string): Promise<void> {
    const assetsDir = path.join(cwd, 'assets');
    if (!await fs.pathExists(assetsDir)) {
      return;
    }
    
    const outputAssetsDir = path.join(outputDir, 'assets');
    await fs.ensureDir(outputAssetsDir);
    
    // Optimize CSS/JS
    if (this.options.minify) {
      await optimizeAssets(assetsDir, outputAssetsDir);
    } else {
      await fs.copy(assetsDir, outputAssetsDir);
    }
  }
  
  async generateSitemap(outputDir: string): Promise<void> {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${this.config.site?.url || this.config.url || ''}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    
    await fs.writeFile(path.join(outputDir, 'sitemap.xml'), sitemap);
  }
  
  async generateRobotsTxt(outputDir: string): Promise<void> {
    const robots = `User-agent: *
Allow: /

Sitemap: ${this.config.site?.url || this.config.url || ''}/sitemap.xml
`;
    
    await fs.writeFile(path.join(outputDir, 'robots.txt'), robots);
  }
  
  async copyPublicFiles(cwd: string, outputDir: string): Promise<void> {
    const publicDir = path.join(cwd, 'public');
    if (await fs.pathExists(publicDir)) {
      await fs.copy(publicDir, outputDir);
    }
  }
  
  async registerPartials(cwd: string): Promise<void> {
    const partialsDir = path.join(cwd, 'partials');
    if (!await fs.pathExists(partialsDir)) {
      return;
    }
    
    const files = await fs.readdir(partialsDir);
    for (const file of files) {
      if (file.endsWith('.hbs')) {
        const name = path.basename(file, '.hbs');
        const content = await fs.readFile(path.join(partialsDir, file), 'utf-8');
        Handlebars.registerPartial(name, content);
      }
    }
  }
  
  registerHelpers() {
    // Chip helper for tech tags
    Handlebars.registerHelper('chip', function(text) {
      return new Handlebars.SafeString(`<span class="tech-chip">${text}</span>`);
    });
    
    // Current year
    Handlebars.registerHelper('year', function() {
      return new Date().getFullYear();
    });
    
    // Format date
    Handlebars.registerHelper('date', function(date) {
      if (!date) return new Date().toLocaleDateString();
      return new Date(date).toLocaleDateString();
    });
    
    // Conditional helpers
    Handlebars.registerHelper('ifEquals', (arg1: any, arg2: any, options: any) => {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });
    
    Handlebars.registerHelper('ifNotEmpty', (arg: any, options: any) => {
      return (arg && arg.length > 0) ? options.fn(this) : options.inverse(this);
    });
    
    // JSON stringify for debugging
    Handlebars.registerHelper('json', function(context) {
      return JSON.stringify(context, null, 2);
    });
    
    // Loop with index
    Handlebars.registerHelper('times', function(n, options) {
      let result = '';
      for (let i = 0; i < n; i++) {
        result += options.fn(i);
      }
      return result;
    });
  }
}

