import fs from 'fs-extra';
import path from 'path';

interface CopyOptions {
  overwrite?: boolean;
  filter?: (src: string, dest: string) => boolean;
}

interface WriteJSONOptions {
  spaces?: number;
}

export async function copyDirectory(src: string, dest: string, options: CopyOptions = {}): Promise<void> {
  await fs.copy(src, dest, {
    overwrite: options.overwrite !== false,
    errorOnExist: false,
    filter: options.filter
  });
}

export async function readJSON(filepath: string): Promise<any> {
  try {
    return await fs.readJSON(filepath);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to read JSON file ${filepath}: ${errorMessage}`);
  }
}

export async function writeJSON(filepath: string, data: any, options: WriteJSONOptions = {}): Promise<void> {
  await fs.writeJSON(filepath, data, { spaces: 2, ...options });
}

export async function ensureDir(dirpath: string): Promise<void> {
  await fs.ensureDir(dirpath);
}

export async function pathExists(filepath: string): Promise<boolean> {
  return await fs.pathExists(filepath);
}

export async function remove(filepath: string): Promise<void> {
  await fs.remove(filepath);
}

export function resolveProjectPath(...segments: string[]): string {
  return path.join(process.cwd(), ...segments);
}

export function getFileExtension(filepath: string): string {
  return path.extname(filepath).toLowerCase();
}

