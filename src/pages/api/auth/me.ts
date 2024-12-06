import { getCurrentUser } from "@/common/server/auth";
import { sendApiError, throwMethodNotAllowed } from "@/common/server/error";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        await handleGET(req, res);
        break;
      default:
        throwMethodNotAllowed(res, req.method);
    }
  } catch (error) {
    sendApiError(res, error);
  }
}

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getCurrentUser(req);
  const response = {
    data: user,
    message: "Me show success",
  }
  res.status(201).json(response);
};
