// AIDEV-NOTE: Main entry point - framework-free utilities only. React
// components live in ./react so importing these never pulls in React/MUI.
export { parseUrl, detectPrefix } from './urlParser.js';
export type { ParsedUrl } from './urlParser.js';
