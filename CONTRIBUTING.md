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
├── bin/              # CLI entry points
├── lib/
│   ├── commands/     # CLI commands (init, build, dev)
│   ├── core/         # Core functionality (builder, optimizer, etc.)
│   └── utils/        # Utility functions
├── templates/        # Built-in themes
│   └── default/      # Default theme
└── tests/            # Test files (if you add them)
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

While we don't have automated tests yet (contributions welcome!), please manually test:

1. **Init command** - Creates project correctly
2. **Build command** - Generates proper output
3. **Dev server** - Starts and watches files
4. **Template compilation** - Handlebars works correctly
5. **Asset optimization** - CSS/JS minified properly

### Test Checklist

- [ ] `folioport --version` works
- [ ] `folioport --help` shows help
- [ ] `folioport init test` creates project
- [ ] `folioport build` builds successfully
- [ ] `folioport dev` starts server
- [ ] Generated HTML is valid
- [ ] CSS is minified
- [ ] JS is minified
- [ ] Sitemap is generated
- [ ] SEO tags are present

## Documentation

When adding new features, please update:

* README.md - If it's user-facing
* Code comments - For complex logic
* JSDoc comments - For public APIs

## Creating Themes

Want to contribute a new theme? Great!

1. Create a new directory in `templates/`
2. Include:
   * `index.hbs` - Main template
   * `assets/css/styles.css` - Theme styles
   * `assets/js/scripts.js` - Theme scripts (if needed)
3. Follow the existing theme structure
4. Test thoroughly with different data
5. Submit a PR with screenshots

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
