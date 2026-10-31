import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const GATEWAY = "https://ai.gateway.lovable.dev";
const MODEL = "openai/gpt-image-2.5-sunburst";

export const generateVisual = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { questionId: string }) => input)
  .handler(async ({ data, context }) => {
    const { data: q, error } = await context.supabase
      .from("questions")
      .select("id, visual_prompt, image_url, subject")
      .eq("id", data.questionId)
      .single();
    if (error || !q) throw new Error("Question not found");
    if (q.image_url) return { imageUrl: q.image_url };

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured");

    const res = await fetch(`${GATEWAY}/v1/images/generations`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        prompt: `${q.visual_prompt}. Accurate ${q.subject} study illustration for medical entrance students, clear readable English labels, minimal clutter.`,
        quality: "low",
        size: "1024x1024",
        output_format: "jpeg",
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) throw new Error("Too many requests right now. Please try again in a minute.");
      if (res.status === 402) throw new Error("AI credits are used up. Please add credits to continue.");
      throw new Error(`Image generation failed (${res.status}): ${text.slice(0, 200)}`);
    }
    const json = (await res.json()) as { data?: { b64_json?: string }[] };
    const b64 = json.data?.[0]?.b64_json;
    if (!b64) throw new Error("No image returned");
    const imageUrl = `data:image/jpeg;base64,${b64}`;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("questions").update({ image_url: imageUrl }).eq("id", q.id);
    return { imageUrl };
  });
