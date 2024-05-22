import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-servers-feature',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './servers-feature.component.html',
  styleUrl: './servers-feature.component.scss',
})
export class ServersFeatureComponent {}
