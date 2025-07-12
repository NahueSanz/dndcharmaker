/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "../lib/supabase";

export default function DeleteCharacterButton({
  characterId,
  characterName,
  onDeleteSuccess,
}: {
  characterId: any;
  characterName: string;
  onDeleteSuccess: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const { data: characterData, error: fetchError } = await supabase
      .from("Characters")
      .select("image")
      .eq("id", characterId)
      .single();

    if (fetchError) {
      console.error("Error al obtener personaje:", fetchError);
      return;
    }

    if (characterData?.image) {
      console.log("URL completa de la imagen:", characterData.image);

      const imageUrl = characterData.image;
      const filePath = imageUrl.split("/storage/v1/object/public/avatars/")[1];

      if (filePath) {
        const { error: deleteImageError } = await supabase.storage
          .from("avatars")
          .remove([filePath]);

        if (deleteImageError) {
          console.error(
            "Error al eliminar imagen del storage:",
            deleteImageError
          );
        } else {
          console.log("Imagen eliminada correctamente");
        }
      } else {
        console.warn("No se pudo extraer el path del archivo.");
      }
    }

    const { error: deleteCharError } = await supabase
      .from("Characters")
      .delete()
      .eq("id", characterId);

    if (deleteCharError) {
      console.error("Error eliminando personaje:", deleteCharError);
    } else {
      console.log("Personaje eliminado con éxito");
      setOpen(false);
      onDeleteSuccess?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="bg-red-600 hover:bg-red-700 cursor-pointer"
        >
          Eliminar
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-red-500">
            ¿Está seguro que desea eliminar el personaje '{characterName}'?
          </DialogTitle>
          <p className="text-gray-300 text-sm">
            Esta acción no puede deshacerse.
          </p>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            No
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="text-red-500 cursor-pointer hover:text-red-600"
          >
            Sí, eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
