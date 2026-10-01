import type { ReactNode } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Container, Link, Typography } from '@mui/material';

export const AUTHOR = 'John Pfeiffer';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/foupfeiffer';

export function githubRepoUrl(repo: string): string {
  return `https://github.com/johnpfeiffer/${repo}`;
}

export interface SiteFooterProps {
  /** GitHub repository name under johnpfeiffer, e.g. "converter". */
  repo: string;
  /** Optional app-specific content (e.g. data-source credits) shown above the author line. */
  children?: ReactNode;
}

const iconLinkSx = { display: 'inline-flex', verticalAlign: 'text-bottom' } as const;

/** Shared app footer: optional app content, then "Built by" with LinkedIn and GitHub links. */
export function SiteFooter({ repo, children }: SiteFooterProps) {
  return (
    <Container component="footer" maxWidth={false} sx={{ width: '90%', mx: 'auto', py: 3 }}>
      {children}
      <Typography variant="body2">
        Built by {AUTHOR}{' '}
        <Link
          aria-label={`${AUTHOR} on LinkedIn`}
          color="inherit"
          href={LINKEDIN_URL}
          rel="noopener noreferrer"
          sx={iconLinkSx}
          target="_blank"
          underline="hover"
        >
          <LinkedInIcon />
        </Link>{' '}
        <Link
          aria-label="Source code on GitHub"
          color="inherit"
          href={githubRepoUrl(repo)}
          rel="noopener noreferrer"
          sx={iconLinkSx}
          target="_blank"
          underline="hover"
        >
          <GitHubIcon />
        </Link>
      </Typography>
    </Container>
  );
}
