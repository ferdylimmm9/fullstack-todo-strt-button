const textColor = {
  primary: "text-black",
  secondary: "text-gray-700",
  tertiary: "text-gray-500",
  disabled: "text-gray-400",
  error: "text-red-600",
  success: "text-green-600",
  info: "text-blue-600",
  black: "text-black",
  white: "text-white",
  warning: "text-yellow-600",
} as const;

export type TextColorVariantType = keyof typeof textColor;

export default textColor;
