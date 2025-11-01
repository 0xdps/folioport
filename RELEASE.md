# Release Process

This document outlines the release process for FolioPort to ensure version consistency across package.json, git tags, and published packages.

## 🚀 Quick Release

Use the automated release script:

```bash
# Release version 1.2.3
npm run release 1.2.3
```

This script will:
1. ✅ Validate version format
2. ✅ Check git status and branch
3. ✅ Update package.json
4. ✅ Run tests and build
5. ✅ Commit changes
6. ✅ Create and push git tag
7. ✅ Trigger GitHub Actions for publishing

**Before releasing:**
- Update CHANGELOG.md with new version details
- Test all themes (default, minimal, vibrant)
- Verify all tests pass
- Check documentation is up-to-date

## 📋 Manual Release Steps

If you prefer manual control:

### 1. Update Version
```bash
# Update package.json version
npm version 1.2.3 --no-git-tag-version
```

### 2. Run Tests
```bash
npm test
npm run build
npm run lint
```

### 3. Update CHANGELOG.md
Add release notes for the new version following the format in CHANGELOG.md.

### 4. Commit and Tag
```bash
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: release version 1.2.3"
git tag v1.2.3
git push origin trunk
git push origin v1.2.3
```

## 🔍 Version Consistency

The GitHub Actions workflow automatically validates that:
- 🏷️ **Git tag version** (e.g., `v1.2.3`)
- 📦 **package.json version** (e.g., `1.2.3`)
- 🚀 **Published package version**

All match exactly before publishing.

## ⚡ Publishing Pipeline

When you push a tag:

```
┌─────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   CI Tests  │───►│  Trigger Publish │───►│  Parallel Jobs  │
│             │    │                  │    │                 │
│ • Lint      │    │ • Validate tag   │    │ • NPM Publish   │
│ • Test      │    │ • Check CI pass  │    │ • GitHub Release│
│ • Build     │    │ • Start workflow │    │                 │
└─────────────┘    └──────────────────┘    └─────────────────┘
```

## 🛡️ Safety Checks

- **Version validation**: Ensures tag and package.json versions match
- **Test validation**: Publishing only happens if all tests pass
- **Branch protection**: Recommended to release from `trunk` branch
- **Clean working directory**: No uncommitted changes allowed

## 📦 Published Artifacts

Each release creates:
- 📦 **NPM Package**: `npm install folioport@1.2.3`
- 🏷️ **GitHub Release**: With changelog and assets
- 🔗 **Release Notes**: Auto-generated from CHANGELOG.md
- 🎨 **Three Themes**: Default, Minimal, and Vibrant included

## 🔧 Troubleshooting

### Version Mismatch Error
If you see a version mismatch error:
```bash
# Fix package.json version to match tag
npm version 1.2.3 --no-git-tag-version
git add package.json package-lock.json
git commit --amend --no-edit
git push --force-with-lease origin trunk
```

### Failed Tests
If tests fail during release:
```bash
# Fix the issues, then
npm test
npm run build
# Continue with tagging
```

### Rollback Release
To rollback a failed release:
```bash
# Delete local tag
git tag -d v1.2.3

# Delete remote tag (if pushed)
git push --delete origin v1.2.3

# Reset package.json version
git checkout HEAD~1 -- package.json package-lock.json
```