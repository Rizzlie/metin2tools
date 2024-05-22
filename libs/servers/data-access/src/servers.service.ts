import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Server, ServerItem } from './models';

@Injectable({
  providedIn: 'root',
})
export class ServersService {
  getServers() {
    return from(import('./servers.json').then((m) => m.default)) as Observable<
      Server[]
    >;
  }

  getServerItems() {
    return from(
      import('./serverItems.json').then((m) => m.default),
    ) as Observable<ServerItem[]>;
  }
}
