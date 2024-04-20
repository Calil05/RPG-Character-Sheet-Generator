import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  credentials = {
    email: '',
    passwd: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  option: string = 'login';

  toggleOption(selectedOption: string) {
    this.option = selectedOption
  }

  doLogin(event: Event) {
    event.preventDefault();
    this.authService.login(this.credentials).subscribe(
      (response) => {
        this.authService.setAuthToken(response.token);
        console.warn("Logged in");
        this.router.navigate(['/main-screen']);
      },
      (error) => {
        console.error("ERROR! ", error)
      }
    );
  }

}
