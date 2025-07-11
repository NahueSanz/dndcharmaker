import { supabase } from "../../app/lib/supabase";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
      return;
    }

    router.push("/login");
  };

  return (
    <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
      Cerrar sesión
    </Button>
  );
}
