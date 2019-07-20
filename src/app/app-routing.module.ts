import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {DetailsComponent} from './pages/details/details.component';
import {AddComponent} from './pages/add/add.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import { AdminComponent } from './pages/admin/admin.component';
import { TicketDetailComponent } from './pages/add/customer/ticket-detail/ticket-detail.component';
import { StatisticsComponent } from './pages/admin/statistics/statistics.component';
import { AnalysisComponent } from './pages/admin/analysis/analysis.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'details/:city', component: DetailsComponent},
  {path: 'add', component: AddComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'ticket-detail', component: TicketDetailComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'analysis', component: AnalysisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
