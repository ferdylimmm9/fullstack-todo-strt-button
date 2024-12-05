import { sendApiError, throwMethodNotAllowed } from "@/common/server/error";
import { signInScheama, signInUserAccount } from "@/modules/server/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        await handlePOST(req, res);
        break;
      default:
        throwMethodNotAllowed(res, req.method);
    }
  } catch (error) {
    sendApiError(res, error);
  }
}

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = signInScheama.parse(req.body);
  const user = await signInUserAccount(params);
  res.status(201).json({
    data: user,
    message: "Sign in success",
  });
};
