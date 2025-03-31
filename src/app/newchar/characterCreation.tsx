"use client";

import { useState } from "react";
import CharacterCreationForm from "./characterCreationForm";
import CharacterDetailsForm from "./characterDetailsForm";
import CharacterReview from "./characterReview";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

export default function CharacterCreation() {
  const [step, setStep] = useState(1);
  const [characterData, setCharacterData] = useState({});

  const handleNext = (data: any) => {
    setCharacterData((prev) => ({ ...prev, ...data })); // Guardar datos ingresados
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  async function getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return console.log("tu error es:", error);
    }
    return data.user;
  }

  const handleConfirm = async () => {
    const user = await getUser();
    try {
      const { data, error } = await supabase
        .from("Characters")
        .insert([{ ...characterData, user_id: user?.id }]);
      if (error) throw new Error(`Error guardando personaje: ${error.message}`);
      toast("Personaje creado con éxito", {
        description: "Tu personaje ha sido guardado correctamente.",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
      return data;
    } catch (err) {
      console.error("Error al guardar el personaje:", err);
    }
  };
  return (
    <div>
      {step === 1 && (
        <CharacterCreationForm
          onNext={handleNext}
          initialData={characterData}
        />
      )}
      {step === 2 && (
        <CharacterDetailsForm
          onBack={handleBack}
          onNext={handleNext}
          initialData={characterData}
        />
      )}
      {step === 3 && (
        <CharacterReview
          onBack={handleBack}
          onConfirm={handleConfirm}
          characterData={characterData}
        />
      )}
    </div>
  );
}
