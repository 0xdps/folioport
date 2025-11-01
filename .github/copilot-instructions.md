# GitHub Copilot Instructions for Folioport

## Git & Version Control Rules

- **NEVER** run `git commit` or `git push` commands automatically
- **ALWAYS** ask for explicit user approval before committing or pushing changes
- When releasing versions, use the existing `npm run release` script instead of manual git operations
- Before suggesting any git operations, explain what will happen and wait for confirmation

## Project Structure

- This is a CLI tool for generating portfolio websites
- Uses ES modules exclusively (`"type": "module"` in package.json)
- Three theme system: `default`, `minimal`, and `vibrant`
- Templates use Handlebars.js (`.hbs` files)

## Code Standards

- **No CommonJS syntax** - avoid `module.exports`, `require()` in browser JavaScript
- Use TypeScript for source files in `lib/` and `bin/`
- Follow existing file structure conventions
- Theme templates are in `templates/<theme-name>/`

## Data Structure Conventions

All themes expect this data structure:
- `hero.title` and `hero.tagline` for hero sections
- `experience.items` array (not `experience` directly)
- `projects.items` array (not `projects` directly)
- Experience items use `role` field (not `title`)
- Social links on hero object: `hero.github`, `hero.linkedin`, `hero.twitter`

## Testing & Quality

- Run tests before suggesting releases (`npm test`)
- Test all three themes when making template changes
- Verify placeholder images exist in theme assets
- Check that .gitignore prevents pollution of project root

## Release Process

- Use `npm run release <version>` for version management
- Update CHANGELOG.md with meaningful release notes
- Follow semantic versioning (major.minor.patch)
- Ensure GitHub Actions workflows are properly configured

## General Guidelines

- Prioritize code consistency across all three themes
- Keep dependencies minimal and up-to-date
- Document breaking changes clearly
- Consider impact on CLI user experience
