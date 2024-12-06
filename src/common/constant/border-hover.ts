const borderHover = {
  default:
    "border border-gray-300 hover:border-gray-400 focus:border-gray-500 active:border-gray-600", // Default border with hover/focus/active states
  primary:
    "border border-black hover:border-black/80 focus:border-black/70 active:border-black/60", // Primary border with hover/focus/active states
  secondary:
    "border border-gray-500 hover:border-gray-600 focus:border-gray-700 active:border-gray-800", // Secondary border with hover/focus/active states
  success:
    "border border-green-500 hover:border-green-600 focus:border-green-700 active:border-green-800", // Success border with hover/focus/active states
  error:
    "border border-red-600 hover:border-red-700 focus:border-red-800 active:border-red-900", // Error border with hover/focus/active states
  info: "border border-blue-600 hover:border-blue-700 focus:border-blue-800 active:border-blue-900", // Info border with hover/focus/active states
  warning:
    "border border-yellow-500 hover:border-yellow-600 focus:border-yellow-700 active:border-yellow-800", // Warning border with hover/focus/active states
  dark: "border border-gray-800 hover:border-gray-700 focus:border-gray-600 active:border-gray-500", // Dark border with hover/focus/active states
  light:
    "border border-gray-200 hover:border-gray-300 focus:border-gray-400 active:border-gray-500", // Light border with hover/focus/active states
  transparent:
    "border border-transparent hover:border-transparent focus:border-transparent active:border-transparent", // Transparent border (no visible effect)
  disabled: "border border-gray-400 cursor-not-allowed", // Disabled border (no hover/focus/active changes)
} as const;

export type BorderHoverVariantType = keyof typeof borderHover;

export default borderHover;
