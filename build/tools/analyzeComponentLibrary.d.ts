/**
 * Analyze Component Library Tool
 *
 * Analyzes component libraries across React, Vue, Angular, and other frameworks
 * to extract component information, props, styles, and usage patterns.
 */
import { DesignSystemTool } from './index.js';
export interface AnalyzeComponentLibraryInput {
    source: string;
    framework?: 'react' | 'vue' | 'angular' | 'svelte' | 'auto';
    includeStyles?: boolean;
    generateDocs?: boolean;
    depth?: number;
    excludePatterns?: string[];
}
export interface ComponentInfo {
    name: string;
    filePath: string;
    framework: string;
    props: ComponentProp[];
    styles: ComponentStyle[];
    variants: ComponentVariant[];
    dependencies: string[];
    usage: ComponentUsage;
    documentation?: string;
}
export interface ComponentProp {
    name: string;
    type: string;
    required: boolean;
    defaultValue?: string;
    description?: string;
}
export interface ComponentStyle {
    selector: string;
    properties: Record<string, string>;
    responsive?: boolean;
    variants?: string[];
}
export interface ComponentVariant {
    name: string;
    props: Record<string, any>;
    description?: string;
}
export interface ComponentUsage {
    complexity: 'simple' | 'medium' | 'complex';
    reusability: 'low' | 'medium' | 'high';
    designPatterns: string[];
    recommendations: string[];
}
export interface ComponentLibraryAnalysis {
    components: ComponentInfo[];
    patterns: {
        designPatterns: string[];
        commonProps: string[];
        stylePatterns: string[];
        namingConventions: string[];
    };
    dependencies: {
        framework: string[];
        styling: string[];
        utility: string[];
    };
    suggestions: {
        optimization: string[];
        consistency: string[];
        accessibility: string[];
        performance: string[];
    };
    metadata: {
        totalComponents: number;
        analyzedAt: string;
        framework: string;
        sourceDirectory: string;
    };
}
export declare const analyzeComponentLibraryTool: DesignSystemTool;
//# sourceMappingURL=analyzeComponentLibrary.d.ts.map