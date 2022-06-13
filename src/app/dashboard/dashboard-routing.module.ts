import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './containers/member/member.component';

const routes: Routes = [
  {
    path: 'member',
    component: MemberComponent,
  },
  { path: '', redirectTo: 'member', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
