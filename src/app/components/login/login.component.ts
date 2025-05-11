import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Session } from 'inspector';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  isLoggedIn = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.isLoggedIn = this.auth.isLoggedIn();
  }

  onSubmit() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;

    this.auth.login(username, password);

    if (!this.auth.isLoggedIn()) {
      this.loginForm.setErrors({
        invalidLogin: true,
      });

      Object.keys(this.loginForm.controls).forEach((field) => {
        const control = this.loginForm.get(field);
        if (control) {
          control.setErrors({
            isInvalid: true,
          });
        }
      });

      return false;
    }

    this.router.navigate(['/']);
    return true;
  }

  logout() {
    this.auth.logout();
    this.isLoggedIn = false;
  }

  resetFormErrors() {
    Object.keys(this.loginForm.controls).forEach((field) => {
      const control = this.loginForm.get(field);
      if (control) {
        control.setErrors(null);
      }
    });
  }
}
