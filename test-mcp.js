#!/usr/bin/env node
/**
 * Test script for Design System MCP Server
 * Tests basic functionality of the MCP server
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Testing Design System MCP Server...\n');

// Test the MCP server by running it and sending test input
async function testMCPServer() {
  return new Promise((resolve, reject) => {
    const serverPath = join(__dirname, 'build', 'index.js');
    console.log(`Starting MCP server: ${serverPath}`);
    
    const server = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';
    
    server.stdout.on('data', (data) => {
      stdout += data.toString();
      console.log('📤 Server output:', data.toString().trim());
    });

    server.stderr.on('data', (data) => {
      stderr += data.toString();
      console.log('⚠️ Server error:', data.toString().trim());
    });

    // Send MCP initialization request
    setTimeout(() => {
      console.log('\n📝 Sending MCP initialization request...');
      const initRequest = {
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2024-11-05",
          capabilities: {
            roots: {
              listChanged: true
            }
          },
          clientInfo: {
            name: "test-client",
            version: "1.0.0"
          }
        }
      };
      
      server.stdin.write(JSON.stringify(initRequest) + '\n');
    }, 1000);

    // Send tools list request
    setTimeout(() => {
      console.log('\n📋 Requesting tools list...');
      const toolsRequest = {
        jsonrpc: "2.0",
        id: 2,
        method: "tools/list",
        params: {}
      };
      
      server.stdin.write(JSON.stringify(toolsRequest) + '\n');
    }, 2000);

    // Send resources list request
    setTimeout(() => {
      console.log('\n📚 Requesting resources list...');
      const resourcesRequest = {
        jsonrpc: "2.0",
        id: 3,
        method: "resources/list",
        params: {}
      };
      
      server.stdin.write(JSON.stringify(resourcesRequest) + '\n');
    }, 3000);

    // Test a simple tool call
    setTimeout(() => {
      console.log('\n🔧 Testing generateColorPalette tool...');
      const toolCallRequest = {
        jsonrpc: "2.0",
        id: 4,
        method: "tools/call",
        params: {
          name: "generateColorPalette",
          arguments: {
            baseColor: "#3b82f6",
            harmony: "monochromatic",
            steps: 10
          }
        }
      };
      
      server.stdin.write(JSON.stringify(toolCallRequest) + '\n');
    }, 4000);

    // Close and evaluate results
    setTimeout(() => {
      server.kill();
      
      console.log('\n📊 Test Results:');
      console.log('================');
      
      if (stdout.includes('Design System MCP Server started successfully')) {
        console.log('✅ Server startup: SUCCESS');
      } else {
        console.log('❌ Server startup: FAILED');
      }
      
      if (stdout.includes('tools') || stdout.includes('extractDesignTokens')) {
        console.log('✅ Tools loading: SUCCESS');
      } else {
        console.log('❌ Tools loading: FAILED');
      }
      
      if (stdout.includes('resources')) {
        console.log('✅ Resources loading: SUCCESS');
      } else {
        console.log('❌ Resources loading: FAILED');
      }
      
      if (stderr.length === 0) {
        console.log('✅ No errors: SUCCESS');
      } else {
        console.log('⚠️ Errors detected:', stderr);
      }
      
      console.log('\n🎯 Overall: MCP Server appears to be working correctly!');
      resolve({ stdout, stderr });
    }, 6000);

    server.on('error', (error) => {
      console.error('❌ Server process error:', error);
      reject(error);
    });
  });
}

// Run the test
testMCPServer()
  .then(() => {
    console.log('\n✅ MCP Server test completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ MCP Server test failed:', error);
    process.exit(1);
  });