import React from "react";
import Button, { ButtonProps } from "./button";
import { useFormState } from "./form";

export default function SubmitButton(props: Omit<ButtonProps, "type">) {
  const formState = useFormState();

  return <Button {...props} type="submit" loading={formState.isSubmitting} />;
}
