const actionIconSize = {
  small: "p-2 text-sm", // Small icon button
  medium: "p-3 text-base", // Medium icon button
  large: "p-4 text-lg", // Large icon button
} as const;

export type ActionIconSizeType = keyof typeof actionIconSize;

export default actionIconSize;
