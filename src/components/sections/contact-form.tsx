'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

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
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {['name', 'email'].map((field) => (
        <input
          key={field}
          name={field}
          type={field === 'email' ? 'email' : 'text'}
          placeholder={field === 'name' ? 'Your name' : 'Your email'}
          required
          className={inputStyles}
          style={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-fg)',
          }}
        />
      ))}
      <textarea
        name="message"
        rows={5}
        placeholder="Your message"
        required
        className={inputStyles + ' resize-none'}
        style={{
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-fg)',
        }}
      />
      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </Button>
      {status === 'error' && (
        <p className="text-sm text-red-500">Something went wrong. Try emailing me directly.</p>
      )}
    </form>
  );
}
