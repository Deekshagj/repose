import { html } from 'lit';

if (!(globalThis as any).URLPattern) {
  await import("urlpattern-polyfill");
}

import { Router } from '@thepassle/app-tools/router.js';
import { lazy } from '@thepassle/app-tools/router/plugins/lazy.js';

// @ts-ignore
import { title } from '@thepassle/app-tools/router/plugins/title.js';

import './pages/app-home.js';
import './pages/app-about/app-journal.js'; // Import the new page component

const baseURL: string = (import.meta as any).env.BASE_URL;

export const router = new Router({
  routes: [
    {
      path: resolveRouterPath(),
      title: 'Home',
      render: () => html`<app-home></app-home>`
    },
    {
      path: resolveRouterPath('journal'), // Update path from 'about' to 'journal'
      title: 'Journal', // Update title to 'Journal'
      plugins: [
        lazy(() => import('./pages/app-about/app-journal.js')), // Update import to the new page component
      ],
      render: () => html`<app-journal></app-journal>` // Update render to the new component
    }
  ]
});

// This function will resolve a path with whatever Base URL was passed to the vite build process.
export function resolveRouterPath(unresolvedPath?: string) {
  var resolvedPath = baseURL;
  if (unresolvedPath) {
    resolvedPath = resolvedPath + unresolvedPath;
  }

  return resolvedPath;
}
