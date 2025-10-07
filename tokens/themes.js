import {
  DARK,
  PINK, PINK_LIGHT,
  BLUSH, BLUSH_LIGHT,
  SALMON, SALMON_LIGHT,
  TANGERINE, TANGERINE_LIGHT,
  GOLDEN, GOLDEN_LIGHT,
  APPLE, APPLE_LIGHT,
  CARIBBEAN, CARIBBEAN_LIGHT,
  AQUA, AQUA_LIGHT,
  BLUE, BLUE_LIGHT,
  LAVENDER, LAVENDER_LIGHT
} from './colors.js';

export const themes = {
  pink: {
    textColor: DARK,
    accentColor: PINK,
    backgroundColor: PINK_LIGHT
  },
  blush: {
    textColor: DARK,
    accentColor: BLUSH,
    backgroundColor: BLUSH_LIGHT
  },
  salmon: {
    textColor: DARK,
    accentColor: SALMON,
    backgroundColor: SALMON_LIGHT
  },
  tangerine: {
    textColor: DARK,
    accentColor: TANGERINE,
    backgroundColor: TANGERINE_LIGHT
  },
  golden: {
    textColor: DARK,
    accentColor: GOLDEN,
    backgroundColor: GOLDEN_LIGHT
  },
  apple: {
    textColor: DARK,
    accentColor: APPLE,
    backgroundColor: APPLE_LIGHT
  },
  caribbean: {
    textColor: DARK,
    accentColor: CARIBBEAN,
    backgroundColor: CARIBBEAN_LIGHT
  },
  aqua: {
    textColor: DARK,
    accentColor: AQUA,
    backgroundColor: AQUA_LIGHT
  },
  blue: {
    textColor: DARK,
    accentColor: BLUE,
    backgroundColor: BLUE_LIGHT
  },
  lavender: {
    textColor: DARK,
    accentColor: LAVENDER,
    backgroundColor: LAVENDER_LIGHT
  }
};

export const defaultTheme = themes.golden;

export default {
  title: "Themes",
  description: "Color theme definitions using core brand colors",
  themes,
  defaultTheme
};