import { describe, it, expect } from 'vitest';
import { parseUrl, detectPrefix } from '../src/urlParser.js';

describe('urlParser', () => {
  const VALID_ROUTES = ['left', 'right'];

  describe('detectPrefix', () => {
    it.each([
      // Root and valid routes at root (no prefix)
      { pathname: '/', segments: [], expected: '' },
      { pathname: '/left', segments: ['left'], expected: '' },
      { pathname: '/right', segments: ['right'], expected: '' },
      { pathname: '/left/extra', segments: ['left', 'extra'], expected: '' },

      // Single invalid segment without trailing slash (no prefix)
      { pathname: '/invalid', segments: ['invalid'], expected: '' },
      { pathname: '/foo', segments: ['foo'], expected: '' },

      // Single segment with trailing slash (is a prefix)
      { pathname: '/urlrewrite/', segments: ['urlrewrite'], expected: '/urlrewrite' },
      { pathname: '/myapp/', segments: ['myapp'], expected: '/myapp' },

      // Multiple segments where first is not valid route (has prefix)
      { pathname: '/urlrewrite/left', segments: ['urlrewrite', 'left'], expected: '/urlrewrite' },
      { pathname: '/urlrewrite/invalid', segments: ['urlrewrite', 'invalid'], expected: '/urlrewrite' },
      { pathname: '/foo/bar/baz', segments: ['foo', 'bar', 'baz'], expected: '/foo' },
      { pathname: '/app/right', segments: ['app', 'right'], expected: '/app' },
    ])('detectPrefix($pathname) returns $expected', ({ pathname, segments, expected }) => {
      expect(detectPrefix(pathname, segments, VALID_ROUTES)).toBe(expected);
    });
  });

  describe('parseUrl', () => {
    it.each([
      // Development mode (no prefix)
      {
        pathname: '/',
        expected: { prefix: '', route: null, cleanPath: '/' },
        description: 'root path'
      },
      {
        pathname: '/left',
        expected: { prefix: '', route: 'left', cleanPath: '/left' },
        description: 'left route at root'
      },
      {
        pathname: '/right',
        expected: { prefix: '', route: 'right', cleanPath: '/right' },
        description: 'right route at root'
      },

      // Invalid single-segment paths (dev mode)
      {
        pathname: '/invalid',
        expected: { prefix: '', route: null, cleanPath: '/' },
        description: 'invalid single segment redirects to root'
      },
      {
        pathname: '/foo',
        expected: { prefix: '', route: null, cleanPath: '/' },
        description: 'arbitrary single segment redirects to root'
      },
      {
        pathname: '/LEFT',
        expected: { prefix: '', route: null, cleanPath: '/' },
        description: 'case-sensitive route validation'
      },

      // Extra segments at root level
      {
        pathname: '/left/foo',
        expected: { prefix: '', route: 'left', cleanPath: '/left' },
        description: 'extra segments after left are trimmed'
      },
      {
        pathname: '/right/bar/baz',
        expected: { prefix: '', route: 'right', cleanPath: '/right' },
        description: 'multiple extra segments trimmed'
      },

      // Production mode with prefix
      {
        pathname: '/urlrewrite/',
        expected: { prefix: '/urlrewrite', route: null, cleanPath: '/urlrewrite/' },
        description: 'prefix with trailing slash'
      },
      {
        pathname: '/urlrewrite/left',
        expected: { prefix: '/urlrewrite', route: 'left', cleanPath: '/urlrewrite/left' },
        description: 'prefix with left route'
      },
      {
        pathname: '/urlrewrite/right',
        expected: { prefix: '/urlrewrite', route: 'right', cleanPath: '/urlrewrite/right' },
        description: 'prefix with right route'
      },
      {
        pathname: '/urlrewrite/invalid',
        expected: { prefix: '/urlrewrite', route: null, cleanPath: '/urlrewrite/' },
        description: 'prefix with invalid route redirects to prefix root'
      },
      {
        pathname: '/urlrewrite/left/extra',
        expected: { prefix: '/urlrewrite', route: 'left', cleanPath: '/urlrewrite/left' },
        description: 'prefix with extra segments trimmed'
      },
      {
        pathname: '/urlrewrite/foo/bar',
        expected: { prefix: '/urlrewrite', route: null, cleanPath: '/urlrewrite/' },
        description: 'prefix with invalid nested paths'
      },

      // Generic prefix support
      {
        pathname: '/myapp/',
        expected: { prefix: '/myapp', route: null, cleanPath: '/myapp/' },
        description: 'generic prefix works'
      },
      {
        pathname: '/myapp/left',
        expected: { prefix: '/myapp', route: 'left', cleanPath: '/myapp/left' },
        description: 'generic prefix with route'
      },
      {
        pathname: '/demo/right',
        expected: { prefix: '/demo', route: 'right', cleanPath: '/demo/right' },
        description: 'different prefix name'
      },
      {
        pathname: '/app123/invalid',
        expected: { prefix: '/app123', route: null, cleanPath: '/app123/' },
        description: 'numeric prefix with invalid route'
      },

      // Multi-segment paths treated as having prefix
      {
        pathname: '/foo/bar/baz',
        expected: { prefix: '/foo', route: null, cleanPath: '/foo/' },
        description: 'multi-segment path extracts prefix'
      },
      {
        pathname: '/random/stuff',
        expected: { prefix: '/random', route: null, cleanPath: '/random/' },
        description: 'arbitrary multi-segment path'
      },
    ])('$description: $pathname', ({ pathname, expected }) => {
      const result = parseUrl(pathname, VALID_ROUTES);
      expect(result).toEqual(expected);
    });
  });
});