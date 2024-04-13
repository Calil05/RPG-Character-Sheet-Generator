import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  option: string = 'login';

  toggleOption(selectedOption: string) {
    this.option = selectedOption
  }

}
