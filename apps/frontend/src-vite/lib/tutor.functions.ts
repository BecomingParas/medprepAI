import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type Msg = { role: "user" | "assistant"; content: string };

export const askTutor = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { messages: Msg[] }) => ({ messages: input.messages.slice(-20) }))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured");
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "You are MedPrep AI, a friendly tutor for Nepali students preparing for the MBBS entrance exam (MECEE-BL). Explain Physics, Chemistry and Biology clearly and briefly, use simple English, step-by-step reasoning, and quick memory tricks. Stay on exam topics.",
          },
          ...data.messages,
        ],
      }),
    });
    if (!res.ok) {
      if (res.status === 429) throw new Error("Too many requests right now. Please try again in a minute.");
      if (res.status === 402) throw new Error("AI credits are used up. Please add credits to continue.");
      throw new Error(`Tutor failed (${res.status})`);
    }
    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return { reply: json.choices?.[0]?.message?.content ?? "Sorry, I couldn't answer that." };
  });
