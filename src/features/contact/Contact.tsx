/**
 * Contact Section
 *
 * Contact form with client-side validation.
 * Uses Contact entity for validation logic.
 */

'use client';

import { useState, FormEvent } from 'react';
import { AnimatePresence, m } from 'framer-motion';

import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/shared/utils/motion';

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
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json().catch(() => ({}))) as { message?: string };

      if (!response.ok) {
        throw new Error(result?.message ?? 'No se pudo enviar el mensaje. Intenta de nuevo.');
      }

      setSubmitSuccess(true);

      // Clear form
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Ha ocurrido un error al enviar el mensaje. Intenta de nuevo más tarde.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <m.section
      id="contact"
      className="min-h-screen py-20 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer(0.18)}
    >
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Header */}
        <m.div className="space-y-4" variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Contacto</h2>
          <p className="text-lg text-foreground-secondary">
            ¿Tienes un proyecto en mente? Hablemos
          </p>
        </m.div>

        {/* Form */}
        <m.form
          onSubmit={handleSubmit}
          aria-label="contact form"
          className="space-y-6"
          variants={fadeInUp}
        >
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

          <m.div whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
            </Button>
          </m.div>

          <AnimatePresence>
            {submitError && (
              <m.div
                className="p-4 border border-destructive/40 bg-destructive/10 text-destructive rounded-md text-sm"
                role="alert"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {submitError}
              </m.div>
            )}
            {submitSuccess && (
              <m.div
                className="p-4 bg-accent/10 border border-accent rounded-md text-accent"
                role="alert"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                ✓ Mensaje enviado correctamente. Te responderé pronto!
              </m.div>
            )}
          </AnimatePresence>
        </m.form>
      </div>
    </m.section>
  );
}
