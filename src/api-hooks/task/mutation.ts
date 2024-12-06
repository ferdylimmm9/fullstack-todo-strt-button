import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import {
  CreateTaskParamsType,
  CreateTaskResponseType,
  DeleteTaskParamsType,
  DeleteTaskResponseType,
  UpdateTaskParamsType,
  UpdateTaskResponseType,
} from "./model";
import httpClient from "@/common/client/http-client";
import { AxiosError } from "axios";

const ENDPOINT = "/tasks";

export function useCreateTask(
  options?: UseMutationOptions<
    CreateTaskResponseType,
    AxiosError,
    CreateTaskParamsType
  >
) {
  return useMutation({
    ...options,
    async mutationFn(data: CreateTaskParamsType) {
      const response = await httpClient.post(ENDPOINT, data);
      return response.data as CreateTaskResponseType;
    },
  });
}

export function useUpdateTask(
  options?: UseMutationOptions<
    UpdateTaskResponseType,
    AxiosError,
    UpdateTaskParamsType
  >
) {
  return useMutation({
    ...options,
    async mutationFn(data: UpdateTaskParamsType) {
      const response = await httpClient.put(
        `${ENDPOINT}/${data.id}`,
        data.data
      );
      return response.data as UpdateTaskResponseType;
    },
  });
}

export function useDeleteTask(
  options?: UseMutationOptions<
    DeleteTaskResponseType,
    AxiosError,
    DeleteTaskParamsType
  >
) {
  return useMutation({
    ...options,
    async mutationFn(data: DeleteTaskParamsType) {
      const response = await httpClient.delete(`${ENDPOINT}/${data.id}`);
      return response.data as DeleteTaskResponseType;
    },
  });
}
