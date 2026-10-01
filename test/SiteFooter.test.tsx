// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SiteFooter } from '../src/react';

describe('SiteFooter', () => {
  it.each([
    { repo: 'converter', href: 'https://github.com/johnpfeiffer/converter' },
    { repo: 'links-app', href: 'https://github.com/johnpfeiffer/links-app' },
  ])('links $repo to its GitHub repository and to LinkedIn', ({ repo, href }) => {
    render(<SiteFooter repo={repo} />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent('Built by John Pfeiffer');
    expect(screen.getByRole('link', { name: 'Source code on GitHub' })).toHaveAttribute('href', href);
    expect(screen.getByRole('link', { name: 'John Pfeiffer on LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/foupfeiffer',
    );
    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('renders app-specific children above the author line', () => {
    render(
      <SiteFooter repo="benchmarks">
        <p>Data sources: Artificial Analysis</p>
      </SiteFooter>,
    );
    const footer = screen.getByRole('contentinfo');
    expect(footer.textContent).toMatch(/^Data sources: Artificial Analysis.*Built by John Pfeiffer/);
  });
});
