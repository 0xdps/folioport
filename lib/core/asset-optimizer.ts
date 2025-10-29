import fs from 'fs-extra';
import path from 'path';
import { build } from 'esbuild';
import { glob } from 'glob';

export async function optimizeAssets(inputDir: string, outputDir: string): Promise<void> {
  await Promise.all([
    optimizeCSS(inputDir, outputDir),
    optimizeJS(inputDir, outputDir),
    copyImages(inputDir, outputDir),
    copyFonts(inputDir, outputDir)
  ]);
}

async function optimizeCSS(inputDir: string, outputDir: string): Promise<void> {
  const cssDir = path.join(inputDir, 'css');
  if (!await fs.pathExists(cssDir)) return;

  const cssFiles = await glob('**/*.css', { cwd: cssDir });
  
  for (const file of cssFiles) {
    const input = path.join(cssDir, file);
    const outputPath = path.join(outputDir, 'css', file.replace('.css', '.min.css'));
    
    await fs.ensureDir(path.dirname(outputPath));
    
    await build({
      entryPoints: [input],
      outfile: outputPath,
      minify: true,
      bundle: false,
      loader: { '.css': 'css' }
    });
  }
}

async function optimizeJS(inputDir: string, outputDir: string): Promise<void> {
  const jsDir = path.join(inputDir, 'js');
  if (!await fs.pathExists(jsDir)) return;

  const jsFiles = await glob('**/*.js', { cwd: jsDir });
  
  for (const file of jsFiles) {
    const input = path.join(jsDir, file);
    const outputPath = path.join(outputDir, 'js', file.replace('.js', '.min.js'));
    
    await fs.ensureDir(path.dirname(outputPath));
    
    await build({
      entryPoints: [input],
      outfile: outputPath,
      minify: true,
      bundle: false,
      target: 'es2020',
      format: 'esm'
    });
  }
}

async function copyImages(inputDir: string, outputDir: string): Promise<void> {
  const imagesDir = path.join(inputDir, 'images');
  if (!await fs.pathExists(imagesDir)) return;

  const imageFiles = await glob('**/*.{jpg,jpeg,png,gif,svg,webp,ico}', { 
    cwd: imagesDir 
  });
  
  for (const file of imageFiles) {
    await fs.copy(
      path.join(imagesDir, file),
      path.join(outputDir, 'images', file)
    );
  }
}

async function copyFonts(inputDir: string, outputDir: string): Promise<void> {
  const fontsDir = path.join(inputDir, 'fonts');
  if (!await fs.pathExists(fontsDir)) return;

  await fs.copy(fontsDir, path.join(outputDir, 'fonts'));
}

