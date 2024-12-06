import { taskKey, TaskType, useDeleteTask } from "@/api-hooks/task";
import ModalDialog, { ModalDialogRef } from "@/components/modal-dialog";
import React from "react";
import useToast from "./use-toast";
import Text from "@/components/text";
import CloseButton from "@/components/close-button";
import Button from "@/components/button";
import queryClient from "@/common/client/query-client";
import { useRouter } from "next/router";

export default function useDeleteTaskModal(task: TaskType | undefined) {
  const modalRef = React.useRef<ModalDialogRef>(null);
  const { replace, query } = useRouter();
  const { mutateAsync, isPending } = useDeleteTask();
  const toastRef = useToast();
  const onConfirm = async () => {
    try {
      const result = await mutateAsync({ id: task?.id as string });
      toastRef.current?.show("success", result.message);
      modalRef.current?.close();
      queryClient.invalidateQueries({
        queryKey: taskKey.list(),
      });
      query.id = undefined;
      replace(
        {
          pathname: "/",
          query,
        },
        undefined,
        { shallow: true }
      );
    } catch (e: any) {
      toastRef.current?.show("error", e.mesasge);
    }
  };

  const dialog = (
    <ModalDialog ref={modalRef}>
      {(close) => {
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <Text variant="subheadingMedium">Delete Task</Text>
              <CloseButton onClick={close} />
            </div>
            <div className="mb-4">
              <Text variant="paragraphNormal">
                Are you sure you want to delete this task &quot;{task?.name}
                &quot;?
              </Text>
            </div>
            <div className="flex justify-end space-x-4">
              {isPending === false && (
                <Button className="flex-1" variant="secondary" onClick={close}>
                  Cancel
                </Button>
              )}
              <Button
                className="flex-1"
                variant="error"
                onClick={onConfirm}
                loading={isPending}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      }}
    </ModalDialog>
  );
  return { dialog, modalRef };
}
