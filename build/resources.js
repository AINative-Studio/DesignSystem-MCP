/**
 * Design System MCP Server Resources
 *
 * Provides access to design system templates, examples, and documentation
 * through the MCP resource system.
 */
// Design Token Templates
const designTokenTemplates = {
    'tailwind-config': {
        uri: 'template://tailwind-config.js',
        name: 'Tailwind CSS Configuration',
        description: 'Template for Tailwind CSS configuration with design tokens',
        mimeType: 'application/javascript',
        handler: async () => `module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      // Brand Colors
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        500: '#3b82f6',
        900: '#1e3a8a',
      },
      secondary: {
        50: '#f0fdf4',
        100: '#dcfce7',
        500: '#22c55e',
        900: '#14532d',
      },
      // Semantic Colors
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mono: ['Monaco', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    },
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
    borderRadius: {
      none: '0px',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: 'none',
    },
  },
  plugins: [],
};`
    },
    'styled-components-theme': {
        uri: 'template://styled-components-theme.js',
        name: 'Styled Components Theme',
        description: 'Theme object for styled-components',
        mimeType: 'application/javascript',
        handler: async () => `export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      900: '#14532d',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      serif: 'Merriweather, serif',
      mono: 'Monaco, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};`
    },
    'material-ui-theme': {
        uri: 'template://material-ui-theme.js',
        name: 'Material-UI Theme',
        description: 'Theme configuration for Material-UI',
        mimeType: 'application/javascript',
        handler: async () => `import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#dbeafe',
      main: '#3b82f6',
      dark: '#1e3a8a',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#dcfce7',
      main: '#22c55e',
      dark: '#14532d',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    info: {
      main: '#3b82f6',
    },
    success: {
      main: '#10b981',
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.3,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 6,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    // ... additional shadows
  ],
});`
    },
    'css-variables': {
        uri: 'template://css-variables.css',
        name: 'CSS Custom Properties',
        description: 'CSS custom properties for design tokens',
        mimeType: 'text/css',
        handler: async () => `:root {
  /* Colors */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;
  
  --color-secondary-50: #f0fdf4;
  --color-secondary-100: #dcfce7;
  --color-secondary-500: #22c55e;
  --color-secondary-900: #14532d;
  
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* Typography */
  --font-family-sans: Inter, system-ui, sans-serif;
  --font-family-serif: Merriweather, serif;
  --font-family-mono: Monaco, monospace;
  
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  --spacing-4xl: 6rem;
  
  /* Border Radius */
  --border-radius-sm: 0.125rem;
  --border-radius-md: 0.375rem;
  --border-radius-lg: 0.5rem;
  --border-radius-xl: 0.75rem;
  --border-radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;
  
  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Dark theme */
[data-theme="dark"] {
  --color-gray-50: #111827;
  --color-gray-100: #1f2937;
  --color-gray-200: #374151;
  --color-gray-300: #4b5563;
  --color-gray-400: #6b7280;
  --color-gray-500: #9ca3af;
  --color-gray-600: #d1d5db;
  --color-gray-700: #e5e7eb;
  --color-gray-800: #f3f4f6;
  --color-gray-900: #f9fafb;
}`
    },
};
// Component Templates
const componentTemplates = {
    'react-button': {
        uri: 'template://react-button.tsx',
        name: 'React Button Component',
        description: 'Reusable button component with variants',
        mimeType: 'text/typescript',
        handler: async () => `import React from 'react';
import { styled } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>\`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: \${({ theme }) => theme.borderRadius.md};
  font-weight: \${({ theme }) => theme.typography.fontWeight.medium};
  transition: \${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  border: none;
  
  /* Size variants */
  \${({ size }) => {
    switch (size) {
      case 'sm':
        return \`
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          min-height: 2rem;
        \`;
      case 'lg':
        return \`
          padding: 0.75rem 1.5rem;
          font-size: 1.125rem;
          min-height: 3rem;
        \`;
      default:
        return \`
          padding: 0.625rem 1.25rem;
          font-size: 1rem;
          min-height: 2.5rem;
        \`;
    }
  }}
  
  /* Color variants */
  \${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return \`
          background-color: \${theme.colors.secondary[500]};
          color: white;
          &:hover {
            background-color: \${theme.colors.secondary[600]};
          }
        \`;
      case 'outline':
        return \`
          background-color: transparent;
          color: \${theme.colors.primary[500]};
          border: 1px solid \${theme.colors.primary[500]};
          &:hover {
            background-color: \${theme.colors.primary[50]};
          }
        \`;
      case 'ghost':
        return \`
          background-color: transparent;
          color: \${theme.colors.primary[500]};
          &:hover {
            background-color: \${theme.colors.primary[50]};
          }
        \`;
      default:
        return \`
          background-color: \${theme.colors.primary[500]};
          color: white;
          &:hover {
            background-color: \${theme.colors.primary[600]};
          }
        \`;
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: 2px solid \${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
\`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </StyledButton>
  );
};`
    },
};
// Documentation Resources
const documentationResources = {
    'design-system-guide': {
        uri: 'docs://design-system-guide.md',
        name: 'Design System Implementation Guide',
        description: 'Comprehensive guide for implementing design systems',
        mimeType: 'text/markdown',
        handler: async () => `# Design System Implementation Guide

## Overview

A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.

## Key Components

### 1. Design Tokens
Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes.

**Benefits:**
- Consistency across platforms
- Easier maintenance
- Better collaboration between design and development

**Types of Tokens:**
- **Color**: Primary, secondary, semantic colors
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Margins, paddings, gaps
- **Sizing**: Widths, heights, max/min values
- **Border**: Radius, width, style
- **Shadow**: Box shadows, text shadows
- **Motion**: Transitions, animations

### 2. Component Library
A collection of reusable UI components that implement the design tokens.

**Best Practices:**
- Single responsibility principle
- Composable and flexible
- Accessible by default
- Well documented with examples
- Consistent API patterns

### 3. Documentation
Living documentation that explains how to use the design system.

**Should Include:**
- Component API documentation
- Usage guidelines
- Code examples
- Design principles
- Accessibility guidelines

## Implementation Strategy

### Phase 1: Foundation
1. **Audit existing designs** and identify common patterns
2. **Define design tokens** for colors, typography, spacing
3. **Set up tooling** for token management and distribution
4. **Create base styles** using the defined tokens

### Phase 2: Core Components
1. **Build foundational components** (Button, Input, Typography)
2. **Establish component patterns** and API conventions
3. **Implement accessibility** requirements
4. **Create comprehensive documentation**

### Phase 3: Advanced Components
1. **Build complex components** (DataTable, Modal, Navigation)
2. **Create layout components** (Grid, Stack, Container)
3. **Implement theming** and dark mode support
4. **Add animation** and interaction patterns

### Phase 4: Ecosystem
1. **Create development tools** (linting, testing utilities)
2. **Build design tools integration** (Figma plugins, Sketch libraries)
3. **Implement automated testing**
4. **Set up continuous integration**

## Technology Stack Recommendations

### Design Token Management
- **Style Dictionary**: Token transformation and distribution
- **Theo**: Salesforce's design token tool
- **Diez**: Cross-platform design token framework

### Component Development
- **React**: Component library framework
- **Styled Components**: CSS-in-JS styling
- **Emotion**: Performant CSS-in-JS library
- **Stitches**: CSS-in-JS with near-zero runtime

### Documentation
- **Storybook**: Component documentation and testing
- **Docusaurus**: Documentation websites
- **Gatsby**: Static site generation for docs

### Testing
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing utilities
- **Chromatic**: Visual regression testing

## Maintenance and Governance

### Version Management
- **Semantic versioning** for predictable updates
- **Changelog** documentation for all releases
- **Migration guides** for breaking changes
- **Deprecation warnings** before removing features

### Contribution Guidelines
- **RFC process** for significant changes
- **Code review** requirements
- **Design review** process
- **Accessibility checklist**

### Metrics and Success
- **Adoption rates** across teams and projects
- **Component usage** analytics
- **Developer satisfaction** surveys
- **Design consistency** audits

## Common Pitfalls to Avoid

1. **Over-engineering**: Start simple and iterate
2. **Lack of adoption**: Ensure easy onboarding
3. **Poor documentation**: Invest in clear examples
4. **Rigid constraints**: Allow for customization
5. **Neglecting accessibility**: Build it in from the start
6. **Version sprawl**: Maintain backward compatibility
7. **Siloed development**: Include stakeholders in decisions

## Resources

- [Design Systems Handbook](https://www.designbetter.co/design-systems-handbook)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [Design Tokens W3C Community Group](https://design-tokens.github.io/community-group/)
- [A11y Project](https://www.a11yproject.com/)
`
    },
};
// Combine all resources
export const designSystemResources = [
    ...Object.values(designTokenTemplates),
    ...Object.values(componentTemplates),
    ...Object.values(documentationResources),
];
//# sourceMappingURL=resources.js.map