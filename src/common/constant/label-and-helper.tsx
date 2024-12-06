const labelAndHelper = {
  label: "text-sm font-semibold text-gray-700", // Label with small font size and dark gray color
  helper: "text-xs font-light text-gray-500", // Helper text with smaller font and light gray color
} as const;

export type LabelHelperVariantType = keyof typeof labelAndHelper;

export default labelAndHelper;
