import { Html, Head, Main, NextScript, DocumentProps } from "next/document";

export default function Document({ __NEXT_DATA__: { locale } }: DocumentProps) {
  return (
    <Html lang={locale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
