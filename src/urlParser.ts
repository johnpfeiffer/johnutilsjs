// AIDEV-NOTE: Deployment-agnostic URL parsing - works at / or /anyprefix/

export interface ParsedUrl {
  prefix: string;
  route: string | null;
  cleanPath: string;
}

export function parseUrl(pathname: string, validRoutes: readonly string[]): ParsedUrl {
  const segments = pathname.split('/').filter(Boolean);
  const prefix = detectPrefix(pathname, segments, validRoutes);

  const pathWithoutPrefix = prefix ? pathname.slice(prefix.length) : pathname;
  const routeSegments = pathWithoutPrefix.split('/').filter(Boolean);

  let route: string | null = null;
  if (routeSegments.length > 0 && validRoutes.includes(routeSegments[0])) {
    route = routeSegments[0];
  }

  let cleanPath: string;
  if (route) {
    cleanPath = `${prefix}/${route}`;
  } else if (prefix) {
    cleanPath = `${prefix}/`;
  } else {
    cleanPath = '/';
  }

  return { prefix, route, cleanPath };
}

export function detectPrefix(pathname: string, segments: readonly string[], validRoutes: readonly string[]): string {
  if (segments.length === 0) {
    return '';
  }

  if (validRoutes.includes(segments[0])) {
    return '';
  }

  if (segments.length > 1 || pathname.endsWith('/')) {
    return `/${segments[0]}`;
  }

  return '';
}
