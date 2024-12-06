const actionIconVariant = {
  primary:
    "bg-black text-white hover:opacity-90 hover:scale-105 transition-all rounded-full flex items-center justify-center", // Primary icon button
  secondary:
    "outline outline-black text-black bg-white hover:opacity-90 hover:scale-105 transition-all rounded-full flex items-center justify-center", // Secondary icon button
  tertiary:
    "text-black underline hover:text-gray-700 hover:scale-105 transition-all rounded-full flex items-center justify-center", // Tertiary icon button
  disabled:
    "bg-gray-400 text-gray-600 cursor-not-allowed rounded-full flex items-center justify-center", // Disabled icon button
  error:
    "bg-red-600 text-white hover:bg-red-700 hover:scale-105 transition-all rounded-full flex items-center justify-center", // Error icon button
} as const;

export type ActionIconVariantType = keyof typeof actionIconVariant;

export default actionIconVariant;
