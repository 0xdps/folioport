
import path from 'path';
import chalk from 'chalk';
import chokidar from 'chokidar';
import express from 'express';
import { Builder } from '../core/builder.js';
import { logger } from '../utils/logger.js';
import { loadConfig } from '../utils/config-loader.js';
import type { DevOptions } from '../../types/index.js';

export async function devCommand(options: DevOptions = {}): Promise<void> {
  const cwd = process.cwd();
  const port = parseInt(options.port?.toString() || '3000');
  
  console.log(chalk.bold('\n🚀 Starting FolioPort dev server...\n'));
  
  // Check if we're in a folioport project
  try {
    await loadConfig('portfolio.config', cwd);
  } catch (_error) {
    logger.error('Configuration file not found');
    logger.info('Looking for: portfolio.config.{json,yaml,yml,toml}');
    logger.info('Run "folioport init" to create a new project');
    process.exit(1);
  }
  
  // Initial build
  try {
    await buildSite(cwd);
    logger.success('Initial build complete');
  } catch (error) {
    logger.error('Initial build failed:');
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(errorMessage);
    process.exit(1);
  }
  
  // Setup file watcher (watch all supported config formats)
  const watcher = chokidar.watch([
    'data.json',
    'data.yaml',
    'data.yml',
    'data.toml',
    'portfolio.config.json',
    'portfolio.config.yaml',
    'portfolio.config.yml',
    'portfolio.config.toml',
    'index.hbs',
    'assets/**/*',
    'partials/**/*',
    'public/**/*'
  ], {
    cwd,
    ignoreInitial: true,
    ignored: ['**/node_modules/**', '**/.git/**']
  });
  
  watcher.on('change', async (filepath: string) => {
    console.log(chalk.yellow(`\n� ${filepath} changed, rebuilding...`));
    try {
      await buildSite(cwd);
      logger.success('Rebuild complete');
    } catch (error) {
      logger.error('Rebuild failed:');
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(errorMessage);
    }
  });
  
  watcher.on('add', async (filepath: string) => {
    console.log(chalk.green(`\n➕ ${filepath} added, rebuilding...`));
    try {
      await buildSite(cwd);
      logger.success('Rebuild complete');
    } catch (error) {
      logger.error('Rebuild failed:');
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(errorMessage);
    }
  });
  
  // Setup express server
  const app = express();
  
  // Serve static files from .dev directory
  app.use(express.static(path.join(cwd, '.dev')));
  
  // Fallback to index.html for SPA routing
  app.get('*', (_req, res) => {
    res.sendFile(path.join(cwd, '.dev', 'index.html'));
  });
  
  // Start server
  const server = app.listen(port, options.host || 'localhost', () => {
    console.log('\n' + chalk.green('✓ Dev server running!'));
    console.log('\n' + chalk.bold('  Local:   ') + chalk.cyan(`http://${options.host}:${port}`));
    console.log(chalk.bold('  Network: ') + chalk.cyan(`http://localhost:${port}`));
    console.log('\n' + chalk.gray('  Press Ctrl+C to stop'));
    console.log(chalk.gray('  Watching for file changes...\n'));
    
    // Open browser if requested
    if (options.open) {
      // Auto-open browser functionality can be added later
      console.log(chalk.gray(`  Open browser manually: http://${options.host || 'localhost'}:${port}`));
    }
  });
  
  // Handle errors
  server.on('error', (error) => {
    if ((error as any).code === 'EADDRINUSE') {
      logger.error(`Port ${port} is already in use`);
      logger.info(`Try a different port: folioport dev --port ${port + 1}`);
    } else {
      logger.error('Server error:');
      console.error(error);
    }
    process.exit(1);
  });
  
  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\n' + chalk.yellow('Shutting down dev server...'));
    watcher.close();
    server.close(() => {
      logger.success('Dev server stopped');
      process.exit(0);
    });
  });
}

async function buildSite(cwd: string): Promise<void> {
  // Load config and data (supports JSON, YAML, TOML)
  const configResult = await loadConfig('portfolio.config', cwd);
  const dataResult = await loadConfig('data', cwd);
  
  const builder = new Builder(configResult.data as any, dataResult.data as any, {
    output: '.dev',
    minify: true,
    clean: false
  });
  
  await builder.build();
}

