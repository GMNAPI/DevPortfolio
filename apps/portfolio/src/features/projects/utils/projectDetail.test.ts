import { describe, expect, it } from 'vitest';

import { getProjectDetail, type ProjectDetailContent } from './projectDetail';

describe('getProjectDetail', () => {
  const details: Record<string, ProjectDetailContent> = {
    'fastbyte-api-servicios': {
      sections: [{ heading: 'Contexto', body: 'ERP en producción.' }],
      metrics: [{ label: 'Endpoints API', value: '~34' }],
    },
  };

  it('returns the detail content when the slug exists', () => {
    expect(getProjectDetail(details, 'fastbyte-api-servicios')).toEqual(
      details['fastbyte-api-servicios']
    );
  });

  it('returns null when the slug has no detail content', () => {
    expect(getProjectDetail(details, 'seedstockers-b2b-platform')).toBeNull();
  });

  it('returns null when details is undefined', () => {
    expect(getProjectDetail(undefined, 'fastbyte-api-servicios')).toBeNull();
  });
});
