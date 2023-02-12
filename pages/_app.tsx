import { AppProps } from "next/app";
import "./globals.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PluginsNext</title>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
