const shadowVariant = {
  none: "shadow-none", // No shadow (flat)
  small: "shadow-sm", // Small shadow
  medium: "shadow", // Medium shadow (default shadow)
  large: "shadow-lg", // Large shadow
  xlarge: "shadow-xl", // Extra large shadow
  xxlarge: "shadow-2xl", // Extra extra large shadow
  inner: "shadow-inner", // Inner shadow (for inset effect)
  focus: "shadow-outline", // Focused shadow (for focus states)
  hover: "hover:shadow-md", // Shadow on hover (for hover effect)
  active: "active:shadow-xl", // Shadow when active (clicked)
} as const;

export type ShadowVariantType = keyof typeof shadowVariant;

export default shadowVariant;
