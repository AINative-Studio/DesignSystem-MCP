#!/usr/bin/env node

/**
 * AINative Design System MCP Server
 * 
 * A comprehensive MCP server for design system management, token extraction,
 * and component analysis. Provides AI assistants with powerful capabilities
 * to work with design systems, extract tokens, and generate documentation.
 * 
 * Install: npm install -g ainative-design-system-mcp-server
 * Usage: ainative-design-system-mcp
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { designSystemTools } from './tools/index.js';
import { designSystemResources } from './resources.js';
import { validateToolInput } from './utils/validation.js';
import { logger } from './utils/logger.js';

class DesignSystemServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'ainative-design-system-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupResourceHandlers();
    this.setupErrorHandling();
  }

  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      logger.info('Listing available design system tools');
      return {
        tools: Object.values(designSystemTools).map(tool => ({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
        })),
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      logger.info(`Executing tool: ${name}`, { args });

      const tool = designSystemTools[name];
      if (!tool) {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Tool "${name}" not found. Available tools: ${Object.keys(designSystemTools).join(', ')}`
        );
      }

      try {
        // Validate input
        const validationResult = validateToolInput(name, args || {});
        if (!validationResult.isValid) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Invalid parameters: ${validationResult.errors.join(', ')}`
          );
        }

        // Execute tool
        const result = await tool.handler(args || {});
        
        logger.info(`Tool ${name} executed successfully`, { 
          resultType: typeof result,
          hasContent: !!result 
        });

        return {
          content: [
            {
              type: 'text',
              text: typeof result === 'string' ? result : JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        logger.error(`Tool ${name} execution failed`, { error });
        
        if (error instanceof McpError) {
          throw error;
        }
        
        throw new McpError(
          ErrorCode.InternalError,
          `Tool execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  private setupResourceHandlers(): void {
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      logger.info('Listing available design system resources');
      return {
        resources: designSystemResources.map(resource => ({
          uri: resource.uri,
          name: resource.name,
          description: resource.description,
          mimeType: resource.mimeType,
        })),
      };
    });

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;
      
      logger.info(`Reading resource: ${uri}`);

      const resource = designSystemResources.find(r => r.uri === uri);
      if (!resource) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Resource not found: ${uri}`
        );
      }

      try {
        const content = await resource.handler();
        
        logger.info(`Resource ${uri} read successfully`);

        return {
          contents: [
            {
              uri,
              mimeType: resource.mimeType,
              text: typeof content === 'string' ? content : JSON.stringify(content, null, 2),
            },
          ],
        };
      } catch (error) {
        logger.error(`Resource ${uri} read failed`, { error });
        
        throw new McpError(
          ErrorCode.InternalError,
          `Failed to read resource: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      logger.error('Server error occurred', { error });
    };

    process.on('SIGINT', async () => {
      logger.info('Received SIGINT, shutting down gracefully');
      await this.server.close();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      logger.info('Received SIGTERM, shutting down gracefully');
      await this.server.close();
      process.exit(0);
    });
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    
    logger.info('Starting AINative Design System MCP Server');
    logger.info(`Available tools: ${Object.keys(designSystemTools).join(', ')}`);
    logger.info(`Available resources: ${designSystemResources.length} resources`);

    await this.server.connect(transport);
    
    logger.info('AINative Design System MCP Server started successfully');
  }
}

// Start the server
const server = new DesignSystemServer();
server.start().catch((error) => {
  logger.error('Failed to start server', { error });
  process.exit(1);
});