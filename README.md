# DevFolio

> **"Your code. Your story. Your portfolio."**

A zero-config static site generator for creating beautiful, performant developer portfolios in seconds.

[![npm version](https://img.shields.io/npm/v/devfolio.svg)](https://www.npmjs.com/package/devfolio)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ✨ Features

- 🚀 **Zero Config** - Works out of the box with sensible defaults
- 📝 **Data-Driven** - Content managed through JSON, YAML, or TOML
- 🎨 **Beautiful Theme** - Modern, responsive design with dark mode
- ⚡ **Lightning Fast** - Static HTML generation, no runtime dependencies
- 🔍 **SEO Optimized** - Built-in meta tags, structured data, sitemap
- 🌓 **Dark Mode** - Automatic theme switching with localStorage
- 🔥 **Hot Reload** - Live preview during development
- 📦 **Tiny Bundle** - Minified assets, optimized for performance
- 🔧 **Flexible Formats** - Use JSON, YAML, or TOML for configuration

## 🚀 Quick Start

```bash
# Create a new portfolio
npx create-devfolio my-portfolio

# Navigate to your project
cd my-portfolio

# Start dev server
npm run dev
```

Open `http://localhost:3000` - Your portfolio is ready! 🎉

## 📦 Installation

### Option 1: Using npx (Recommended)

```bash
npx create-devfolio my-portfolio
```

### Option 2: Global Installation

```bash
npm install -g devfolio
devfolio init my-portfolio
```

## 🛠️ CLI Commands

### `devfolio init [name]`

Initialize a new portfolio project.

```bash
# Basic usage
devfolio init my-portfolio

# With options
devfolio init my-portfolio --theme default --git

# Use YAML or TOML instead of JSON
devfolio init my-portfolio --format yaml
devfolio init my-portfolio --format toml
```

**Options:**
- `--theme <name>` - Choose a theme (default: "default")
- `--format <format>` - Config format: json, yaml, or toml (default: "json")
- `--git` - Initialize git repository
- `--install` - Auto-install dependencies

### `devfolio dev`

Start development server with hot reload.

```bash
# Start on default port (3000)
devfolio dev

# Custom port
devfolio dev --port 8080

# Open browser automatically
devfolio dev --open
```

**Features:**
- 🔄 Hot reload on file changes
- 👀 Watches data.json, templates, and assets
- 🐛 Helpful error messages
- 📝 Pretty console logs

### `devfolio build`

Build production-ready static site.

```bash
# Basic build
devfolio build

# Custom output directory
devfolio build --out public

# Clean build
devfolio build --clean
```

**Output includes:**
- Minified HTML, CSS, and JS
- Optimized assets
- `sitemap.xml` for search engines
- `robots.txt`
- SEO meta tags and JSON-LD structured data

## 📝 Project Structure

When you create a portfolio, here's what you get:

```
my-portfolio/
├── index.hbs                 # Main Handlebars template
├── data.json                 # Your portfolio content (or .yaml/.toml)
├── portfolio.config.json     # Site configuration (or .yaml/.toml)
├── assets/
│   ├── css/
│   │   └── styles.css        # Theme styles (customizable)
│   ├── js/
│   │   └── scripts.js        # Interactive features
│   └── images/               # Your images
├── public/                   # Static files (optional)
└── package.json
```

**Note:** You can use JSON, YAML, or TOML for your configuration and data files!

## ⚙️ Configuration

DevFolio supports **three configuration formats**: JSON, YAML, and TOML. Choose your favorite!

### `portfolio.config.json` (or `.yaml` / `.toml`)

Main configuration file for your site:

```json
{
  "name": "my-portfolio",
  "version": "1.0.0",
  "theme": "default",
  "site": {
    "url": "https://yourdomain.com",
    "title": "Your Name | Software Developer",
    "description": "My awesome developer portfolio",
    "language": "en",
    "favicon": "favicon.svg"
  },
  "features": {
    "darkMode": true,
    "blog": false,
    "analytics": false,
    "contactForm": false
  },
  "social": {
    "github": "yourusername",
    "linkedin": "yourusername",
    "twitter": "yourusername"
  },
  "seo": {
    "keywords": ["developer", "portfolio", "web development"],
    "ogImage": "assets/og-image.jpg",
    "twitterCard": "summary_large_image"
  },
  "build": {
    "output": "dist",
    "minify": true,
    "sourceMaps": false
  }
}
```

### `data.json` (or `.yaml` / `.toml`)

Your portfolio content - works with JSON, YAML, or TOML:

**JSON format:**

```json
{
  "hero": {
    "name": "Your Name",
    "tagline": "Software Developer",
    "description": "Building amazing things on the web",
    "image": "assets/profile.jpg",
    "resume": "assets/resume.pdf",
    "email": "hello@example.com",
    "cta": {
      "primary": {
        "text": "Get In Touch",
        "link": "mailto:hello@example.com"
      },
      "secondary": {
        "text": "View Projects",
        "link": "#projects"
      }
    }
  },
  "about": {
    "title": "About Me",
    "paragraphs": [
      "I'm a passionate developer...",
      "I love creating beautiful applications..."
    ],
    "skills": ["JavaScript", "React", "Node.js", "Python", "AWS"]
  },
  "experience": {
    "title": "Experience",
    "items": [
      {
        "role": "Senior Developer",
        "company": "Tech Company",
        "period": "2022 - Present",
        "description": "Building scalable web applications...",
        "technologies": ["React", "TypeScript", "Node.js"]
      }
    ]
  },
  "projects": {
    "title": "Projects",
    "items": [
      {
        "title": "Awesome Project",
        "description": "A great project I built",
        "technologies": ["React", "Node.js", "MongoDB"],
        "link": "https://github.com/...",
        "demo": "https://demo.com",
        "image": "assets/project1.jpg"
      }
    ]
  },
  "education": {
    "title": "Education",
    "items": [
      {
        "degree": "Bachelor of Science in Computer Science",
        "institution": "University Name",
        "period": "2018 - 2022",
        "description": "Focused on software engineering..."
      }
    ]
  },
  "contact": {
    "title": "Get In Touch",
    "description": "Feel free to reach out!",
    "email": "hello@example.com"
  }
}
```

**YAML format:**
```yaml
hero:
  name: Your Name
  tagline: Software Developer
  description: Building amazing things on the web
  email: hello@example.com
  
about:
  title: About Me
  paragraphs:
    - I'm a passionate developer...
    - I love creating beautiful applications...
  skills:
    - JavaScript
    - React
    - Node.js
    - Python
    
projects:
  title: Projects
  items:
    - title: Awesome Project
      description: A great project I built
      technologies:
        - React
        - Node.js
      link: https://github.com/...
```

**TOML format:**
```toml
[hero]
name = "Your Name"
tagline = "Software Developer"
description = "Building amazing things on the web"
email = "hello@example.com"

[about]
title = "About Me"
paragraphs = [
  "I'm a passionate developer...",
  "I love creating beautiful applications..."
]
skills = ["JavaScript", "React", "Node.js", "Python"]

[[projects.items]]
title = "Awesome Project"
description = "A great project I built"
technologies = ["React", "Node.js"]
link = "https://github.com/..."
```

**Auto-detection:** DevFolio automatically detects and loads whichever format you use!

## 🎨 Customization

### Modify Content

Simply edit your data file (supports JSON, YAML, or TOML):

```bash
# Edit your portfolio content
vim data.json     # or data.yaml or data.toml

# See changes live
npm run dev
```

DevFolio will automatically detect and load your preferred format!

### Customize Styling

Edit `assets/css/styles.css` - uses CSS variables for easy theming:

```css
:root {
  --color-primary: #14b8a6;      /* Teal */
  --color-secondary: #3b82f6;    /* Blue */
  --color-accent: #f59e0b;       /* Orange */
  
  /* Customize fonts */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* Customize spacing */
  --spacing-lg: 4rem;
  --spacing-md: 2rem;
}
```

### Modify Template

Edit `index.hbs` to customize the HTML structure:

```handlebars
<!-- Add custom sections -->
<section class="custom-section">
  <h2>{{customData.title}}</h2>
  {{#each customData.items}}
    <div>{{this}}</div>
  {{/each}}
</section>
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
devfolio build
vercel --prod
```

### Netlify

```bash
devfolio build
netlify deploy --prod --dir=dist
```

Or use the Netlify UI and drag the `dist/` folder.

### GitHub Pages

```bash
# Build to docs folder
devfolio build --out docs

# Commit and push
git add docs
git commit -m "Deploy to GitHub Pages"
git push

# Enable GitHub Pages in repository settings (use /docs folder)
```

### Static Hosting (AWS S3, Firebase, etc.)

```bash
devfolio build

# Upload the dist/ folder to your hosting provider
```

## 📦 What's Included

### Default Theme Sections

- **Hero** - Name, tagline, description, CTA buttons, social links
- **About** - Bio paragraphs and skills showcase
- **Experience** - Timeline-based work history
- **Projects** - Grid layout with images, links, and tech stack
- **Education** - Academic background
- **Contact** - Contact information and email link

### Built-in Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Light/dark mode toggle
- ✅ Smooth scrolling navigation
- ✅ Animated sections on scroll
- ✅ SEO-optimized meta tags
- ✅ JSON-LD structured data
- ✅ Sitemap generation
- ✅ Minified assets
- ✅ Fast page loads

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/devfolio.git
   cd devfolio
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Link for local testing**
   ```bash
   npm link
   ```
5. **Make your changes**
6. **Test thoroughly**
   ```bash
   devfolio init test-portfolio
   cd test-portfolio
   npm run dev
   ```
7. **Submit a pull request**

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 🐛 Troubleshooting

### Command not found

Make sure DevFolio is installed globally:
```bash
npm install -g devfolio
```

### Port already in use

Use a different port:
```bash
devfolio dev --port 3001
```

### Build fails

Check that your `data.json` and `portfolio.config.json` are valid JSON:
```bash
# Validate JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('data.json')))"
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Handlebars](https://handlebarsjs.com/), [esbuild](https://esbuild.github.io/), and [Express](https://expressjs.com/)
- Inspired by modern developer portfolios and static site generators

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/devfolio/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/devfolio/discussions)
- 📧 **Email**: hello@example.com

## 🌟 Show Your Support

If you find DevFolio useful, please:
- ⭐ **Star this repository**
- 🐦 **Share on Twitter**
- 📝 **Write a blog post**

### Built with DevFolio?

Add this badge to your portfolio's README:

```markdown
[![Built with DevFolio](https://img.shields.io/badge/Built%20with-DevFolio-14b8a6)](https://github.com/yourusername/devfolio)
```

---

**Made with ❤️ for developers by developers**
