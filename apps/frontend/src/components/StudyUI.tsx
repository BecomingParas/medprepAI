import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="study-heading flex flex-wrap items-end justify-between gap-5 border-b pb-7"><div className="min-w-0"><p className="study-eyebrow">{eyebrow}</p><h1 className="mt-3 font-bold">{title}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{description}</p></div>{action}</div>;
}

export function StudySegments({ values, value, onChange, label }: { values: string[]; value: string; onChange: (value: string) => void; label: string }) {
  return <Tabs value={value} onValueChange={onChange}><TabsList aria-label={label} className="h-auto max-w-full flex-wrap justify-start gap-1 border bg-secondary/70 p-1">{values.map(v => <TabsTrigger key={v} value={v} className="min-h-9 px-4 text-xs">{v}</TabsTrigger>)}</TabsList></Tabs>;
}

export function StudyEmpty({ icon: Icon, title, children, action }: { icon: LucideIcon; title: string; children?: ReactNode; action?: ReactNode }) {
  return <div className="study-empty flex flex-col items-center border-y py-16 text-center"><span className="grid size-14 place-items-center rounded-lg border bg-accent/10 text-accent"><Icon className="size-6" strokeWidth={1.5}/></span><h2 className="mt-5 text-lg font-semibold">{title}</h2>{children && <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{children}</p>}{action && <div className="mt-6 flex flex-wrap justify-center gap-3">{action}</div>}</div>;
}