/*
* File: auth.service.ts
* Author: Varga Livia
* Copyright: 2026, Varga Livia
* Group: Szoft II-E
* Date: 2026 03 31
* Github:
* Licenc: MIT
*/

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface LoginRequest {
  name: string;
  password: string;
}

export interface LoginFormValue {
  name?: string | null;
  password?: string | null;
}

export interface RegisterFormValue {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  password_confirmation?: string | null;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  accessToken: string;
}

export interface RegisterResponse {
  succes?: boolean;
  success?: boolean;
  data: {
    id: number;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private loggedIn = false;

  login(credentials: LoginFormValue): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:8000/api/login', {
      name: credentials.name ?? '',
      password: credentials.password ?? ''
    });
  }

  register(credentials: RegisterFormValue): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('http://localhost:8000/api/register', {
      name: credentials.name ?? '',
      email: credentials.email ?? '',
      password: credentials.password ?? '',
      password_confirmation: credentials.password_confirmation ?? ''
    });
  }

  loginSuccess(): void {
    this.loggedIn = true;
  }

  isLoggedIn(): boolean {
    return this.loggedIn || !!localStorage.getItem('token');
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('token');
  }
}