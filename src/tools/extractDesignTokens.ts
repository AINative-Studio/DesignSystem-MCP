/**
 * Extract Design Tokens Tool
 * 
 * Extracts design tokens from various file formats including CSS, SCSS, Less, and JSON.
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';
// @ts-ignore - css-tree doesn't have types
import * as csstree from 'css-tree';
import * as yaml from 'yaml';
import { DesignSystemTool } from './index.js';
import { logger } from '../utils/logger.js';

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

async function extractFromCSS(filePath: string): Promise<DesignToken[]> {
  const content = await fs.readFile(filePath, 'utf-8');
  const tokens: DesignToken[] = [];
  
  try {
    const ast = csstree.parse(content);
    
    csstree.walk(ast, (node: any) => {
      if (node.type === 'Rule') {
        const rule = node as any;
        if (rule.prelude && rule.prelude.type === 'SelectorList') {
          const selector = csstree.generate(rule.prelude);
          
          if (selector.includes(':root') || selector.includes('[data-theme')) {
            csstree.walk(rule.block, (declNode: any) => {
              if (declNode.type === 'Declaration') {
                const decl = declNode as any;
                const property = decl.property;
                const value = csstree.generate(decl.value);
                
                if (property.startsWith('--')) {
                  const token: DesignToken = {
                    name: property.slice(2),
                    value: value.replace(/['"]/g, ''),
                    type: inferTokenType(property, value),
                    category: inferCategory(property),
                    source: filePath,
                  };
                  
                  tokens.push(token);
                }
              }
            });
          }
        }
      }
    });
  } catch (error) {
    logger.error(`Failed to parse CSS file: ${filePath}`, { error });
  }
  
  return tokens;
}

async function extractFromSCSS(filePath: string): Promise<DesignToken[]> {
  const content = await fs.readFile(filePath, 'utf-8');
  const tokens: DesignToken[] = [];
  
  // Extract SCSS variables
  const variableRegex = /\$([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
  let match;
  
  while ((match = variableRegex.exec(content)) !== null) {
    const [, name, value] = match;
    
    const token: DesignToken = {
      name: name,
      value: value.trim(),
      type: inferTokenType(name, value),
      category: inferCategory(name),
      source: filePath,
    };
    
    tokens.push(token);
  }
  
  return tokens;
}

async function extractFromJSON(filePath: string): Promise<DesignToken[]> {
  const content = await fs.readJSON(filePath);
  const tokens: DesignToken[] = [];
  
  function processObject(obj: any, prefix = '', category = '') {
    for (const [key, value] of Object.entries(obj)) {
      const tokenName = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        if ('value' in value) {
          // Design Tokens format
          const tokenValue = value as any;
          const token: DesignToken = {
            name: tokenName,
            value: tokenValue.value as string | number,
            type: tokenValue.type || inferTokenType(tokenName, String(tokenValue.value)),
            category: category || inferCategory(tokenName),
            description: tokenValue.description,
            source: filePath,
          };
          tokens.push(token);
        } else {
          // Nested object
          processObject(value, tokenName, category || key);
        }
      } else {
        // Simple key-value pair
        const token: DesignToken = {
          name: tokenName,
          value: value as string | number,
          type: inferTokenType(tokenName, String(value)),
          category: category || inferCategory(tokenName),
          source: filePath,
        };
        tokens.push(token);
      }
    }
  }
  
  processObject(content);
  return tokens;
}

function inferTokenType(name: string, value: string): DesignToken['type'] {
  const lowerName = name.toLowerCase();
  const lowerValue = value.toString().toLowerCase();
  
  if (lowerName.includes('color') || lowerValue.includes('#') || lowerValue.includes('rgb') || lowerValue.includes('hsl')) {
    return 'color';
  }
  
  if (lowerName.includes('space') || lowerName.includes('margin') || lowerName.includes('padding') || lowerValue.includes('px') || lowerValue.includes('rem') || lowerValue.includes('em')) {
    return 'spacing';
  }
  
  if (lowerName.includes('font') || lowerName.includes('text') || lowerName.includes('type')) {
    return 'typography';
  }
  
  if (lowerName.includes('shadow') || lowerValue.includes('shadow')) {
    return 'shadow';
  }
  
  if (lowerName.includes('border') || lowerValue.includes('solid') || lowerValue.includes('dashed')) {
    return 'border';
  }
  
  return 'size';
}

function inferCategory(name: string): string {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('primary') || lowerName.includes('secondary') || lowerName.includes('accent')) {
    return 'brand';
  }
  
  if (lowerName.includes('success') || lowerName.includes('error') || lowerName.includes('warning') || lowerName.includes('info')) {
    return 'semantic';
  }
  
  if (lowerName.includes('gray') || lowerName.includes('neutral') || lowerName.includes('background')) {
    return 'neutral';
  }
  
  if (lowerName.includes('h1') || lowerName.includes('h2') || lowerName.includes('heading') || lowerName.includes('title')) {
    return 'heading';
  }
  
  if (lowerName.includes('body') || lowerName.includes('text') || lowerName.includes('paragraph')) {
    return 'body';
  }
  
  if (lowerName.includes('space') || lowerName.includes('gap') || lowerName.includes('margin') || lowerName.includes('padding')) {
    return 'spacing';
  }
  
  return 'misc';
}

function transformTokenName(name: string, transform: ExtractDesignTokensInput['transform']): string {
  switch (transform) {
    case 'kebab-case':
      return name.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
    case 'camelCase':
      return name.replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '');
    case 'snake_case':
      return name.replace(/[-\s]+/g, '_').replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
    default:
      return name;
  }
}

async function extractDesignTokensHandler(args: ExtractDesignTokensInput): Promise<TokenExtractionResult> {
  logger.info('Starting design token extraction', { source: args.source });
  
  const sources = Array.isArray(args.source) ? args.source : [args.source];
  const formats = args.formats || ['css', 'scss', 'json', 'yaml'];
  const allTokens: DesignToken[] = [];
  const sourceFiles: string[] = [];
  const warnings: string[] = [];
  const errors: string[] = [];
  
  for (const source of sources) {
    try {
      const isDirectory = (await fs.stat(source)).isDirectory();
      let files: string[] = [];
      
      if (isDirectory) {
        // Find all relevant files in directory
        const patterns = formats.map(fmt => `${source}/**/*.${fmt}`);
        for (const pattern of patterns) {
          const found = await glob(pattern);
          files.push(...found);
        }
      } else {
        files = [source];
      }
      
      for (const file of files) {
        const ext = path.extname(file).slice(1);
        sourceFiles.push(file);
        
        try {
          let tokens: DesignToken[] = [];
          
          switch (ext) {
            case 'css':
              tokens = await extractFromCSS(file);
              break;
            case 'scss':
              tokens = await extractFromSCSS(file);
              break;
            case 'json':
              tokens = await extractFromJSON(file);
              break;
            case 'yaml':
            case 'yml':
              const yamlContent = await fs.readFile(file, 'utf-8');
              const yamlData = yaml.parse(yamlContent);
              await fs.writeJSON(file.replace(/\.ya?ml$/, '.json'), yamlData);
              tokens = await extractFromJSON(file.replace(/\.ya?ml$/, '.json'));
              break;
            default:
              warnings.push(`Unsupported file format: ${ext} (${file})`);
              continue;
          }
          
          // Transform token names if requested
          if (args.transform) {
            tokens = tokens.map(token => ({
              ...token,
              name: transformTokenName(token.name, args.transform)
            }));
          }
          
          // Filter by categories if specified
          if (args.categories && args.categories.length > 0) {
            tokens = tokens.filter(token => args.categories!.includes(token.category));
          }
          
          allTokens.push(...tokens);
          
        } catch (error) {
          errors.push(`Failed to extract tokens from ${file}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
    } catch (error) {
      errors.push(`Failed to process source ${source}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  // Convert to record format
  const tokensRecord: Record<string, DesignToken> = {};
  allTokens.forEach(token => {
    tokensRecord[token.name] = token;
  });
  
  // Get unique categories
  const categories = [...new Set(allTokens.map(token => token.category))];
  
  const result: TokenExtractionResult = {
    tokens: tokensRecord,
    metadata: {
      sourceFiles,
      extractedAt: new Date().toISOString(),
      totalTokens: allTokens.length,
      categories,
    },
    validation: {
      valid: errors.length === 0,
      warnings,
      errors,
    },
  };
  
  // Write output file if specified
  if (args.output) {
    const outputExt = path.extname(args.output).slice(1);
    const outputDir = path.dirname(args.output);
    
    await fs.ensureDir(outputDir);
    
    switch (outputExt) {
      case 'json':
        await fs.writeJSON(args.output, result, { spaces: 2 });
        break;
      case 'yaml':
      case 'yml':
        await fs.writeFile(args.output, yaml.stringify(result));
        break;
      case 'js':
        const jsContent = `export const designTokens = ${JSON.stringify(result.tokens, null, 2)};\n\nexport const metadata = ${JSON.stringify(result.metadata, null, 2)};`;
        await fs.writeFile(args.output, jsContent);
        break;
      default:
        await fs.writeJSON(args.output.replace(/\.[^.]+$/, '.json'), result, { spaces: 2 });
        break;
    }
  }
  
  logger.info('Design token extraction completed', {
    totalTokens: allTokens.length,
    categories: categories.length,
    warnings: warnings.length,
    errors: errors.length,
  });
  
  return result;
}

export const extractDesignTokensTool: DesignSystemTool = {
  name: 'extractDesignTokens',
  description: 'Extract design tokens from CSS, SCSS, JSON, and YAML files',
  inputSchema: {
    type: 'object',
    properties: {
      source: {
        oneOf: [
          { type: 'string' },
          { type: 'array', items: { type: 'string' } }
        ],
        description: 'Source file path or directory, or array of paths'
      },
      categories: {
        type: 'array',
        items: { type: 'string' },
        description: 'Filter tokens by categories (colors, typography, spacing, etc.)'
      },
      formats: {
        type: 'array',
        items: { type: 'string', enum: ['css', 'scss', 'json', 'yaml'] },
        description: 'File formats to process'
      },
      output: {
        type: 'string',
        description: 'Output file path for extracted tokens'
      },
      transform: {
        type: 'string',
        enum: ['kebab-case', 'camelCase', 'snake_case'],
        description: 'Transform token names to specified case'
      },
      includeMetadata: {
        type: 'boolean',
        description: 'Include extraction metadata in the result'
      }
    },
    required: ['source']
  },
  handler: extractDesignTokensHandler,
};