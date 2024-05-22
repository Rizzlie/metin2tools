import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@metin2tools/servers/feature').then((m) => m.routes),
  },
  {
    path: 'servers',
    children: [
      {
        path: ':serverSlug',
        children: [
          {
            path: 'dungeons',
            loadChildren: () =>
              import('@metin2tools/dungeons/feature').then((m) => m.routes),
          },
        ],
      },
    ],
  },
];
