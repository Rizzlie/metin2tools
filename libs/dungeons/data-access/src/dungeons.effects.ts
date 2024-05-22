import { inject, Injectable } from '@angular/core';
import { BrowserStorageService } from '@metin2tools/utils';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { DungeonsActions } from './dungeons.actions';
import { Dungeon } from './models';

@Injectable()
export class DungeonsEffects {
  private actions$ = inject(Actions);
  private browserStorageService = inject(BrowserStorageService);

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DungeonsActions.init),
      map(() => DungeonsActions.loadData()),
    );
  });

  loadData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DungeonsActions.loadData),
      switchMap(() =>
        from(import('./data.json').then((m) => m.default)).pipe(
          map((dungeons) => this.mapDungeons(dungeons)),
          map((dungeons: Dungeon[]) =>
            DungeonsActions.loadDataSuccess({ dungeons }),
          ),
          catchError(() => of(DungeonsActions.loadDataError())),
        ),
      ),
    );
  });

  updateDungeonTime$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DungeonsActions.updateDungeonTime),
        tap(({ serverSlug, dungeonSlug, time }) => {
          const timers = this.getDungeonTimersFromBrowserStorage();

          if (!timers[serverSlug]) {
            timers[serverSlug] = {};
          }

          timers[serverSlug][dungeonSlug] = time;

          this.saveDungeonTimersInLocalStorage(timers);
        }),
      );
    },
    { dispatch: false },
  );

  private mapDungeons(dungeons: Dungeon[]) {
    dungeons = this.updateDungeonTimersFromLocalStorage(dungeons);

    return dungeons;
  }

  private updateDungeonTimersFromLocalStorage(dungeons: Dungeon[]) {
    const timers = this.getDungeonTimersFromBrowserStorage();

    return dungeons.map((dungeon) => {
      if (!timers[dungeon.serverSlug][dungeon.slug]) {
        return dungeon;
      }

      dungeon.time = timers[dungeon.serverSlug][dungeon.slug];

      return dungeon;
    });
  }

  private getDungeonTimersFromBrowserStorage() {
    const timerString = this.browserStorageService.getItem('timers');

    if (!timerString) {
      return {};
    }

    return JSON.parse(timerString);
  }

  private saveDungeonTimersInLocalStorage(timers: unknown) {
    this.browserStorageService.setItem('timers', JSON.stringify(timers));
  }
}
