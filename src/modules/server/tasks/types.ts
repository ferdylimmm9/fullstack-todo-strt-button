import { createTaskSchema, updateTaskSchema } from "./schema";

export type CreateTaskParamsType = Zod.infer<typeof createTaskSchema>;
export type UpdateTaskParamsType = Zod.infer<typeof updateTaskSchema>;
