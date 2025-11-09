/**
 * Contact Entity
 *
 * Represents a contact form message in the domain layer.
 * Validates email format and message length.
 *
 * @example
 * const contact = new Contact({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   message: 'I would like to discuss a project'
 * });
 */

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export class Contact {
  readonly name: string;
  readonly email: string;
  readonly message: string;
  readonly timestamp: Date;

  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static readonly MIN_MESSAGE_LENGTH = 10;

  constructor(data: ContactData, timestamp: Date = new Date()) {
    // Trim inputs
    const trimmedData = {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
    };

    this.validate(trimmedData);

    this.name = trimmedData.name;
    this.email = trimmedData.email;
    this.message = trimmedData.message;
    this.timestamp = timestamp;
  }

  /**
   * Validates contact data
   * @throws Error if validation fails
   */
  private validate(data: ContactData): void {
    if (!data.name || data.name.length === 0) {
      throw new Error('Name is required');
    }

    if (!data.email || !Contact.EMAIL_REGEX.test(data.email)) {
      throw new Error('Valid email is required');
    }

    if (!data.message || data.message.length === 0) {
      throw new Error('Message is required');
    }

    if (data.message.length < Contact.MIN_MESSAGE_LENGTH) {
      throw new Error(`Message must be at least ${Contact.MIN_MESSAGE_LENGTH} characters`);
    }
  }

  /**
   * Converts contact to plain object
   */
  toJSON() {
    return {
      name: this.name,
      email: this.email,
      message: this.message,
      timestamp: this.timestamp.toISOString(),
    };
  }
}
