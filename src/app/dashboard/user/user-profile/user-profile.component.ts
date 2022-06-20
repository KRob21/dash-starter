import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  @Input()
  parent!: FormGroup;

  ngOnInit(): void {}

  get phone() {
    return this.parent.get('phone');
  }
  get birthday() {
    return this.parent.get('birthday');
  }
}
