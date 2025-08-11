# Internationalization (i18n) in Joystick App Template

This app template has been configured to support internationalization using Joystick's built-in i18n system.

## How it works

1. **Translation files** are stored in the `/i18n` folder using the format `{language}-{country}.js` (e.g., `en-US.js`, `es-ES.js`)

2. **Page-specific translations** are organized by the page path within each language file

3. **Components access translations** via the `i18n()` function passed to the render method

4. **Variable interpolation** is supported using `{{variable}}` syntax

## Current translations

- **English (US)**: `en-US.js` - Complete translations for all UI text
- **Spanish (Spain)**: `es-ES.js` - Complete translations for all UI text

## Translation structure

Each language file exports an object with page paths as keys:

```javascript
const en_US = {
  'ui/pages/index/index.js': {
    panels: {
      star_on_github: {
        title: 'Star on Github',
        subtitle: 'Join {{stars}} others getting updates on the latest.',
        button: '<i class="mod-icon-brand-github"></i> Star on Github'
      }
      // ... more translations
    }
  },
  'ui/pages/not_found/index.js': {
    title: '404: Page Not Found',
    subtitle: 'Please double check the URL and try again.',
    button: '<i class="mod-icon-arrow-left"></i> Go Back'
  }
};
```

## Using translations in components

Components access translations through the `i18n` parameter:

```javascript
render: ({ i18n, data }) => {
  return `
    <h1>${i18n('panels.star_on_github.title')}</h1>
    <p>${i18n('panels.star_on_github.subtitle', { stars: data?.index?.stars })}</p>
  `;
}
```

## Adding new languages

1. Create a new file in `/i18n` following the naming convention (e.g., `fr-FR.js` for French)
2. Copy the structure from an existing language file
3. Translate all the text strings
4. Export the translation object as default

## Language selection priority

Joystick automatically selects the language based on:

1. Current user's `language` field (if available)
2. Browser's `navigator.language` value
3. Default language configured in `config.i18n.default_language`

## Variable interpolation

Use `{{variableName}}` in translation strings and pass variables as the second parameter to `i18n()`:

```javascript
// Translation file
subtitle: 'Join {{stars}} others getting updates'

// Component usage
i18n('panels.star_on_github.subtitle', { stars: data?.index?.stars })
```

## HTML in translations

HTML can be included directly in translation strings, including icons and formatting:

```javascript
button: '<i class="mod-icon-brand-github"></i> Star on Github'
