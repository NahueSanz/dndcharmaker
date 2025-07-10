"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CharacterReview({
  characterData,
  onBack,
  onConfirm,
}: {
  characterData: any;
  onBack: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      {/* Sección superior */}
      <div className="flex gap-6">
        {/* Imagen del personaje */}
        <div className="w-1/3">
          {characterData.image ? (
            <Image
              src={characterData.image}
              alt="Personaje"
              width={200}
              height={200}
              className="rounded-lg"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-700 flex items-center justify-center rounded-lg">
              Sin imagen
            </div>
          )}
        </div>

        {/* Datos principales */}
        <div className="flex-1 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold">{characterData.name}</h2>
          <p>
            <strong>Raza:</strong> {characterData.race}
          </p>
          <p>
            <strong>Clase:</strong> {characterData.class}
          </p>
          <p>
            <strong>Trasfondo:</strong> {characterData.background}
          </p>
          <p>
            <strong>Alineamiento:</strong> {characterData.alignment}
          </p>
          <p>
            <strong>Edad:</strong> {characterData.age}
          </p>
          <p>
            <strong>Altura:</strong> {characterData.height} cm
          </p>
        </div>
      </div>

      {/* Sección de Stats y Habilidades */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Stats */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Stats</h3>
          {Object.entries(characterData.stats).map(([stat, value]: any) => {
            const modifier = Math.floor((value - 10) / 2);
            return (
              <p key={stat}>
                <strong>{stat}:</strong> {value} (
                {modifier >= 0 ? `+${modifier}` : modifier})
              </p>
            );
          })}
        </div>

        {/* Habilidades y Hechizos */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Habilidades</h3>
          <ul className="list-disc list-inside">
            {characterData.skills.map((skill: string) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>

          {/* Hechizos y Cantrips (si aplica) */}
          {characterData.cantrips?.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mt-4">Cantrips</h3>
              <ul className="list-disc list-inside">
                {characterData.cantrips.map((cantrip: string) => (
                  <li key={cantrip}>{cantrip}</li>
                ))}
              </ul>
            </>
          )}

          {characterData.spells?.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mt-4">Hechizos</h3>
              <ul className="list-disc list-inside">
                {characterData.spells.map((spell: string) => (
                  <li key={spell}>{spell}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Historia */}
      <div className="mt-6 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Historia</h3>
        <p>{characterData.history}</p>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-between gap-4 mt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-30 bg-[#5e2742] hover:bg-[#772e57] cursor-pointer"
        >
          Atrás
        </Button>
        <Button
          onClick={onConfirm}
          className="w-30 bg-[#3e3e6f] hover:bg-[#505092] cursor-pointer"
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
}
