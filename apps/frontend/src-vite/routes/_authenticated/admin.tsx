import { createFileRoute, redirect } from '@tanstack/react-router';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Pencil, Plus, ShieldCheck, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { learningOptions, pageHead, optionsOf, type Question } from '@/lib/learning';
import { saveQuestion, deleteQuestion, saveChapter, deleteChapter, type QuestionInput, type ChapterInput } from '@/lib/admin.functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export const Route = createFileRoute('/_authenticated/admin')({
  beforeLoad: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData(learningOptions());
    if (!data.isAdmin) throw redirect({ to: '/dashboard' });
  },
  head: () => pageHead('Administration', 'Manage MedPrep AI Nepal questions, chapters and verified past-paper provenance.'),
  component: Admin,
});

const SUBJECTS = ['Physics', 'Chemistry', 'Biology'];

const emptyQuestion = (): QuestionInput => ({
  subject: 'Biology', chapter: '', difficulty: 'medium', stem: '',
  options: ['', '', '', ''], correct_index: 0, explanation: '', visual_prompt: '',
  provenance: 'sample', source_title: null, source_url: null, source_year: null, source_notes: null,
});

function questionToInput(q: Question): QuestionInput {
  return {
    id: q.id, subject: q.subject, chapter: q.chapter, difficulty: q.difficulty, stem: q.stem,
    options: [...optionsOf(q), '', '', '', ''].slice(0, 4), correct_index: q.correct_index,
    explanation: q.explanation, visual_prompt: '', provenance: q.provenance === 'verified' ? 'verified' : 'sample',
    source_title: q.source_title, source_url: q.source_url, source_year: q.source_year, source_notes: q.source_notes,
  };
}

function Admin() {
  const { data } = useSuspenseQuery(learningOptions());
  const qc = useQueryClient();
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [editing, setEditing] = useState<QuestionInput | null>(null);
  const [editingChapter, setEditingChapter] = useState<ChapterInput | null>(null);
  const refresh = () => qc.invalidateQueries({ queryKey: ['learning'] });
  const onError = (e: Error) => toast.error(e.message);

  const saveMut = useMutation({
    mutationFn: (q: QuestionInput) => saveQuestion({ data: q }),
    onSuccess: () => { toast.success('Question saved.'); setEditing(null); refresh(); },
    onError,
  });
  const delMut = useMutation({
    mutationFn: (id: string) => deleteQuestion({ data: { id } }),
    onSuccess: () => { toast.success('Question deleted.'); refresh(); },
    onError,
  });
  const saveChapterMut = useMutation({
    mutationFn: (c: ChapterInput) => saveChapter({ data: c }),
    onSuccess: () => { toast.success('Chapter saved.'); setEditingChapter(null); refresh(); },
    onError,
  });
  const delChapterMut = useMutation({
    mutationFn: (id: string) => deleteChapter({ data: { id } }),
    onSuccess: () => { toast.success('Chapter deleted.'); refresh(); },
    onError,
  });

  const questions = data.questions.filter(q => subjectFilter === 'all' || q.subject === subjectFilter);
  const chapterNames = (subject: string) => data.chapters.filter(c => c.subject === subject).map(c => c.name);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 md:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-accent"><ShieldCheck className="size-3.5" />Administration</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold">Question &amp; chapter management</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Add and edit practice questions and chapters. Only mark a question <strong>verified</strong> when its source
            paper has genuinely been checked — students rely on that label being honest.
          </p>
        </div>
      </div>

      <Tabs defaultValue="questions" className="mt-8">
        <TabsList>
          <TabsTrigger value="questions">Questions ({data.questions.length})</TabsTrigger>
          <TabsTrigger value="chapters">Chapters ({data.chapters.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-44" aria-label="Filter by subject"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={() => setEditing(emptyQuestion())}><Plus className="size-4" />New question</Button>
          </div>

          <ul className="mt-5 space-y-3">
            {questions.map(q => (
              <li key={q.id} className="rounded-xl border bg-card p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{q.subject}</Badge>
                      <Badge variant="outline">{q.chapter}</Badge>
                      <Badge variant="outline" className="capitalize">{q.difficulty}</Badge>
                      {q.provenance === 'verified'
                        ? <Badge className="bg-bio text-bio-foreground">Verified{q.source_year ? ` · ${q.source_year}` : ''}</Badge>
                        : <Badge variant="outline" className="text-muted-foreground">Sample</Badge>}
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm font-medium">{q.stem}</p>
                    {q.provenance === 'verified' && q.source_title && (
                      <p className="mt-1 text-xs text-muted-foreground">Source: {q.source_title}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="outline" size="icon" aria-label="Edit question" onClick={() => setEditing(questionToInput(q))}><Pencil className="size-4" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon" aria-label="Delete question"><Trash2 className="size-4 text-destructive" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this question?</AlertDialogTitle>
                          <AlertDialogDescription>This removes the question for every student. Saved answers stay in their history.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => delMut.mutate(q.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </li>
            ))}
            {questions.length === 0 && <li className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">No questions match this filter.</li>}
          </ul>
        </TabsContent>

        <TabsContent value="chapters" className="mt-6">
          <div className="flex justify-end">
            <Button onClick={() => setEditingChapter({ subject: 'Biology', name: '', overview: '' })}><Plus className="size-4" />New chapter</Button>
          </div>
          <div className="mt-5 space-y-6">
            {SUBJECTS.map(subject => (
              <section key={subject}>
                <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{subject}</h2>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {data.chapters.filter(c => c.subject === subject).map(c => (
                    <li key={c.id} className="rounded-xl border bg-card p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold">{c.name}</p>
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{c.overview || 'No overview yet.'}</p>
                        </div>
                        <div className="flex shrink-0 gap-1.5">
                          <Button variant="ghost" size="icon" aria-label={`Edit ${c.name}`} onClick={() => setEditingChapter({ id: c.id, subject: c.subject, name: c.name, overview: c.overview })}><Pencil className="size-4" /></Button>
                          <Button variant="ghost" size="icon" aria-label={`Delete ${c.name}`} onClick={() => delChapterMut.mutate(c.id)}><Trash2 className="size-4 text-destructive" /></Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={editing !== null} onOpenChange={open => !open && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing?.id ? 'Edit question' : 'New question'}</DialogTitle>
            <DialogDescription>Fields marked verified are shown to students as checked past-paper material.</DialogDescription>
          </DialogHeader>
          {editing && (
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); saveMut.mutate(editing); }}>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="q-subject">Subject</Label>
                  <Select value={editing.subject} onValueChange={v => setEditing({ ...editing, subject: v })}>
                    <SelectTrigger id="q-subject"><SelectValue /></SelectTrigger>
                    <SelectContent>{SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="q-chapter">Chapter</Label>
                  <Input id="q-chapter" list="chapter-suggestions" value={editing.chapter} onChange={e => setEditing({ ...editing, chapter: e.target.value })} required />
                  <datalist id="chapter-suggestions">{chapterNames(editing.subject).map(n => <option key={n} value={n} />)}</datalist>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="q-difficulty">Difficulty</Label>
                  <Select value={editing.difficulty} onValueChange={v => setEditing({ ...editing, difficulty: v })}>
                    <SelectTrigger id="q-difficulty"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="q-stem">Question</Label>
                <Textarea id="q-stem" rows={3} value={editing.stem} onChange={e => setEditing({ ...editing, stem: e.target.value })} required />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {editing.options.map((opt, i) => (
                  <div key={i} className="space-y-1.5">
                    <Label htmlFor={`q-opt-${i}`}>Option {i + 1}{editing.correct_index === i && <span className="text-bio"> · correct</span>}</Label>
                    <Input id={`q-opt-${i}`} value={opt} onChange={e => setEditing({ ...editing, options: editing.options.map((o, j) => j === i ? e.target.value : o) })} required />
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="q-correct">Correct option</Label>
                <Select value={String(editing.correct_index)} onValueChange={v => setEditing({ ...editing, correct_index: Number(v) })}>
                  <SelectTrigger id="q-correct" className="w-44"><SelectValue /></SelectTrigger>
                  <SelectContent>{[0, 1, 2, 3].map(i => <SelectItem key={i} value={String(i)}>Option {i + 1}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="q-explanation">Explanation</Label>
                <Textarea id="q-explanation" rows={3} value={editing.explanation} onChange={e => setEditing({ ...editing, explanation: e.target.value })} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="q-visual">Diagram prompt <span className="font-normal text-muted-foreground">(used for the AI illustration)</span></Label>
                <Textarea id="q-visual" rows={2} value={editing.visual_prompt} onChange={e => setEditing({ ...editing, visual_prompt: e.target.value })} placeholder="Defaults to the question text if left empty" />
              </div>
              <div className="rounded-lg border p-4">
                <div className="space-y-1.5">
                  <Label htmlFor="q-provenance">Provenance</Label>
                  <Select value={editing.provenance} onValueChange={v => setEditing({ ...editing, provenance: v as 'sample' | 'verified' })}>
                    <SelectTrigger id="q-provenance" className="w-56"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sample">Sample question</SelectItem>
                      <SelectItem value="verified">Verified past paper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {editing.provenance === 'verified' && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="q-source-title">Source title *</Label>
                      <Input id="q-source-title" value={editing.source_title ?? ''} onChange={e => setEditing({ ...editing, source_title: e.target.value })} placeholder="e.g. MECEE-BL 2080 question paper" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="q-source-year">Year</Label>
                      <Input id="q-source-year" type="number" value={editing.source_year ?? ''} onChange={e => setEditing({ ...editing, source_year: e.target.value ? Number(e.target.value) : null })} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="q-source-url">Source link</Label>
                      <Input id="q-source-url" type="url" value={editing.source_url ?? ''} onChange={e => setEditing({ ...editing, source_url: e.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="q-source-notes">Checking notes</Label>
                      <Input id="q-source-notes" value={editing.source_notes ?? ''} onChange={e => setEditing({ ...editing, source_notes: e.target.value })} placeholder="How the source was checked" />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button type="submit" disabled={saveMut.isPending}>{saveMut.isPending ? 'Saving…' : 'Save question'}</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={editingChapter !== null} onOpenChange={open => !open && setEditingChapter(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingChapter?.id ? 'Edit chapter' : 'New chapter'}</DialogTitle>
            <DialogDescription>Chapters group questions and appear in lessons and filters.</DialogDescription>
          </DialogHeader>
          {editingChapter && (
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); saveChapterMut.mutate(editingChapter); }}>
              <div className="space-y-1.5">
                <Label htmlFor="c-subject">Subject</Label>
                <Select value={editingChapter.subject} onValueChange={v => setEditingChapter({ ...editingChapter, subject: v })}>
                  <SelectTrigger id="c-subject"><SelectValue /></SelectTrigger>
                  <SelectContent>{SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-name">Chapter name</Label>
                <Input id="c-name" value={editingChapter.name} onChange={e => setEditingChapter({ ...editingChapter, name: e.target.value })} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-overview">Overview</Label>
                <Textarea id="c-overview" rows={3} value={editingChapter.overview} onChange={e => setEditingChapter({ ...editingChapter, overview: e.target.value })} placeholder="A short, friendly summary of what this chapter covers" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setEditingChapter(null)}>Cancel</Button>
                <Button type="submit" disabled={saveChapterMut.isPending}>{saveChapterMut.isPending ? 'Saving…' : 'Save chapter'}</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
