import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QuestioneriesComponent } from './questioneries/questioneries.component';
import { UsersShowComponent } from './users-show/users-show.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'questioneries', component: QuestioneriesComponent },
  { path: 'adminPage', component: UsersShowComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: 'registration', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }