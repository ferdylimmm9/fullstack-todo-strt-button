import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  GetTaskResponseType,
  GetTasksParamsType,
  GetTasksResponseType,
} from "./model";
import httpClient from "@/common/client/http-client";
import { AxiosError } from "axios";

export const taskKey = {
  listKey: "get-tasks",
  viewKey: "get-task",
  list(params?: GetTasksParamsType) {
    return [taskKey.listKey, params].filter(Boolean);
  },
  view(id: string) {
    return [taskKey.viewKey, id];
  },
} as const;

const ENDPOINT = "/tasks";

export function useGetTasks(
  input?: GetTasksParamsType
): UseInfiniteQueryResult<
  InfiniteData<GetTasksResponseType, unknown>,
  AxiosError
> {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: taskKey.list(input),
    getNextPageParam: ((lastPage: GetTasksResponseType) => {
      if (lastPage?.meta?.page < lastPage?.meta?.pages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    }) as unknown as any,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await httpClient.get(`${ENDPOINT}`, {
        params: {
          ...input,
          page: pageParam,
        },
      });
      return res.data as GetTasksResponseType;
    },
  });
}

export function useGetTask(
  id: string,
  options?: UseQueryOptions<GetTaskResponseType, AxiosError>
): UseQueryResult<GetTaskResponseType, AxiosError> {
  return useQuery({
    ...options,
    queryKey: taskKey.view(id),
    queryFn: async () =>
      (await httpClient.get(`${ENDPOINT}/${id}`)).data as GetTaskResponseType,
  });
}
