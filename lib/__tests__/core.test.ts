import { describe, it, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs-extra';

describe('FolioPort Core', () => {
  it('should have valid package.json', () => {
    const packageJsonPath = path.join(__dirname, '../../package.json');
    expect(fs.existsSync(packageJsonPath)).toBe(true);
    
    const packageJson = fs.readJsonSync(packageJsonPath);
    expect(packageJson.name).toBe('folioport');
    expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(packageJson.bin.folioport).toBe('./dist/bin/cli.js');
  });

  it('should have required template files', () => {
    const templateDir = path.join(__dirname, '../../templates/default');
    expect(fs.existsSync(templateDir)).toBe(true);
    
    const indexTemplate = path.join(templateDir, 'index.hbs');
    expect(fs.existsSync(indexTemplate)).toBe(true);
    
    const cssFile = path.join(templateDir, 'assets/css/styles.css');
    expect(fs.existsSync(cssFile)).toBe(true);
    
    const jsFile = path.join(templateDir, 'assets/js/scripts.js');
    expect(fs.existsSync(jsFile)).toBe(true);
  });

  it('should have TypeScript configuration', () => {
    const tsconfigPath = path.join(__dirname, '../../tsconfig.json');
    expect(fs.existsSync(tsconfigPath)).toBe(true);
    
    const tsconfig = fs.readJsonSync(tsconfigPath);
    expect(tsconfig.compilerOptions).toBeDefined();
    expect(tsconfig.compilerOptions.target).toBeDefined();
    expect(tsconfig.compilerOptions.module).toBeDefined();
  });
});