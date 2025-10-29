import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { Builder } from '../core/builder.js';
import { logger } from '../utils/logger.js';
import { validateConfig, validateData } from '../utils/validators.js';
import { loadConfig } from '../utils/config-loader.js';
import type { BuildOptions } from '../../types/index.js';

export async function buildCommand(options: BuildOptions = {}): Promise<void> {
  const spinner = ora('Building portfolio...').start();
  
  try {
    const cwd = process.cwd();
    
    // Load config (supports JSON, YAML, TOML)
    spinner.text = 'Loading configuration...';
    let configResult;
    try {
      if (options.config && options.config !== 'portfolio.config.json') {
        // Custom config path provided
        const configPath = path.join(cwd, options.config);
        if (!await fs.pathExists(configPath)) {
          spinner.fail(chalk.red(`Config file not found: ${options.config}`));
          process.exit(1);
        }
        const content = await fs.readFile(configPath, 'utf-8');
        const format = options.config.endsWith('.yaml') || options.config.endsWith('.yml') ? 'yaml' 
                     : options.config.endsWith('.toml') ? 'toml' : 'json';
        configResult = { data: format === 'json' ? JSON.parse(content) 
                              : format === 'yaml' ? (await import('js-yaml')).load(content)
                              : (await import('@iarna/toml')).parse(content) };
      } else {
        configResult = await loadConfig('portfolio.config', cwd);
      }
    } catch (error) {
      spinner.fail(chalk.red('Configuration file not found'));
      logger.error('Make sure you\'re in a devfolio project directory');
      logger.info('Looking for: portfolio.config.{json,yaml,yml,toml}');
      logger.info('Run "folioport init" to create a new project');
      process.exit(1);
    }
    
    const config = configResult.data;
    
    // Validate config
    const configValidation = validateConfig(config);
    if (!configValidation.valid) {
      spinner.fail(chalk.red('Invalid configuration'));
      configValidation.errors.forEach((err: string) => logger.error(err));
      process.exit(1);
    }
    
    // Load data (supports JSON, YAML, TOML)
    spinner.text = 'Loading portfolio data...';
    let dataResult;
    try {
      dataResult = await loadConfig('data', cwd);
    } catch (error) {
      spinner.fail(chalk.red('Portfolio data file not found'));
      logger.error('Looking for: data.{json,yaml,yml,toml}');
      logger.error('Create a data file with your portfolio content');
      process.exit(1);
    }
    
    const data = dataResult.data;
    
    // Validate data
    const dataValidation = validateData(data);
    if (!dataValidation.valid) {
      spinner.warn(chalk.yellow('Portfolio data has warnings'));
      dataValidation.errors.forEach(err => logger.warning(err));
    }
    
    // Initialize builder
    spinner.text = 'Compiling templates...';
    const builder = new Builder(config as any, data as any, {
      output: options.out || options.output || 'dist',
      minify: options.minify !== false,
      clean: options.clean || false
    });
    
    // Run build
    await builder.build();
    
    spinner.succeed(chalk.green('Build completed successfully!'));
    
    console.log('\n' + chalk.bold('📦 Output:'));
    console.log(chalk.cyan(`  ${path.join(cwd, options.out || options.output || 'dist')}/`));
    console.log('\n' + chalk.bold('📝 Files:'));
    console.log(chalk.gray('  ├── index.html'));
    console.log(chalk.gray('  ├── assets/'));
    console.log(chalk.gray('  ├── sitemap.xml'));
    console.log(chalk.gray('  └── robots.txt'));
    
    console.log('\n' + chalk.bold('🚀 Next steps:'));
    console.log(chalk.gray('  Deploy to Vercel, Netlify, or GitHub Pages'));
    console.log(chalk.gray(`  Visit ${config.site.url} after deployment\n`));
    
  } catch (error) {
    spinner.fail(chalk.red('Build failed'));
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(errorMessage);
    if (process.env.DEBUG) {
      console.error(error);
    }
    process.exit(1);
  }
}

