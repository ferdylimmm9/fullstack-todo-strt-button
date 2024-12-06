import { getCurrentUser } from "@/common/server/auth";
import { sendApiError, throwMethodNotAllowed } from "@/common/server/error";
import { updateTaskSchema } from "@/modules/server/tasks";
import { deleteTask, getTask, updateTask } from "@/modules/server/tasks/server";
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
  const result = await getTask(req.query.id as string, user.id);
  const response = {
    data: result,
    message: "Task show success",
  };
  res.status(201).json(response);
};

const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = await updateTaskSchema.parse(req.body);
  if (
    params.description === undefined &&
    params.name === undefined &&
    params.status === undefined
  ) {
    throw new Error("No data to update");
  }
  const user = await getCurrentUser(req);
  const result = await updateTask(req.query.id as string, user.id, params);
  const response = {
    data: result,
    message: "Task update success",
  };
  res.status(201).json(response);
};

const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getCurrentUser(req);
  await deleteTask(req.query.id as string, user.id);
  res.status(201).json({
    message: "Task delete success",
  });
};
