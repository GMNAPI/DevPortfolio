/**
 * Contact Section
 *
 * Contact form with client-side validation.
 * Uses Contact entity for validation logic.
 */

'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { Contact as ContactEntity } from '@/core/entities/Contact';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MIN_MESSAGE_LENGTH = 10;

    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    // Validate name
    if (!trimmedData.name || trimmedData.name.length === 0) {
      newErrors.name = 'El nombre es requerido';
    }

    // Validate email
    if (!trimmedData.email || !EMAIL_REGEX.test(trimmedData.email)) {
      newErrors.email = 'Un email válido es requerido';
    }

    // Validate message
    if (!trimmedData.message || trimmedData.message.length === 0) {
      newErrors.message = 'El mensaje es requerido';
    } else if (trimmedData.message.length < MIN_MESSAGE_LENGTH) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call (frontend only for now)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Clear form
    setFormData({
      name: '',
      email: '',
      message: '',
    });

    // Hide success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Contacto</h2>
          <p className="text-lg text-foreground-secondary">
            ¿Tienes un proyecto en mente? Hablemos
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} aria-label="contact form" className="space-y-6">
          <Input
            label="Nombre"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            disabled={isSubmitting}
          />

          <Input
            label="Email"
            type="text"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            disabled={isSubmitting}
          />

          <Input
            label="Mensaje"
            multiline
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            error={errors.message}
            disabled={isSubmitting}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </Button>

          {submitSuccess && (
            <div
              className="p-4 bg-accent/10 border border-accent rounded-md text-accent"
              role="alert"
            >
              ✓ Mensaje enviado correctamente. Te responderé pronto!
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
