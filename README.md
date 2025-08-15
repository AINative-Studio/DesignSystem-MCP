# 🎨 AINative Design System MCP Server

[![npm version](https://badge.fury.io/js/ainative-design-system-mcp-server.svg)](https://badge.fury.io/js/ainative-design-system-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

A comprehensive Model Context Protocol (MCP) server that provides AI assistants with powerful design system management capabilities. Extract design tokens, analyze components, generate themes, and create comprehensive style guides—all through natural language conversations with Claude Code.

## 🚀 Quick Start

```bash
# Install globally
npm install -g ainative-design-system-mcp-server

# Add to Claude Code
claude mcp add ainative-design-system -- ainative-design-system-mcp

# Start using with Claude!
```

## Features

### 🎨 Design Token Management
- **Extract design tokens** from CSS, SCSS, Less, Stylus files
- **Parse CSS variables** and custom properties
- **Analyze color palettes** and generate variations
- **Typography scale** detection and optimization
- **Spacing system** analysis and standardization
- **Generate token files** in JSON, YAML, JavaScript formats

### 🧩 Component Analysis
- **Component library scanning** across multiple frameworks
- **Style extraction** from component files
- **Prop analysis** and documentation generation
- **Variant detection** and categorization
- **Usage pattern** analysis

### 🌈 Theme Management
- **Multi-theme** support and generation
- **Dark/light mode** automatic detection
- **Brand color** extraction and palette generation
- **Accessibility compliance** checking (WCAG)
- **Color contrast** analysis and optimization

### 📱 Responsive Design
- **Breakpoint detection** from CSS and design files
- **Grid system** analysis and documentation
- **Component responsiveness** evaluation
- **Mobile-first** pattern detection

### 🔄 Integration Support
- **Tailwind CSS** configuration generation
- **Styled Components** theme creation
- **Material-UI** theme adaptation
- **Chakra UI** theme configuration
- **CSS-in-JS** library integration

## Installation

```bash
npm install @ainative/design-system-mcp-server
```

## Usage

### Claude Desktop Integration

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "design-system": {
      "command": "node",
      "args": ["/path/to/design-system-mcp-server/build/index.js"],
      "env": {
        "DESIGN_SYSTEM_PATH": "/path/to/your/design/system",
        "OUTPUT_FORMAT": "json"
      }
    }
  }
}
```

### Available Tools

#### 1. Extract Design Tokens
```typescript
await extractDesignTokens({
  source: "path/to/styles",
  formats: ["css", "scss", "less"],
  output: "tokens.json",
  categories: ["colors", "typography", "spacing"]
});
```

#### 2. Analyze Component Library
```typescript
await analyzeComponentLibrary({
  source: "src/components",
  framework: "react",
  includeStyles: true,
  generateDocs: true
});
```

#### 3. Generate Theme
```typescript
await generateTheme({
  baseColors: ["#3B82F6", "#10B981"],
  modes: ["light", "dark"],
  format: "tailwind",
  accessibility: true
});
```

#### 4. Create Component Documentation
```typescript
await createComponentDocs({
  components: "src/components/**/*.tsx",
  output: "docs/components",
  includeStorybook: true,
  generateExamples: true
});
```

#### 5. Validate Design System
```typescript
await validateDesignSystem({
  source: "design-system/",
  rules: ["consistency", "accessibility", "performance"],
  reportFormat: "detailed"
});
```

## Configuration

### Environment Variables

- `DESIGN_SYSTEM_PATH`: Root path to your design system
- `OUTPUT_FORMAT`: Default output format (json, yaml, js)
- `INCLUDE_EXAMPLES`: Include usage examples in output
- `ACCESSIBILITY_LEVEL`: WCAG compliance level (A, AA, AAA)
- `FRAMEWORK_SUPPORT`: Supported frameworks (react,vue,angular)

### Configuration File

Create a `design-system.config.json`:

```json
{
  "tokenCategories": {
    "colors": {
      "primary": ["primary", "brand", "main"],
      "secondary": ["secondary", "accent"],
      "semantic": ["success", "error", "warning", "info"]
    },
    "typography": {
      "scales": ["heading", "body", "caption"],
      "weights": ["light", "regular", "medium", "bold"]
    },
    "spacing": {
      "scale": "modular",
      "base": 16,
      "ratio": 1.5
    }
  },
  "breakpoints": {
    "mobile": 480,
    "tablet": 768,
    "desktop": 1024,
    "wide": 1440
  },
  "accessibility": {
    "contrastRatio": 4.5,
    "wcagLevel": "AA",
    "checkFocus": true
  }
}
```

## Examples

### Extracting Tokens from Figma Design

```typescript
// Extract design tokens from Figma file
const tokens = await extractDesignTokens({
  source: "figma://file-key",
  categories: ["colors", "typography", "spacing"],
  format: "css-variables"
});

// Generate Tailwind config
const tailwindConfig = await generateFrameworkConfig({
  tokens,
  framework: "tailwind",
  includeComponents: true
});
```

### Building Component Library Documentation

```typescript
// Analyze existing components
const analysis = await analyzeComponentLibrary({
  source: "src/components",
  framework: "react",
  includeStyles: true
});

// Generate comprehensive docs
const docs = await createComponentDocs({
  analysis,
  format: "markdown",
  includeStorybook: true,
  generatePlayground: true
});
```

### Creating Multi-Theme System

```typescript
// Extract base colors from brand assets
const brandColors = await extractColorsFromImage({
  source: "assets/logo.png",
  count: 5,
  accessibility: true
});

// Generate complete theme system
const themes = await generateMultiTheme({
  baseColors: brandColors,
  modes: ["light", "dark", "high-contrast"],
  platforms: ["web", "mobile", "desktop"]
});
```

## API Reference

### Core Functions

#### `extractDesignTokens(options)`
Extract design tokens from various sources.

**Parameters:**
- `source`: String or array of file paths/URLs
- `categories`: Array of token categories to extract
- `format`: Output format (json, yaml, css, scss)
- `transform`: Apply transformations (kebab-case, camelCase)

**Returns:**
- `tokens`: Extracted design tokens object
- `metadata`: Information about source and extraction
- `validation`: Token validation results

#### `analyzeComponentLibrary(options)`
Analyze component library structure and styles.

**Parameters:**
- `source`: Component directory path
- `framework`: Target framework (react, vue, angular)
- `includeStyles`: Include style analysis
- `depth`: Directory scanning depth

**Returns:**
- `components`: Component analysis results
- `patterns`: Detected design patterns
- `dependencies`: Component dependencies
- `suggestions`: Optimization suggestions

#### `generateTheme(options)`
Generate theme configuration for target framework.

**Parameters:**
- `baseColors`: Primary colors for theme
- `modes`: Theme modes (light, dark)
- `framework`: Target framework
- `accessibility`: Enable accessibility checks

**Returns:**
- `theme`: Generated theme configuration
- `variations`: Color variations and scales
- `accessibility`: Accessibility compliance report
- `examples`: Usage examples

### Utility Functions

#### `validateAccessibility(colors)`
Check color combinations for WCAG compliance.

#### `generateColorPalette(baseColor, options)`
Generate complete color palette from base color.

#### `optimizeTokens(tokens, options)`
Optimize tokens for performance and consistency.

#### `convertFormat(tokens, targetFormat)`
Convert tokens between different formats.

## Integration Examples

### With Tailwind CSS

```javascript
const tokens = await extractDesignTokens({
  source: "design-tokens/",
  format: "tailwind"
});

// Generate tailwind.config.js
const config = {
  theme: {
    colors: tokens.colors,
    fontFamily: tokens.typography.families,
    spacing: tokens.spacing
  }
};
```

### With Styled Components

```javascript
const theme = await generateTheme({
  baseColors: tokens.colors.primary,
  format: "styled-components"
});

// Use in styled-components
const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.onPrimary};
`;
```

### With Material-UI

```javascript
const muiTheme = await generateTheme({
  tokens,
  framework: "material-ui",
  mode: "light"
});

// Apply to MUI theme
const theme = createTheme(muiTheme);
```

## Development

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build
npm run build

# Test
npm test

# Lint
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

- 📧 Email: support@ainative.com
- 🐛 Issues: [GitHub Issues](https://github.com/ainative/design-system-mcp-server/issues)
- 📖 Documentation: [Full Documentation](https://docs.ainative.com/mcp/design-system)
- 💬 Community: [Discord](https://discord.gg/ainative)