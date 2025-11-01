# FolioPort

> **"Your code. Your story. Your portfolio."**

A zero-config static site generator for creating beautiful, performant developer portfolios in seconds.

[![npm version](https://img.shields.io/npm/v/folioport.svg)](https://www.npmjs.com/package/folioport)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ✨ Features

- 🚀 **Zero Config** - Works out of the box with sensible defaults
- 📝 **Data-Driven** - Content managed through JSON, YAML, or TOML
- 🎨 **Beautiful Themes** - Choose from Default, Minimal, or Vibrant themes
- ⚡ **Lightning Fast** - Static HTML generation, no runtime dependencies
- 🔍 **SEO Optimized** - Built-in meta tags, structured data, sitemap
- 🌓 **Dark Mode** - Automatic theme switching with localStorage
- 🔥 **Hot Reload** - Live preview during development
- 📦 **Tiny Bundle** - Minified assets, optimized for performance
- 🔧 **Flexible Formats** - Use JSON, YAML, or TOML for configuration

## 🚀 Quick Start

```bash
# Create a new portfolio
npx folioport init my-portfolio

# Navigate to your project
cd my-portfolio

# Start dev server
npm run dev
```

Open `http://localhost:3000` - Your portfolio is ready! 🎉

## 📦 Installation

### Option 1: Using npx (Recommended)

```bash
npx folioport init my-portfolio
```

### Option 2: Global Installation

```bash
npm install -g folioport
folioport init my-portfolio
```

## 🛠️ CLI Commands

### `folioport init [name]`

Initialize a new portfolio project.

```bash
# Basic usage
folioport init my-portfolio

# With options
folioport init my-portfolio --theme default --git

# Use YAML or TOML instead of JSON
folioport init my-portfolio --format yaml
folioport init my-portfolio --format toml
```

**Options:**
- `--theme <name>` - Choose a theme (default: "default")
- `--format <format>` - Config format: json, yaml, or toml (default: "json")
- `--git` - Initialize git repository
- `--install` - Auto-install dependencies

### `folioport dev`

Start development server with hot reload.

```bash
# Start on default port (3000)
folioport dev

# Custom port
folioport dev --port 8080

# Open browser automatically
folioport dev --open
```

**Features:**
- 🔄 Hot reload on file changes
- 👀 Watches data.json, templates, and assets
- 🐛 Helpful error messages
- 📝 Pretty console logs

### `folioport build`

Build production-ready static site.

```bash
# Basic build
folioport build

# Custom output directory
folioport build --out public

# Clean build
folioport build --clean
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

FolioPort supports **three configuration formats**: JSON, YAML, and TOML. Choose your favorite!

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

**Auto-detection:** FolioPort automatically detects and loads whichever format you use!

## 🎨 Themes

FolioPort comes with **three beautiful themes** designed for different styles and preferences. Choose the one that best represents your personal brand!

### 🎯 Default Theme

**Perfect for:** Clean, professional portfolios
**Style:** Modern, balanced, and timeless

- Clean typography with excellent readability
- Balanced color scheme with teal accents
- Professional layout suitable for all industries
- Smooth animations and hover effects
- Fully responsive design

```bash
folioport init my-portfolio --theme default
```

### 🌟 Minimal Theme

**Perfect for:** Developers who prefer simplicity
**Style:** Ultra-clean, typography-focused

- Minimal design with maximum impact
- Typography-first approach
- Subtle animations and micro-interactions
- Extremely fast loading
- Perfect for content-focused portfolios

```bash
folioport init my-portfolio --theme minimal
```

### 🚀 Vibrant Theme

**Perfect for:** Creative developers and designers
**Style:** Bold, colorful, and dynamic

- Eye-catching gradient backgrounds
- Interactive animations and effects
- Vibrant color palette with smooth transitions
- Advanced JavaScript interactions
- Perfect for showcasing creative work

```bash
folioport init my-portfolio --theme vibrant
```

### Theme Features Comparison

| Feature | Default | Minimal | Vibrant |
|---------|---------|---------|---------|
| **Color Scheme** | Balanced teal/blue | Monochrome + accent | Rainbow gradients |
| **Animations** | Subtle | Minimal | Advanced |
| **Performance** | Fast | Fastest | Fast |
| **Best For** | Professional | Content-focused | Creative |
| **Dark Mode** | ✅ | ✅ | ✅ |
| **Mobile First** | ✅ | ✅ | ✅ |
| **Accessibility** | ✅ | ✅ | ✅ |

### Switching Themes

You can change themes anytime by updating your config:

```json
{
  "theme": "vibrant"
}
```

Then rebuild:

```bash
folioport build
```

## 🎨 Customization

### Modify Content

Simply edit your data file (supports JSON, YAML, or TOML):

```bash
# Edit your portfolio content
vim data.json     # or data.yaml or data.toml

# See changes live
npm run dev
```

FolioPort will automatically detect and load your preferred format!

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
folioport build
vercel --prod
```

### Netlify

```bash
folioport build
netlify deploy --prod --dir=dist
```

Or use the Netlify UI and drag the `dist/` folder.

### GitHub Pages

```bash
# Build to docs folder
folioport build --out docs

# Commit and push
git add docs
git commit -m "Deploy to GitHub Pages"
git push

# Enable GitHub Pages in repository settings (use /docs folder)
```

### Static Hosting (AWS S3, Firebase, etc.)

```bash
folioport build

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
   git clone https://github.com/0xdps/folioport.git
   cd folioport
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
   folioport init test-portfolio
   cd test-portfolio
   npm run dev
   ```
7. **Submit a pull request**

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 🐛 Troubleshooting

### Command not found

Make sure FolioPort is installed globally:
```bash
npm install -g folioport
```

### Port already in use

Use a different port:
```bash
folioport dev --port 3001
```

### Build fails

Check that your `data.json` and `portfolio.config.json` are valid JSON:
```bash
# Validate JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('data.json')))"
```

## 🏗️ Development Structure

FolioPort source code follows a clean, standard project structure:

```
folioport/
├── src/              # All source code
│   ├── bin/          # CLI scripts
│   ├── commands/     # Command implementations  
│   ├── core/         # Core functionality
│   ├── utils/        # Utility functions
│   ├── types/        # TypeScript types
│   └── templates/    # Template files
├── test/             # All tests
├── build/            # Build output
│   ├── templates/    # Templates copied during build
│   └── ...           # Compiled JS/TS files
└── scripts/          # Build and release scripts
```

### Build Process

1. **Compile TypeScript**: `tsc` compiles `src/` to `build/`
2. **Copy Templates**: `cp -r src/templates build/` copies template files
3. **Result**: Complete build with both compiled code and template assets

### Key Features

- ✅ **Dynamic Versioning**: Version read from `package.json`
- ✅ **Complete Source Organization**: Everything in `src/` folder
- ✅ **Standard Structure**: Follows industry conventions
- ✅ **Consistent Build**: Templates included in build output

## �📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Handlebars](https://handlebarsjs.com/), [esbuild](https://esbuild.github.io/), and [Express](https://expressjs.com/)
- Inspired by modern developer portfolios and static site generators

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/0xdps/folioport/issues)
- 📧 **Email**: dps.manit@gmail.com

## 🌟 Show Your Support

If you find FolioPort useful, please:
- ⭐ **Star this repository**
- 🐦 **Share on Twitter**
- 📝 **Write a blog post**

### Built with FolioPort?

Add this badge to your portfolio's README:

```markdown
[![Built with FolioPort](https://img.shields.io/badge/Built%20with-FolioPort-14b8a6)](https://github.com/0xdps/folioport)
```

---

**Made with ❤️ for developers by developers**
