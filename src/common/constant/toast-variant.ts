const toastVariant = {
  success: "bg-green-100 text-green-800 border border-green-400",
  info: "bg-blue-100 text-blue-800 border border-blue-400",
  error: "bg-red-100 text-red-800 border border-red-400",
};

export type ToastVariantType = keyof typeof toastVariant;

export default toastVariant;
