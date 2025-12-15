import type React from "react";
import type { Metadata } from "next";
import { Rajdhani, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/src/components/navigation";
import { Footer } from "@/src/components/footer";
import { Toaster } from "sonner";
import { Providers } from "@/src/components/providers";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Fight 4 Freedom | BF6",
  description:
    "Comunidade de jogadores de Battlefield 6. Junte-se aos melhores operadores táticos.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${rajdhani.variable} ${robotoMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
