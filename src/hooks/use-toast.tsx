import Toast, { ToastRef } from "@/components/toast";
import React from "react";

export const ToastContext = React.createContext<React.RefObject<ToastRef>>({
  current: null,
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<ToastRef>(null);
  return (
    <ToastContext.Provider value={ref}>
      {children}
      <Toast ref={ref} />
    </ToastContext.Provider>
  );
}

export default function useToast() {
  const context = React.useContext(ToastContext);
  return context;
}
