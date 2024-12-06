import httpClient from "@/common/client/http-client";
import { GetMeResponseType } from "./model";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const authKey = {
  me: ["get-me"],
};

export function useGetMe(
  options?: UseQueryOptions<GetMeResponseType, AxiosError>
) {
  return useQuery({
    ...options,
    queryKey: authKey.me,
    queryFn: async () =>
      (await httpClient.get(`/auth/me`)).data as GetMeResponseType,
  });
}
