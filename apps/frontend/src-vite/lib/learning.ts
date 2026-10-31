import { queryOptions } from '@tanstack/react-query';
import { readLearning } from './learning.functions';
export const learningOptions = () => queryOptions({queryKey:['learning'],queryFn:()=>readLearning(),staleTime:30000});
export function pageHead(title:string,description:string){return {meta:[{title:`${title} — MedPrep AI Nepal`},{name:'description',content:description},{property:'og:title',content:`${title} — MedPrep AI Nepal`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]};}
export type Question = Awaited<ReturnType<typeof readLearning>>['questions'][number];
export function optionsOf(q:Question):string[]{return Array.isArray(q.options)?q.options.map(String):[];}
