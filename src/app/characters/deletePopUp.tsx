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
    const { error } = await supabase
      .from("Characters")
      .delete()
      .eq("id", characterId);
    if (error) {
      console.error("Error eliminando personaje:", error);
    } else {
      console.log("Personaje eliminado con éxito");
      setOpen(false);
    }
    onDeleteSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Eliminar</Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-red-500">
            ¿Está seguro que desea eliminar el personaje "{characterName}"?
          </DialogTitle>
          <p className="text-gray-400 text-sm">
            Esta acción no puede deshacerse.
          </p>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            No
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Sí, eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
