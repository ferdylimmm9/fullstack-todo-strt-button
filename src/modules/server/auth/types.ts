import { signInScheama, signUpSchema } from "./schema";

export type SignUpParamsType = Zod.infer<typeof signUpSchema>;
export type SignInParamsType = Zod.infer<typeof signInScheama>;
export type UserType = {
  email: string;
  password: string;
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
