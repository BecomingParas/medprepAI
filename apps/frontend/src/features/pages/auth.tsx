"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Stethoscope, ArrowRight, LoaderCircle } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace('/dashboard');
  }, [user, router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    if (mode === "up") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) toast.error(error.message);
      else toast.success("Check your email to confirm your account.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
    }
    setBusy(false);
  }

  async function google() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth` },
    });
    if (error) toast.error(error.message);
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-md px-6 py-12 sm:py-16">
        <span className="mb-6 grid size-12 place-items-center rounded-lg border bg-accent/10 text-accent"><Stethoscope className="size-6"/></span>
        <p className="mb-3 text-[11px] font-semibold uppercase text-accent">Your learning workspace</p>
        <h1 className="text-3xl font-bold">{mode === "in" ? "Welcome back" : "Create account"}</h1>
        <p className="mt-2 text-muted-foreground">Your scores and weak topics are saved.</p>
        <Button variant="outline" className="mt-8 w-full" onClick={google}>
          Continue with Google
        </Button>
        <div className="my-6 flex items-center gap-4 text-xs text-muted-foreground"><span className="flex-1 border-t"/>or with email<span className="flex-1 border-t"/></div>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" autoComplete="email" placeholder="you@example.com" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pw">Password</Label>
            <Input id="pw" autoComplete={mode==="in"?"current-password":"new-password"} type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button className="w-full" disabled={busy}>
            {busy?<LoaderCircle className="animate-spin"/>:<ArrowRight/>}{busy?"Please wait…":mode === "in" ? "Sign in" : "Sign up"}
          </Button>
        </form>
        <Button variant="link" className="mt-4 px-0" onClick={() => setMode(mode === "in" ? "up" : "in")}>
          {mode === "in" ? "New here? Create an account" : "Have an account? Sign in"}
        </Button>
      </div>
    </div>
  );
}
