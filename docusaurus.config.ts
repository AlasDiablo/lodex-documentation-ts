import docusaurusLunrSearch from 'docusaurus-lunr-search';
import { themes as prismThemes } from 'prism-react-renderer';

import type { ThemeConfig, Options } from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';

const config: Config = {
    title: 'LODEX',
    tagline: 'Transformez votre tableur en site web - Turn your spreadsheet into a website',
    favicon: 'img/cropped-lodex-180x180.png',

    // Set the production url of your site here
    url: 'https://www.lodex.fr/',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/docs',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    // organizationName: 'facebook', // Usually your GitHub org/user name.
    // projectName: 'docusaurus', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    editUrl: 'https://github.com/Inist-CNRS/lodex-doc/tree/master',
                    showLastUpdateAuthor: false,
                    showLastUpdateTime: true,
                    versions: {
                        current: {
                            label: 'Canary 🚧',
                        },
                    },
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Options,
        ],
    ],

    plugins: [
        [
            docusaurusLunrSearch,
            {
                languages: ['fr'],
            },
        ],
    ],

    i18n: {
        defaultLocale: 'fr',
        locales: ['fr'],
        localeConfigs: {
            fr: {
                htmlLang: 'fr-FR',
            },
        },
    },

    themeConfig: {
        colorMode: {
            defaultMode: 'light',
            disableSwitch: true,
        },
        navbar: {
            title: 'Documentation',
            logo: {
                src: 'img/lodex-logo.svg',
                width: '90',
                height: '30',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'docs',
                    position: 'left',
                    label: 'Docs générals (lodex.fr)',
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'docsDeveloper',
                    position: 'left',
                    label: 'Docs du wiki lodex (GitHub)',
                },
                // Un comment this to enable locale selector
                // {
                //     type: 'localeDropdown',
                //     position: 'right',
                // },
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
                // {
                //     title: 'Docs',
                //     items: [
                //         {
                //             label: 'Tutorial',
                //             to: '/docs/intro',
                //         },
                //     ],
                // },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/Inist-CNRS/lodex',
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
