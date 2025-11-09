import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mi Portfolio | Desarrollador",
  description: "Portfolio personal de desarrollador web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
