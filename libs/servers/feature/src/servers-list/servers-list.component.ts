import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { serversFeature } from '@metin2tools/servers/data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-servers-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './servers-list.component.html',
  styleUrl: './servers-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServersListComponent {
  private store = inject(Store);

  servers$ = this.store.select(serversFeature.selectServers);
}
