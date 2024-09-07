import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ReduxProvider } from "../Store/StoreProvider";
 //@ts-ignore
import{ store} from "../Store/store";

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
      {/* @ts-ignore */}
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </body>
    </html>
  );
}
