"use client";

import { useEffect, useState } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const classOptions = ["Guerrero", "Mago", "Pícaro", "Clérigo", "Bardo"];
const raceOptions = ["Humano", "Elfo", "Enano", "Gnomo"];
const backgroundOptions = [
  "Acolito",
  "Criminal",
  "Animador",
  "Sabio",
  "Soldado",
];

const spellData = {
  Mago: {
    cantrips: [
      "Acid splash (conjuration)",
      "Dancing lights (evocation)",
      "Fire bolt (evocation)",
      "Light (evocation)",
      "Mage hand (conjuration)",
      "Minor illusion (illusion)",
      "Poison spray (conjuration)",
      "Prestidigitation (transmutation)",
      "Ray of frost (evocation)",
      "Shocking grasp (evocation)",
    ],
    firstLevelSpells: [
      "Burning hands (evocation)",
      "Charm person (enchantment)",
      "Comprehend languages (divination, ritual)",
      "Detect magic (divination, ritual)",
      "Disguise self (illusion)",
      "Feather fall (transmutation)",
      "Identify (divination, ritual)",
      "Longstrider (transmutation)",
      "Mage armor (abjuration)",
      "Magic missile (evocation)",
      "Shield (abjuration)",
      "Silent image (illusion)",
      "Sleep (enchantment)",
      "Thunderwave (evocation)",
    ],
    maxCantrips: 3,
    maxSpells: 2,
  },
  Clérigo: {
    cantrips: [
      "Guidance",
      "Light",
      "Mending",
      "Resistance",
      "Sacred flame",
      "Thaumaturgy",
    ],
    firstLevelSpells: [
      "Bless",
      "Command",
      "Cure wounds",
      "Detect magic (ritual)",
      "Guiding bolt",
      "Healing word",
      "Inflict wounds",
      "Sanctuary",
      "Shield of faith",
    ],
    maxCantrips: 3,
    maxSpells: 2,
  },
  Bardo: {
    cantrips: [
      "Light",
      "Mage hand",
      "Mending",
      "Minor ilusion",
      "Prestidigatation",
      "Vicious mockery",
    ],
    firstLevelSpells: [
      "Charm person",
      "Comprehend languages (ritual)",
      "Disguise self",
      "Faerie fire",
      "Feather fall",
      "Healing word",
      "Identify (ritual)",
      "Longstrider",
      "Silent image",
      "Sleep",
      "Thunderwave",
    ],
    maxCantrips: 2,
    maxSpells: 4,
  },
};

export default function CharacterCreationForm({
  onNext,
  initialData,
}: {
  onNext: (data: any) => void;
  initialData: any;
}) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: initialData });
  const selectedClass = watch("class");

  const [selectedCantrips, setSelectedCantrips] = useState<string[]>([]);
  const [selectedSpells, setSelectedSpells] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCantripSelection = (cantrip: string) => {
    if (!selectedClass || !(selectedClass in spellData)) return;

    const classKey = selectedClass as keyof typeof spellData; // 🔹 Convertimos selectedClass a una clave válida

    const maxCantrips = spellData[classKey].maxCantrips;

    let updatedCantrips = selectedCantrips.includes(cantrip)
      ? selectedCantrips.filter((c) => c !== cantrip)
      : [...selectedCantrips, cantrip];

    if (updatedCantrips.length > maxCantrips) return;

    setSelectedCantrips(updatedCantrips);
    setValue("cantrips", updatedCantrips);
  };

  const handleSpellSelection = (spell: string) => {
    if (!selectedClass || !(selectedClass in spellData)) return;

    const classKey = selectedClass as keyof typeof spellData; // 🔹 Convertimos selectedClass en una clave válida

    const maxSpells = spellData[classKey].maxSpells;

    let updatedSpells = selectedSpells.includes(spell)
      ? selectedSpells.filter((s) => s !== spell)
      : [...selectedSpells, spell];

    if (updatedSpells.length > maxSpells) return;

    setSelectedSpells(updatedSpells);
    setValue("spells", updatedSpells);
  };

  useEffect(() => {
    // Limpiar hechizos y cantrips si cambia la clase
    setSelectedCantrips([]);
    setSelectedSpells([]);
    setValue("cantrips", []);
    setValue("spells", []);
  }, [selectedClass]);

  return (
    <Card className="max-w-lg mx-auto p-4 bg-[#1f2937]/80 rounded-2xl shadow-xl backdrop-blur border border-gray-700 text-white">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Crear Personaje</h2>
        <form onSubmit={handleSubmit(onNext)} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-white">
              Nombre:
            </label>
            <Input
              {...register("name", { required: "El nombre es obligatorio" })}
              placeholder="Nombre del personaje"
            />
            {typeof errors.name?.message === "string" && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Clase:
            </label>
            <Controller
              name="class"
              control={control}
              rules={{ required: "Selecciona una clase" }}
              render={({ field }) => (
                <Select
                  defaultValue={watch("class")}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="bg-[#1f2937] text-white border-white min-w-[220px] w-fit cursor-pointer hover:bg-[#323b47]">
                    <SelectValue placeholder="Selecciona una clase" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-[#1f2937] text-white border border-white">
                    {classOptions.map((c) => (
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
            {typeof errors.class?.message === "string" && (
              <span className="text-red-500">{errors.class.message}</span>
            )}
          </div>

          <div>
            Raza:
            <Controller
              name="race"
              control={control}
              rules={{ required: "Selecciona una raza" }}
              render={({ field }) => (
                <Select
                  defaultValue={watch("race")}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="bg-[#1f2937] text-white border-white min-w-[220px] w-fit cursor-pointer hover:bg-[#323b47]">
                    <SelectValue placeholder="Selecciona una raza" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-[#1f2937] text-white border border-white">
                    {raceOptions.map((r) => (
                      <SelectItem
                        key={r}
                        value={r}
                        className="hover:bg-[#2f3640] hover:text-white cursor-pointer transition-colors"
                      >
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {typeof errors.race?.message === "string" && (
              <span className="text-red-500">{errors.race.message}</span>
            )}
          </div>

          <div>
            Trasfondo:
            <Controller
              name="background"
              control={control}
              rules={{ required: "Selecciona un trasfondo" }}
              render={({ field }) => (
                <Select
                  defaultValue={watch("background")}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="bg-[#1f2937] text-white border-white min-w-[220px] w-fit cursor-pointer hover:bg-[#323b47]">
                    <SelectValue placeholder="Selecciona un trasfondo" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-[#1f2937] text-white border border-white">
                    {backgroundOptions.map((b) => (
                      <SelectItem
                        key={b}
                        value={b}
                        className="hover:bg-[#2f3640] hover:text-white cursor-pointer transition-colors"
                      >
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {typeof errors.background?.message === "string" && (
              <span className="text-red-500">{errors.background.message}</span>
            )}
          </div>

          {selectedClass && selectedClass in spellData && (
            <>
              <div>
                <h3 className="font-semibold">
                  Selecciona{" "}
                  {
                    spellData[selectedClass as keyof typeof spellData]
                      .maxCantrips
                  }{" "}
                  Cantrips:
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {spellData[
                    selectedClass as keyof typeof spellData
                  ].cantrips.map((spell) => {
                    const isSelected = selectedCantrips.includes(spell);
                    return (
                      <label
                        key={spell}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md border transition-colors duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-purple-700/40 border-purple-500 text-white"
                            : "bg-[#1f2937]/40 border-gray-500 text-gray-200 hover:bg-[#2c3443]"
                        }`}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleCantripSelection(spell)}
                        />
                        <span>{spell}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-semibold">
                  Selecciona{" "}
                  {spellData[selectedClass as keyof typeof spellData].maxSpells}{" "}
                  Hechizos de Nivel 1:
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {spellData[
                    selectedClass as keyof typeof spellData
                  ].firstLevelSpells.map((spell) => {
                    const isSelected = selectedSpells.includes(spell);
                    return (
                      <label
                        key={spell}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md border transition-colors duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-indigo-700/40 border-indigo-500 text-white"
                            : "bg-[#1f2937]/40 border-gray-500 text-gray-200 hover:bg-[#2c3443]"
                        }`}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleSpellSelection(spell)}
                        />
                        <span>{spell}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <Input type="file" accept="image/png" onChange={handleImageUpload} />
          {image && (
            <img
              src={image}
              alt="Vista previa"
              className="w-32 h-32 object-cover"
            />
          )}

          <Button
            type="submit"
            className="px-8 py-3 rounded-xl text-lg bg-[#3e3e6f] hover:bg-[#505092] text-white shadow-lg transition duration-300"
          >
            Siguiente
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
