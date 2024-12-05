import { TaskStatus } from "@prisma/client";
import z from "zod";

export const createTaskSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum([TaskStatus.pending, TaskStatus.completed]),
});

export const updateTaskSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  status: z.enum([TaskStatus.pending, TaskStatus.completed]).optional(),
});
