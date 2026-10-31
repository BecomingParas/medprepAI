"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    void supabase.auth
      .getUser()
      .then(({ data: userData, error }) => {
        if (error) console.error('Could not restore the Supabase session.', error);
        setUser(userData.user);
        setLoading(false);
      })
      .catch((error: unknown) => {
        console.error('Could not restore the Supabase session.', error);
        setLoading(false);
      });
    return () => data.subscription.unsubscribe();
  }, []);
  return { user, loading };
}
