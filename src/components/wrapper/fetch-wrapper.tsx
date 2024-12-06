import { UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";

import ErrorWrapper from "./error-wrapper";
import { AxiosError } from "axios";

export interface FetchWrapperProps {
  type: "query" | "infinite";
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

export interface FetchQueryWrapperProps<T> extends FetchWrapperProps {
  type: "query";
  query: UseQueryResult<T, AxiosError>;
  children: (data: UseQueryResult<T, AxiosError>["data"]) => React.ReactNode;
}

export interface FetchInfiniteWrapperProps<T> extends FetchWrapperProps {
  type: "infinite";
  query: UseInfiniteQueryResult<T, AxiosError>;
  children: (
    data: UseInfiniteQueryResult<T, AxiosError>["data"]
  ) => React.ReactNode;
}

export default function FetchWrapper<T>(
  props: FetchQueryWrapperProps<T> | FetchInfiniteWrapperProps<T>
) {
  const { query, children } = props;
  if (query.isLoading) {
    return props.loadingComponent ?? <div>Loading...</div>;
  }
  if (query.isError) {
    return <ErrorWrapper error={query.error} />;
  }
  if (query.data) {
    return children(query.data);
  }
  return <div>No data</div>;
}
