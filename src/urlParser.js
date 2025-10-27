// AIDEV-NOTE: Deployment-agnostic URL parsing - works at / or /anyprefix/

export function parseUrl(pathname, validRoutes) {
  const segments = pathname.split('/').filter(Boolean);
  const prefix = detectPrefix(pathname, segments, validRoutes);

  const pathWithoutPrefix = prefix ? pathname.slice(prefix.length) : pathname;
  const routeSegments = pathWithoutPrefix.split('/').filter(Boolean);

  let route = null;
  if (routeSegments.length > 0 && validRoutes.includes(routeSegments[0])) {
    route = routeSegments[0];
  }

  let cleanPath;
  if (route) {
    cleanPath = `${prefix}/${route}`;
  } else if (prefix) {
    cleanPath = `${prefix}/`;
  } else {
    cleanPath = '/';
  }

  return { prefix, route, cleanPath };
}

export function detectPrefix(pathname, segments, validRoutes) {
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
