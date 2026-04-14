import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spacetrip Ltd | Fashion Catalog & Store",
  description: "Official web store for Spacetrip Ltd. Discover our latest collection of casual wear, shirts, pants, and trending products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
