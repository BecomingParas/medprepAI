"use client";

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { brokeredPreviewStorage } from './previewAuthStorage';

function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    const missing = [
      ...(!url ? ['NEXT_PUBLIC_SUPABASE_URL'] : []),
      ...(!publishableKey ? ['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'] : []),
    ];
    throw new Error(`Missing Supabase environment variable(s): ${missing.join(', ')}.`);
  }

  return createClient<Database>(url, publishableKey, {
    auth: {
      storage: brokeredPreviewStorage(),
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let client: ReturnType<typeof createSupabaseClient> | undefined;

export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_target, property, receiver) {
    client ??= createSupabaseClient();
    return Reflect.get(client, property, receiver);
  },
});
