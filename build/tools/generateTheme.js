/**
 * Generate Theme Tool
 *
 * Generates comprehensive theme configurations for various frameworks
 * based on input colors and design requirements.
 */
import chroma from 'chroma-js';
import { logger } from '../utils/logger.js';
function generateColorScale(baseColor, steps = 10) {
    const scale = {};
    try {
        const base = chroma(baseColor);
        // Generate lightness scale
        for (let i = 0; i < steps; i++) {
            const step = (i + 1) * (100 / (steps + 1));
            const lightness = step / 100;
            let color;
            if (lightness > 0.5) {
                // Lighter shades
                color = base.luminance(Math.min(0.9, lightness));
            }
            else {
                // Darker shades
                color = base.luminance(Math.max(0.05, lightness));
            }
            const stepValue = (i + 1) * (900 / steps);
            scale[stepValue.toString()] = color.hex();
        }
        // Add the base color at 500
        scale['500'] = base.hex();
    }
    catch (error) {
        logger.warn(`Failed to generate color scale for ${baseColor}`, { error });
        scale['500'] = baseColor;
    }
    return scale;
}
function generateSemanticColors(baseColors) {
    const semantic = {};
    // Default semantic colors if not enough base colors provided
    const defaults = {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
    };
    // Use base colors for semantic meanings if available
    if (baseColors.length >= 4) {
        semantic.success = baseColors[1] || defaults.success;
        semantic.warning = baseColors[2] || defaults.warning;
        semantic.error = baseColors[3] || defaults.error;
        semantic.info = baseColors[0] || defaults.info;
    }
    else {
        Object.assign(semantic, defaults);
    }
    return semantic;
}
function checkAccessibility(color1, color2, targetRatio = 4.5) {
    try {
        const ratio = chroma.contrast(color1, color2);
        return {
            ratio,
            compliant: ratio >= targetRatio,
        };
    }
    catch (error) {
        return { ratio: 0, compliant: false };
    }
}
function generateTailwindTheme(colors, options) {
    return {
        colors: {
            ...colors,
            transparent: 'transparent',
            current: 'currentColor',
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
    };
}
function generateStyledComponentsTheme(colors, options) {
    return {
        colors,
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
    };
}
function generateMaterialUITheme(colors, options) {
    const primary = colors.primary || colors[Object.keys(colors)[0]];
    const secondary = colors.secondary || colors[Object.keys(colors)[1]] || primary;
    return {
        palette: {
            primary: {
                light: primary['300'] || primary['100'] || primary,
                main: primary['500'] || primary,
                dark: primary['700'] || primary['900'] || primary,
                contrastText: '#ffffff',
            },
            secondary: {
                light: secondary['300'] || secondary['100'] || secondary,
                main: secondary['500'] || secondary,
                dark: secondary['700'] || secondary['900'] || secondary,
                contrastText: '#ffffff',
            },
            error: {
                main: colors.semantic?.error || '#ef4444',
            },
            warning: {
                main: colors.semantic?.warning || '#f59e0b',
            },
            info: {
                main: colors.semantic?.info || '#3b82f6',
            },
            success: {
                main: colors.semantic?.success || '#10b981',
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
            body1: {
                fontSize: '1rem',
                lineHeight: 1.5,
            },
            body2: {
                fontSize: '0.875rem',
                lineHeight: 1.4,
            },
        },
        spacing: 8,
        shape: {
            borderRadius: 6,
        },
    };
}
function generateCSSVariables(colors, options) {
    let css = ':root {\\n';
    // Generate color variables
    function addColorVariables(colorObj, prefix = 'color') {
        for (const [key, value] of Object.entries(colorObj)) {
            if (typeof value === 'object' && value !== null) {
                addColorVariables(value, `${prefix}-${key}`);
            }
            else {
                css += `  --${prefix}-${key}: ${value};\\n`;
            }
        }
    }
    addColorVariables(colors);
    // Add other design tokens
    css += `
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
`;
    css += '}';
    // Add dark mode variables if multiple modes requested
    if (options.modes?.includes('dark')) {
        css += `\\n\\n[data-theme="dark"] {\\n`;
        // Add dark mode overrides
        css += '}';
    }
    return css;
}
async function generateThemeHandler(args) {
    logger.info('Starting theme generation', { baseColors: args.baseColors, format: args.format });
    const { baseColors, modes = ['light'], format = 'json', accessibility = true, includeSemanticColors = true, contrastRatio = 4.5, } = args;
    if (!baseColors || baseColors.length === 0) {
        throw new Error('At least one base color is required');
    }
    // Generate color scales
    const colors = {};
    const colorNames = ['primary', 'secondary', 'tertiary', 'quaternary'];
    baseColors.forEach((color, index) => {
        const name = colorNames[index] || `color${index + 1}`;
        colors[name] = generateColorScale(color);
    });
    // Add semantic colors if requested
    if (includeSemanticColors) {
        colors.semantic = generateSemanticColors(baseColors);
    }
    // Add neutral grays
    colors.gray = generateColorScale('#6b7280');
    // Generate theme based on format
    let theme;
    switch (format) {
        case 'tailwind':
            theme = generateTailwindTheme(colors, args);
            break;
        case 'styled-components':
            theme = generateStyledComponentsTheme(colors, args);
            break;
        case 'material-ui':
            theme = generateMaterialUITheme(colors, args);
            break;
        case 'css-variables':
            theme = generateCSSVariables(colors, args);
            break;
        default:
            theme = { colors };
    }
    // Accessibility analysis
    const accessibilityIssues = [];
    const accessibilitySuggestions = [];
    let accessibilityCompliant = true;
    if (accessibility) {
        // Check primary color contrast against white and black
        const primaryColor = baseColors[0];
        const whiteContrast = checkAccessibility(primaryColor, '#ffffff', contrastRatio);
        const blackContrast = checkAccessibility(primaryColor, '#000000', contrastRatio);
        if (!whiteContrast.compliant && !blackContrast.compliant) {
            accessibilityCompliant = false;
            accessibilityIssues.push(`Primary color ${primaryColor} doesn't meet contrast requirements against white or black`);
            accessibilitySuggestions.push('Consider adjusting the lightness of your primary color');
        }
        // Check semantic colors
        if (includeSemanticColors && colors.semantic) {
            for (const [name, color] of Object.entries(colors.semantic)) {
                const contrast = checkAccessibility(color, '#ffffff', contrastRatio);
                if (!contrast.compliant) {
                    accessibilityIssues.push(`Semantic color ${name} (${color}) may not have sufficient contrast`);
                }
            }
        }
    }
    // Generate usage examples
    const examples = [];
    switch (format) {
        case 'tailwind':
            examples.push('bg-primary-500 text-white', 'text-primary-600 hover:text-primary-700', 'border-primary-300 focus:border-primary-500');
            break;
        case 'styled-components':
            examples.push('background-color: ${props => props.theme.colors.primary[500]};', 'color: ${props => props.theme.colors.semantic.success};', 'padding: ${props => props.theme.spacing.md};');
            break;
        case 'css-variables':
            examples.push('background-color: var(--color-primary-500);', 'color: var(--color-semantic-success);', 'padding: var(--spacing-md);');
            break;
    }
    const result = {
        theme,
        variations: {
            colors,
            scales: baseColors.map((color, index) => {
                const scale = generateColorScale(color);
                return Object.keys(scale).map(Number).filter(n => !isNaN(n));
            }).reduce((acc, scale, index) => {
                acc[colorNames[index] || `color${index + 1}`] = scale;
                return acc;
            }, {}),
        },
        accessibility: {
            compliant: accessibilityCompliant,
            issues: accessibilityIssues,
            suggestions: accessibilitySuggestions,
        },
        examples,
    };
    logger.info('Theme generation completed', {
        format,
        colorCount: baseColors.length,
        accessibilityCompliant,
        issueCount: accessibilityIssues.length,
    });
    return result;
}
export const generateThemeTool = {
    name: 'generateTheme',
    description: 'Generate comprehensive theme configuration from base colors',
    inputSchema: {
        type: 'object',
        properties: {
            baseColors: {
                type: 'array',
                items: { type: 'string' },
                description: 'Array of base colors in hex, rgb, or hsl format',
                minItems: 1,
            },
            modes: {
                type: 'array',
                items: { type: 'string', enum: ['light', 'dark', 'high-contrast'] },
                description: 'Theme modes to generate',
            },
            format: {
                type: 'string',
                enum: ['tailwind', 'styled-components', 'material-ui', 'css-variables', 'json'],
                description: 'Output format for the theme',
            },
            accessibility: {
                type: 'boolean',
                description: 'Enable accessibility compliance checking',
            },
            includeSemanticColors: {
                type: 'boolean',
                description: 'Include semantic colors (success, warning, error, info)',
            },
            contrastRatio: {
                type: 'number',
                minimum: 1,
                maximum: 21,
                description: 'Minimum contrast ratio for accessibility (WCAG AA: 4.5, AAA: 7)',
            },
        },
        required: ['baseColors'],
    },
    handler: generateThemeHandler,
};
//# sourceMappingURL=generateTheme.js.map