# 📦 AINative Design System MCP Server

A powerful Model Context Protocol (MCP) server that provides AI assistants with comprehensive design system management capabilities.

## 🚀 Quick Start

### Installation

```bash
# Install globally for easy access
npm install -g ainative-design-system-mcp-server

# Or install locally in your project
npm install ainative-design-system-mcp-server
```

### Add to Claude Code

After installation, add the server to Claude Code:

```bash
# Add the MCP server to Claude Code
claude mcp add ainative-design-system -- ainative-design-system-mcp

# Verify it's working
claude mcp list
```

### Alternative Setup Methods

#### Method 1: Global Installation
```bash
npm install -g ainative-design-system-mcp-server
claude mcp add ainative-design-system -- ainative-design-system-mcp
```

#### Method 2: Local Installation
```bash
npm install ainative-design-system-mcp-server
claude mcp add ainative-design-system -- npx ainative-design-system-mcp
```

#### Method 3: Direct Path
```bash
git clone https://github.com/ainative/ainative-design-system-mcp-server.git
cd ainative-design-system-mcp-server
npm install && npm run build
claude mcp add ainative-design-system -- node ./build/index.js
```

## 🎯 What You Can Do

Once installed, you can use natural language with Claude to:

### Design Token Management
- **"Extract design tokens from my CSS file"**
- **"Convert these design tokens to Tailwind format"**
- **"Generate a color palette from #3b82f6"**
- **"Analyze my CSS variables for consistency"**

### Component Analysis
- **"Analyze my React component library"**
- **"Find all components that use the primary color"**
- **"Generate documentation for my components"**
- **"Check my components for accessibility issues"**

### Theme Generation
- **"Generate a dark theme from my brand colors"**
- **"Create a Material-UI theme configuration"**
- **"Build a Styled Components theme object"**
- **"Generate CSS custom properties from my tokens"**

### Style Guide Creation
- **"Create a comprehensive style guide"**
- **"Generate usage examples for my design system"**
- **"Build component documentation with Storybook"**
- **"Create a design system implementation guide"**

## ⚙️ Configuration

### Environment Variables (Optional)

```bash
# Set default paths and preferences
export DESIGN_SYSTEM_PATH="/path/to/your/design/system"
export OUTPUT_FORMAT="json"
export ACCESSIBILITY_LEVEL="AA"
export FRAMEWORK_SUPPORT="react,vue,angular"
```

### Configuration File (Optional)

Create a `design-system.config.json` in your project root:

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

## 🛠️ Available Tools

### Core Tools
1. **extractDesignTokens** - Extract tokens from CSS, SCSS, JSON, YAML
2. **analyzeComponentLibrary** - Analyze React, Vue, Angular components
3. **generateTheme** - Generate themes for popular frameworks
4. **createComponentDocs** - Generate comprehensive documentation
5. **validateDesignSystem** - Validate consistency and accessibility

### Utility Tools
6. **extractColorsFromImage** - Extract colors from images
7. **generateColorPalette** - Create color scales and palettes
8. **convertTokenFormat** - Convert between token formats
9. **optimizeTokens** - Optimize tokens for performance
10. **generateFrameworkConfig** - Create framework-specific configs

### Analysis Tools
11. **analyzeAccessibility** - WCAG compliance checking
12. **detectBreakpoints** - Extract responsive breakpoints
13. **extractTypographyScale** - Analyze typography systems
14. **generateSpacingSystem** - Create consistent spacing
15. **createStyleGuide** - Generate complete style guides

## 📚 Available Resources

### Templates
- **Tailwind CSS Configuration** - Complete Tailwind config with tokens
- **Styled Components Theme** - Theme object for styled-components
- **Material-UI Theme** - MUI theme configuration
- **CSS Custom Properties** - CSS variables template
- **React Button Component** - Example component with variants

### Documentation
- **Design System Implementation Guide** - Comprehensive setup guide

## 🔧 Troubleshooting

### Common Issues

#### "Command not found: ainative-design-system-mcp"
```bash
# Reinstall globally
npm uninstall -g ainative-design-system-mcp-server
npm install -g ainative-design-system-mcp-server

# Or use npx
claude mcp add ainative-design-system -- npx ainative-design-system-mcp-server
```

#### "MCP server not connecting"
```bash
# Check if server is running
claude mcp list

# Remove and re-add
claude mcp remove ainative-design-system
claude mcp add ainative-design-system -- ainative-design-system-mcp

# Check logs
claude mcp get ainative-design-system
```

#### "Permission denied"
```bash
# Fix permissions
chmod +x $(which ainative-design-system-mcp)

# Or use absolute path
claude mcp add ainative-design-system -- node $(npm root -g)/ainative-design-system-mcp-server/build/index.js
```

### Node.js Version Requirements

This MCP server requires **Node.js 18 or higher**:

```bash
# Check your Node.js version
node --version

# If you need to upgrade, use nvm
nvm install 18
nvm use 18
```

## 📖 Usage Examples

### Basic Token Extraction
```
Claude: "Extract design tokens from my styles.css file"
```

### Advanced Component Analysis
```
Claude: "Analyze my React components in the src/components directory and generate documentation with accessibility recommendations"
```

### Theme Generation
```
Claude: "Create a complete Tailwind theme using #3b82f6 as primary and #10b981 as secondary, ensure WCAG AA compliance"
```

### Multi-format Conversion
```
Claude: "Convert my design tokens to both Styled Components and Material-UI formats"
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 🆘 Support

- 📧 Email: support@ainative.com
- 🐛 Issues: [GitHub Issues](https://github.com/ainative/ainative-design-system-mcp-server/issues)
- 📖 Documentation: [Full Documentation](https://docs.ainative.com/mcp/design-system)
- 💬 Community: [Discord](https://discord.gg/ainative)

---

**Made with ❤️ by [AINative](https://ainative.com)**