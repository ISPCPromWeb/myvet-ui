import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={`body-dark bg-gray`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
