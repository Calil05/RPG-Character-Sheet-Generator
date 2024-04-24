import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../interfaces/user-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { passwordMatchValidator } from '../validators/password-match-validator';

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

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router) { 

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: passwordMatchValidator
    });
  }

  onSubmit() {
    this.submitted = true;

    console.warn(this.registerForm)

    if(this.registerForm.valid) {
      const userData: UserInterface = {
        name: this.registerForm.value.username,
        email: this.registerForm.value.email,
        passwd: this.registerForm.value.password,
        access_level: 'USER'
      };

      this.userService.createUser(userData).subscribe(
        success => console.log("User Created"),
        error => console.error("Error"),
        () => console.log("Requent Completed")
      );
      this.router.navigate(['/main-screen']);
    }
  }

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
