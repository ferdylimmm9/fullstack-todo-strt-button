// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCurrentUser } from "@/common/server/auth";
import { sendApiError, throwMethodNotAllowed } from "@/common/server/error";
import { createTaskSchema } from "@/modules/server/tasks";
import { createTask, getTasks } from "@/modules/server/tasks/server";
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

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getCurrentUser(req);
  const response = await getTasks(user.id, req);
  res.status(201).json({ ...response, message: "Task list success" });
};

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = createTaskSchema.parse(req.body);
  const user = await getCurrentUser(req);
  const response = await createTask(user.id, params);
  res.status(201).json({
    data: response,
    message: "Task create success",
  });
};
