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
    return sessionStorage.getItem('auth_token');
  }

  //TODO: change to include the role and email of the user and save all to session not localstorage
  setAuthToken(token: string | null): void {
    if (token !== null) {
      sessionStorage.setItem('auth_token', token);
    } else {
      sessionStorage.removeItem('auth_token');
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
    }).then((res) => {
      const userDetails = res?.data;
      this.setAuthToken(userDetails?.token);
      sessionStorage.setItem('email', userDetails?.email);
      sessionStorage.setItem('role', userDetails?.role);
      return res;
    });
  }

  signup(user: UserSignupReq) {
    return axios({
      method: 'POST',
      url: '/user/signup',
      data: user,
    });
  }

  logout() {
    sessionStorage.clear();
  }
}
