import z from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email({
      message: "Email must be a valid email address",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    passwordConfirmation: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    name: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "The passwords did not match",
    path: ["passwordConfirmation"],
  });

export const signInScheama = z.object({
  email: z.string().email({
    message: "Email must be a valid email address",
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long"',
  }),
});
