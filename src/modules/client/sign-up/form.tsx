import { SignUpParamsType, useSignUp } from "@/api-hooks/auth";
import border from "@/common/constant/border";
import shadowVariant from "@/common/constant/shadow-variant";
import ButtonLink from "@/components/button-link";
import Form, { FormStateRef } from "@/components/form";
import SubmitButton  from "@/components/submit-button";
import Text from "@/components/text";
import TextInput, { TextInputRef } from "@/components/text-input";
import useToast from "@/hooks/use-toast";
import { useRouter } from "next/router";
import React from "react";

export default function SignUpForm() {
  const formStateRef = React.useRef<FormStateRef>(null);
  const nameRef = React.useRef<TextInputRef>(null);
  const emailRef = React.useRef<TextInputRef>(null);
  const passwordRef = React.useRef<TextInputRef>(null);
  const passwordConfirmationRef = React.useRef<TextInputRef>(null);
  const toastRef = useToast();

  const { mutateAsync } = useSignUp();
  const { replace } = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      passwordConfirmation: passwordConfirmationRef.current?.value,
    } as SignUpParamsType;

    try {
      formStateRef.current?.setIsSubmitting(true);
      const result = await mutateAsync(params);
      toastRef.current?.show("success", result.message);
      replace("/sign-in");
    } catch (e: any) {
      const message = e?.response?.data?.error?.message || e?.message
      toastRef.current?.show("error", message);
    } finally {
      formStateRef.current?.setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`m-auto ${border.light} rounded-md p-4 min-w-96 py-4 ${shadowVariant.medium} transition-all`}
    >
      <Form ref={formStateRef} onSubmit={onSubmit} className="flex flex-col gap-4">
        <Text variant="subheadingMedium" className="text-center scale">
          Sign Up
        </Text>
        <TextInput
          label="Name"
          placeholder="Insert Name"
          required
          ref={nameRef}
        />
        <TextInput
          type="email"
          label="Email"
          placeholder="Insert Email"
          required
          ref={emailRef}
        />
        <TextInput
          type="password"
          label="Password"
          placeholder="Insert Password"
          required
          ref={passwordRef}
        />
        <TextInput
          type="password"
          label="Password Confirmation"
          placeholder="Insert Password Confirmation"
          required
          ref={passwordConfirmationRef}
        />
        <div className="flex flex-col gap-4 mt-4">
          <SubmitButton>Sign Up</SubmitButton>
          <ButtonLink href="/sign-in" variant="tertiary">
            Sign In
          </ButtonLink>
        </div>
      </Form>
    </div>
  );
}
