import "@/styles/app.css";
import "@/styles/compare.css";
import "@/styles/swiper.min.css";
import "@/styles/navigation.css";
import RootProvider from "@/app/Provider";

export default function MyApp({ Component, pageProps }) {
  return (
    <RootProvider>
      <Component {...pageProps} />
    </RootProvider>
  );
}
