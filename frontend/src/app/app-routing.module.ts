import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalLoginComponent } from './components/hospital/hospital-login/hospital-login.component';
import { HospitalSignupComponent } from './components/hospital/hospital-signup/hospital-signup.component';
import { CustomerSignupComponent } from './components/customer/customer-signup/customer-signup.component';
import { CustomerLoginComponent } from './components/customer/customer-login/customer-login.component';
import { HospitalDashboardComponent } from './components/hospital/hospital-dashboard/hospital-dashboard.component';
import { DoctorListComponent } from './components/hospital/doctor-list/doctor-list.component';

const routes: Routes = [
  { path: 'hospital/login', component: HospitalLoginComponent },
  { path: 'hospital/signup', component: HospitalSignupComponent },
  { path: 'hospital/dashboard', component: HospitalDashboardComponent },
  { path: 'hospital/doctor', component: DoctorListComponent },
  { path: 'customer/login', component: CustomerLoginComponent },
  { path: 'customer/signup', component: CustomerSignupComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
