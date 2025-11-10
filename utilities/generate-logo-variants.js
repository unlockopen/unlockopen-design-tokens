#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { items } from '../tokens/themes.js';
import logoFiles from '../tokens/logoFiles.json' with { type: 'json' };
import { GREY_LIGHT } from '../tokens/colors.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, '../assets/logos');
const outputDir = path.join(assetsDir, 'variants');
const pngOutputDir = path.join(assetsDir, 'png');

// Ensure directories exist
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(pngOutputDir, { recursive: true });

// Function to convert SVG to PNG using sharp
async function convertToPng(svgPath, pngPath) {
  try {
    await sharp(svgPath)
      .png()
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(pngPath);
  } catch (error) {
    console.error(`Failed to convert ${svgPath} to PNG:`, error.message);
  }
}

const baseLogos = Object.values(logoFiles.logos).map(logo => path.basename(logo.file));
const generatedFiles = [];

async function generateLogos() {
console.log('🎨 Generating logo variants and PNG versions for all themes...\n');

// First, generate PNG versions of base logos
console.log('📸 Generating PNG versions of base logos...');
for (const logoFile of baseLogos) {
  const svgPath = path.join(assetsDir, logoFile);
  const pngPath = path.join(pngOutputDir, `${path.basename(logoFile, '.svg')}.png`);
  await convertToPng(svgPath, pngPath);
  console.log(`  ✓ ${logoFile} → ${path.basename(pngPath)}`);
}

console.log('\n🎨 Generating themed variants...');

for (const theme of items) {

  console.log(`📁 ${theme.name}: ${theme.textColor}, ${theme.accentColor}`);

  for (const logoFile of baseLogos) {
    const svgContent = fs.readFileSync(path.join(assetsDir, logoFile), 'utf8');

    let processedSvg;
    if (logoFile === 'favicon.svg') {
      // For favicons, add CSS with prefers-color-scheme
      processedSvg = svgContent.replace(
        '<svg xmlns="http://www.w3.org/2000/svg"',
        `<svg xmlns="http://www.w3.org/2000/svg">
  <style>
    path:nth-child(1) { fill: ${theme.accentColor}; }
    path:nth-child(2) { fill: ${theme.textColor}; }

    @media (prefers-color-scheme: dark) {
      path:nth-child(1) { fill: ${theme.accentColor}; }
      path:nth-child(2) { fill: ${GREY_LIGHT}; }
    }
  </style>
<svg`
      ).replace(/fill="var\(--color-[^"]+\)"/g, '');
    } else {
      // For other logos, inline colors directly
      processedSvg = svgContent
        .replace(/var\(--color-text\)/g, theme.textColor)
        .replace(/var\(--color-accent\)/g, theme.accentColor);
    }

    const variantFilename = `${path.basename(logoFile, '.svg')}-${theme.name}.svg`;
    const variantPath = path.join(outputDir, variantFilename);
    fs.writeFileSync(variantPath, processedSvg);

    // Also generate PNG version of the variant
    const pngVariantPath = path.join(pngOutputDir, `${path.basename(logoFile, '.svg')}-${theme.name}.png`);
    await convertToPng(variantPath, pngVariantPath);

    generatedFiles.push({
      theme: theme.name,
      logo: logoFile,
      file: `./assets/logos/variants/${variantFilename}`,
      colors: { text: theme.textColor, accent: theme.accentColor, background: theme.backgroundColor }
    });
  }
}

// Variants are generated at build time and don't need to be tracked in logoFiles.json

console.log(`\n🎉 Generated ${generatedFiles.length} logo variants and PNG versions`);
}

// Run the generator
generateLogos().catch(console.error);