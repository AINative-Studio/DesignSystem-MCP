/**
 * Input validation utilities for Design System MCP Server
 */
import { designSystemTools } from '../tools/index.js';
export function validateToolInput(toolName, input) {
    const tool = designSystemTools[toolName];
    if (!tool) {
        return {
            isValid: false,
            errors: [`Tool "${toolName}" not found`],
            warnings: [],
        };
    }
    const schema = tool.inputSchema;
    const result = validateAgainstSchema(input, schema);
    return result;
}
function validateAgainstSchema(data, schema) {
    const errors = [];
    const warnings = [];
    // Basic type validation
    if (schema.type && typeof data !== schema.type && schema.type !== 'object') {
        if (!(schema.type === 'array' && Array.isArray(data))) {
            errors.push(`Expected ${schema.type}, got ${typeof data}`);
        }
    }
    // Required properties validation
    if (schema.required && Array.isArray(schema.required)) {
        for (const required of schema.required) {
            if (!(required in data) || data[required] === undefined || data[required] === null) {
                errors.push(`Missing required property: ${required}`);
            }
        }
    }
    // Properties validation
    if (schema.properties && typeof data === 'object' && data !== null) {
        for (const [key, value] of Object.entries(data)) {
            const propSchema = schema.properties[key];
            if (propSchema) {
                const propResult = validateProperty(value, propSchema, key);
                errors.push(...propResult.errors);
                warnings.push(...propResult.warnings);
            }
        }
    }
    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}
function validateProperty(value, schema, propertyName) {
    const errors = [];
    const warnings = [];
    // Type validation
    if (schema.type) {
        if (schema.type === 'array' && !Array.isArray(value)) {
            errors.push(`Property ${propertyName}: expected array, got ${typeof value}`);
        }
        else if (schema.type !== 'array' && typeof value !== schema.type) {
            errors.push(`Property ${propertyName}: expected ${schema.type}, got ${typeof value}`);
        }
    }
    // Enum validation
    if (schema.enum && !schema.enum.includes(value)) {
        errors.push(`Property ${propertyName}: value "${value}" not in allowed values: ${schema.enum.join(', ')}`);
    }
    // Array items validation
    if (schema.type === 'array' && schema.items && Array.isArray(value)) {
        value.forEach((item, index) => {
            const itemResult = validateProperty(item, schema.items, `${propertyName}[${index}]`);
            errors.push(...itemResult.errors);
            warnings.push(...itemResult.warnings);
        });
    }
    // OneOf validation
    if (schema.oneOf) {
        const validOptions = schema.oneOf.filter((option) => {
            const optionResult = validateProperty(value, option, propertyName);
            return optionResult.isValid;
        });
        if (validOptions.length === 0) {
            errors.push(`Property ${propertyName}: value does not match any of the allowed schemas`);
        }
    }
    // String length validation
    if (schema.minLength && typeof value === 'string' && value.length < schema.minLength) {
        errors.push(`Property ${propertyName}: string too short (minimum ${schema.minLength} characters)`);
    }
    if (schema.maxLength && typeof value === 'string' && value.length > schema.maxLength) {
        errors.push(`Property ${propertyName}: string too long (maximum ${schema.maxLength} characters)`);
    }
    // Number range validation
    if (schema.minimum && typeof value === 'number' && value < schema.minimum) {
        errors.push(`Property ${propertyName}: value ${value} is below minimum ${schema.minimum}`);
    }
    if (schema.maximum && typeof value === 'number' && value > schema.maximum) {
        errors.push(`Property ${propertyName}: value ${value} is above maximum ${schema.maximum}`);
    }
    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}
// Specific validation functions for design system data
export function validateColorValue(color) {
    const errors = [];
    const warnings = [];
    const hexRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
    const rgbRegex = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
    const rgbaRegex = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[0-1](\.\d+)?\s*\)$/;
    const hslRegex = /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/;
    const hslaRegex = /^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[0-1](\.\d+)?\s*\)$/;
    const isValid = hexRegex.test(color) ||
        rgbRegex.test(color) ||
        rgbaRegex.test(color) ||
        hslRegex.test(color) ||
        hslaRegex.test(color) ||
        ['transparent', 'currentColor', 'inherit'].includes(color);
    if (!isValid) {
        errors.push(`Invalid color value: ${color}`);
    }
    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}
export function validateSpacingValue(spacing) {
    const errors = [];
    const warnings = [];
    if (typeof spacing === 'number') {
        if (spacing < 0) {
            warnings.push('Negative spacing values may cause layout issues');
        }
        return { isValid: true, errors, warnings };
    }
    if (typeof spacing === 'string') {
        const validUnits = ['px', 'em', 'rem', '%', 'vh', 'vw', 'ch', 'ex'];
        const hasValidUnit = validUnits.some(unit => spacing.endsWith(unit));
        if (!hasValidUnit && spacing !== '0' && spacing !== 'auto') {
            errors.push(`Invalid spacing unit in "${spacing}". Valid units: ${validUnits.join(', ')}`);
        }
        const numericPart = parseFloat(spacing);
        if (isNaN(numericPart) && spacing !== 'auto') {
            errors.push(`Invalid numeric value in spacing: ${spacing}`);
        }
    }
    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}
export function validateTypographyValue(typography) {
    const errors = [];
    const warnings = [];
    if (typeof typography === 'object' && typography !== null) {
        // Validate font family
        if (typography.fontFamily && typeof typography.fontFamily !== 'string') {
            errors.push('fontFamily must be a string');
        }
        // Validate font size
        if (typography.fontSize) {
            const sizeResult = validateSpacingValue(typography.fontSize);
            errors.push(...sizeResult.errors.map(e => `fontSize: ${e}`));
            warnings.push(...sizeResult.warnings.map(w => `fontSize: ${w}`));
        }
        // Validate font weight
        if (typography.fontWeight) {
            const validWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold', 'lighter', 'bolder'];
            if (!validWeights.includes(typography.fontWeight)) {
                errors.push(`Invalid font weight: ${typography.fontWeight}`);
            }
        }
        // Validate line height
        if (typography.lineHeight && typeof typography.lineHeight !== 'number' && typeof typography.lineHeight !== 'string') {
            errors.push('lineHeight must be a number or string');
        }
    }
    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}
//# sourceMappingURL=validation.js.map