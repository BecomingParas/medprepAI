import { NextResponse } from 'next/server';
import {
  ApiError,
  apiErrorResponse,
  isRecord,
  parseJson,
} from '@/lib/server/api-auth';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function requiredText(
  value: unknown,
  field: string,
  maximumLength: number,
): string {
  if (typeof value !== 'string') {
    throw new ApiError(`${field} is required.`, 400);
  }

  const text = value.trim();
  if (!text || text.length > maximumLength) {
    throw new ApiError(`${field} must be between 1 and ${maximumLength} characters.`, 400);
  }
  return text;
}

export async function POST(request: Request) {
  try {
    const payload = await parseJson(request);
    if (!isRecord(payload)) {
      throw new ApiError('A valid contact form is required.', 400);
    }

    if (typeof payload.website === 'string' && payload.website.trim()) {
      return NextResponse.json({ message: 'Your message has been sent.' });
    }

    const name = requiredText(payload.name, 'Name', 100);
    const email = requiredText(payload.email, 'Email', 254);
    const subject = requiredText(payload.subject, 'Subject', 150);
    const message = requiredText(payload.message, 'Message', 5000);
    if (!emailPattern.test(email)) {
      throw new ApiError('Enter a valid email address.', 400);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL;
    const sender = process.env.CONTACT_FROM_EMAIL;
    if (!apiKey || !recipient || !sender) {
      throw new ApiError('Contact form delivery is not configured yet.', 503);
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `Contact form: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      throw new ApiError('Unable to deliver your message. Please try again later.', 502);
    }

    return NextResponse.json({ message: 'Your message has been sent.' });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
