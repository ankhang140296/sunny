import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HomeComponent} from './pages/home/home.component';
import {DetailsComponent} from './pages/details/details.component';
import {WeatherService} from './services/weather/weather.service';
import {HttpClientModule} from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {WeatherCardComponent} from './ui/weather-card/weather-card.component';
import {AddCardComponent} from './ui/add-card/add-card.component';
import {AddComponent} from './pages/add/add.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {UiService} from './services/ui/ui.service';
import { CustomerService } from './shared/customer.service';
import { CustomerComponent } from './pages/add/customer/customer.component';
import { CustomerListComponent } from './pages/admin/customer-list/customer-list.component';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './pages/admin/admin.component';
import { TicketDetailComponent } from './pages/add/customer/ticket-detail/ticket-detail.component';
import { GrdFilterPipe } from './shared/grd-filter.pipe';
import { StatisticsService } from './shared/statistics.service';
import { StatisticsComponent } from './pages/admin/statistics/statistics.component';
import { TypeOfTicketsComponent } from './pages/admin/statistics/type-of-tickets/type-of-tickets.component';
import { TypeOfStatusComponent } from './pages/admin/statistics/type-of-status/type-of-status.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FusionChartsModule } from 'angular-fusioncharts';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load fusion theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import { DatePipe } from '@angular/common';
import { AnalysisComponent } from './pages/admin/analysis/analysis.component';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme, TimeSeries)


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    WeatherCardComponent,
    AddCardComponent,
    AddComponent,
    LoginComponent,
    SignupComponent,
    AddCardComponent,
    CustomerComponent,
    CustomerListComponent,
    AdminComponent,
    TicketDetailComponent,
    GrdFilterPipe,
    StatisticsComponent,
    TypeOfTicketsComponent,
    TypeOfStatusComponent,
    NavbarComponent,
    AnalysisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    FusionChartsModule
  ],
  providers: [
    WeatherService,
    UiService,
    CustomerService,
    StatisticsService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


