"use client";

import { supabase } from "../lib/supabase";
import image from "../../../assets/dungeonsKit.webp";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const loginWithProvider = async (provider: "google") => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) console.error("Error al iniciar sesión:", error.message);
  };

  return (
    <div className="flex flex-col items-center justify-start px-4 pt-10 gap-6">
      <img src={image.src} alt="Kit Esencial" className="w-52" />
      <div className="max-w-3xl bg-[#1f2937]/70 p-6 rounded-xl shadow-lg backdrop-blur text-sm leading-relaxed text-gray-200">
        <h2 className="text-xl font-bold text-white mb-4 text-center">
          ¿Por qué hice este proyecto?
        </h2>
        <p>
          El propósito de esta página es fortalecer mis habilidades como
          desarrollador, aplicando tecnologías modernas como React, TypeScript,
          Tailwind CSS y Supabase. Elegí Dungeons & Dragons como temática porque
          es un juego que disfruto mucho con mis amigos, especialmente usando el
          <strong> Kit Esencial</strong>. Quise crear una herramienta que no
          solo me ayude a practicar programación, sino también a simplificar la
          creación de personajes para quienes recién empiezan o quieren sumarse
          a nuestras aventuras. Esta app busca combinar aprendizaje técnico con
          algo que me apasiona: contar historias con amigos.
        </p>
      </div>
      <Button
        onClick={() => loginWithProvider("google")}
        className="bg-[#5e2742] hover:bg-[#772e57] cursor-pointer"
      >
        Iniciar con Google
      </Button>
    </div>
  );
}
