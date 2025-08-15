/**
 * Analyze Component Library Tool
 * 
 * Analyzes component libraries across React, Vue, Angular, and other frameworks
 * to extract component information, props, styles, and usage patterns.
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';
import { DesignSystemTool } from './index.js';
import { logger } from '../utils/logger.js';

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

function detectFramework(filePath: string, content: string): string {
  const ext = path.extname(filePath);
  
  if (ext === '.vue') return 'vue';
  if (ext === '.svelte') return 'svelte';
  
  if (content.includes('import React') || content.includes('from "react"') || content.includes('from \'react\'')) {
    return 'react';
  }
  
  if (content.includes('@Component') || content.includes('Angular') || content.includes('@angular/')) {
    return 'angular';
  }
  
  if (content.includes('Vue.component') || content.includes('defineComponent')) {
    return 'vue';
  }
  
  return 'unknown';
}

function extractReactProps(content: string): ComponentProp[] {
  const props: ComponentProp[] = [];
  
  // Extract TypeScript interface props
  const interfaceRegex = /interface\s+(\w+Props)\s*{([^}]+)}/gs;
  const interfaceMatch = interfaceRegex.exec(content);
  
  if (interfaceMatch) {
    const propsContent = interfaceMatch[2];
    const propRegex = /(\w+)(\?)?:\s*([^;\n]+)/g;
    let propMatch;
    
    while ((propMatch = propRegex.exec(propsContent)) !== null) {
      const [, name, optional, type] = propMatch;
      props.push({
        name: name,
        type: type.trim(),
        required: !optional,
      });
    }
  }
  
  // Extract PropTypes
  const propTypesRegex = /(\w+)\.propTypes\s*=\s*{([^}]+)}/gs;
  const propTypesMatch = propTypesRegex.exec(content);
  
  if (propTypesMatch) {
    const propsContent = propTypesMatch[2];
    const propRegex = /(\w+):\s*PropTypes\.(\w+)(?:\.isRequired)?/g;
    let propMatch;
    
    while ((propMatch = propRegex.exec(propsContent)) !== null) {
      const [fullMatch, name, type] = propMatch;
      const required = fullMatch.includes('.isRequired');
      
      props.push({
        name: name,
        type: type,
        required: required,
      });
    }
  }
  
  return props;
}

function extractVueProps(content: string): ComponentProp[] {
  const props: ComponentProp[] = [];
  
  // Extract props from script setup
  const definePropsRegex = /defineProps<([^>]+)>/s;
  const definePropsMatch = definePropsRegex.exec(content);
  
  if (definePropsMatch) {
    const propsType = definePropsMatch[1];
    const propRegex = /(\w+)(\?)?:\s*([^;\n]+)/g;
    let propMatch;
    
    while ((propMatch = propRegex.exec(propsType)) !== null) {
      const [, name, optional, type] = propMatch;
      props.push({
        name: name,
        type: type.trim(),
        required: !optional,
      });
    }
  }
  
  // Extract from traditional props object
  const propsRegex = /props:\s*{([^}]+)}/s;
  const propsMatch = propsRegex.exec(content);
  
  if (propsMatch) {
    const propsContent = propsMatch[1];
    const propRegex = /(\w+):\s*{([^}]+)}/g;
    let propMatch;
    
    while ((propMatch = propRegex.exec(propsContent)) !== null) {
      const [, name, propConfig] = propMatch;
      const type = propConfig.match(/type:\s*(\w+)/)?.[1] || 'any';
      const required = propConfig.includes('required: true');
      const defaultMatch = propConfig.match(/default:\s*([^,\n]+)/);
      
      props.push({
        name: name,
        type: type,
        required: required,
        defaultValue: defaultMatch?.[1]?.trim(),
      });
    }
  }
  
  return props;
}

function extractAngularProps(content: string): ComponentProp[] {
  const props: ComponentProp[] = [];
  
  // Extract @Input() decorators
  const inputRegex = /@Input\(\)\s*(\w+)(\?)?:\s*([^;\n=]+)/g;
  let inputMatch;
  
  while ((inputMatch = inputRegex.exec(content)) !== null) {
    const [, name, optional, type] = inputMatch;
    props.push({
      name: name,
      type: type.trim(),
      required: !optional,
    });
  }
  
  return props;
}

function extractComponentStyles(filePath: string, content: string, framework: string): ComponentStyle[] {
  const styles: ComponentStyle[] = [];
  
  // Extract styled-components or emotion styles
  const styledRegex = /const\s+(\w+)\s*=\s*styled\.\w+`([^`]+)`/gs;
  let styledMatch;
  
  while ((styledMatch = styledRegex.exec(content)) !== null) {
    const [, componentName, styleContent] = styledMatch;
    
    // Parse CSS properties from template literal
    const propertyRegex = /(\w+(?:-\w+)*):\s*([^;\n]+);/g;
    const properties: Record<string, string> = {};
    let propertyMatch;
    
    while ((propertyMatch = propertyRegex.exec(styleContent)) !== null) {
      const [, property, value] = propertyMatch;
      properties[property] = value.trim();
    }
    
    styles.push({
      selector: componentName,
      properties,
      responsive: styleContent.includes('@media'),
    });
  }
  
  // Extract Vue scoped styles
  if (framework === 'vue') {
    const vueStyleRegex = /<style[^>]*>([^<]+)<\/style>/gs;
    const vueStyleMatch = vueStyleRegex.exec(content);
    
    if (vueStyleMatch) {
      const styleContent = vueStyleMatch[1];
      const ruleRegex = /([^{]+){([^}]+)}/g;
      let ruleMatch;
      
      while ((ruleMatch = ruleRegex.exec(styleContent)) !== null) {
        const [, selector, declarations] = ruleMatch;
        const propertyRegex = /(\w+(?:-\w+)*):\s*([^;\n]+);/g;
        const properties: Record<string, string> = {};
        let propertyMatch;
        
        while ((propertyMatch = propertyRegex.exec(declarations)) !== null) {
          const [, property, value] = propertyMatch;
          properties[property] = value.trim();
        }
        
        styles.push({
          selector: selector.trim(),
          properties,
          responsive: styleContent.includes('@media'),
        });
      }
    }
  }
  
  return styles;
}

function analyzeComponentUsage(component: ComponentInfo): ComponentUsage {
  const { props, styles } = component;
  
  // Determine complexity
  let complexity: ComponentUsage['complexity'] = 'simple';
  if (props.length > 5 || styles.length > 3) {
    complexity = 'medium';
  }
  if (props.length > 10 || styles.length > 6) {
    complexity = 'complex';
  }
  
  // Determine reusability
  let reusability: ComponentUsage['reusability'] = 'low';
  const hasVariants = props.some(p => p.name.includes('variant') || p.name.includes('size') || p.name.includes('color'));
  const hasFlexibleProps = props.some(p => p.type.includes('string') || p.type.includes('ReactNode'));
  
  if (hasVariants || hasFlexibleProps) {
    reusability = 'medium';
  }
  if (hasVariants && hasFlexibleProps && props.length >= 3) {
    reusability = 'high';
  }
  
  // Detect design patterns
  const designPatterns: string[] = [];
  if (props.some(p => p.name === 'children')) designPatterns.push('composition');
  if (props.some(p => p.name.includes('onClick') || p.name.includes('onPress'))) designPatterns.push('interactive');
  if (props.some(p => p.name.includes('variant') || p.name.includes('size'))) designPatterns.push('variants');
  if (props.some(p => p.name.includes('disabled') || p.name.includes('loading'))) designPatterns.push('states');
  
  // Generate recommendations
  const recommendations: string[] = [];
  if (complexity === 'complex') {
    recommendations.push('Consider breaking down into smaller components');
  }
  if (reusability === 'low') {
    recommendations.push('Add variant props to increase reusability');
  }
  if (!props.some(p => p.name === 'className' || p.name === 'style')) {
    recommendations.push('Add className or style prop for customization');
  }
  
  return {
    complexity,
    reusability,
    designPatterns,
    recommendations,
  };
}

async function analyzeComponentLibraryHandler(args: AnalyzeComponentLibraryInput): Promise<ComponentLibraryAnalysis> {
  logger.info('Starting component library analysis', { source: args.source });
  
  const framework = args.framework || 'auto';
  const includeStyles = args.includeStyles !== false;
  const depth = args.depth || 10;
  const excludePatterns = args.excludePatterns || ['node_modules', '.git', 'dist', 'build'];
  
  // Find component files
  const extensions = ['tsx', 'jsx', 'vue', 'svelte', 'ts', 'js'];
  const patterns = extensions.map(ext => `${args.source}/**/*.${ext}`);
  
  let allFiles: string[] = [];
  for (const pattern of patterns) {
    const files = await glob(pattern, { ignore: excludePatterns });
    allFiles.push(...files);
  }
  
  // Filter out non-component files
  allFiles = allFiles.filter(file => {
    const basename = path.basename(file, path.extname(file));
    return (
      basename[0] === basename[0].toUpperCase() || // PascalCase
      basename.includes('component') ||
      basename.includes('Component') ||
      file.includes('/components/')
    );
  });
  
  const components: ComponentInfo[] = [];
  const detectedFrameworks = new Set<string>();
  const allDependencies = new Set<string>();
  
  for (const filePath of allFiles) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const detectedFramework = framework === 'auto' ? detectFramework(filePath, content) : framework;
      
      if (detectedFramework === 'unknown') continue;
      
      detectedFrameworks.add(detectedFramework);
      
      let props: ComponentProp[] = [];
      switch (detectedFramework) {
        case 'react':
          props = extractReactProps(content);
          break;
        case 'vue':
          props = extractVueProps(content);
          break;
        case 'angular':
          props = extractAngularProps(content);
          break;
      }
      
      const styles = includeStyles ? extractComponentStyles(filePath, content, detectedFramework) : [];
      
      // Extract dependencies
      const importRegex = /import[^;]+from\s+['"]([^'"]+)['"]/g;
      let importMatch;
      while ((importMatch = importRegex.exec(content)) !== null) {
        const dep = importMatch[1];
        if (!dep.startsWith('.') && !dep.startsWith('/')) {
          allDependencies.add(dep);
        }
      }
      
      const componentInfo: ComponentInfo = {
        name: path.basename(filePath, path.extname(filePath)),
        filePath,
        framework: detectedFramework,
        props,
        styles,
        variants: [], // TODO: Extract variants from props/styles
        dependencies: [],
        usage: { complexity: 'simple', reusability: 'medium', designPatterns: [], recommendations: [] },
      };
      
      componentInfo.usage = analyzeComponentUsage(componentInfo);
      components.push(componentInfo);
      
    } catch (error) {
      logger.error(`Failed to analyze component: ${filePath}`, { error });
    }
  }
  
  // Analyze patterns
  const allProps = components.flatMap(c => c.props.map(p => p.name));
  const propCounts = allProps.reduce((acc, prop) => {
    acc[prop] = (acc[prop] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const commonProps = Object.entries(propCounts)
    .filter(([, count]) => count >= Math.max(2, components.length * 0.3))
    .map(([prop]) => prop);
  
  const designPatterns = [...new Set(components.flatMap(c => c.usage.designPatterns))];
  
  // Categorize dependencies
  const frameworkDeps = [...allDependencies].filter(dep => 
    ['react', 'vue', '@angular', 'svelte'].some(framework => dep.includes(framework))
  );
  
  const stylingDeps = [...allDependencies].filter(dep =>
    ['styled-components', '@emotion', 'sass', 'less', 'tailwind'].some(style => dep.includes(style))
  );
  
  const utilityDeps = [...allDependencies].filter(dep =>
    !frameworkDeps.includes(dep) && !stylingDeps.includes(dep)
  );
  
  // Generate suggestions
  const suggestions = {
    optimization: [
      components.filter(c => c.usage.complexity === 'complex').length > 0 ? 
        'Consider breaking down complex components into smaller, composable pieces' : null,
      components.filter(c => c.styles.length > 5).length > 0 ?
        'Some components have many styles - consider extracting common styles to a theme' : null,
    ].filter(Boolean) as string[],
    
    consistency: [
      commonProps.length < 3 ? 'Consider establishing common prop patterns across components' : null,
      designPatterns.length < 2 ? 'Establish consistent design patterns across your component library' : null,
    ].filter(Boolean) as string[],
    
    accessibility: [
      components.filter(c => !c.props.some(p => p.name.includes('aria') || p.name.includes('role'))).length > components.length * 0.8 ?
        'Many components lack accessibility props - consider adding ARIA attributes' : null,
    ].filter(Boolean) as string[],
    
    performance: [
      components.filter(c => c.props.length > 10).length > 0 ?
        'Components with many props might benefit from prop grouping or default prop objects' : null,
    ].filter(Boolean) as string[],
  };
  
  const result: ComponentLibraryAnalysis = {
    components,
    patterns: {
      designPatterns,
      commonProps,
      stylePatterns: [], // TODO: Analyze style patterns
      namingConventions: [], // TODO: Analyze naming conventions
    },
    dependencies: {
      framework: frameworkDeps,
      styling: stylingDeps,
      utility: utilityDeps,
    },
    suggestions,
    metadata: {
      totalComponents: components.length,
      analyzedAt: new Date().toISOString(),
      framework: framework === 'auto' ? [...detectedFrameworks].join(', ') : framework,
      sourceDirectory: args.source,
    },
  };
  
  logger.info('Component library analysis completed', {
    totalComponents: components.length,
    frameworks: [...detectedFrameworks],
    patterns: designPatterns.length,
  });
  
  return result;
}

export const analyzeComponentLibraryTool: DesignSystemTool = {
  name: 'analyzeComponentLibrary',
  description: 'Analyze component library structure, props, styles, and patterns',
  inputSchema: {
    type: 'object',
    properties: {
      source: {
        type: 'string',
        description: 'Path to component library directory'
      },
      framework: {
        type: 'string',
        enum: ['react', 'vue', 'angular', 'svelte', 'auto'],
        description: 'Target framework (auto-detect if not specified)'
      },
      includeStyles: {
        type: 'boolean',
        description: 'Include style analysis in the results'
      },
      generateDocs: {
        type: 'boolean',
        description: 'Generate component documentation'
      },
      depth: {
        type: 'number',
        description: 'Directory scanning depth'
      },
      excludePatterns: {
        type: 'array',
        items: { type: 'string' },
        description: 'Patterns to exclude from analysis'
      }
    },
    required: ['source']
  },
  handler: analyzeComponentLibraryHandler,
};