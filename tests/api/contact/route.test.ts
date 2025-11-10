import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';

import { POST } from '../../../app/api/contact/route';

const sendMailMock = vi.fn();

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: sendMailMock,
    })),
  },
}));

const baseEnv = { ...process.env };

beforeEach(() => {
  sendMailMock.mockReset();
  sendMailMock.mockResolvedValue(undefined);
  process.env = {
    ...baseEnv,
    EMAIL_HOST: 'smtp.example.com',
    EMAIL_PORT: '587',
    EMAIL_USER: 'user@example.com',
    EMAIL_PASSWORD: 'password',
    EMAIL_FROM: 'noreply@example.com',
    EMAIL_TO: 'contact@example.com',
  };
});

afterAll(() => {
  process.env = baseEnv;
});

describe('POST /api/contact', () => {
  it('returns 200 when message is sent successfully', async () => {
    const response = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'This is a valid message with more than ten characters.',
        }),
      })
    );

    expect(response.status).toBe(200);
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });

  it('returns 400 when payload is invalid', async () => {
    const response = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: '',
          email: 'invalid',
          message: 'short',
        }),
      })
    );

    expect(response.status).toBe(400);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('returns 500 when email configuration is missing', async () => {
    process.env.EMAIL_HOST = undefined;

    const response = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'This is a valid message with more than ten characters.',
        }),
      })
    );

    expect(response.status).toBe(500);
    expect(sendMailMock).not.toHaveBeenCalled();
  });
});


