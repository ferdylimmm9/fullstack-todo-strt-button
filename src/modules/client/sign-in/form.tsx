import { useSignIn } from "@/api-hooks/auth";
import border from "@/common/constant/border";
import shadowVariant from "@/common/constant/shadow-variant";
import ButtonLink from "@/components/button-link";
import Form, { FormStateRef } from "@/components/form";
import SubmitButton from "@/components/submit-button";
import Text from "@/components/text";
import TextInput, { TextInputRef } from "@/components/text-input";
import useToast from "@/hooks/use-toast";
import { AuthToken } from "@/repositories/auth-token";
import { useRouter } from "next/router";
import React from "react";

export default function SignInForm() {
  const formStateRef = React.useRef<FormStateRef>(null);
  const emailRef = React.useRef<TextInputRef>(null);
  const passwordRef = React.useRef<TextInputRef>(null);
  const toastRef = useToast();
  const { mutateAsync } = useSignIn();
  const { replace } = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
    };
    try {
      formStateRef.current?.setIsSubmitting(true);
      const result = await mutateAsync(params);
      toastRef.current?.show("success", result.message);
      AuthToken.set(result.data.token);
      replace("/");
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
          Sign In
        </Text>
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
        <div className="flex flex-col gap-4 mt-4">
          <SubmitButton>Sign In</SubmitButton>
          <ButtonLink href="/sign-up" variant="tertiary">
            Sign Up
          </ButtonLink>
        </div>
      </Form>
    </div>
  );
}
