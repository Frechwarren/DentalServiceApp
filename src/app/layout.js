"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ModalProvider from "@/components/context/ModalProvide";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Dental Service App",
//   description: "Dental Service App",
// };

export default function RootLayout({ children }) {

  useEffect(() => {
    document.title = "Dental Service App";
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <ModalProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ModalProvider>
        </div>
      </body>
    </html>
  );
}
