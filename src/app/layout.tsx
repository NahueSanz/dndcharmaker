import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "@fontsource/medievalsharp";
import "./globals.css";
import Header from "../components/ui/header";
import backgroundImage from "../../assets/darkanddarker.jpg";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "D&D CharMaker",
  description: "Crea tus propios personajes de Dungeons & Dragons",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`text-white font-[medievalsharp] ${geistMono.variable}`}>
        <div
          className="relative min-h-screen"
          style={{
            backgroundImage: `url(${backgroundImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#0f0f1f]/80 z-0" />

          {/* Contenido por encima */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />

            <main className="flex-1 p-6">{children}</main>

            <footer className="text-center text-sm text-gray-400 py-4">
              Proyecto de Nahuel Sanz • hecho con Next.js, Tailwind y 💪🏻
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
