#!/bin/bash

# FolioPort Release Script
# Ensures version consistency across package.json, git tag, and published package

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if version argument is provided
if [ $# -eq 0 ]; then
    print_error "Please provide a version number"
    echo "Usage: $0 <version>"
    echo "Example: $0 1.2.3"
    exit 1
fi

VERSION=$1
TAG="v$VERSION"

print_status "Starting release process for version $VERSION"

# Validate version format (basic semver check)
if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    print_error "Invalid version format. Please use semantic versioning (e.g., 1.2.3)"
    exit 1
fi

# Check if we're on the trunk branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "trunk" ]; then
    print_warning "You're not on the trunk branch (currently on: $CURRENT_BRANCH)"
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Release cancelled"
        exit 1
    fi
fi

# Check if working directory is clean
if ! git diff-index --quiet HEAD --; then
    print_error "Working directory is not clean. Please commit or stash your changes."
    exit 1
fi

# Check if tag already exists
if git tag -l | grep -q "^$TAG$"; then
    print_error "Tag $TAG already exists"
    exit 1
fi

print_status "Updating package.json version to $VERSION"

# Update package.json version
npm version $VERSION --no-git-tag-version

print_success "Updated package.json to version $VERSION"

# Run tests to ensure everything works
print_status "Running tests..."
if npm test; then
    print_success "All tests passed"
else
    print_error "Tests failed. Please fix issues before releasing."
    git checkout package.json package-lock.json 2>/dev/null || true
    exit 1
fi

# Build the project
print_status "Building project..."
if npm run build; then
    print_success "Build completed successfully"
else
    print_error "Build failed. Please fix issues before releasing."
    git checkout package.json package-lock.json 2>/dev/null || true
    exit 1
fi

# Commit the version change
print_status "Committing version change..."
git add package.json package-lock.json
git commit -m "chore: bump version to $VERSION"

# Create and push tag
print_status "Creating and pushing tag $TAG..."
git tag $TAG
git push origin trunk
git push origin $TAG

print_success "Release $VERSION completed successfully!"
print_status "GitHub Actions will now:"
print_status "  1. Run tests"
print_status "  2. Publish to NPM"
print_status "  3. Create GitHub release"
print_status ""
print_status "Monitor the progress at: https://github.com/0xdps/folioport/actions"