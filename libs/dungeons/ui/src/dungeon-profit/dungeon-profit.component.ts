import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dungeon } from '@metin2tools/dungeons/data-access';
import { KkCurrencyPipe } from '@metin2tools/utils';

@Component({
  selector: 'lib-dungeon-profit',
  standalone: true,
  imports: [CommonModule, FormsModule, KkCurrencyPipe],
  templateUrl: './dungeon-profit.component.html',
  styleUrl: './dungeon-profit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DungeonProfitComponent {
  dungeon = input.required<Dungeon>();

  dungeonTime = model.required<number>();

  profitPerHour = computed(() => {
    if (!this.dungeonTime()) {
      return 0;
    }

    return ((60 / this.dungeonTime()!) * this.dungeon().totalProfit!) / 100;
  });

  updateDungeonTime = output<number>();

  onUpdate(time: number) {
    this.dungeonTime.set(time);

    this.updateDungeonTime.emit(this.dungeonTime());
  }
}
