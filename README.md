# johnutilsjs

TypeScript utility functions and shared React components for common tasks

## Installation

```bash
npm install johnutilsjs
```

## Usage

### Import the entire library

```javascript
import { parseUrl, detectPrefix } from 'johnutilsjs';
```

### Import specific utilities

```javascript
import { parseUrl } from 'johnutilsjs/urlParser';
```

### Import React components

React components live in a separate entry point, so the root import stays
framework-free. They need the app to provide `react` (>=19), `@mui/material`
(>=9), and `@mui/icons-material` (>=9) as peer dependencies.

```tsx
import { SiteFooter } from 'johnutilsjs/react';
```

## API

### URL Parser

Deployment-agnostic URL parsing that works with or without URL prefixes.

#### `parseUrl(pathname, validRoutes)`

Parses a URL pathname and extracts prefix, route, and clean path.

**Parameters:**
- `pathname` (string): The URL pathname to parse
- `validRoutes` (string[]): Array of valid route names

**Returns:** Object with:
- `prefix` (string): URL prefix if detected (e.g., '/myapp')
- `route` (string|null): Valid route name if found
- `cleanPath` (string): Normalized path for navigation

**Example:**

```javascript
import { parseUrl } from 'johnutilsjs';

const validRoutes = ['home', 'about', 'contact'];

// Development mode (no prefix)
parseUrl('/home', validRoutes);
// { prefix: '', route: 'home', cleanPath: '/home' }

// Production mode (with prefix)
parseUrl('/myapp/about', validRoutes);
// { prefix: '/myapp', route: 'about', cleanPath: '/myapp/about' }

// Invalid route redirects to root
parseUrl('/invalid', validRoutes);
// { prefix: '', route: null, cleanPath: '/' }

// Prefix with invalid route redirects to prefix root
parseUrl('/myapp/invalid', validRoutes);
// { prefix: '/myapp', route: null, cleanPath: '/myapp/' }
```

#### `detectPrefix(pathname, segments, validRoutes)`

Detects if a pathname contains a URL prefix.

**Parameters:**
- `pathname` (string): The URL pathname
- `segments` (string[]): Path segments (from `pathname.split('/').filter(Boolean)`)
- `validRoutes` (string[]): Array of valid route names

**Returns:** String containing the detected prefix or empty string

**Example:**

```javascript
import { detectPrefix } from 'johnutilsjs';

const validRoutes = ['home', 'about'];

detectPrefix('/myapp/home', ['myapp', 'home'], validRoutes);
// '/myapp'

detectPrefix('/home', ['home'], validRoutes);
// ''
```

### SiteFooter

`<SiteFooter repo children? />` renders the shared app footer: optional
app-specific content, then "Built by John Pfeiffer" with LinkedIn and GitHub
icon links.

**Props:**
- `repo` (string): GitHub repository name under `johnpfeiffer`, e.g. `'converter'`
- `children` (ReactNode, optional): app-specific content shown above the author line, e.g. data-source credits

**Example:**

```tsx
import { SiteFooter } from 'johnutilsjs/react';

export default function Footer() {
  return <SiteFooter repo="converter" />;
}

// With app-specific credits
<SiteFooter repo="benchmarks">
  <Typography variant="body2">Data sources: ...</Typography>
</SiteFooter>
```

The constants `AUTHOR`, `LINKEDIN_URL`, and `githubRepoUrl(repo)` are exported too.

## Development

```bash
npm install
npm test        # typecheck + vitest
npm run build   # compile src/ to dist/ (JS + .d.ts)
```

Sources are TypeScript in `src/`; only the compiled `dist/` is published.

## License

MIT


## Publish

```bash
npm version patch  # 1.0.0 -> 1.0.1
npm publish        # prepublishOnly runs the tests and the build
```

Publishing to https://registry.npmjs.org/

