import { ServerItem } from '@metin2tools/servers/data-access';

export interface DungeonItem extends Partial<ServerItem> {
  itemId: string;
  amount: number;
}

export interface Dungeon {
  serverSlug: string;
  name: string;
  slug: string;
  drop: {
    items: DungeonItem[];
  };
  time: number;
  totalProfit?: number;
}

export interface DungeonsState {
  dungeons: Dungeon[];
}
