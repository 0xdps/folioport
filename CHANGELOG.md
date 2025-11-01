# Changelog

All notable changes to FolioPort will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-11-01

### 🔄 Version Bump

This release increments the version to 2.0.0 due to NPM registry constraints. The previous v1.0.0 package was unpublished from NPM, and NPM does not allow republishing the same version number.

**All features from v1.0.0 are included in this release.**

---

## [1.0.0] - 2025-11-01

### 🎉 Major Release - Complete Project Restructure

This is the first major release of FolioPort with a complete project restructure and significant new features.

### ✨ Added

#### **Three Beautiful Themes**
- **Default Theme** - Clean, professional design with teal accents
- **Minimal Theme** - Ultra-clean, typography-focused with subtle animations
- **Vibrant Theme** - Bold, colorful with advanced animations and gradient backgrounds

#### **Theme System**
- Interactive theme selection during project initialization
- CLI support for theme selection (`--theme default|minimal|vibrant`)
- Easy theme switching by updating config and rebuilding
- All themes support dark mode, responsive design, and accessibility

#### **Multi-Format Configuration Support**
- JSON format support (`.json`)
- YAML format support (`.yaml` or `.yml`)
- TOML format support (`.toml`)
- Automatic format detection
- All commands work with any format

#### **Enhanced CLI Features**
- Interactive project initialization with prompts
- Automatic dependency installation option
- Auto-start development server option
- Current directory initialization support (use `.` as name)
- Email validation during setup
- Better error messages and user feedback

#### **Developer Experience**
- Dynamic version loading from `package.json`
- Comprehensive test coverage (9 tests across CLI, utils, and core)
- ESLint configuration for code quality
- TypeScript for better type safety
- Jest testing framework

### 🏗️ Changed

#### **Complete Project Restructure**
- Moved all source code to `src/` folder
- Moved tests to `test/` folder
- Build output now goes to `build/` folder
- Templates integrated into source (`src/templates/`)
- Followed industry-standard project conventions

#### **Build System**
- TypeScript compilation with proper ES module support
- Template copying during build process
- Build script: `tsc && npm run copy-templates`
- Proper `__dirname` handling in ES modules using `import.meta.url`

#### **Documentation**
- Complete README rewrite with theme documentation
- Theme comparison table
- Usage examples for all themes
- Updated CLI command documentation
- Improved troubleshooting section

### 🔧 Fixed

- Hardcoded version numbers replaced with dynamic loading
- Import path issues resolved after restructure
- ES module compatibility issues fixed
- CLI help text updated with accurate information
- Theme selection logic properly implemented

### 📦 Technical Details

#### **Project Structure**
```
folioport/
├── src/              # All source code
│   ├── bin/          # CLI entry point
│   ├── commands/     # Command implementations
│   ├── core/         # Core functionality
│   ├── utils/        # Utility functions
│   ├── types/        # TypeScript types
│   └── templates/    # Theme templates
│       ├── default/  # Default theme
│       ├── minimal/  # Minimal theme
│       └── vibrant/  # Vibrant theme
├── test/             # Test files
├── build/            # Build output
└── scripts/          # Build scripts
```

#### **Dependencies**
- Commander.js for CLI
- Handlebars for templating
- Express for dev server
- ESBuild for fast asset bundling
- Chalk, Ora, Prompts for beautiful CLI
- YAML and TOML parsers for config formats

### 🚀 Deployment

- GitHub Actions CI/CD pipeline
- Automated testing on push
- NPM publishing on tag creation
- Version validation before publishing

### 📝 Migration Guide

If you have an existing FolioPort project from pre-1.0:

1. **No breaking changes** - Existing projects continue to work
2. **New projects** - Use `folioport init` with theme selection
3. **Theme switching** - Update `theme` in config and rebuild
4. **Format switching** - Rename config files and FolioPort auto-detects

### 🙏 Acknowledgments

This release represents a complete rewrite and restructuring of FolioPort to provide:
- Better maintainability
- Improved developer experience
- More customization options
- Professional-grade themes
- Industry-standard project structure

---

## [0.x.x] - Pre-release

Initial development versions with basic functionality. Not documented as they were pre-release versions.

---

For more information, see [README.md](README.md) and [CONTRIBUTING.md](CONTRIBUTING.md).
