import buttonSize, { ButtonSizeType } from "@/common/constant/button-size";
import buttonVariant, {
  ButtonVariantType,
} from "@/common/constant/button-variant";
import Loader from "./loader";
import React from "react";

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  loading?: boolean;
  leftSection?: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  const {
    className,
    size = "small",
    variant = "primary",
    children,
    type = "button",
    leftSection,
    loading,
    disabled,
    ...rest
  } = props;
  const _variant = React.useMemo<ButtonVariantType>(() => {
    if (disabled || loading) return "disabled";
    return variant;
  }, [variant, disabled, loading]);

  return (
    <button
      {...rest}
      type={type}
      className={[
        buttonVariant[_variant],
        buttonSize[size],
        "flex flex-row items-center justify-center gap-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {loading ? <Loader /> : leftSection}
      {children}
    </button>
  );
}
