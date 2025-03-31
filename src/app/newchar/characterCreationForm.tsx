"use client";

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

  return (
    <Card className="max-w-lg mx-auto p-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Crear Personaje</h2>
        <form onSubmit={handleSubmit(onNext)} className="space-y-4">
          <div>
            Nombre:
            <Input
              {...register("name", { required: "El nombre es obligatorio" })}
              placeholder="Nombre del personaje"
            />
            {typeof errors.name?.message === "string" && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div>
            Clase:
            <Controller
              name="class"
              control={control}
              rules={{ required: "Selecciona una clase" }}
              render={({ field }) => (
                <Select
                  defaultValue={watch("class")}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una clase" />
                  </SelectTrigger>
                  <SelectContent>
                    {classOptions.map((c) => (
                      <SelectItem key={c} value={c}>
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
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una raza" />
                  </SelectTrigger>
                  <SelectContent>
                    {raceOptions.map((r) => (
                      <SelectItem key={r} value={r}>
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
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un trasfondo" />
                  </SelectTrigger>
                  <SelectContent>
                    {backgroundOptions.map((b) => (
                      <SelectItem key={b} value={b}>
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
                  ].cantrips.map((spell) => (
                    <label key={spell} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedCantrips.includes(spell)}
                        onCheckedChange={() => handleCantripSelection(spell)}
                      />
                      <span>{spell}</span>
                    </label>
                  ))}
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
                  ].firstLevelSpells.map((spell) => (
                    <label key={spell} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedSpells.includes(spell)}
                        onCheckedChange={() => handleSpellSelection(spell)}
                      />
                      <span>{spell}</span>
                    </label>
                  ))}
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

          <Button type="submit">Siguiente</Button>
        </form>
      </CardContent>
    </Card>
  );
}
