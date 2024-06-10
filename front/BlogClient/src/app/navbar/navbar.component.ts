import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../auth/authservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Note: Use styleUrls instead of styleUrl
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false; // Rename to isLoggedIn

  constructor(private authService: AuthserviceService) {}

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo(); // Get user information
    this.isLoggedIn = userInfo && userInfo.token !== null; // Check if token exists
  }

  logout(): void {
    this.authService.logout();
  }
}