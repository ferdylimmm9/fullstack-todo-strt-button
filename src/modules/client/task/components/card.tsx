import { TaskType } from "@/api-hooks/task";
import shadowVariant from "@/common/constant/shadow-variant";
import Button from "@/components/button";
import Text from "@/components/text";
import useDeleteTaskModal from "@/hooks/use-delete-task-modal";
import { formattedDate } from "@/utils/date";
import { useRouter } from "next/router";
import React from "react";
import { FaTrash } from "react-icons/fa";

interface TaskCardProps {
  data: TaskType;
}

export default function TaskCard(props: TaskCardProps) {
  const { data: task } = props;
  const isCompleted = task.status === "completed";
  const { push } = useRouter();
  const [isFullContent, setFullContent] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const { dialog, modalRef } = useDeleteTaskModal(props.data);
  React.useEffect(() => {
    const curr = ref.current;
    if (!curr) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFullContent(entry.isIntersecting);
      },
      {
        root: document.getElementById("task-container"),
        rootMargin: "0px",
        threshold: 0,
      }
    );
    observer.observe(curr);
    return () => {
      observer.unobserve(curr);
    };
  }, [ref]);

  return (
    <>
      <div
        ref={ref}
        onClick={() => push(`/tasks/${task.id}`)}
        className={`p-4 rounded-lg border ${shadowVariant.hover} cursor-pointer border-gray-300 shadow-sm bg-white relative flex flex-col gap-2 h-[166px] transition-all duration-50`}
      >
        {isFullContent && (
          <>
            <Text
              variant="paragraphMedium"
              className="text-ellipsis min-h-6 max-h-6 overflow-hidden max-w-[80%]"
            >
              {task.name}
            </Text>
            <Text
              variant="smallHighlight"
              color="tertiary"
              className="text-ellipsis min-h-6 max-h-6 overflow-hidden max-w-[80%]"
            >
              {task.description}
            </Text>
            <Text
              variant="helper"
              className="text-ellipsis overflow-hidden max-w-[90%]"
            >
              Created: {formattedDate(task.createdAt)}
            </Text>
            <Text
              variant="helper"
              className="text-ellipsis overflow-hidden max-w-[90%]"
            >
              Updated: {formattedDate(task.updatedAt)}
            </Text>
            <Text
              className="text-ellipsis overflow-hidden max-w-[90%]"
              variant="label"
              color={isCompleted ? "success" : "warning"}
            >
              Status: {task.status}
            </Text>

            <Button
              variant="error"
              className="absolute bottom-4 right-4"
              onClick={(e) => {
                e.stopPropagation();
                modalRef.current?.open();
              }}
            >
              <FaTrash />
            </Button>
          </>
        )}
      </div>
      {dialog}
    </>
  );
}
