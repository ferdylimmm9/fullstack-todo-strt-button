const typography = {
  heroHeading: "text-4xl md:text-6xl font-extrabold", // Hero heading (larger for mobile)
  sectionHighlight: "text-3xl md:text-5xl font-extrabold", // Section highlight text (responsive size)
  primaryHeading: "text-3xl md:text-5xl font-extrabold", // Main heading
  subheadingLarge: "text-xl md:text-3xl font-bold", // Large subheading
  subheadingMedium: "text-lg md:text-2xl font-semibold", // Medium subheading
  subheadingBold: "text-lg md:text-2xl font-bold", // Bold subheading
  ctaBold: "text-lg font-bold", // Call-to-action (bold)
  paragraphNormal: "text-base md:text-lg font-normal", // Normal paragraph text
  paragraphMedium: "text-base md:text-lg font-medium", // Medium paragraph text
  ctaPrimary: "text-lg font-bold", // Primary call-to-action text
  linkBold: "text-base font-bold", // Bold link
  textMedium: "text-base font-medium", // Medium text
  textLight: "text-base font-light", // Light text
  footerLinkBold: "text-sm font-bold", // Bold footer link
  smallHighlight: "text-sm font-semibold", // Small highlighted text
  footerNormal: "text-sm font-normal", // Footer normal text
  footerFinePrint: "text-xs font-light", // Footer fine print (smaller text)
  smallLinkBold: "text-xs font-bold", // Small bold link
  label: "text-sm font-semibold text-gray-700", // Label with small font size and dark gray color
  helper: "text-xs font-light text-gray-500", // Helper text with smaller font and light gray color
} as const;

export type TypographyVariantType = keyof typeof typography;

export default typography;
