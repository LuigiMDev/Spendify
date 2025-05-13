import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: {
    default: "Spendify",
    template: "%s - Spendify",
  },
  description: "Nunca foi tão fácil gerenciar seus gastos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`antialiased text-black`}>
        <ToastContainer position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
