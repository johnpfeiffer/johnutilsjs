# johnutilsjs

JavaScript utility functions for common tasks

## Installation

```bash
npm install johnutilsjs
```

## Features

- Pure ES modules (ESM)
- Tree-shakeable exports
- Comprehensive test coverage
- Zero dependencies

## Usage

### Import the entire library

```javascript
import { parseUrl, detectPrefix } from 'johnutilsjs';
```

### Import specific utilities

```javascript
import { parseUrl } from 'johnutilsjs/urlParser';
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

## Development

### Run tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

## License

MIT
