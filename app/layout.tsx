import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ReduxProvider } from "../Store/StoreProvider";
import { store } from "../Store/store"; // Correct import as named export

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Blog",
  description: "A simple blog application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </body>
    </html>
  );
}