import { AxiosError } from "axios";
import Text from "../text";
import statusError, {
  StatusErrorVariantType,
} from "@/common/constant/status-error";
import ButtonLink from "../button-link";
import { ApiError } from "next/dist/server/api-utils";

export interface ErrorWrapperProps {
  error: AxiosError<any, ApiError>;
}

export default function ErrorWrapper(props: ErrorWrapperProps) {
  if (
    typeof props.error.status === "number" &&
    [400, 401, 403, 404, 500].find((status) => status === props.error.status)
  ) {
    const content = statusError[props.error.status as StatusErrorVariantType];
    const isBack = [403, 404].find((status) => status === props.error.status);

    return (
      <div className="fixed top-[45%] left-0 right-0 flex flex-col gap-4 px-8">
        <Text className="text-center" variant="primaryHeading">
          {props.error.status}
        </Text>
        <Text className="text-center">{content.title}</Text>
        <Text className="text-center">{content.message}</Text>
        {isBack && (
          <ButtonLink className="w-[150px] m-auto" href="/">
            Back
          </ButtonLink>
        )}
        {props.error.status === 401 && (
          <ButtonLink className="w-[150px] m-auto" href="/sign-in">
            Sign In
          </ButtonLink>
        )}
      </div>
    );
  }

  const message =
    props.error?.response?.data?.error?.message || props.error?.message;

  return (
    <div className="fixed top-[45%] left-0 right-0 flex flex-col gap-4 px-8">
      <Text className="text-center" variant="primaryHeading">
        Oops! Something went wrong
      </Text>
      <Text className="text-center">{message}</Text>
    </div>
  );
}
