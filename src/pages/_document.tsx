import MetaApp from "@/components/meta-app";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <MetaApp />
      </Head>
      <body className="antialiased" id="body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
