import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '/balades/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '/500',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '/418',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '/login',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
