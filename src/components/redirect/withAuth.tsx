"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../app/lib/supabase";

export function withAuth(Component: React.FC) {
  return function ProtectedPage() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkSession = async () => {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          router.replace("/");
        } else {
          setLoading(false);
        }
      };
      checkSession();
    }, [router]);

    if (loading) return null;

    return <Component />;
  };
}
