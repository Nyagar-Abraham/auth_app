export interface SignupParams {
  name?: string;
  email: string;
  photo?: string;
  password: string;
  passwordConfirm?: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface ResetPasswordparams {
  userDetails: {
    password: string;
    passwordConfirm: string;
  };
  token: string;
}

export interface ForgotPasswordParams {
  email: string;
}
