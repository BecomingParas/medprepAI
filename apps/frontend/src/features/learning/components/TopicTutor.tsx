'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { askTutor, type TutorMessage } from '@/lib/tutor.functions';
import type { LearningSubject, LearningTopic } from '../data/syllabus';

export function TopicTutor({
  subject,
  topic,
}: {
  subject: LearningSubject;
  topic: LearningTopic;
}) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = question.trim();
    if (!text || busy) return;

    const conversation = [
      ...messages,
      {
        role: 'user' as const,
        content: `I'm studying syllabus topic ${topic.id} (${subject} / ${topic.name}). Please answer at an entrance-exam level. ${text}`,
      },
    ];
    setMessages(conversation);
    setQuestion('');
    setBusy(true);

    try {
      const result = await askTutor({ data: { messages: conversation } });
      setMessages([...conversation, { role: 'assistant', content: result.reply }]);
    } catch (error) {
      setMessages(messages);
      setQuestion(text);
      toast.error(error instanceof Error ? error.message : 'The study assistant is unavailable.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-lg border bg-card p-5 shadow-card" aria-labelledby="topic-tutor-title">
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-accent/10 text-accent">
          <Sparkles className="size-4" />
        </span>
        <div>
          <h2 id="topic-tutor-title" className="font-semibold">
            AI Study Assistant
          </h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Ask about {topic.name}. AI responses may need checking against your syllabus.
          </p>
        </div>
      </div>

      {messages.filter((message) => message.role === 'assistant').map((message, index) => (
        <p key={`${index}-${message.content}`} role="status" className="mt-4 rounded-md bg-muted/60 p-3 text-sm leading-6">
          {message.content}
        </p>
      ))}

      <form className="mt-4 flex gap-2" onSubmit={(event) => void submit(event)}>
        <Input
          aria-label={`Ask about ${topic.name}`}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about this topic..."
          disabled={busy}
        />
        <Button type="submit" size="icon" aria-label="Ask the study assistant" disabled={busy || !question.trim()}>
          <ArrowUp />
        </Button>
      </form>
    </section>
  );
}
