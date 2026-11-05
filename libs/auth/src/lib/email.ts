type AuthEmail = {
  to: string;
  subject: string;
  title: string;
  description: string;
  url: string;
  action: string;
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });
}

export async function sendAuthEmail({
  to,
  subject,
  title,
  description,
  url,
  action,
}: AuthEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !sender) {
    throw new Error(
      'Authentication email delivery is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.',
    );
  }

  const safeUrl = escapeHtml(url);
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: sender,
      to: [to],
      subject,
      text: `${title}\n\n${description}\n\n${action}: ${url}\n\nIf you did not request this, you can ignore this email.`,
      html: `<main style="font-family:Arial,sans-serif;line-height:1.6;color:#2c251e"><h1>${title}</h1><p>${description}</p><p><a href="${safeUrl}" style="display:inline-block;padding:12px 20px;background:#df301c;color:#fff1d1;text-decoration:none;border-radius:6px">${action}</a></p><p>If you did not request this, you can ignore this email.</p></main>`,
    }),
  });

  if (!response.ok) {
    console.error('Authentication email delivery failed.', { status: response.status });
    throw new Error('Authentication email could not be delivered. Please try again later.');
  }
}
