import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Dungeon } from './models';

export const DungeonsActions = createActionGroup({
  source: 'Dungeons',
  events: {
    init: emptyProps(),

    loadData: emptyProps(),
    loadDataSuccess: props<{ dungeons: Dungeon[] }>(),
    loadDataError: emptyProps(),

    updateDungeonTime: props<{
      serverSlug: string;
      dungeonSlug: string;
      time: number;
    }>(),
  },
});
