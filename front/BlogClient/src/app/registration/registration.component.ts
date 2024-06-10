import { Component } from '@angular/core';
import { Useregisteration } from '../auth/useregisteration';
import { AuthserviceService } from '../auth/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: Useregisteration = new Useregisteration();

  constructor(private authserviceService: AuthserviceService, private router: Router) { }

  registerUser() {
    this.authserviceService.RegistrationUser(this.user)
      .subscribe(
        response => {
          console.log('User registered successfully:', response);
          alert('successful Registered User!');
          this.router.navigate(['login']);
        },
        error => {
          console.error('Error during user registration:', error);
        }
      );
  }
}
