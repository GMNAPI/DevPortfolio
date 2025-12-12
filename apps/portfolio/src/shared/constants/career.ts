/**
 * Career Data Types
 *
 * Interfaces describing professional experience and certifications.
 * Translation messages provide the actual localized content for these shapes.
 */

export interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  period: {
    start: string;
    end: string;
  };
  headline: string;
  achievements: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  description?: string;
  credentialUrl?: string;
}
