const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const config = {
  title: 'Lab - Ángel Hidalgo',
  tagline: 'Experimentos técnicos, skills y documentación de desarrollo',
  favicon: 'img/favicon.ico',

  url: 'https://desenvolupadormaster.vercel.app',
  baseUrl: '/',

  organizationName: 'GMNAPI',
  projectName: 'devportfolio-lab',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    localeConfigs: {
      es: {
        label: 'Español',
        direction: 'ltr',
        htmlLang: 'es-ES',
      },
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/GMNAPI/DevPortfolio/tree/master/apps/lab/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/GMNAPI/DevPortfolio/tree/master/apps/lab/',
          blogSidebarTitle: 'Artículos recientes',
          blogSidebarCount: 10,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/lab-social-card.jpg',
    navbar: {
      title: 'Lab',
      logo: {
        alt: 'Ángel Hidalgo Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'guidesSidebar',
          position: 'left',
          label: 'Guías',
        },
        // { to: '/blog', label: 'Blog', position: 'left' }, // Disabled: no blog posts yet
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/GMNAPI/DevPortfolio',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Contenido',
          items: [
            {
              label: 'Guías',
              to: '/docs/intro',
            },
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // }, // Disabled: no blog posts yet
          ],
        },
        {
          title: 'Portfolio',
          items: [
            {
              label: 'Inicio',
              href: 'https://desenvolupadormaster.vercel.app',
            },
            {
              label: 'Proyectos',
              href: 'https://desenvolupadormaster.vercel.app/projects',
            },
            {
              label: 'Contacto',
              href: 'https://desenvolupadormaster.vercel.app#contact',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/GMNAPI',
            },
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/in/angel-hidalgo',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ángel Hidalgo Barreiro. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: [
        'bash',
        'typescript',
        'python',
        'java',
        'php',
        'yaml',
        'json',
      ],
    },
  },
};

module.exports = config;
