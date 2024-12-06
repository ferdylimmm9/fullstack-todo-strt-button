import textColor from "@/common/constant/text-color";
import { TextColorVariantType } from "@/common/constant/text-color";
import typography, {
  TypographyVariantType,
} from "@/common/constant/typography";

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TypographyVariantType;
  color?: TextColorVariantType;
}

export default function Text(props: TextProps) {
  const {
    variant = "paragraphNormal",
    color = "primary",
    className,
    ...rest
  } = props;

  return (
    <div
      {...rest}
      className={[typography[variant], textColor[color], className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
