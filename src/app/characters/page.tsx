"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { supabase } from "../lib/supabase";
import Image from "next/image";
import { useEffect, useState } from "react";
import DeleteCharacterButton from "./deletePopUp";
import Link from "next/link";

type Character = {
  id: number;
  name: string;
  class: string;
  race: string;
  background: string;
  alignment: string;
  age: number;
  height: number;
  history: string;
  skills: string[];
  stats: JSON;
  cantrips: string[];
  spells: string[];
  image: string;
};

export default function ViewCharacters() {

  const [characters, setCharacters] = useState<Character[]>([]);
  const fetchCharacter = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("Characters")
        .select("*")
        .eq("user_id", user?.id);

      if (error) {
        console.log("tiro error rey", error);
      } else {
        setCharacters(data);
      }
    } catch (err) {
      console.log("error: ", err);
    }
  };
  useEffect(() => {
    fetchCharacter();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Mis Personajes</h2>
      {characters.length === 0 ? (
        <p>
          No tienes personajes creados aún. Puedes crear uno dando click{" "}
          <Link href="/newchar" className="text-blue-600 hover:text-blue-400">aquí</Link>.
        </p>
      ) : (
        characters.map((character) => (
          <div key={character.id} className="mb-6 p-4 bg-gray-800 rounded-lg">
            {/* Sección superior */}
            <div className="flex gap-6">
              {/* Imagen */}
              <div className="w-1/3">
                {character.image ? (
                  <Image
                    src={character.image}
                    alt="Personaje"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-700 flex items-center justify-center rounded-lg">
                    ?
                  </div>
                )}
              </div>

              {/* Datos principales */}
              <div className="flex-1 bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-bold">{character.name}</h3>
                <p>
                  <strong>Raza:</strong> {character.race}
                </p>
                <p>
                  <strong>Clase:</strong> {character.class}
                </p>
                <p>
                  <strong>Trasfondo:</strong> {character.background}
                </p>
                <p>
                  <strong>Alineamiento:</strong> {character.alignment}
                </p>
                <p>
                  <strong>Edad:</strong> {character.age}
                </p>
                <p>
                  <strong>Altura:</strong> {character.height} cm
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-lg font-semibold">Stats</h4>
                {Object.entries(character.stats).map(([stat, value]) => {
                  const modifier = Math.floor((value - 10) / 2);
                  return (
                    <p key={stat}>
                      <strong>{stat}:</strong> {value} (
                      {modifier >= 0 ? `+${modifier}` : modifier})
                    </p>
                  );
                })}
              </div>

              {/* Habilidades */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-lg font-semibold">Habilidades</h4>
                <ul className="list-disc list-inside">
                  {character.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>

                {character.cantrips?.length > 0 && (
                  <>
                    <h4 className="text-lg font-semibold mt-4">Cantrips</h4>
                    <ul className="list-disc list-inside">
                      {character.cantrips.map((cantrip) => (
                        <li key={cantrip}>{cantrip}</li>
                      ))}
                    </ul>
                  </>
                )}

                {character.spells?.length > 0 && (
                  <>
                    <h4 className="text-lg font-semibold mt-4">Hechizos</h4>
                    <ul className="list-disc list-inside">
                      {character.spells.map((spell) => (
                        <li key={spell}>{spell}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Historia */}
            <div className="mt-4 bg-gray-700 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Historia</h4>
              <p>{character.history}</p>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end mt-4">
              <DeleteCharacterButton
                characterId={character.id}
                characterName={character.name}
                onDeleteSuccess={fetchCharacter}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
