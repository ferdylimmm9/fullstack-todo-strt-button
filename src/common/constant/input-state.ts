const inputState = {
  default:
    "bg-white w-full text-black border border-gray-300 focus:outline-2 focus:outline-black rounded-md p-2 text-sm transition-all", // Default input with white background and gray border
  error:
    "bg-red-100 w-full text-red-600 border border-red-600 focus:outline-2 focus:outline-red-600 rounded-md p-2 text-sm transition-all", // Error state with red border and red outline
  disabled:
    "bg-gray-300 w-full text-gray-500 border border-gray-400 cursor-not-allowed rounded-md p-2 text-sm", // Disabled input with gray background and border
} as const;

export type InputStateVariantType = keyof typeof inputState;

export default inputState;
