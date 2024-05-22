import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Server, ServerItem } from './models';

export const ServersActions = createActionGroup({
  source: 'Servers',
  events: {
    init: emptyProps(),

    loadData: emptyProps(),
    loadDataSuccess: props<{ servers: Server[]; serverItems: ServerItem[] }>(),
    loadDataError: emptyProps(),

    loadServers: props<{ servers: Server[] }>(),
    loadServerItems: props<{ serverItems: ServerItem[] }>(),

    updateItemPrice: props<{
      itemId: string;
      price: number;
      serverSlug: string;
    }>(),
  },
});
