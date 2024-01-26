import { themes as prismThemes } from 'prism-react-renderer';
import type { ThemeConfig, Options } from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';

const config: Config = {
    title: 'LODEX',
    tagline: 'Transformez votre tableur en site web - Turn your spreadsheet into a website',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://your-docusaurus-site.example.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    // organizationName: 'facebook', // Usually your GitHub org/user name.
    // projectName: 'docusaurus', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'fr',
        locales: ['en', 'fr'],
        localeConfigs: {
            en: {
                htmlLang: 'en-GB',
            },
            fr: {
                htmlLang: 'fr-FR',
            },
        },
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    editUrl: 'https://github.com/Inist-CNRS/lodex-doc/tree/master',
                },
                blog: {
                    showReadingTime: true,
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
            title: 'LODEX',
            logo: {
                alt: 'My Site Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'docs',
                    position: 'left',
                    label: 'Documentation',
                },
                { to: '/blog', label: 'Blog', position: 'left' },
                {
                    type: 'localeDropdown',
                    position: 'right',
                },
                {
                    type: 'docsVersionDropdown',
                    position: 'right',
                },
                {
                    href: 'https://github.com/Inist-CNRS',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Tutorial',
                            to: '/docs/intro',
                        },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'Blog',
                            to: '/blog',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/Inist-CNRS',
                        },
                    ],
                },
            ],
            copyright: `INIST-CNRS - ${new Date().getFullYear()}. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies ThemeConfig,
};

export default config;
