import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
export const readLearning = createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async ({context}) => {
 const [q,a,b,c,r] = await Promise.all([
 context.supabase.from('questions').select('id,subject,chapter,difficulty,stem,options,correct_index,explanation,image_url,provenance,source_title,source_url,source_year,source_notes').order('created_at').limit(1000),
 context.supabase.from('attempts').select('question_id,is_correct,created_at').order('created_at',{ascending:false}).limit(5000),
 context.supabase.from('bookmarks').select('question_id'), context.supabase.from('chapters').select('*').order('subject').order('name'), context.supabase.from('user_roles').select('role')]);
 for(const result of [q,a,b,c,r]) if(result.error) throw new Error(result.error.message);
 return {questions:q.data??[],attempts:a.data??[],bookmarks:b.data??[],chapters:c.data??[],isAdmin:r.data?.some(x=>x.role==='admin')??false};
});
