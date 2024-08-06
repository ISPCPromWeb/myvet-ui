import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { BootstrapWrapper } from "@/components/BootstrapWrapper";
import { Providers } from "@/context";
import { Footer } from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <BootstrapWrapper>
        <div className={`main-container-height`}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </BootstrapWrapper>
    </Providers>
  );
}
