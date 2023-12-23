import { Inter } from "next/font/google";
import "@/styles/app.css";
import "@/styles/compare.css";
import "@/styles/swiper.min.css";
import "@/styles/navigation.css";
import RootProvider from "./Provider";
import generateMetadata from "@/utils/metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata = generateMetadata("home");

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&family=Source+Sans+Pro:wght@200&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&family=Source+Sans+Pro:wght@200&display=swap"
        />
      </head>
      <body className={inter.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
