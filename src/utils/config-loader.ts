import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';
import toml from '@iarna/toml';
import { logger } from './logger.js';
import type { ConfigLoadResult } from '../types/index.js';

type Parser = (content: string) => any;

interface ConfigExtension {
  ext: string;
  parser: Parser;
}

/**
 * Load configuration or data from JSON, YAML, or TOML file
 */
export async function loadConfig(basePath: string, cwd: string = process.cwd()): Promise<ConfigLoadResult> {
  // Try different file extensions in order of preference
  const extensions: ConfigExtension[] = [
    { ext: '.json', parser: parseJSON },
    { ext: '.yaml', parser: parseYAML },
    { ext: '.yml', parser: parseYAML },
    { ext: '.toml', parser: parseTOML }
  ];

  for (const { ext, parser } of extensions) {
    const filePath = path.join(cwd, `${basePath}${ext}`);
    if (await fs.pathExists(filePath)) {
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const parsed = parser(content);
        logger.debug(`Loaded ${basePath}${ext}`);
        return { data: parsed, format: ext.slice(1), path: filePath };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to parse ${basePath}${ext}: ${errorMessage}`);
      }
    }
  }

  throw new Error(`Configuration file not found: ${basePath}.{json,yaml,yml,toml}`);
}

/**
 * Parse JSON content
 */
function parseJSON(content: string): any {
  return JSON.parse(content);
}

/**
 * Parse YAML content
 */
function parseYAML(content: string): any {
  return yaml.load(content);
}

/**
 * Parse TOML content
 */
function parseTOML(content: string): any {
  return toml.parse(content);
}

/**
 * Save configuration or data to file in specified format
 */
export async function saveConfig(filePath: string, data: any, format: string = 'json'): Promise<void> {
  let content;

  switch (format.toLowerCase()) {
    case 'json':
      content = JSON.stringify(data, null, 2);
      break;
    case 'yaml':
    case 'yml':
      content = yaml.dump(data, {
        indent: 2,
        lineWidth: 80,
        noRefs: true
      });
      break;
    case 'toml':
      content = toml.stringify(data);
      break;
    default:
      throw new Error(`Unsupported format: ${format}. Use json, yaml, or toml.`);
  }

  await fs.writeFile(filePath, content, 'utf-8');
}

/**
 * Get file extension for format
 */
export function getExtension(format: string): string {
  const extensions: Record<string, string> = {
    json: '.json',
    yaml: '.yaml',
    yml: '.yml',
    toml: '.toml'
  };
  return extensions[format.toLowerCase()] || '.json';
}

/**
 * Detect format from file path
 */
export function detectFormat(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const formats: Record<string, string> = {
    '.json': 'json',
    '.yaml': 'yaml',
    '.yml': 'yaml',
    '.toml': 'toml'
  };
  return formats[ext] || 'json';
}

