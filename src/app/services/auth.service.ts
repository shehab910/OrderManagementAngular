import { Injectable } from '@angular/core';
import axios from 'axios';
import { UserLoginReq, UserSignupReq } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    // axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem('auth_token');
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem('auth_token', token);
    } else {
      window.localStorage.removeItem('auth_token');
    }
  }

  authenticatedRequest(method: string, url: string, data: any): Promise<any> {
    let headers: any = {};

    if (this.getAuthToken() !== null) {
      headers = { Authorization: 'Bearer ' + this.getAuthToken() };
    } else {
      throw new Error('No token, login first');
      //TODO: handle error
    }

    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers,
    });
  }

  login(user: UserLoginReq) {
    return axios({
      method: 'POST',
      url: '/user/login',
      data: user,
    });
  }

  signup(user: UserSignupReq) {
    return axios({
      method: 'POST',
      url: '/user/signup',
      data: user,
    });
  }
}
