import { $Enums, TaskStatus } from "@prisma/client";

export const statusOptions: {
  value: TaskStatus;
  label: string;
}[] = [
  {
    value: $Enums.TaskStatus.pending,
    label: "Pending",
  },
  {
    value: $Enums.TaskStatus.completed,
    label: "Completed",
  },
];
