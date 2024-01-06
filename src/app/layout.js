import { Open_Sans } from "next/font/google";
import "@/styles/app.css";
import "@/styles/compare.css";
import "@/styles/swiper.min.css";
import "@/styles/navigation.css";
import RootProvider from "./Provider";
import generateMeta from "@/utils/metadata";
import { useSearchParams } from "next/navigation";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata = generateMeta("home");

/* export async function generateMetadata(data, parent) {
  const page =
    searchParams.url === "/" ? "home" : searchParams.url.split("/").at(-1);
  return generateMeta(page) || generateMeta("home");
} */

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index,follow" />
      </head>
      <body className={open_sans.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
