export interface User {
  lastName: any;
  firstName: any;
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export interface UserSignupReq {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLoginReq {
  email: string;
  password: string;
}
