"use client";

import { supabase } from "./lib/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    getUser();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-8 z-10">
      <h2 className="text-3xl md:text-4xl mb-6 text-[#e5e5f0]">
        Forja el destino de tus personajes
      </h2>
      {user ? (
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-row gap-5 justify-center items-center">
            <Link href="/characters">
              <span className="px-8 py-3 rounded-xl text-lg bg-[#5e2742] hover:bg-[#772e57] text-white shadow-lg transition duration-300">
                Ver mis personajes
              </span>
            </Link>
            <Link href="/newchar">
              <span className="px-8 py-3 rounded-xl text-lg bg-[#3e3e6f] hover:bg-[#505092] text-white shadow-lg transition duration-300">
                Crear nuevo personaje
              </span>
            </Link>
          </div>
          <div className="mt-8 max-w-3xl bg-[#1f2937]/70 p-6 rounded-xl shadow-lg backdrop-blur text-sm leading-relaxed text-gray-200">
            <h2 className="text-xl font-bold text-white mb-4">
              ¿Qué es Dungeons & Dragons?
            </h2>
            <p>
              Dungeons & Dragons (D&D) es un juego de rol de mesa en el que un
              grupo de personas se reúne para contar historias en un mundo de
              fantasía. Un jugador asume el rol de Dungeon Master (DM), quien
              describe los escenarios, controla a los personajes no jugadores y
              plantea desafíos. El resto interpreta a personajes ficticios con
              habilidades únicas, como magos, guerreros, elfos o enanos.
            </p>
            <br />
            <p>
              Cada sesión de juego es una aventura donde los jugadores pueden
              explorar ruinas antiguas, luchar contra dragones, resolver
              misterios o tomar decisiones morales. Las acciones se resuelven
              mediante el lanzamiento de dados, especialmente uno de 20 caras
              (d20), y se combinan con reglas del manual, pero también con mucha
              improvisación.
            </p>
            <br />
            <p>
              Una de las claves del juego es la narración colaborativa: no hay
              un “ganador”, sino que todos construyen una historia juntos. Los
              personajes evolucionan a lo largo del tiempo, suben de nivel y
              desarrollan relaciones, conflictos y objetivos personales.
            </p>
            <br />
            <p>
              D&D fomenta la creatividad, el trabajo en equipo y la
              interpretación. Puede jugarse de forma presencial o en línea, y es
              apto tanto para sesiones casuales como para campañas épicas que
              duran meses o años.
            </p>
            <br />
            <p>
              Más que un juego, D&D es una experiencia única de imaginación
              compartida, donde lo más importante no es seguir reglas al pie de
              la letra, sino vivir grandes historias con amigos.
            </p>
          </div>
        </div>
      ) : (
        <Link href="/login">
          <span className="mt-4 px-8 py-3 rounded-xl text-lg bg-[#dbc8ff] hover:bg-[#c3b4ea] text-[#111827] shadow-lg transition duration-300">
            Iniciar sesión
          </span>
        </Link>
      )}
    </div>
  );
}
