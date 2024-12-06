import { GetTasksResponseType } from "@/api-hooks/task";
import Loader from "@/components/loader";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import React from "react";

interface InfiniteScrollTasksProps {
  query: UseInfiniteQueryResult<
    InfiniteData<GetTasksResponseType, unknown>,
    Error
  >;
}

export default function InfiniteScrollTasks(props: InfiniteScrollTasksProps) {
  const { query } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const curr = ref.current;
    const container = document.getElementById("task-container");
    if (!curr) return;
    if (query.isFetching || query.isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry.isIntersecting)
        if (entry.isIntersecting === false) return;
        if (query.isFetchingNextPage) return;
        if (query.hasNextPage) {
          query.fetchNextPage();
        }
      },
      {
        root: container,
        rootMargin: "0px",
        threshold: 0,
      }
    );
    observer.observe(curr);
    return () => {
      observer.unobserve(curr);
    };
  }, [ref, query]);

  if (!query.hasNextPage) return null;

  return (
    <div ref={ref} className="flex justify-center items-center">
      <Loader />
    </div>
  );
}
