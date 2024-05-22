import { ServerItems, serversFeature } from '@metin2tools/servers/data-access';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { DungeonsActions } from './dungeons.actions';
import { Dungeon, DungeonsState } from './models';

export const initialState: DungeonsState = {
  dungeons: [],
};

const reducer = createReducer(
  initialState,

  on(DungeonsActions.loadDataSuccess, (state: DungeonsState, { dungeons }) => ({
    ...state,
    dungeons,
  })),

  on(
    DungeonsActions.updateDungeonTime,
    (state: DungeonsState, { dungeonSlug, time }) => {
      const dungeonIndex = state.dungeons.findIndex(
        (dung) => dung.slug === dungeonSlug,
      );

      if (dungeonIndex === -1) {
        return state;
      }

      const dungeons = structuredClone(state.dungeons);

      dungeons[dungeonIndex].time = time;

      return {
        ...state,
        dungeons,
      };
    },
  ),
);

export const dungeonsFeature = createFeature({
  name: 'dungeons',
  reducer,
  extraSelectors: ({ selectDungeons }) => ({
    selectDungeons: (serverSlug: string) =>
      createSelector(selectDungeons, (dungeons) =>
        getDungeonsForServer(dungeons, serverSlug),
      ),
    selectDungeon: (dungeonSlug: string) =>
      createSelector(
        selectDungeons,
        serversFeature.selectServerItems,
        (dungeons, serverItems) =>
          getDungeon(dungeons, serverItems, dungeonSlug),
      ),
    dungeonDrop: (dungeonSlug: string) =>
      createSelector(
        selectDungeons,
        serversFeature.selectServerItems,
        (dungeons, dungeonItems) =>
          getDungeonDrop(dungeons, dungeonItems, dungeonSlug),
      ),
  }),
});

const getDungeonsForServer = (dungeons: Dungeon[], serverSlug: string) =>
  dungeons.filter((dungeon) => dungeon.serverSlug === serverSlug);

const getDungeon = (
  dungeons: Dungeon[],
  serverItems: ServerItems,
  dungeonSlug: string,
) => {
  const dungeon = dungeons.find((dungeon) => dungeon.slug === dungeonSlug);

  if (!dungeon) {
    return;
  }

  const items = serverItems[dungeon.serverSlug];

  const dungeonClone = structuredClone(dungeon);

  dungeonClone.drop.items = dungeonClone.drop.items.map((dungeonItem) => {
    if (!items[dungeonItem.itemId]) {
      return dungeonItem;
    }

    return { ...dungeonItem, ...items[dungeonItem.itemId] };
  });

  dungeonClone.totalProfit = getDungeonTotalProfit(dungeonClone);

  return dungeonClone;
};

const getDungeonDrop = (
  dungeons: Dungeon[],
  serverItems: ServerItems,
  dungeonSlug: string,
) => getDungeon(dungeons, serverItems, dungeonSlug)?.drop;

const getDungeonTotalProfit = (dungeon: Dungeon) => {
  return dungeon.drop.items.reduce((acc, item) => {
    const totalItemPrice =
      item.price && item.amount ? item.price * item.amount : 0;

    return acc + totalItemPrice;
  }, 0);
};
