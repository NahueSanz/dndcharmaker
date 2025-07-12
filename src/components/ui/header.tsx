"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUserName(data.user.user_metadata?.name ?? "aventurero");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    localStorage.setItem("loggedOut", "true");
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error al cerrar sesión:", error.message);
      return;
    }
    router.push("/login");
  };
  
  if (pathname === "/login") return null;

  return (
    <header className="z-50 flex justify-between items-center px-6 py-4 bg-[#1a1a2e] shadow-md">
      <Link
        href="/"
        className="text-3xl font-bold text-[#ff3864] hover:underline"
      >
        D&D CharMaker
      </Link>

      {userName && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-[#CBC5EA] text-lg hover:bg-[#2a2a40] cursor-pointer"
            >
              Bienvenido, {userName}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#1a1a2e] text-white border-gray-700">
            <DropdownMenuItem
              className="hover:bg-red-600 cursor-pointer"
              onClick={handleLogout}
            >
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
