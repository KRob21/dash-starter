import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MemberComponent } from './containers/member/member.component';
import { MemberProfileComponent } from './components/member-profile/member-profile.component';
import { PlatformSelectorComponent } from './components/platform-selector/platform-selector.component';

@NgModule({
  declarations: [MemberComponent, MemberProfileComponent, PlatformSelectorComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
