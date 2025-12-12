import { NextResponse } from 'next/server';

import { Contact } from '@/core/entities/Contact';
import { sendContactEmail } from '@/shared/services/email';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const contact = new Contact({
      name: payload?.name ?? '',
      email: payload?.email ?? '',
      message: payload?.message ?? '',
    });

    await sendContactEmail(contact);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      const isValidationError =
        error.message.includes('required') ||
        error.message.includes('valid') ||
        error.message.includes('at least');

      return NextResponse.json(
        { success: false, message: error.message },
        { status: isValidationError ? 400 : 500 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Unexpected error while sending message.' },
      { status: 500 }
    );
  }
}
