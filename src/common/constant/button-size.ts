const buttonSize = {
  small: "px-4 py-2 text-sm", // Small button
  medium: "px-6 py-3 text-base", // Medium button
  large: "px-8 py-4 text-lg", // Large button
} as const;

export type ButtonSizeType = keyof typeof buttonSize;

export default buttonSize;
