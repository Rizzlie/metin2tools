import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./servers-feature/servers-feature.component').then(
        (m) => m.ServersFeatureComponent,
      ),
    children: [
      {
        path: 'servers/:serverSlug/items',
        loadComponent: () =>
          import('./server-items/server-items.component').then(
            (m) => m.ServerItemsComponent,
          ),
      },
      {
        path: '',
        loadComponent: () =>
          import('./servers-list/servers-list.component').then(
            (m) => m.ServersListComponent,
          ),
      },
    ],
  },
];
