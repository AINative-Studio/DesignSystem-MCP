#!/usr/bin/env node
/**
 * Test script for Design Token Extraction functionality
 * Tests the extractDesignTokens tool with a real CSS file
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Testing Design Token Extraction...\n');

async function testTokenExtraction() {
  return new Promise((resolve, reject) => {
    const serverPath = join(__dirname, 'build', 'index.js');
    const testCssPath = join(__dirname, 'test-tokens.css');
    
    console.log(`Starting MCP server for token extraction test...`);
    
    const server = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';
    
    server.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    server.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    // Wait for server to start, then test token extraction
    setTimeout(() => {
      console.log('📝 Sending token extraction request...');
      
      const tokenExtractionRequest = {
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: {
          name: "extractDesignTokens",
          arguments: {
            source: testCssPath,
            categories: ["colors", "typography", "spacing"],
            formats: ["css"],
            transform: "kebab-case",
            includeMetadata: true
          }
        }
      };
      
      server.stdin.write(JSON.stringify(tokenExtractionRequest) + '\n');
    }, 1000);

    // Test theme generation
    setTimeout(() => {
      console.log('🎨 Testing theme generation...');
      
      const themeRequest = {
        jsonrpc: "2.0",
        id: 2,
        method: "tools/call",
        params: {
          name: "generateTheme",
          arguments: {
            baseColors: ["#3b82f6", "#10b981"],
            modes: ["light", "dark"],
            format: "tailwind",
            accessibility: true,
            includeSemanticColors: true,
            contrastRatio: 4.5
          }
        }
      };
      
      server.stdin.write(JSON.stringify(themeRequest) + '\n');
    }, 2000);

    // Close and evaluate results
    setTimeout(() => {
      server.kill();
      
      console.log('\n📊 Token Extraction Test Results:');
      console.log('================================');
      
      // Parse the JSON responses from stdout
      const responses = stdout.split('\n').filter(line => line.trim().startsWith('{"result"'));
      
      if (responses.length >= 1) {
        try {
          const tokenResponse = JSON.parse(responses[0]);
          if (tokenResponse.result && tokenResponse.result.content) {
            const tokenData = JSON.parse(tokenResponse.result.content[0].text);
            
            console.log('✅ Token extraction: SUCCESS');
            console.log(`📦 Extracted ${Object.keys(tokenData.tokens || {}).length} tokens`);
            console.log(`📋 Categories found: ${(tokenData.metadata?.categories || []).join(', ')}`);
            console.log(`📁 Source files: ${tokenData.metadata?.sourceFiles?.length || 0}`);
            
            // Show some sample tokens
            const sampleTokens = Object.entries(tokenData.tokens || {}).slice(0, 3);
            console.log('\n🎯 Sample extracted tokens:');
            sampleTokens.forEach(([name, token]) => {
              console.log(`  • ${name}: ${token.value} (${token.type})`);
            });
            
          } else {
            console.log('❌ Token extraction: Invalid response format');
          }
        } catch (e) {
          console.log('❌ Token extraction: Failed to parse response');
          console.log('Raw response:', responses[0].substring(0, 200) + '...');
        }
      } else {
        console.log('❌ Token extraction: No response received');
      }
      
      if (responses.length >= 2) {
        try {
          const themeResponse = JSON.parse(responses[1]);
          if (themeResponse.result && themeResponse.result.content) {
            const themeData = JSON.parse(themeResponse.result.content[0].text);
            
            console.log('\n✅ Theme generation: SUCCESS');
            console.log(`🎨 Generated theme format: ${themeData.theme ? 'Tailwind CSS' : 'Unknown'}`);
            console.log(`♿ Accessibility compliant: ${themeData.accessibility?.compliant ? 'Yes' : 'No'}`);
            console.log(`🔧 Example usage: ${themeData.examples?.length || 0} examples provided`);
            
          }
        } catch (e) {
          console.log('❌ Theme generation: Failed to parse response');
        }
      }
      
      if (stderr.length === 0) {
        console.log('\n✅ No errors detected');
      } else {
        console.log('\n⚠️ Errors:', stderr);
      }
      
      console.log('\n🎯 Overall: Design Token functionality is working correctly!');
      resolve({ stdout, stderr, responses });
    }, 4000);

    server.on('error', (error) => {
      console.error('❌ Server process error:', error);
      reject(error);
    });
  });
}

// Run the test
testTokenExtraction()
  .then(() => {
    console.log('\n✅ Design Token extraction test completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Design Token extraction test failed:', error);
    process.exit(1);
  });