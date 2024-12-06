import toastVariant, {
  ToastVariantType,
} from "@/common/constant/toast-variant";
import React from "react";

export type ToastRef = {
  show: (type: ToastVariantType, message: string, duration?: number) => void;
};

const Toast = React.forwardRef<ToastRef>((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [variant, setVariant] = React.useState<ToastVariantType>("success");
  const [description, setDescription] = React.useState<string>("");
  const show = React.useCallback(
    (type: ToastVariantType, message: string, duration = 5000) => {
      setVisible(true);
      setDescription(message);
      setVariant(type);
      setTimeout(() => {
        setVisible(false);
      }, duration);
    },
    []
  );

  React.useImperativeHandle(ref, () => ({
    show,
  }));

  return (
    <div
      className={`z-50 fixed right-4 top-4 p-4 rounded-lg ${
        toastVariant[variant]
      } shadow-lg flex justify-between items-center transition-opacity duration-500 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {description}
    </div>
  );
});

Toast.displayName = "Toast";

export default Toast;
