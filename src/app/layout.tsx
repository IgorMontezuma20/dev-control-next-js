import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Header } from "@/components/header";

import { AuthProvider } from "@/providers/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Controle - Sistema de gerenciamento",
  description:
    "Gerencie seus clientes e atendimentos de forma simples e eficiente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
