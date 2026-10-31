import {createFileRoute,redirect} from '@tanstack/react-router';
import {supabase} from '@/integrations/supabase/client';
import {LearningShell} from '@/components/LearningShell';
import {learningOptions} from '@/lib/learning';
export const Route=createFileRoute('/_authenticated')({ssr:false,beforeLoad:async()=>{const {data}=await supabase.auth.getUser();if(!data.user)throw redirect({to:'/auth'});},loader:async({context})=>{await context.queryClient.ensureQueryData(learningOptions());},component:LearningShell});
