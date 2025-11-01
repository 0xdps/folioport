# Contributing to FolioPort

First off, thank you for considering contributing to FolioPort! It's people like you that make FolioPort such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to being respectful and inclusive. Please be kind and courteous to others.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples**
* **Describe the behavior you observed and what you expected**
* **Include screenshots if possible**
* **Include your environment details** (OS, Node version, npm version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Provide specific examples to demonstrate the enhancement**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Follow the JavaScript/Node.js style guide
* Include appropriate test coverage
* Update documentation as needed
* End all files with a newline

## Development Setup

### Prerequisites

* Node.js 16.x or higher
* npm 7.x or higher

### Setup Instructions

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/0xdps/folioport.git
   cd folioport
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Link for local development**
   ```bash
   npm link
   ```

4. **Create a test portfolio**
   ```bash
   cd /tmp
   folioport init test-portfolio
   cd test-portfolio
   npm run dev
   ```

### Project Structure

```
folioport/
├── src/              # All source code
│   ├── bin/          # CLI entry point (cli.ts)
│   ├── commands/     # CLI commands (init, build, dev)
│   ├── core/         # Core functionality (builder, optimizer, etc.)
│   ├── utils/        # Utility functions
│   ├── types/        # TypeScript type definitions
│   └── templates/    # Built-in themes
│       ├── default/  # Default theme
│       ├── minimal/  # Minimal theme
│       └── vibrant/  # Vibrant theme
├── test/             # Test files
├── build/            # Build output (generated)
├── scripts/          # Build and release scripts
└── node_modules/     # Dependencies
```

## Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   * Write clean, readable code
   * Follow existing code style
   * Add comments where necessary
   * Keep functions small and focused

3. **Test your changes**
   ```bash
   # Build the project
   npm run build
   
   # Run tests
   npm test
   
   # Test init command
   cd /tmp
   folioport init test-feature
   cd test-feature
   npm run dev
   
   # Test build command
   npm run build
   ls -la dist/
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

Use [Conventional Commits](https://www.conventionalcommits.org/):
* `feat:` - New feature
* `fix:` - Bug fix
* `docs:` - Documentation changes
* `style:` - Code style changes (formatting, etc.)
* `refactor:` - Code refactoring
* `test:` - Adding or updating tests
* `chore:` - Maintenance tasks

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   
   Then create a Pull Request on GitHub.

## Code Style

* Use ES6+ features
* Use async/await instead of callbacks
* Use meaningful variable and function names
* Keep functions pure when possible
* Add JSDoc comments for public APIs

### Example

```javascript
/**
 * Generate SEO meta tags for the portfolio
 * @param {Object} config - Portfolio configuration
 * @param {Object} data - Portfolio data
 * @returns {Object} SEO metadata object
 */
export function generateSEO(config, data) {
  // Implementation
}
```

## Testing

We use Jest for automated testing. Please ensure your changes don't break existing tests and add tests for new features.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure

Our test suite covers:
- **CLI Tests** (`test/cli.test.ts`) - CLI commands and version handling
- **Utils Tests** (`test/utils.test.ts`) - Utility functions
- **Core Tests** (`test/core.test.ts`) - Core functionality

### Test Checklist

Before submitting a PR, ensure:

- [ ] All existing tests pass (`npm test`)
- [ ] New features have test coverage
- [ ] Code passes linting (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Manual testing completed:
  - [ ] `folioport --version` works
  - [ ] `folioport --help` shows help
  - [ ] `folioport init test` creates project with all themes
  - [ ] `folioport build` builds successfully
  - [ ] `folioport dev` starts server
  - [ ] Generated HTML is valid
  - [ ] CSS is minified
  - [ ] JS is minified
  - [ ] Sitemap is generated
  - [ ] SEO tags are present
  - [ ] All themes work correctly

## Documentation

When adding new features, please update:

* README.md - If it's user-facing
* Code comments - For complex logic
* JSDoc comments - For public APIs

## Creating Themes

Want to contribute a new theme? Great! We now have three themes and would love more.

### Theme Requirements

1. Create a new directory in `src/templates/<theme-name>/`
2. Include these required files:
   * `index.hbs` - Main Handlebars template
   * `assets/css/styles.css` - Theme styles
   * `assets/js/scripts.js` - Theme scripts
3. Follow the existing data structure (hero, about, projects, experience, etc.)
4. Support all standard features:
   * Dark mode
   * Responsive design
   * Accessibility
   * SEO optimization

### Theme Development Process

1. **Study Existing Themes**
   ```bash
   # Check out the existing themes
   ls src/templates/
   # default/  minimal/  vibrant/
   ```

2. **Create Theme Structure**
   ```bash
   mkdir -p src/templates/my-theme/assets/{css,js}
   touch src/templates/my-theme/index.hbs
   touch src/templates/my-theme/assets/css/styles.css
   touch src/templates/my-theme/assets/js/scripts.js
   ```

3. **Build and Test**
   ```bash
   # Build to include new theme
   npm run build
   
   # Test with new theme
   folioport init test-theme --theme my-theme
   cd test-theme
   npm run dev
   ```

4. **Submit PR with:**
   * Screenshots of the theme
   * Description of the design philosophy
   * Any special features or interactions
   * Update to README.md theme comparison table
   * Test coverage

### Theme Style Guide

- Use CSS variables for easy customization
- Support both light and dark modes
- Make it fully responsive (mobile-first)
- Keep performance in mind
- Follow accessibility best practices (WCAG 2.1)
- Include smooth animations (but respect `prefers-reduced-motion`)

## Questions?

Feel free to:
* Open an issue for discussion
* Reach out via email
* Ask in GitHub Discussions

## Recognition

Contributors will be:
* Listed in the Contributors section
* Mentioned in release notes
* Credited in the project

Thank you for contributing! 🎉
