import { inject, Injectable } from '@angular/core';
import { BrowserStorageService } from '@metin2tools/utils';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, map, mergeMap, switchMap, tap } from 'rxjs';
import { ServerItem } from './models';
import { ServersActions } from './servers.actions';
import { ServersService } from './servers.service';

@Injectable()
export class ServersEffects {
  private actions$ = inject(Actions);
  private browserStorageService = inject(BrowserStorageService);
  private serversService = inject(ServersService);

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServersActions.init),
      map(() => ServersActions.loadData()),
    );
  });

  loadData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServersActions.loadData),
      switchMap(() =>
        forkJoin([
          this.serversService.getServers(),
          this.serversService.getServerItems(),
        ]).pipe(
          map(([servers, serverItems]) =>
            ServersActions.loadDataSuccess({ servers, serverItems }),
          ),
        ),
      ),
    );
  });

  loadDataSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServersActions.loadDataSuccess),
      map(({ servers, serverItems }) => ({
        servers,
        serverItems: this.updateServerItemsPrices(serverItems),
      })),
      mergeMap(({ servers, serverItems }) => [
        ServersActions.loadServers({ servers }),
        ServersActions.loadServerItems({ serverItems }),
      ]),
    );
  });

  updateItemPrice$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ServersActions.updateItemPrice),
        tap(({ serverSlug, price, itemId }) => {
          const items = this.getItemsFromLocalStorage();

          if (!items[serverSlug]) {
            items[serverSlug] = {};
          }

          items[serverSlug][itemId] = price;

          this.saveItemsInLocalStorage(items);
        }),
      );
    },
    { dispatch: false },
  );

  private updateServerItemsPrices(serverItems: ServerItem[]) {
    const items = this.getItemsFromLocalStorage();

    if (!items) return serverItems;

    return serverItems.map((item) => {
      if (!items[item.serverSlug] || !items[item.serverSlug][item.id]) {
        return item;
      }

      return {
        ...item,
        price: items[item.serverSlug][item.id],
      };
    });
  }

  private getItemsFromLocalStorage() {
    const itemsString = this.browserStorageService.getItem('items');

    if (!itemsString) {
      return {};
    }

    return JSON.parse(itemsString);
  }

  private saveItemsInLocalStorage(items: unknown) {
    this.browserStorageService.setItem('items', JSON.stringify(items));
  }
}
