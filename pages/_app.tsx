import "../styles/globals.css";
import "../styles/All.css";
import type { AppProps } from "next/app";

// const isBrowser = typeof window !== "undefined";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
