import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../interfaces/user-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });

  }

  option: string = 'login';

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }

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

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      delete formData.confirmPassword;

      this.authService.signup(formData).subscribe(
        (response) => {
          console.warn("User registered successfully!");
          // Redirect to login page or wherever you want
        },
        (error) => {
          console.error("ERROR! ", error);
        }
      );
    }
  }

}
