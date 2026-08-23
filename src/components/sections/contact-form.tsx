'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const fields = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Your email', type: 'email', autoComplete: 'email' },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('Something went wrong. Try emailing me directly.');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });
      if (res.ok) {
        setStatus('sent');
        return;
      }
      const data = await res.json().catch(() => null);
      setError(data?.error || 'Something went wrong. Try emailing me directly.');
      setStatus('error');
    } catch {
      setError('Something went wrong. Try emailing me directly.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl p-8 text-center" style={{ border: '1px solid var(--color-border)' }}>
        <p className="font-display text-xl text-theme-fg">Message sent!</p>
        <p className="mt-2 text-sm text-theme-fg-muted">I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  const inputStyles =
    'w-full rounded-xl px-4 py-3 text-sm font-body transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-theme-accent';
  const inputStyle = {
    background: 'var(--color-bg-elevated)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-fg)',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={`contact-${field.name}`} className="sr-only">
            {field.label}
          </label>
          <input
            id={`contact-${field.name}`}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            placeholder={field.label}
            required
            className={inputStyles}
            style={inputStyle}
          />
        </div>
      ))}
      <div>
        <label htmlFor="contact-message" className="sr-only">
          Your message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Your message"
          required
          className={inputStyles + ' resize-none'}
          style={inputStyle}
        />
      </div>
      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </Button>
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
    </form>
  );
}
