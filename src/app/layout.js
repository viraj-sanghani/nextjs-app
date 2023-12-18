import { Inter } from "next/font/google";
import "@/styles/app.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Housing Magic",
  description: "",
};

export default function RootLayout({ children }) {
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
