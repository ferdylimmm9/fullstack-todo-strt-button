import {
  taskKey,
  TaskType,
  UpdateTaskParamsType,
  useGetTask,
  useUpdateTask,
} from "@/api-hooks/task";
import Text from "@/components/text";
import FetchWrapper from "@/components/wrapper/fetch-wrapper";
import { useRouter } from "next/router";
import React from "react";
import TaskForm from "./components/form";
import TaskViewLoader from "./components/view-loader";
import Button from "@/components/button";
import { BiChevronLeft } from "react-icons/bi";

export default function TaskView() {
  const { query: queryParams, replace } = useRouter();
  const id = queryParams.id as string;
  const query = useGetTask(id, {
    enabled: !!id,
    queryKey: taskKey.view(id),
  });
  const { mutateAsync } = useUpdateTask();

  const onSubmit = React.useCallback(
    async (params: UpdateTaskParamsType["data"]) => {
      const result = await mutateAsync({
        id,
        data: params,
      });

      return result;
    },
    [id, mutateAsync]
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
          <Text variant="subheadingMedium">Task Detail</Text>
        </Button>
      </div>
      <FetchWrapper
        query={query}
        type="query"
        loadingComponent={<TaskViewLoader />}
      >
        {(data) => {
          const task = data?.data as TaskType;
          return <TaskForm type="edit" task={task} onSubmit={onSubmit} />;
        }}
      </FetchWrapper>
    </div>
  );
}
