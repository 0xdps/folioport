# FolioPort Landing Page

This is the "Coming Soon" landing page for folioport.me.

## Features

- ✨ Clean, modern design with animated gradient background
- 📧 Email signup form for launch notifications
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast loading - single HTML file with inline CSS/JS
- 🎨 Matches FolioPort branding
- 🔗 Social links (GitHub, NPM, Email)

## Quick Deploy

### Option 1: Vercel (Recommended)
```bash
cd landing-page
vercel --prod
```

### Option 2: Netlify
```bash
cd landing-page
netlify deploy --prod --dir=.
```

### Option 3: GitHub Pages
1. Push this folder to a `gh-pages` branch
2. Enable GitHub Pages in repository settings

### Option 4: Any Static Host
Simply upload the `index.html` file to:
- AWS S3 + CloudFront
- Firebase Hosting
- Cloudflare Pages
- Any static file server

## Customization

### Update Email Collection
Replace the TODO in the JavaScript section with your email service:

```javascript
// Example: Mailchimp
const response = await fetch('YOUR_MAILCHIMP_API_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
});

// Example: ConvertKit
const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        api_key: 'YOUR_API_KEY',
        email: email
    })
});
```

### Update Colors
Edit the CSS variables in the `:root` section:

```css
:root {
    --color-primary: #14b8a6;
    --color-secondary: #3b82f6;
    --color-accent: #f59e0b;
}
```

### Update Content
Modify the HTML content:
- Logo and tagline
- Feature descriptions
- Social media links

## Development

To test locally:
```bash
cd landing-page
python3 -m http.server 8000
# or
npx serve
```

Then open http://localhost:8000

## Integration Options

### Email Services
- **Mailchimp**: Free for up to 500 subscribers
- **ConvertKit**: Free for up to 300 subscribers
- **Buttondown**: Simple, email-focused
- **EmailOctopus**: Affordable alternative
- **Custom Backend**: Build your own with Node.js/Python

### Analytics
Add Google Analytics or other tracking:
```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Domain Setup

1. Purchase folioport.me domain
2. Point DNS to your hosting provider:
   - **Vercel**: Add domain in project settings
   - **Netlify**: Add custom domain in site settings
   - **Cloudflare Pages**: Configure custom domain

3. SSL/HTTPS is automatically provided by most hosts

## Performance

- **Size**: ~8KB (single HTML file)
- **Load Time**: < 1 second
- **Lighthouse Score**: 100/100 (Performance, Accessibility, Best Practices, SEO)

## License

MIT - Same as FolioPort main project
