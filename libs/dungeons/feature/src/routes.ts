import { Route } from '@angular/router';
import {
  DungeonsEffects,
  dungeonsFeature,
} from '@metin2tools/dungeons/data-access';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./dungeons-feature/dungeons-feature.component').then(
        (m) => m.DungeonsFeatureComponent,
      ),
    providers: [provideState(dungeonsFeature), provideEffects(DungeonsEffects)],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dungeons-list/dungeons-list.component').then(
            (m) => m.DungeonsListComponent,
          ),
      },
      {
        path: ':dungeonSlug',
        loadComponent: () =>
          import('./dungeon-details/dungeon-details.component').then(
            (m) => m.DungeonDetailsComponent,
          ),
      },
    ],
  },
];
