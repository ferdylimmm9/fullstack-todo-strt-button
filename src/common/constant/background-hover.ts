const backgroundHover = {
    default: "bg-white hover:bg-gray-50 active:bg-gray-200", // Default background with hover/active states
    primary: "bg-black hover:bg-black/90 active:bg-black/80", // Primary background with hover/active states
    secondary: "bg-gray-100 hover:bg-gray-200 active:bg-gray-300", // Secondary background with hover/active states
    success: "bg-green-500 hover:bg-green-600 active:bg-green-700", // Success background with hover/active states
    error: "bg-red-600 hover:bg-red-700 active:bg-red-800", // Error background with hover/active states
    info: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800", // Info background with hover/active states
    warning: "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700", // Warning background with hover/active states
    dark: "bg-gray-900 hover:bg-gray-800 active:bg-gray-700", // Dark background with hover/active states
    light: "bg-gray-50 hover:bg-gray-100 active:bg-gray-200", // Light background with hover/active states
    transparent: "bg-transparent hover:bg-black/20 active:bg-black/30", // Transparent background with hover/active states
    disabled: "bg-gray-300 hover:bg-gray-300 active:bg-gray-300", // Disabled background (no hover/active changes)
  } as const;
  
  export type BackgroundHoverVariantType = keyof typeof backgroundHover;
  
  export default backgroundHover;
  