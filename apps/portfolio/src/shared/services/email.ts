import nodemailer from 'nodemailer';

import { Contact } from '@/core/entities/Contact';

interface EmailEnvConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
  to: string;
}

function parseEmailConfig(): EmailEnvConfig {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD, EMAIL_FROM, EMAIL_TO } = process.env;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASSWORD || !EMAIL_FROM || !EMAIL_TO) {
    throw new Error('Email configuration is incomplete. Please set EMAIL_* environment variables.');
  }

  const port = Number(EMAIL_PORT);

  if (Number.isNaN(port)) {
    throw new Error('EMAIL_PORT must be a valid number.');
  }

  return {
    host: EMAIL_HOST,
    port,
    user: EMAIL_USER,
    password: EMAIL_PASSWORD,
    from: EMAIL_FROM,
    to: EMAIL_TO,
  };
}

export function createEmailTransport() {
  const config = parseEmailConfig();

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.password,
    },
  });
}

export async function sendContactEmail(contact: Contact) {
  const config = parseEmailConfig();
  const transport = createEmailTransport();

  const subject = `[Portfolio] Nuevo mensaje de ${contact.name}`;

  await transport.sendMail({
    from: config.from,
    to: config.to,
    replyTo: contact.email,
    subject,
    text: `
Nombre: ${contact.name}
Email: ${contact.email}
Fecha: ${contact.timestamp.toISOString()}

Mensaje:
${contact.message}
    `.trim(),
    html: `
      <p><strong>Nombre:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Fecha:</strong> ${contact.timestamp.toISOString()}</p>
      <hr />
      <p>${contact.message.replace(/\n/g, '<br />')}</p>
    `,
  });
}
