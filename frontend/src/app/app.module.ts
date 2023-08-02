import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HospitalLoginComponent } from './components/hospital/hospital-login/hospital-login.component';
import { HospitalSignupComponent } from './components/hospital/hospital-signup/hospital-signup.component';
import { CustomerSignupComponent } from './components/customer/customer-signup/customer-signup.component';
import { CustomerLoginComponent } from './components/customer/customer-login/customer-login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// material imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HospitalDashboardComponent } from './components/hospital/hospital-dashboard/hospital-dashboard.component';
import { CustomerDashboardComponent } from './components/customer/customer-dashboard/customer-dashboard.component';
import { FormsModule } from '@angular/forms';
import { DoctorListComponent } from './components/hospital/doctor-list/doctor-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HospitalLoginComponent,
    HospitalSignupComponent,
    CustomerSignupComponent,
    CustomerLoginComponent,
    NavbarComponent,
    HospitalDashboardComponent,
    CustomerDashboardComponent,
    DoctorListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // material imports
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
