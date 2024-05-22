import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Dungeon } from './models';

@Injectable({
  providedIn: 'root',
})
export class DungeonsService {
  getDungeons() {
    return from(import('./data.json').then((m) => m.default)) as Observable<
      Dungeon[]
    >;
  }
}
