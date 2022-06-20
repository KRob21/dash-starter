import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'profile',
    component: UserComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  // {
  //   path: 'kanban',
  //   loadChildren: () =>
  //     import('../kanban/kanban.module').then((m) => m.KanbanModule),
  //   canActivate: [AuthGuard],
  // },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
