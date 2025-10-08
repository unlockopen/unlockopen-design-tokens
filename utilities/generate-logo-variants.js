#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import themes from '../tokens/themes.js';
import logoFiles from '../tokens/logoFiles.json' with { type: 'json' };
import { GREY_LIGHT } from '../tokens/colors.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, '../assets/logos');
const outputDir = path.join(assetsDir, 'variants');

// Ensure variants directory exists
fs.mkdirSync(outputDir, { recursive: true });

const baseLogos = Object.values(logoFiles.logos).map(logo => path.basename(logo.file));
const generatedFiles = [];

console.log('🎨 Generating logo variants for all themes...\n');

for (const theme of themes.items) {

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
    fs.writeFileSync(path.join(outputDir, variantFilename), processedSvg);

    generatedFiles.push({
      theme: theme.name,
      logo: logoFile,
      file: `./assets/logos/variants/${variantFilename}`,
      colors: { text: theme.textColor, accent: theme.accentColor, background: theme.backgroundColor }
    });
  }
}

// Variants are generated at build time and don't need to be tracked in logoFiles.json

console.log(`\n🎉 Generated ${generatedFiles.length} logo variants`);