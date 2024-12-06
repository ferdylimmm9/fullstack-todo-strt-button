import type { NextApiResponse } from "next";
import { ZodError } from "zod";
import { ApiError } from "next/dist/server/api-utils";

export const getExceptionMessage = (error: unknown) => {
  if (error instanceof ZodError) {
    return error.issues[0].message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred";
};

export const getExceptionStatusCode = (error: any) => {
  if (error instanceof ZodError) {
    return 400;
  }

  if (error instanceof ApiError) {
    return error.statusCode;
  }

  const message = error?.message?.toLowerCase?.();

  if (message?.includes("jwt must be provided")) {
    return 401;
  }

  if (message?.includes("unauthorized")) {
    return 401;
  }

  if (message?.includes("forbidden")) {
    return 403;
  }

  if (message?.includes("not found")) {
    return 404;
  }

  return 500;
};

export const sendApiError = (res: NextApiResponse, error: unknown) => {
  const status = getExceptionStatusCode(error);
  const message = getExceptionMessage(error);

  res.status(status).json({
    error: {
      message,
      status,
    },
  });
};

export const throwMethodNotAllowed = (
  res: NextApiResponse,
  method: string | undefined
) => {
  throw new Error(`Method ${method} Not Allowed`);
};
