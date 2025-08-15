/**
 * Input validation utilities for Design System MCP Server
 */
export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}
export declare function validateToolInput(toolName: string, input: any): ValidationResult;
export declare function validateColorValue(color: string): ValidationResult;
export declare function validateSpacingValue(spacing: string | number): ValidationResult;
export declare function validateTypographyValue(typography: any): ValidationResult;
//# sourceMappingURL=validation.d.ts.map