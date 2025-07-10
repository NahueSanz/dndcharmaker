"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";

export default function Header() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUserName(data.user.user_metadata?.name ?? "aventurero");
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="z-50 flex justify-between items-center px-6 py-4 bg-[#1a1a2e] shadow-md">
      <Link
        href="/"
        className="text-3xl font-bold text-[#ff3864] hover:underline"
      >
        D&D CharMaker
      </Link>
      {userName && (
        <span className="text-[#CBC5EA] text-lg">
          Bienvenido, {userName}!
        </span>
      )}
    </header>
  );
}
