import buttonSize, { ButtonSizeType } from "@/common/constant/button-size";
import buttonVariant, {
  ButtonVariantType,
} from "@/common/constant/button-variant";
import Link from "next/link";

interface ButtonLink extends React.ComponentProps<typeof Link> {
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  loading?: boolean;
  leftSection?: React.ReactNode;
  noPadding?: boolean;
}

export default function ButtonLink(props: ButtonLink) {
  const { className, size = "medium", variant = "primary", leftSection, ...rest } = props;
  return (
    <Link
      {...rest}
      className={[
        buttonVariant[variant],
        buttonSize[size],
        "flex flex-row items-center justify-center gap-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")
        .replaceAll("px-6 py-3", props.noPadding ? "" : "px-6 py-3")}
    >
      {leftSection}
      {props.children}
    </Link>
  );
}
