import { getCurrentUser } from "@/common/server/auth";
import { sendApiError, throwMethodNotAllowed } from "@/common/server/error";
import { updateTaskSchema } from "@/modules/server/tasks";
import {
  deleteTask,
  getTask,
  updateTask,
} from "@/modules/server/tasks/server";
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
      case "PUT":
        await handlePUT(req, res);
        break;
      case "DELETE":
        await handleDELETE(req, res);
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
  const response = await getTask(req.query.id as string, user.id);
  res.status(201).json({
    data: response,
    message: "Task show success",
  });
};

const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = await updateTaskSchema.parse(req.body);
  const user = await getCurrentUser(req);
  const response = await updateTask(req.query.id as string, user.id, params);
  res.status(201).json({
    data: response,
    message: "Task update success",
  });
};

const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getCurrentUser(req);
  await deleteTask(req.query.id as string, user.id);
  res.status(201).json({
    message: "Task delete success",
  });
};
