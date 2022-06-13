import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'platform-selector',
  templateUrl: './platform-selector.component.html',
  styleUrls: ['./platform-selector.component.scss'],
})
export class PlatformSelectorComponent {
  @Input()
  parent!: FormGroup;

  constructor() {}
}
