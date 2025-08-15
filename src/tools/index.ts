/**
 * Design System MCP Server Tools
 * 
 * Comprehensive tool collection for design system management, token extraction,
 * and component analysis.
 */

import { extractDesignTokensTool } from './extractDesignTokens.js';
import { analyzeComponentLibraryTool } from './analyzeComponentLibrary.js';
import { generateThemeTool } from './generateTheme.js';
import {
  createComponentDocsTool,
  validateDesignSystemTool,
  extractColorsFromImageTool,
  generateColorPaletteTool,
  convertTokenFormatTool,
  optimizeTokensTool,
  generateFrameworkConfigTool,
  analyzeAccessibilityTool,
  detectBreakpointsTool,
  extractTypographyScaleTool,
  generateSpacingSystemTool,
  createStyleGuideTool,
} from './stubs.js';

export interface DesignSystemTool {
  name: string;
  description: string;
  inputSchema: any;
  handler: (args: any) => Promise<any>;
}

export const designSystemTools: Record<string, DesignSystemTool> = {
  extractDesignTokens: extractDesignTokensTool,
  analyzeComponentLibrary: analyzeComponentLibraryTool,
  generateTheme: generateThemeTool,
  createComponentDocs: createComponentDocsTool,
  validateDesignSystem: validateDesignSystemTool,
  extractColorsFromImage: extractColorsFromImageTool,
  generateColorPalette: generateColorPaletteTool,
  convertTokenFormat: convertTokenFormatTool,
  optimizeTokens: optimizeTokensTool,
  generateFrameworkConfig: generateFrameworkConfigTool,
  analyzeAccessibility: analyzeAccessibilityTool,
  detectBreakpoints: detectBreakpointsTool,
  extractTypographyScale: extractTypographyScaleTool,
  generateSpacingSystem: generateSpacingSystemTool,
  createStyleGuide: createStyleGuideTool,
};