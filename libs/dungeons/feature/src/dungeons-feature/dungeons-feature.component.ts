import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-dungeons-feature',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dungeons-feature.component.html',
  styleUrl: './dungeons-feature.component.scss',
})
export class DungeonsFeatureComponent {}
