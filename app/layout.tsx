import "./globals.css";
import type { Metadata } from "next";

import Provider from "@/components/Provider";

export const metadata: Metadata = {
  title: "Netflix Clone",
  description: "A Sleek Netflix Clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
