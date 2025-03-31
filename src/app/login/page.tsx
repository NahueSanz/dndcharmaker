"use client";

import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const loginWithProvider = async (provider: "google") => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) console.error("Error al iniciar sesión:", error.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <button onClick={() => loginWithProvider("google")}>
        Iniciar con Google
      </button>
    </div>
  );
}
