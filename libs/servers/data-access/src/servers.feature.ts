import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ServerItem, ServerItems, ServersState } from './models';
import { ServersActions } from './servers.actions';

export const initialState: ServersState = {
  servers: [],
  serverItems: {},
};

const reducer = createReducer(
  initialState,

  on(ServersActions.loadServers, (state: ServersState, { servers }) => ({
    ...state,
    servers,
  })),
  on(
    ServersActions.loadServerItems,
    (state: ServersState, { serverItems }) => ({
      ...state,
      serverItems: mapItems(serverItems),
    }),
  ),
  on(
    ServersActions.updateItemPrice,
    (state: ServersState, { serverSlug, itemId, price }) => ({
      ...state,
      serverItems: updateItemPrice({ state, serverSlug, itemId, price }),
    }),
  ),
);

export const serversFeature = createFeature({
  name: 'servers',
  reducer,
  extraSelectors: ({ selectServers, selectServerItems }) => ({
    selectServer: (serverSlug: string) =>
      createSelector(selectServers, (servers) =>
        servers.find((server) => server.slug === serverSlug),
      ),
    selectServerWithItems: (serverSlug: string) =>
      createSelector(
        selectServers,
        selectServerItems,
        (servers, serverItems) => {
          const server = servers.find((server) => server.slug === serverSlug);

          return {
            ...server,
            items: serverItems[serverSlug],
          };
        },
      ),
  }),
});

const updateItemPrice = ({
  state,
  serverSlug,
  itemId,
  price,
}: {
  state: ServersState;
  serverSlug: string;
  itemId: string;
  price: number;
}) => ({
  ...state.serverItems,
  [serverSlug]: {
    ...state.serverItems[serverSlug],
    [itemId]: {
      ...state.serverItems[serverSlug][itemId],
      price,
    },
  },
});

const mapItems = (items: ServerItem[]) => {
  const serverItems: ServerItems = {};

  items.forEach((item) => {
    if (!serverItems[item.serverSlug]) {
      serverItems[item.serverSlug] = {};
    }

    serverItems[item.serverSlug][item.id] = {
      id: item.id,
      price: item.price,
      name: item.name,
    };
  });

  return serverItems;
};
