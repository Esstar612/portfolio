import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/data/site-config';

/** Resend's shared sender. Works with no domain setup, but only delivers to
 *  the address that owns the Resend account. Swap for an address on your own
 *  domain once you have one verified. */
const DEFAULT_FROM = 'Portfolio Contact <onboarding@resend.dev>';

const LIMITS = { name: 100, email: 200, message: 5000 } as const;

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

/**
 * POST /api/contact
 *
 * Validates a contact form submission and emails it via Resend.
 * Requires RESEND_API_KEY; CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL are optional
 * overrides. Without a key the route reports that delivery is unconfigured
 * rather than silently accepting the message.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = parsePayload(body);
  if ('error' in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  // Honeypot tripped: report success so bots don't retry, but send nothing.
  if ('silentAccept' in parsed) {
    return NextResponse.json({ success: true }, { status: 200 });
  }
  const { name, email, message } = parsed;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Contact form: RESEND_API_KEY is not set; message not delivered.', { name, email });
    return NextResponse.json(
      { error: `Email delivery isn't configured yet. Please email me at ${siteConfig.links.email}.` },
      { status: 503 }
    );
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
        to: [process.env.CONTACT_TO_EMAIL || siteConfig.links.email],
        reply_to: email,
        subject: `Portfolio contact: ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      // Resend returns { message, name } on failure; log it, but don't leak it.
      const detail = await res.text().catch(() => '');
      console.error(`Contact form: Resend responded ${res.status}`, detail);
      return NextResponse.json(
        { error: `Couldn't send that. Please email me at ${siteConfig.links.email}.` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Contact form: request to Resend failed', err);
    return NextResponse.json(
      { error: `Couldn't send that. Please email me at ${siteConfig.links.email}.` },
      { status: 502 }
    );
  }
}

type ParseResult = ContactPayload | { error: string } | { silentAccept: true };

function parsePayload(body: unknown): ParseResult {
  if (typeof body !== 'object' || body === null) {
    return { error: 'Invalid request body.' };
  }
  const { name, email, message, company } = body as Record<string, unknown>;

  // Honeypot: a real person leaves this hidden field empty.
  if (typeof company === 'string' && company.trim() !== '') {
    return { silentAccept: true };
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return { error: 'All fields are required.' };
  }

  const trimmed = { name: name.trim(), email: email.trim(), message: message.trim() };
  if (!trimmed.name || !trimmed.email || !trimmed.message) {
    return { error: 'All fields are required.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
    return { error: 'Invalid email address.' };
  }
  for (const [field, max] of Object.entries(LIMITS)) {
    if (trimmed[field as keyof ContactPayload].length > max) {
      return { error: `Your ${field} is too long (max ${max} characters).` };
    }
  }

  return trimmed;
}
