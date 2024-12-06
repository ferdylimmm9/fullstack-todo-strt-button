import queryClient from "@/common/client/query-client";
import { ToastProvider } from "@/hooks/use-toast";
import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </QueryClientProvider>
  );
}
