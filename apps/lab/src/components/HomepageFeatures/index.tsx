import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  to?: string;
  href?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Guías',
    to: '/docs/intro',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Documentación sobre Clean Architecture, testing y patrones de i18n para
        proyectos Next.js y TypeScript.
      </>
    ),
  },
  {
    title: 'Blog',
    to: '/blog',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Artículos técnicos, experimentos y casos de estudio sobre desarrollo,
        SaaS y DevOps.
      </>
    ),
  },
  {
    title: 'Portfolio',
    href: 'https://desenvolupadormaster.vercel.app',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Proyectos en producción, skills y contacto. El CV principal del Lab.
      </>
    ),
  },
];

function Feature({title, to, href, Svg, description}: FeatureItem) {
  const linkProps = to ? {to} : {href};
  return (
    <div className={clsx('col col--4')}>
      <Link {...linkProps} className={styles.featureLink}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
