import prisma from "@/common/server/prisma";
import { CreateTaskParamsType, UpdateTaskParamsType } from "./types";
import { NextApiRequest } from "next";
import { Prisma, TaskStatus } from "@prisma/client";
import regex from "@/common/constant/regex";

export const getTasks = async (userId: string, req: NextApiRequest) => {
  let page: number = 1;
  let limit: number | undefined = 10;

  // pagination
  if (req.query.limit === "-1") {
    limit = undefined;
    page = 1;
  } else {
    const _limit = req.query.limit;
    const _page = req.query.page;
    if (
      typeof _limit === "string" &&
      regex.number.test(_limit) &&
      parseInt(_limit) > 0
    ) {
      limit = parseInt(req.query.limit as string);
    }

    if (
      typeof _page === "string" &&
      regex.number.test(_page) &&
      parseInt(_page) > 0
    ) {
      page = parseInt(req.query.page as string);
    }
  }

  // sort
  let createdAt: Prisma.SortOrder | undefined = undefined;
  if (req.query.createdAt === "asc") {
    createdAt = Prisma.SortOrder.asc;
  } else if (req.query.createdAt === "desc") {
    createdAt = Prisma.SortOrder.desc;
  }

  // filter
  let status: TaskStatus | undefined = undefined;
  if (req.query.status === TaskStatus.completed) {
    status = TaskStatus.completed;
  } else if (req.query.status === TaskStatus.pending) {
    status = TaskStatus.pending;
  }

  const data = await prisma.task.findMany({
    where: {
      userId,
      status,
    },
    orderBy: {
      createdAt,
    },
    take: limit,
    skip: page && limit && (page - 1) * limit,
  });

  const totalTasks = await prisma.task.count({ where: { userId, status } });
  const totalPages = limit ? Math.ceil(totalTasks / limit) : 1;

  return {
    data,
    meta: {
      pages: totalPages,
      total: totalTasks,
      limit,
      page,
    },
    sort: {
      created_at: createdAt || null,
    },
    filter: {
      status: status || null,
    },
  };
};

export const getTask = async (id: string, userId: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });
  if (task?.userId !== userId) {
    throw new Error("Forbidden");
  }
  if (task === null) {
    throw new Error("Task not found");
  }

  return task;
};

export const createTask = async (
  userId: string,
  params: CreateTaskParamsType
) => {
  const task = await prisma.task.create({
    data: {
      description: params.description,
      name: params.name,
      userId,
      status: params.status,
    },
  });

  return task;
};

export const updateTask = async (
  id: string,
  userId: string,
  params: UpdateTaskParamsType
) => {
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });
  if (task?.userId !== userId) {
    throw new Error("Forbidden");
  }
  if (task === null) {
    throw new Error("Task not found");
  }

  const updatedTask = await prisma.task.update({
    where: {
      id,
    },
    data: {
      description: params.description,
      status: params.status,
      name: params.name,
    },
  });

  return updatedTask;
};

export const deleteTask = async (id: string, userId: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });
  if (task?.userId !== userId) {
    throw new Error("Forbidden");
  }
  if (task === null) {
    throw new Error("Task not found");
  }
  await prisma.task.delete({
    where: {
      id,
    },
  });
};
