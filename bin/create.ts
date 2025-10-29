#!/usr/bin/env node

// Alias for 'devfolio init' to support 'npx create-folioport' syntax
import { initCommand } from '../lib/commands/init.js';
import type { InitOptions } from '../types/index.js';

const projectName = process.argv[2] || 'my-portfolio';
const options: InitOptions = {
  theme: 'default',
  template: 'basic',
  git: false,
  install: true // Auto-install for npx usage
};

// Parse additional options
for (let i = 3; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg === '--theme' || arg === '-t') {
    options.theme = process.argv[++i] || 'default';
  } else if (arg === '--git') {
    options.git = true;
  } else if (arg === '--no-install') {
    options.install = false;
  }
}

initCommand(projectName, options);

