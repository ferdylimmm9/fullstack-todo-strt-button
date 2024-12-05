import type { NextApiRequest } from "next";

import { verify } from "jsonwebtoken";
import { UserType } from "@/modules/server/auth";

const salt = process.env.BCRYPT_SALT as string;

// Get the current user from the request
export const getCurrentUser = async (req: NextApiRequest) => {
  const token = req.headers.authorization?.replace("Bearer ", "") as string;
  const data = await verify(token, salt) as UserType;
  return data;
};
