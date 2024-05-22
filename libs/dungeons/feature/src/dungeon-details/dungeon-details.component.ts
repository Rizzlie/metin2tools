import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Dungeon,
  DungeonsActions,
  dungeonsFeature,
} from '@metin2tools/dungeons/data-access';
import {
  DungeonItemsComponent,
  DungeonProfitComponent,
} from '@metin2tools/dungeons/ui';
import { KkCurrencyPipe } from '@metin2tools/utils';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-dungeon-details',
  standalone: true,
  imports: [
    CommonModule,
    KkCurrencyPipe,
    FormsModule,
    DungeonProfitComponent,
    DungeonItemsComponent,
  ],
  templateUrl: './dungeon-details.component.html',
  styleUrl: './dungeon-details.component.scss',
})
export class DungeonDetailsComponent {
  private store = inject(Store);

  dungeonSlug = input<string>();
  serverSlug = input<string>();

  dungeonTime = signal(10);

  dungeon = computed(() => {
    const info = this.store.selectSignal(
      dungeonsFeature.selectDungeon(this.dungeonSlug()!),
    );

    return info() as Dungeon;
  });

  constructor() {
    effect(
      () => {
        if (!this.dungeon()) {
          return;
        }

        this.dungeonTime.set(this.dungeon().time);
      },
      { allowSignalWrites: true },
    );
  }

  updateDungeonTime(time: number) {
    this.dungeonTime.set(time);

    console.log(time);

    this.store.dispatch(
      DungeonsActions.updateDungeonTime({
        serverSlug: this.serverSlug()!,
        time: this.dungeonTime()!,
        dungeonSlug: this.dungeonSlug()!,
      }),
    );
  }
}
