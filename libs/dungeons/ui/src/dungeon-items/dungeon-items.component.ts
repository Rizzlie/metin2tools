import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Dungeon } from '@metin2tools/dungeons/data-access';
import { KkCurrencyPipe } from '@metin2tools/utils';

@Component({
  selector: 'lib-dungeon-items',
  standalone: true,
  imports: [CommonModule, KkCurrencyPipe],
  templateUrl: './dungeon-items.component.html',
  styleUrl: './dungeon-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DungeonItemsComponent {
  dungeon = input.required<Dungeon>();
}
