"use client";

import { supabase } from "./lib/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import backgroundImage from "../../assets/megupaper.jpeg";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    getUser();
  }, []);

  return (
    <div
      className="relative flex flex-col min-h-screen text-white p-6"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#111827] bg-opacity-70"></div>
      
      <header className="relative flex justify-between items-center w-full p-4 text-[#DB2763]">
        <h1 className="text-4xl font-bold">D&D CharMaker</h1>
        {user && <p className="text-lg text-[#CBC5EA]">Bienvenido, {user.user_metadata.name}!</p>}
      </header>
      
      <main className="relative flex flex-col items-center mt-12">
        {user ? (
          <div className="flex flex-col gap-4 text-center">
            <Link
              href="/characters"
              className="px-6 py-2 rounded-lg text-lg transition"
              style={{ backgroundColor: "#845A6D", color: "#EAEAEA" }}
            >
              Ver mis personajes
            </Link>
            <Link
              href="/newchar"
              className="px-6 py-2 rounded-lg text-lg transition"
              style={{ backgroundColor: "#845A6D", color: "#EAEAEA" }}
            >
              Crear nuevo personaje
            </Link>
          </div>
        ) : (
          <Link
            href="/login"
            className="mt-4 px-6 py-2 rounded-lg text-lg transition"
            style={{ backgroundColor: "#CBC5EA", color: "#111827" }}
          >
            Iniciar sesión
          </Link>
        )}
      </main>
    </div>
  );
}
