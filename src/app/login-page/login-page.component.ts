import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  credentials = {
    username: '',
    password: ''
  };

  option: string = 'login';

  constructor(private authService: AuthService) { }

  toggleOption(selectedOption: string) {
    this.option = selectedOption
  }

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        this.authService.setAuthToken(response.token);
        console.warn("Logged in")
      },
      (error) => {
        console.error("ERROR! ", error)
      }
    );
  }

}
