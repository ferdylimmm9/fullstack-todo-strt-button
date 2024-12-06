import prisma from "@/common/server/prisma";
import { SignInParamsType, SignUpParamsType } from "./types";
import { hash, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { selectUser } from "./model";

const salt = process.env.BCRYPT_SALT as string;
export const createUserAccount = async (params: SignUpParamsType) => {
  const existUser = await prisma.user.findUnique({
    where: {
      email: params.email,
    },
  });

  if (existUser) {
    throw new Error("An user with this email already exists.");
  }
  const password = await hash("secret123", parseInt(salt));
  const newUser = await prisma.user.create({
    data: {
      email: params.email,
      name: params.name,
      password,
    },
    select: selectUser,
  });

  return newUser;
};

export const signInUserAccount = async (params: SignInParamsType) => {
  const user = await prisma.user.findUnique({
    where: {
      email: params.email,
    },
  });

  if (user === null) {
    throw new Error("Email not found");
  }

  const isValid = compareSync(params.password, user?.password as string);

  if (!isValid) {
    throw new Error("Invalid password");
  }

  const token = sign({ ...user, password: undefined }, salt, {
    expiresIn: "30d",
  });

  return { token };
};
