export interface User {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
}

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  checkout?: boolean;
  dialogId: string;
}

export interface SignInParams extends Omit<SignUpParams, 'name'> {}
