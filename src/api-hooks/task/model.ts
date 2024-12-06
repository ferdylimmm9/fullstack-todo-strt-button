import { Prisma, TaskStatus } from "@prisma/client";

export type TaskType = {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type GetTasksResponseType = {
  data: TaskType[];
  meta: {
    pages: number;
    total: number;
    limit: number | undefined;
    page: number;
  };
  message: string;
  sort: {
    created_at: Prisma.SortOrder | null;
  };
  filter: {
    status: TaskStatus | null;
  };
};

export type GetTaskResponseType = {
  data: TaskType;
  message: string;
};

export type CreateTaskResponseType = GetTaskResponseType;

export type UpdateTaskResponseType = GetTaskResponseType;

export type DeleteTaskResponseType = { message: string };

export type GetTasksParamsType = {
  page?: number;
  limit?: number;
  created_at?: Prisma.SortOrder;
  status?: TaskStatus;
};

export type GetTaskParamsType = {
  id: string;
};

export type CreateTaskParamsType = {
  description: string;
  name: string;
  status: TaskStatus;
};

export type UpdateTaskParamsType = {
  id: string;
  data: Partial<CreateTaskParamsType>;
};

export type DeleteTaskParamsType = {
  id: string;
};
