import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";

import "../globals.css";

import NextUiProvider from "@/providers/nextui-provider";
import AuthContext from "../../context/auth-context";
import AdminNavbar from "@/components/admin/navbar";
import { EdgeStoreProvider } from "@/libs/edgestore";

const montserrat = Montserrat({ subsets: ["latin"] });

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
      <body className={montserrat.className}>
        <AuthContext>
          <NextUiProvider>
            <EdgeStoreProvider>
              <AdminNavbar />
              <main className="min-h-[calc(100vh-85px)] px-5 md:px-10 mt-5">
                {children}
              </main>
              <Toaster position="bottom-right" richColors />
            </EdgeStoreProvider>
          </NextUiProvider>
        </AuthContext>
      </body>
    </html>
  );
}
