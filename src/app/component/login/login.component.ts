import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlShortnerService } from 'src/app/shared/url-shortner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private router: Router) {}
  login() {
    if (this.username !== '' && this.password !== '') {
      localStorage.setItem('currentUser', this.username + ':' + this.password);
      this.router.navigate(['/home']);
    } else {
      this.username = '';
      this.password = '';
      this.errorMessage = 'Invalid Username or Password!';
    }
  }
}
