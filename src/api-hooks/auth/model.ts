export type UserType = {
  email: string;
  password: string;
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetMeResponseType = {
  data: UserType;
  message: string;
};

export type SignInResponseType = {
  data: {
    token: string;
  };
  message: string;
};

export type SignUpResponseType = {
  data: UserType;
  message: string;
};

export type SignInParamsType = {
  email: string;
  password: string;
};

export type SignUpParamsType = {
  email: string;
  password: string;
  name: string;
  passwordConfirmation: string;
};
