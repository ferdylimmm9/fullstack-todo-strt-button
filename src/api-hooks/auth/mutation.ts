import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { SignInParamsType, SignInResponseType, SignUpParamsType, SignUpResponseType } from "./model";
import { ApiError } from "next/dist/server/api-utils";
import httpClient from "@/common/client/http-client";

export function useSignIn(
  options?: UseMutationOptions<SignInResponseType, ApiError, SignInParamsType>
) {
  return useMutation({
    ...options,
    async mutationFn(data: SignInParamsType) {
      const response = await httpClient.post("/auth/sign-in", data);
      return response.data as SignInResponseType;
    },
  });
}

export function useSignUp(
  options?: UseMutationOptions<SignUpResponseType, ApiError, SignUpParamsType>
) {
  return useMutation({
    ...options,
    async mutationFn(data: SignUpParamsType) {
      const response = await httpClient.post("/auth/sign-up", data);
      return response.data as SignUpResponseType;
    },
  });
}
