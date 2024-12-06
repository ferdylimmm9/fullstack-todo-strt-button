import InfiniteScrollTasks from "./components/infinite-scroll-tasks";
import { GetTasksParamsType, useGetTasks } from "@/api-hooks/task";
import React from "react";
import FetchWrapper from "@/components/wrapper/fetch-wrapper";
import TaskCard from "./components/card";
import TaskCardLoader from "./components/card-loader";
import TaskFilter from "./components/filter";
import { useRouter } from "next/router";
import { Prisma, TaskStatus } from "@prisma/client";

import { FaPlus } from "react-icons/fa";
import ButtonLink from "@/components/button-link";
import { useGetMe } from "@/api-hooks/auth";

export default function TaskList() {
  const { data } = useGetMe();
  const { query: queryParams, isReady, replace } = useRouter();
  const [params, setParams] = React.useState<GetTasksParamsType>({
    created_at: "desc",
    status: undefined,
  });
  const query = useGetTasks(params);
  const firstTime = React.useRef(false);

  const meData = data?.data;

  React.useEffect(() => {
    if (!isReady) return;
    if (firstTime.current) return;
    const createdAt = queryParams?.created_at;
    const status = queryParams?.status;
    const params: GetTasksParamsType = {};
    if (createdAt) {
      params["created_at"] = createdAt as Prisma.SortOrder;
    }
    if (status) {
      params["status"] = status as TaskStatus;
    }
    setParams((prev) => {
      return {
        ...prev,
        ...params,
      };
    });
    firstTime.current = true;
  }, [isReady, setParams, queryParams]);

  return (
    <div id="task-container" className="overflow-auto max-h-screen">
      <TaskFilter
        sortOrder={params.created_at}
        statusFilter={params.status || "all"}
        onSortChange={(value) => {
          const _params: GetTasksParamsType = {
            ...params,
            created_at: value,
          };
          setParams(_params);
          replace({ query: _params }, undefined, { shallow: true });
        }}
        onStatusChange={(value) => {
          const _params: GetTasksParamsType = {
            ...params,
            status: value === "all" ? undefined : value,
          };
          setParams(_params);
          replace({ query: _params }, undefined, { shallow: true });
        }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4  ">
        <FetchWrapper
          type="infinite"
          query={query}
          loadingComponent={
            <>
              {Array.from({ length: 3 }).map((_, index) => {
                return <TaskCardLoader key={index} />;
              })}
            </>
          }
        >
          {(data) => {
            const tasks = data?.pages.flatMap((page) => page.data);
            return (
              <>
                {query.status === "success" && tasks?.length === 0 && (
                  <div className="text-center text-gray-500">
                    No tasks found
                  </div>
                )}
                {tasks?.map((task) => {
                  return <TaskCard data={task} key={task.id} />;
                })}
                <InfiniteScrollTasks query={query} />
              </>
            );
          }}
        </FetchWrapper>
        {meData && (
          <ButtonLink
            variant="primary"
            className="fixed bottom-4 right-4 z-50"
            leftSection={<FaPlus className="w-5 h-5" />}
            href="/tasks/create"
          >
            Create Task
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
