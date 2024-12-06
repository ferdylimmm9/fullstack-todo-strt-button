const border = {
    default: "border border-gray-300", // Default border (light gray)
    primary: "border border-black", // Primary border (black)
    secondary: "border border-gray-500", // Secondary border (medium gray)
    success: "border border-green-500", // Success border (green)
    error: "border border-red-600", // Error border (red)
    info: "border border-blue-600", // Info border (blue)
    warning: "border border-yellow-500", // Warning border (yellow)
    dark: "border border-gray-800", // Dark border (dark gray)
    light: "border border-gray-200", // Light border (very light gray)
    transparent: "border border-transparent", // Transparent border (useful for overlays)
    disabled: "border border-gray-400", // Disabled border (light gray for disabled elements)
  } as const;
  
  export type BorderVariantType = keyof typeof border;
  
  export default border;
  