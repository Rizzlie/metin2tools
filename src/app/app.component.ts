import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DungeonsActions } from '@metin2tools/dungeons/data-access';
import { ServersActions } from '@metin2tools/servers/data-access';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  ngOnInit() {
    this.store.dispatch(ServersActions.init());
    this.store.dispatch(DungeonsActions.init());
  }
}
