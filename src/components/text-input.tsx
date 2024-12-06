import React from "react";
import Text from "./text";
import inputState, {
  InputStateVariantType,
} from "@/common/constant/input-state";
import { useFormState } from "./form";

type InputType = React.ComponentProps<"input">;
type InputTypeVariantType = InputType["type"] | "textarea";
interface TextInputProps extends Omit<InputType, "type"> {
  type?: InputTypeVariantType;
  label?: string;
  helper?: string;
  containerProps?: React.ComponentProps<"div">;
}

// for password
function EyeComponent(props: {
  isVisible: boolean;
  onClickVisible: () => void;
  type: string;
  label?: string;
}) {
  if (props.isVisible === false) return null;
  const top = props.label === undefined ? "top-2" : "top-9";
  return (
    <button
      type="button"
      className={`absolute right-2 ${top} z-50`}
      onClick={props.onClickVisible}
    >
      {props.type === "password" ? "🕶️" : "👓"}
    </button>
  );
}

export type TextInputRef = {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  error: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  type: React.HTMLInputTypeAttribute | undefined;
  setType: React.Dispatch<
    React.SetStateAction<React.HTMLInputTypeAttribute | undefined>
  >;
};

const TextInput = React.forwardRef<TextInputRef, TextInputProps>(
  (props, ref) => {
    const { label, className, helper, containerProps, ...rest } = props;

    const [type, setType] = React.useState<InputTypeVariantType>(
      rest.type || "text"
    );
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [value, setValue] = React.useState<string | undefined>(undefined);
    const formState = useFormState();

    const state = React.useMemo<InputStateVariantType>(() => {
      if (formState.isSubmitting) return "disabled";
      if (formState.disabled) return "disabled";
      if (rest.disabled || rest.readOnly) return "disabled";
      if (typeof error === "string" && !!error) return "error";
      return "default";
    }, [
      error,
      formState.disabled,
      formState.isSubmitting,
      rest.disabled,
      rest.readOnly,
    ]);

    const onChange = React.useCallback(
      (
        e: React.ChangeEvent<HTMLInputElement> &
          React.ChangeEvent<HTMLTextAreaElement>
      ) => {
        const value = e.target.value;
        setValue(e.target.value);
        if (value) {
          setError(undefined);
        }
      },
      []
    );

    const onClickVisible = React.useCallback(() => {
      if (rest.type === "password") {
        setType((type) => {
          return type === "password" ? "text" : "password";
        });
      }
    }, [setType, rest.type]);

    React.useImperativeHandle(ref, () => ({
      value,
      setValue,
      error,
      setError,
      type,
      setType,
    }));

    const _disabled = React.useMemo(() => {
      return (
        formState.disabled ||
        formState.isSubmitting ||
        rest.disabled ||
        rest.readOnly
      );
    }, [
      formState.disabled,
      formState.isSubmitting,
      rest.disabled,
      rest.readOnly,
    ]);

    return (
      <div
        {...containerProps}
        className={["relative", containerProps?.className]
          .filter(Boolean)
          .join(" ")}
      >
        {label && (
          <Text variant="label" className="mb-2">
            {label}
          </Text>
        )}
        {type === "textarea" ? (
          <textarea
            value={value}
            className={[inputState[state], className].filter(Boolean).join(" ")}
            onChange={onChange}
            disabled={_disabled}
            rows={10}
          />
        ) : (
          <input
            {...rest}
            value={value}
            className={[inputState[state], className].filter(Boolean).join(" ")}
            type={type}
            onChange={onChange}
            disabled={_disabled}
          />
        )}
        {error === undefined && helper && (
          <Text variant="helper" className="mt-1">
            {helper}
          </Text>
        )}
        <EyeComponent
          isVisible={
            rest.type === "password" &&
            formState.isSubmitting === false &&
            formState.disabled === false
          }
          onClickVisible={onClickVisible}
          type={type as string}
          label={label}
        />
        {error && (
          <Text variant="helper" color="error" className="mt-1">
            {error}
          </Text>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
