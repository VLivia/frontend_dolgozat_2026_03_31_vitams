/*
* File: login.component.ts
* Author: Varga Livia
* Copyright: 2026, Varga Livia
* Group: Szoft II-E
* Date: 2026 03 31
* Github:
* Licenc: MIT
*/

import { Component, inject } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  auth = inject(AuthService)
  builder = inject(FormBuilder)
  router = inject(Router)
  loginError = ''
  registerError = ''
  registerSuccess = ''

  loginForm = this.builder.group({
    name: [''],
    password: ['']
  })

  registerForm = this.builder.group({
    name: [''],
    email: [''],
    password: [''],
    password_confirmation: ['']
  })

  login() {
    this.loginError = ''

    this.auth.login(this.loginForm.value).subscribe({
      next: (result: any) => {
        localStorage.setItem('token', result.accessToken)
        this.auth.loginSuccess()
        this.router.navigate(['/products'])
      },
      error: (error) => {
        this.loginError = error?.error?.error ?? 'A belepes sikertelen.'
      }
    })
  }

  register() {
    this.registerError = ''
    this.registerSuccess = ''

    this.auth.register(this.registerForm.value).subscribe({
      next: () => {
        const name = this.registerForm.value.name ?? ''
        const password = this.registerForm.value.password ?? ''

        this.registerSuccess = 'Sikeres regisztracio. Most be tudsz jelentkezni.'
        this.loginForm.patchValue({
          name,
          password,
        })
        this.registerForm.reset()
      },
      error: (error) => {
        this.registerError = error?.error?.error ?? 'A regisztracio sikertelen.'
      }
    })
  }
}
