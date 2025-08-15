/**
 * Generate Theme Tool
 *
 * Generates comprehensive theme configurations for various frameworks
 * based on input colors and design requirements.
 */
import { DesignSystemTool } from './index.js';
export interface GenerateThemeInput {
    baseColors: string[];
    modes?: string[];
    format?: 'tailwind' | 'styled-components' | 'material-ui' | 'css-variables' | 'json';
    accessibility?: boolean;
    includeSemanticColors?: boolean;
    contrastRatio?: number;
}
export interface ThemeResult {
    theme: any;
    variations: {
        colors: Record<string, any>;
        scales: Record<string, number[]>;
    };
    accessibility: {
        compliant: boolean;
        issues: string[];
        suggestions: string[];
    };
    examples: string[];
}
export declare const generateThemeTool: DesignSystemTool;
//# sourceMappingURL=generateTheme.d.ts.map