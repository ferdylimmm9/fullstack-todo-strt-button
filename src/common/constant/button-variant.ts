const buttonVariant = {
  primary:
    "bg-black text-white hover:opacity-90 hover:scale-95 transition-all duration-50 rounded-md px-6 py-3 text-base", // Primary button with black background, white text, and slight scale on hover
  secondary:
    "outline outline-black text-black bg-white hover:opacity-90 duration-50 hover:scale-95 transition-all rounded-md px-6 py-3 text-base", // Secondary button with black border, white background, and black text (scale on hover)
  tertiary:
    "text-black hover:bg-gray-100 hover:text-gray-700 duration-50 hover:scale-95 transition-all rounded-md px-6 py-3 text-base", // Tertiary button with underline and gray background on hover
  disabled:
    "bg-gray-400 text-gray-600 cursor-not-allowed rounded-md px-6 py-3  text-base", // Disabled button with no hover effect
  error:
    "bg-red-600 text-white hover:bg-red-700 hover:scale-95 transition-all duration-50 rounded-md px-6 py-3 text-base", // Error button with red background and scale on hover
} as const;

export type ButtonVariantType = keyof typeof buttonVariant;

export default buttonVariant;
