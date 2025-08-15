# 📦 Publishing Guide for AINative Design System MCP Server

This guide explains how to publish the `ainative-design-system-mcp-server` package to npm.

## 🚀 Pre-Publishing Checklist

### 1. Verify Package Information
- [x] Package name: `ainative-design-system-mcp-server`
- [x] Version: `1.0.0` (semantic versioning)
- [x] Description: Comprehensive and clear
- [x] Keywords: Relevant for discoverability
- [x] License: MIT
- [x] Repository URLs: Updated
- [x] Binary command: `ainative-design-system-mcp`

### 2. Test the Package
- [x] Build compiles successfully (`npm run build`)
- [x] MCP server starts without errors
- [x] Binary is executable (`chmod +x build/index.js`)
- [x] Claude Code integration works
- [x] All tools respond correctly

### 3. Documentation
- [x] README.md updated with installation instructions
- [x] INSTALLATION.md with detailed setup guide
- [x] LICENSE file included
- [x] Package.json metadata complete

## 📋 Publishing to Global npm Registry

### Step 1: Create npm Account (if needed)

If you don't have an npm account:
```bash
# Go to https://www.npmjs.com/signup
# Or create via CLI
npm adduser
```

### Step 2: Prepare for Publishing

```bash
# Ensure you're in the correct directory
cd /Volumes/Cody/projects/AINative/src/backend/app/mcp_servers/design-system-mcp-server

# Clean and rebuild
npm run build

# Run tests (if available)
npm test

# Check package contents (this shows what will be published)
npm pack --dry-run

# Verify package.json settings
cat package.json | grep -E "(name|version|main|bin)"
```

### Step 3: Login to npm Registry

```bash
# Login to npm (you'll need an npm account)
npm login

# This will prompt for:
# Username: your-npm-username
# Password: your-npm-password
# Email: your-email@example.com
# One-time password (if 2FA enabled): 123456

# Verify login
npm whoami
# Should return your npm username
```

### Step 4: Publish to Global Registry

```bash
# IMPORTANT: Publish as PUBLIC package to global registry
npm publish --access public

# This command will:
# 1. Pack the package
# 2. Upload to registry.npmjs.org
# 3. Make it globally available for installation
```

### Step 5: Verify Global Publication

```bash
# Check package exists on npm registry
npm view ainative-design-system-mcp-server

# Check package details
npm view ainative-design-system-mcp-server version
npm view ainative-design-system-mcp-server description

# Test global installation (as end user would)
npm install -g ainative-design-system-mcp-server

# Test the binary command
ainative-design-system-mcp --version

# Check if command is globally available
which ainative-design-system-mcp
```

## 🌍 After Publishing - Global Access

Once published, **anyone in the world** can install your package with:

### For End Users:
```bash
# Install globally (recommended)
npm install -g ainative-design-system-mcp-server

# Add to Claude Code
claude mcp add ainative-design-system -- ainative-design-system-mcp

# Verify it works
claude mcp list
```

### Alternative Installation Methods:
```bash
# Install locally in project
npm install ainative-design-system-mcp-server

# Use with npx (no global install needed)
npx ainative-design-system-mcp-server

# Add to Claude Code with npx
claude mcp add ainative-design-system -- npx ainative-design-system-mcp-server
```

## 🔄 Version Updates & Republishing

For future updates to the global registry:

```bash
# Patch version (bug fixes: 1.0.0 → 1.0.1)
npm version patch
npm publish --access public

# Minor version (new features: 1.0.1 → 1.1.0)
npm version minor
npm publish --access public

# Major version (breaking changes: 1.1.0 → 2.0.0)
npm version major
npm publish --access public

# Check what version is live
npm view ainative-design-system-mcp-server versions --json
```

## 🌐 npm Registry Details

### Where Your Package Will Live:
- **Registry URL**: https://registry.npmjs.org/ainative-design-system-mcp-server
- **Public Page**: https://www.npmjs.com/package/ainative-design-system-mcp-server
- **Download Stats**: Available on npm website
- **Global Access**: Available to 40+ million npm users worldwide

### What Happens When You Publish:
1. **Package Upload**: Your package is uploaded to npm's CDN
2. **Global Distribution**: Available on npm mirrors worldwide
3. **Instant Access**: Anyone can `npm install` immediately
4. **Search Indexing**: Package appears in npm search
5. **Download Tracking**: npm tracks download statistics

## 📱 Simple Installation for End Users

After publishing, users can install with just **one command**:

```bash
# Global installation (works anywhere)
npm install -g ainative-design-system-mcp-server
```

### Complete Setup for New Users:
```bash
# Step 1: Install the package globally
npm install -g ainative-design-system-mcp-server

# Step 2: Add to Claude Code
claude mcp add ainative-design-system -- ainative-design-system-mcp

# Step 3: Verify it's working
claude mcp list

# Step 4: Start using with Claude!
# Users can now say: "Extract design tokens from my CSS file"
```

## 🔍 Publishing Verification Checklist

Before publishing, ensure:

```bash
# 1. Check package name is available
npm view ainative-design-system-mcp-server
# Should return "npm ERR! 404 Not Found" if available

# 2. Verify package contents
npm pack --dry-run

# 3. Test build
npm run build

# 4. Check binary works
./build/index.js --help

# 5. Verify package.json
grep -E "(name|version|bin|main)" package.json
```

## 🚨 Publishing Troubleshooting

### Common Issues:

#### "Package name already exists"
```bash
# Choose a different name or add scope
npm view ainative-design-system-mcp-server
# If exists, modify package.json name field
```

#### "403 Forbidden - you do not have permission"
```bash
# Make sure you're logged in
npm whoami

# Ensure public access
npm publish --access public
```

#### "402 Payment Required"
```bash
# For scoped packages, use public access
npm publish --access public
```

#### "Package not found after publishing"
```bash
# Wait a few minutes for CDN propagation
# Check on npmjs.com website
# Try: npm view ainative-design-system-mcp-server
```

#### "Binary command not working after install"
```bash
# Check if npm global bin is in PATH
npm config get prefix
echo $PATH

# Fix permissions if needed
chmod +x $(npm root -g)/ainative-design-system-mcp-server/build/index.js
```

## 📊 Post-Publishing

### Update Documentation
1. Update GitHub repository README with npm install instructions
2. Create release notes on GitHub
3. Update any external documentation

### Community
1. Announce on social media
2. Add to MCP server registries/lists
3. Submit to awesome-mcp lists

### Monitoring
1. Monitor npm download statistics
2. Watch for issues/bug reports
3. Respond to community feedback

## 🛠️ Package Contents

The published package will include:

```
ainative-design-system-mcp-server/
├── build/                          # Compiled JavaScript
│   ├── index.js                   # Main executable
│   ├── tools/                     # Tool implementations
│   ├── utils/                     # Utilities
│   └── resources.js               # Resource templates
├── README.md                      # Main documentation
├── INSTALLATION.md               # Installation guide
├── LICENSE                       # MIT license
└── package.json                  # Package metadata
```

## 🔍 Quality Checks

Before publishing, ensure:

- [ ] No sensitive information in code
- [ ] All dependencies are properly declared
- [ ] Binary works on different platforms
- [ ] Documentation is accurate
- [ ] Examples work correctly
- [ ] Error handling is robust

## 📞 Support Setup

After publishing:

1. **Monitor Issues**: Watch GitHub issues and npm package issues
2. **Documentation**: Keep README and installation guides updated
3. **Versions**: Follow semantic versioning strictly
4. **Security**: Monitor for security vulnerabilities
5. **Community**: Engage with users and contributors

## 🎯 Success Metrics

Track these metrics post-publication:

- Weekly/monthly downloads
- GitHub stars and forks
- Issue resolution time
- User feedback and reviews
- Integration reports from community

## 🔗 Useful Commands

```bash
# Check what will be published
npm pack --dry-run

# Check package info
npm view ainative-design-system-mcp-server

# Check download statistics
npm view ainative-design-system-mcp-server --json

# Update package
npm version patch && npm publish

# Unpublish (within 72 hours only)
npm unpublish ainative-design-system-mcp-server@1.0.0
```

---

**Ready to make design systems accessible to everyone through AI! 🚀**