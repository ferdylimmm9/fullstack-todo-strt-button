const background = {
  default: "bg-white", // Default background (white)
  primary: "bg-black", // Primary background (black)
  secondary: "bg-gray-100", // Secondary background (light gray)
  success: "bg-green-500", // Success background (green)
  error: "bg-red-600", // Error background (red)
  info: "bg-blue-600", // Info background (blue)
  warning: "bg-yellow-500", // Warning background (yellow)
  dark: "bg-gray-900", // Dark background (dark gray)
  light: "bg-gray-50", // Light background (very light gray)
  transparent: "bg-transparent", // Transparent background
  disabled: "bg-gray-300", // Disabled background (light gray for disabled states)
} as const;

export type BackgroundVariantType = keyof typeof background;

export default background;
