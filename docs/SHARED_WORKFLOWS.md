# Shared Workflow Approach

If you want to reuse publishing logic across multiple repositories without duplicating secrets, you can create a shared workflow.

## 📁 Setup Structure

```
your-shared-workflows-repo/
├── .github/
│   └── workflows/
│       └── npm-publish.yml    # Reusable workflow
└── README.md
```

## 🔄 Reusable Workflow (`npm-publish.yml`)

```yaml
name: NPM Publish

on:
  workflow_call:
    inputs:
      tag:
        required: true
        type: string
      commit_sha:
        required: true
        type: string
      node_version:
        required: false
        type: string
        default: '22.x'
    secrets:
      NPM_TOKEN:
        required: true

jobs:
  publish-npm:
    name: Publish to NPM
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          ref: ${{ inputs.commit_sha }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node_version }}
          registry-url: 'https://registry.npmjs.org'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Publish to NPM
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 📞 Calling the Shared Workflow

In each repository's workflow:

```yaml
jobs:
  publish:
    uses: 0xdps/shared-workflows/.github/workflows/npm-publish.yml@main
    with:
      tag: ${{ inputs.tag }}
      commit_sha: ${{ inputs.commit_sha }}
    secrets:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## ✅ Benefits

- ✅ Centralized publishing logic
- ✅ Single place to update workflow
- ✅ Secrets managed per repo (more secure)
- ✅ Consistent publishing across projects