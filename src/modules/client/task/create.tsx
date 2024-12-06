import { CreateTaskParamsType, useCreateTask } from "@/api-hooks/task";
import Text from "@/components/text";
import React from "react";
import TaskForm from "./components/form";
import { useRouter } from "next/router";
import Button from "@/components/button";
import { BiChevronLeft } from "react-icons/bi";

export default function TaskCreate() {
  const { mutateAsync } = useCreateTask();
  const { replace } = useRouter();
  const onSubmit = React.useCallback(
    async (params: CreateTaskParamsType) => {
      const result = await mutateAsync(params);
      return result;
    },
    [mutateAsync]
  );

  return (
    <div id="task-view-container" className="overflow-auto max-h-screen">
      <div className="flex items-center flex-row gap-2 sticky top-0 left-0 right-0 z-50 bg-white p-4">
        <Button
          variant="tertiary"
          onClick={() => {
            replace("/");
          }}
          className="px-0 py-0"
        >
          <BiChevronLeft className="w-6 h-6" />
          <Text variant="subheadingMedium">Create Task</Text>
        </Button>
      </div>
      <TaskForm type="create" onSubmit={onSubmit} />
    </div>
  );
}
