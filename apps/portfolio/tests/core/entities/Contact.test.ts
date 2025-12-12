import { describe, it, expect } from 'vitest';
import { Contact } from '@/core/entities/Contact';

describe('Contact Entity', () => {
  describe('Creation', () => {
    it('should create a valid contact message', () => {
      const contact = new Contact({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, I would like to work with you.',
      });

      expect(contact.name).toBe('John Doe');
      expect(contact.email).toBe('john@example.com');
      expect(contact.message).toBe('Hello, I would like to work with you.');
      expect(contact.timestamp).toBeInstanceOf(Date);
    });

    it('should throw error if name is empty', () => {
      expect(() => {
        new Contact({
          name: '',
          email: 'john@example.com',
          message: 'Test',
        });
      }).toThrow('Name is required');
    });

    it('should throw error if email is invalid', () => {
      expect(() => {
        new Contact({
          name: 'John',
          email: 'invalid-email',
          message: 'Test',
        });
      }).toThrow('Valid email is required');
    });

    it('should throw error if message is empty', () => {
      expect(() => {
        new Contact({
          name: 'John',
          email: 'john@example.com',
          message: '',
        });
      }).toThrow('Message is required');
    });

    it('should throw error if message is too short', () => {
      expect(() => {
        new Contact({
          name: 'John',
          email: 'john@example.com',
          message: 'Hi',
        });
      }).toThrow('Message must be at least 10 characters');
    });

    it('should trim whitespace from inputs', () => {
      const contact = new Contact({
        name: '  John Doe  ',
        email: '  john@example.com  ',
        message: '  Hello world, this is a test message  ',
      });

      expect(contact.name).toBe('John Doe');
      expect(contact.email).toBe('john@example.com');
      expect(contact.message).toBe('Hello world, this is a test message');
    });
  });

  describe('Email Validation', () => {
    it('should accept valid email formats', () => {
      const validEmails = [
        'user@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
        'user_name@example-domain.com',
      ];

      validEmails.forEach((email) => {
        expect(() => {
          new Contact({
            name: 'Test',
            email,
            message: 'Test message here',
          });
        }).not.toThrow();
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'notanemail',
        '@example.com',
        'user@',
        'user @example.com',
        'user@.com',
      ];

      invalidEmails.forEach((email) => {
        expect(() => {
          new Contact({
            name: 'Test',
            email,
            message: 'Test message here',
          });
        }).toThrow('Valid email is required');
      });
    });
  });

  describe('Methods', () => {
    it('should convert to plain object', () => {
      const timestamp = new Date();
      const contact = new Contact(
        {
          name: 'John',
          email: 'john@example.com',
          message: 'Test message',
        },
        timestamp
      );

      const plain = contact.toJSON();

      expect(plain).toEqual({
        name: 'John',
        email: 'john@example.com',
        message: 'Test message',
        timestamp: timestamp.toISOString(),
      });
    });
  });
});
