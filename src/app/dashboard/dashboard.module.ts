import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { PlatformSelectorComponent } from './user/platform-selector/platform-selector.component';
import { ListPageComponent } from './members/list-page/list-page.component';
import { DetailPageComponent } from './members/detail-page/detail-page.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    UserComponent,
    UserProfileComponent,
    PlatformSelectorComponent,
    ListPageComponent,
    DetailPageComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
