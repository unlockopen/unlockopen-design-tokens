# UnlockOpen Design Tokens

A centralized design system package containing design tokens, fonts, and brand assets for UnlockOpen projects.

## Installation

```bash
npm install github:unlockopen/unlockopen-design-tokens
```

## Usage

### Design Tokens

```js
import { colors, themes, spacing, fonts } from 'unlockopen-design-tokens'

// Access raw color values
console.log(colors.items) // Array of {name, value} objects
console.log(colors.GOLDEN) // "#FFD164"

// Use themes
console.log(themes.themes.golden)
// { textColor: "#161717", accentColor: "#FFD164", backgroundColor: "#FFFAF0" }
```

### Utilities

```js
import { clampGenerator, tokensToTailwind } from 'unlockopen-design-tokens'

// Generate CSS clamp() values for responsive spacing
const fluidSpacing = clampGenerator(spacing.items)

// Convert tokens to Tailwind-friendly format
const tailwindColors = tokensToTailwind(colors.items)
```

## Examples

### Tailwind CSS Integration

```js
// tailwind.config.js
import { colors, spacing, fonts, textSizes, clampGenerator, tokensToTailwind } from 'unlockopen-design-tokens'

export default {
  theme: {
    colors: tokensToTailwind(colors.items),
    spacing: tokensToTailwind(clampGenerator(spacing.items)),
    fontFamily: tokensToTailwind(fonts.items),
    fontSize: tokensToTailwind(clampGenerator(textSizes.items))
  }
}
```

### CSS Custom Properties

```css
/* Use individual theme */
[data-theme="golden"] {
  --color-text: #161717;
  --color-accent: #FFD164;
  --color-bg: #FFFAF0;
}
```
