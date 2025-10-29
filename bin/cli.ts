#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from '../lib/commands/init.js';
import { buildCommand } from '../lib/commands/build.js';
import { devCommand } from '../lib/commands/dev.js';

const program = new Command();

program
  .name('devfolio')
  .description('Developer Portfolio Generator - Create beautiful portfolio sites')
  .version('1.0.0');

// Init command
program
  .command('init [name]')
  .description('Initialize a new portfolio project (use "." for current directory)')
  .option('-t, --theme <theme>', 'Theme to use', 'default')
  .option('-f, --format <format>', 'Config format: json, yaml, or toml', 'json')
  .option('--template <template>', 'Template preset', 'basic')
  .option('--git', 'Initialize git repository')
  .option('--install', 'Auto-install dependencies')
  .action(initCommand);

// Build command
program
  .command('build')
  .description('Build production site')
  .option('-c, --config <path>', 'Config file path', 'portfolio.config.json')
  .option('-o, --out <dir>', 'Output directory', 'dist')
  .option('--no-minify', 'Skip minification')
  .option('--clean', 'Clean output directory first')
  .action(buildCommand);

// Dev command
program
  .command('dev')
  .description('Start development server')
  .option('-p, --port <number>', 'Port number', '3000')
  .option('--open', 'Open browser automatically')
  .option('-h, --host <host>', 'Host', 'localhost')
  .action(devCommand);

program.parse();

