import { Component } from '@angular/core';

@Component({
  selector: 'login-indicator',
  templateUrl: './login-indicator.component.html',
  styleUrls: ['./login-indicator.component.css']
})
export class LoginIndicatorComponent {
  public userName: String = 'John Doe';
}
