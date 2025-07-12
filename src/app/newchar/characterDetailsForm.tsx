"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import Statblock from "./statblock";

const alignments = [
  "Legal Bueno",
  "Neutral Bueno",
  "Caótico Bueno",
  "Legal Neutral",
  "Neutral",
  "Caótico Neutral",
  "Legal Malvado",
  "Neutral Malvado",
  "Caótico Malvado",
];

const skills = [
  "Acrobacias",
  "Arcanos",
  "Atletismo",
  "Engaño",
  "Historia",
  "Intimidación",
  "Investigación",
  "Juego de Manos",
  "Medicina",
  "Naturaleza",
  "Percepción",
  "Persuasión",
  "Religión",
  "Sigilo",
  "Supervivencia",
  "Trato con Animales",
  "Interpretación",
  "Perspicacia",
];

const skillLimits: Record<string, number> = {
  Guerrero: 2,
  Mago: 2,
  Clérigo: 2,
  Bardo: 3,
  Pícaro: 4,
};

export default function CharacterDetailsForm({
  onBack,
  onNext, // ✅ Ahora onNext es una prop
  initialData,
}: {
  onBack: () => void;
  onNext: (data: any) => void; // ✅ Recibe los datos del formulario
  initialData: any;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });
  const selectedClass = initialData.class || "Guerrero";
  const maxSkills = skillLimits[selectedClass] || 2;
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    initialData.skills || []
  );

  const handleSkillSelection = (skill: string) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];

    if (updatedSkills.length > maxSkills) return;

    setSelectedSkills(updatedSkills);
    setValue("skills", updatedSkills);
  };

  return (
    <Card className="max-w-lg mx-auto p-4 bg-[#1f2937]/80 rounded-2xl shadow-xl backdrop-blur border border-gray-700 text-white">
      <CardContent>
        <div className="absolute top-4 right-4 text-lg font-bold">
          Proficiency: +2
        </div>
        <h2 className="text-xl font-bold mb-4">Detalles del Personaje</h2>
        <form
          onSubmit={handleSubmit((data) => {
            onNext(data);
          })}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-white">
              Edad:
            </label>
            <Input
              {...register("age", {
                required: "¿Qué edad tiene el personaje?",
              })}
              type="number"
              placeholder="Cuantos años tiene tu personaje?"
            />
            {typeof errors.age?.message === "string" && (
              <span className="text-red-500">{errors.age.message}</span>
            )}
          </div>
          Altura:
          <Input
            {...register("height", { required: "Ingresar altura" })}
            type="number"
            placeholder="Cuanto mide tu personaje? (cm)"
          />
          {typeof errors.height?.message === "string" && (
            <span className="text-red-500">{errors.height.message}</span>
          )}
          <div>
            Alineamiento:
            <Controller
              name="alignment"
              control={control}
              rules={{ required: "Selecciona un alineamiento" }}
              render={({ field }) => (
                <Select
                  defaultValue={watch("alignment")}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="bg-[#1f2937] text-white border-white min-w-[220px] w-fit cursor-pointer hover:bg-[#323b47]">
                    <SelectValue placeholder="Como se comporta tu personaje?" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-[#1f2937] text-white border border-white">
                    {alignments.map((c) => (
                      <SelectItem
                        key={c}
                        value={c}
                        className="hover:bg-[#2f3640] hover:text-white cursor-pointer transition-colors"
                      >
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {typeof errors.alignment?.message === "string" && (
              <span className="text-red-500">{errors.alignment.message}</span>
            )}
          </div>
          Historia:
          <Textarea
            {...register("history", { required: true })}
            placeholder="Quien fue tu personaje?"
          />
          {typeof errors.history?.message === "string" && (
            <span className="text-red-500">{errors.history.message}</span>
          )}
          <div>
            <h3 className="font-semibold">
              Selecciona {maxSkills} habilidades:
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <label
                    key={skill}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md border transition-colors duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-green-700/40 border-green-500 text-white"
                        : "bg-[#1f2937]/40 border-gray-500 text-gray-200 hover:bg-[#2c3443]"
                    }`}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleSkillSelection(skill)}
                    />
                    <span>{skill}</span>
                  </label>
                );
              })}
            </div>
          </div>
          Stats:
          <Controller
            name="stats"
            control={control}
            defaultValue={
              initialData.stats || {
                Fuerza: 10,
                Destreza: 10,
                Constitución: 10,
                Inteligencia: 10,
                Sabiduría: 10,
                Carisma: 10,
              }
            } // 🔹 Si no hay stats iniciales, usa valores por defecto
            render={({ field: { value, onChange } }) => (
              <Statblock statsValues={value || {}} onChange={onChange} />
            )}
          />
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={onBack}
              className="px-8 py-3 rounded-xl text-lg bg-[#5e2742] hover:bg-[#772e57] text-white shadow-lg transition duration-300 cursor-pointer"
            >
              Atrás
            </Button>
            <Button
              type="submit"
              className="px-8 py-3 rounded-xl text-lg bg-[#3e3e6f] hover:bg-[#505092] text-white shadow-lg transition duration-300 cursor-pointer"
            >
              Siguiente
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
