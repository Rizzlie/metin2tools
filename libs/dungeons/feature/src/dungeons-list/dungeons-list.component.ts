import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { dungeonsFeature } from '@metin2tools/dungeons/data-access';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'lib-dungeon-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dungeons-list.component.html',
  styleUrl: './dungeons-list.component.scss',
})
export class DungeonsListComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  private serverSlug$ = this.route.params.pipe(
    map((params) => params['serverSlug']),
  );

  dungeons$ = this.serverSlug$.pipe(
    switchMap((slug) =>
      this.store.select(dungeonsFeature.selectDungeons(slug)),
    ),
  );
}
