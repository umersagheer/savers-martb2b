import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "../globals.css";

import NextUiProvider from "@/providers/nextui-provider";
import AuthContext from "../../context/auth-context";
import NavbarComp from "@/components/root/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Savers Mart",
  description: "A b2b platform for buying products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <NextUiProvider>
            <NavbarComp />
            {children}
            <Toaster position="bottom-right" richColors />
          </NextUiProvider>
        </AuthContext>
      </body>
    </html>
  );
}
