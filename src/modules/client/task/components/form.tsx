import {
  CreateTaskParamsType,
  CreateTaskResponseType,
  taskKey,
  TaskType,
  UpdateTaskParamsType,
  UpdateTaskResponseType,
} from "@/api-hooks/task";
import TextInput, { TextInputRef } from "@/components/text-input";
import React from "react";

import { $Enums, TaskStatus } from "@prisma/client";
import Form, { FormStateRef } from "@/components/form";
import useToast from "@/hooks/use-toast";
import SegmentedInput, {
  SegmentedInputRef,
} from "@/components/segmented-input";
import { statusOptions } from "./constant";
import FormFooter from "@/components/form-footer";
import useDeleteTaskModal from "@/hooks/use-delete-task-modal";
import Text from "@/components/text";
import { formattedDate } from "@/utils/date";
import queryClient from "@/common/client/query-client";

interface TaskCreateFormProps extends TaskFormProps {
  type: "create";
  onSubmit: (values: CreateTaskParamsType) => Promise<CreateTaskResponseType>;
}

interface TaskEditFormProps extends TaskFormProps {
  task: TaskType;
  type: "edit";
  onSubmit: (
    values: UpdateTaskParamsType["data"]
  ) => Promise<UpdateTaskResponseType>;
}

interface TaskFormProps {
  type: "edit" | "create";
}

export default function TaskForm(
  props: TaskCreateFormProps | TaskEditFormProps
) {
  const firstTime = React.useRef(false);
  const { type } = props;
  const toastRef = useToast();
  const formRef = React.useRef<FormStateRef>(null);
  const nameRef = React.useRef<TextInputRef>(null);
  const descriptionRef = React.useRef<TextInputRef>(null);
  const statusRef = React.useRef<SegmentedInputRef<string>>(null);

  // reset state
  const reset = React.useCallback(() => {
    let name = "";
    let description = "";
    let status: TaskStatus = $Enums.TaskStatus.pending;
    if (type === "edit") {
      name = props.task.name;
      description = props.task.description;
      status = props.task.status;
    }
    nameRef.current?.setValue(name);
    descriptionRef.current?.setValue(description);
    statusRef.current?.setValue(status);
  }, [props, type]);

  // set values
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (firstTime.current) return;
    firstTime.current = true;
    reset();
  }, [reset, type]);

  // submit
  const onSubmit = React.useCallback(async () => {
    const params = {
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
      status: statusRef.current?.value,
    } as CreateTaskParamsType & UpdateTaskParamsType["data"];
    try {
      formRef.current?.setIsSubmitting(true);
      const result = await props.onSubmit(params);
      toastRef.current?.show("success", result.message);

      if (props.type === "create") {
        reset();
      }

      if (props.type === "edit") {
        queryClient.refetchQueries({
          queryKey: taskKey.view(props.task.id),
        });
      }
      queryClient.invalidateQueries({
        queryKey: taskKey.list(),
      });
    } catch (e: any) {
      const message = e?.response?.data?.error?.message || e?.message
      toastRef.current?.show("error", message);
    } finally {
      formRef.current?.setIsSubmitting(false);
    }
  }, [props, reset, toastRef]);

  const { dialog, modalRef } = useDeleteTaskModal(
    (props as TaskEditFormProps).task
  );

  return (
    <Form
      className="p-4 flex flex-col gap-4 mb-[96px]"
      ref={formRef}
      onSubmit={onSubmit}
      defaultEditable={props.type === "create"}
    >
      <TextInput ref={nameRef} label="Title" placeholder="Insert title" />
      <TextInput
        type="textarea"
        ref={descriptionRef}
        label="Description"
        placeholder="Insert description"
      />
      <SegmentedInput ref={statusRef} label="Status" options={statusOptions} />
      {props.type === "edit" && (
        <div>
          <Text variant="helper">id: {props.task.id}</Text>
          <Text variant="helper">
            created at: {formattedDate(props.task.createdAt)}
          </Text>
          <Text variant="helper">
            updated at: {formattedDate(props.task.updatedAt)}
          </Text>
        </div>
      )}
      <FormFooter
        isEdit={props.type === "edit"}
        buttonCancel={{
          onClick: reset,
        }}
        buttonDelete={
          props.type === "edit"
            ? {
                onClick: () => {
                  modalRef.current?.open();
                },
              }
            : undefined
        }
      />
      {dialog}
    </Form>
  );
}
