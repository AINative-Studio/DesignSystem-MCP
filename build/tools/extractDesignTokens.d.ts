/**
 * Extract Design Tokens Tool
 *
 * Extracts design tokens from various file formats including CSS, SCSS, Less, and JSON.
 */
import { DesignSystemTool } from './index.js';
export interface ExtractDesignTokensInput {
    source: string | string[];
    categories?: string[];
    formats?: string[];
    output?: string;
    transform?: 'kebab-case' | 'camelCase' | 'snake_case';
    includeMetadata?: boolean;
}
export interface DesignToken {
    name: string;
    value: string | number;
    type: 'color' | 'spacing' | 'typography' | 'shadow' | 'border' | 'size';
    category: string;
    description?: string;
    source: string;
}
export interface TokenExtractionResult {
    tokens: Record<string, DesignToken>;
    metadata: {
        sourceFiles: string[];
        extractedAt: string;
        totalTokens: number;
        categories: string[];
    };
    validation: {
        valid: boolean;
        warnings: string[];
        errors: string[];
    };
}
export declare const extractDesignTokensTool: DesignSystemTool;
//# sourceMappingURL=extractDesignTokens.d.ts.map