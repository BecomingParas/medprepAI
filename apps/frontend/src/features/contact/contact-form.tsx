'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type SubmissionState = {
  message: string;
  success: boolean;
} | null;

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState<SubmissionState>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);
    setSubmission(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = (await response.json()) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        setSubmission({
          message: result.error ?? 'Unable to send your message. Please try again.',
          success: false,
        });
        return;
      }

      form.reset();
      setSubmission({
        message: result.message ?? 'Your message has been sent.',
        success: true,
      });
    } catch {
      setSubmission({
        message: 'Unable to send your message. Please try again.',
        success: false,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          maxLength={100}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-subject">Subject</Label>
        <Input
          id="contact-subject"
          name="subject"
          maxLength={150}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={6}
          maxLength={5000}
          required
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <Label htmlFor="contact-website">Leave this field empty</Label>
        <Input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? 'Sending...' : 'Send message'}
      </Button>

      {submission && (
        <p
          role={submission.success ? 'status' : 'alert'}
          className={
            submission.success
              ? 'text-sm text-success'
              : 'text-sm text-destructive'
          }
        >
          {submission.message}
        </p>
      )}
    </form>
  );
}
