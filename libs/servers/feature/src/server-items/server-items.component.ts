import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  ServersActions,
  serversFeature,
} from '@metin2tools/servers/data-access';
import { KkCurrencyPipe } from '@metin2tools/utils';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'lib-server-items',
  standalone: true,
  imports: [CommonModule, KkCurrencyPipe, FormsModule],
  templateUrl: './server-items.component.html',
  styleUrl: './server-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerItemsComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  private dungeonSlug = toSignal(
    this.route.params.pipe(map((params) => params['serverSlug'])),
  );

  server = computed(() => {
    const info = this.store.selectSignal(
      serversFeature.selectServerWithItems(this.dungeonSlug()),
    );

    return info();
  });

  itemFilters = model('');

  serverItems = computed(() => {
    if (!this.server() || !this.server().items) {
      return [];
    }

    const items = Object.values(this.server().items);

    return items.filter((item) =>
      item.name.toLowerCase().includes(this.itemFilters().toLowerCase()),
    );
  });

  updateItemPrice(serverSlug: string, itemId: string, price: number) {
    this.store.dispatch(
      ServersActions.updateItemPrice({
        price,
        itemId,
        serverSlug,
      }),
    );
  }
}
