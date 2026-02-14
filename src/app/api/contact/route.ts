import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/contact
 *
 * Handles contact form submissions.
 * In production, wire this up to:
 *   - An email service (Resend, SendGrid, SES)
 *   - A database for lead tracking
 *   - A Slack webhook for instant notifications
 *
 * Currently validates input and returns a success response.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // -------------------------------------------
    // TODO: Send email via your preferred service.
    //
    // Example with Resend:
    //
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //   from: 'portfolio@starolaojo.dev',
    //   to: 'esstar612@gmail.com',
    //   subject: `Contact form: ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    // });
    // -------------------------------------------

    console.log('Contact form submission:', { name, email, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
