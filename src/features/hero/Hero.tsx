/**
 * Hero Section
 *
 * Landing section with personal presentation and CTAs.
 * Features Ángel Hidalgo Barreiro's introduction with tagline and bio.
 */

'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/Button';
import { personalInfo, availability } from '@/shared/constants/personal';
import { fadeInUp, fadeIn, staggerContainer } from '@/shared/utils/motion';

export function Hero() {
  const tHero = useTranslations('hero');
  const tPersonal = useTranslations('personal');

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCV = () => {
    window.open(personalInfo.cvUrl, '_blank', 'noopener,noreferrer');
  };

  const asciiLines = [
    '         .----------------------.',
    '         |  Ángel H. Barreiro  |',
    '         |   full-stack dev    |',
    ' .____.  |---------------------|',
    ' | __ )  |   hair:  ~~~~~~~    |',
    ' |  _ \\  |  face:  ( ^_^)      |',
    ' | |_) | |  stack: {PHP, JS}   |',
    ' |____/  |   SaaS · Symfony    |',
    "         '---------------------'",
  ];

  const terminalContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const lineVariant = {
    hidden: { opacity: 0, y: 4 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <m.section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 py-20 animate-fade-in"
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.15, 0.15)}
    >
      <m.div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:gap-16">
        <m.div className="space-y-8 md:space-y-10" variants={staggerContainer(0.1)}>
          {/* Name and Location */}
          <m.div className="space-y-3" variants={fadeInUp}>
            <p className="text-sm md:text-base text-accent font-medium">{tHero('greeting')}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
              {personalInfo.name}
            </h1>
            <p className="text-base md:text-lg text-foreground-secondary">
              {tHero('location', {
                city: tPersonal('location.city'),
                country: tPersonal('location.country'),
              })}
            </p>
          </m.div>

          {/* Tagline */}
          <m.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground-secondary"
            variants={fadeInUp}
          >
            {tPersonal('tagline')}
          </m.h2>

          {/* Bio */}
          <m.p
            className="text-lg md:text-xl text-foreground-secondary max-w-3xl leading-relaxed"
            variants={fadeInUp}
          >
            {tPersonal('bio.full')}
          </m.p>

          {/* Availability Badge */}
          {availability.isAvailable && (
            <m.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full"
              variants={fadeInUp}
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-accent">
                {tPersonal('availability.open')}
              </span>
            </m.div>
          )}

          {/* CTAs */}
          <m.div
            className="flex flex-col sm:flex-row gap-4 pt-4"
            variants={fadeInUp}
            transition={{ staggerChildren: 0.08 }}
          >
            <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" onClick={scrollToProjects} data-scroll-to="projects">
                {tHero('buttons.projects')}
              </Button>
            </m.div>

            <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" variant="outline" onClick={downloadCV}>
                {tHero('buttons.cv')}
              </Button>
            </m.div>

            <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" variant="ghost" onClick={scrollToContact}>
                {tHero('buttons.contact')}
              </Button>
            </m.div>
          </m.div>

          {/* Quick Links */}
          <m.div className="flex gap-6 pt-4" variants={fadeInUp}>
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-secondary hover:text-accent transition-colors duration-200"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-secondary hover:text-accent transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            <a
              href={`mailto:${personalInfo.contact.email}`}
              className="text-foreground-secondary hover:text-accent transition-colors duration-200"
              aria-label="Email"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </m.div>
        </m.div>

        <m.figure
          className="relative mx-auto flex w-full max-w-[320px] justify-center md:justify-end"
          variants={fadeIn}
        >
          <m.div
            className="relative w-full max-w-[360px] overflow-hidden rounded-3xl border border-border/40 bg-background-secondary shadow-lg shadow-accent/10"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col rounded-[22px] border border-border/30 bg-[#0f1117] text-[#d4f1ff]">
              <div className="flex items-center gap-2 border-b border-border/20 bg-[#1c1f2b] px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#6b7a99]">
                <span className="inline-flex h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="inline-flex h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="inline-flex h-3 w-3 rounded-full bg-[#27c93f]" />
                <span className="ml-2">terminal</span>
              </div>
              <m.pre
                role="img"
                aria-label={tHero('asciiAlt', { name: personalInfo.name })}
                className="font-mono text-sm leading-[1.35] whitespace-pre px-6 py-6"
                initial="hidden"
                animate="visible"
                variants={terminalContainer}
              >
                {asciiLines.map((line, index) => (
                  <m.span key={index} className="block" variants={lineVariant}>
                    {line}
                  </m.span>
                ))}
              </m.pre>
            </div>
          </m.div>
        </m.figure>
      </m.div>
    </m.section>
  );
}
