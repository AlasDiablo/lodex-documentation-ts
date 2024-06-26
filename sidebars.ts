import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
    docs: [
        'introduction',
        {
            type: 'category',
            label: 'Premiers pas',
            link: {
                type: 'generated-index',
            },
            items: [
                'getting-started/creating-an-instance',
                'getting-started/import-dataset',
                'getting-started/login-instance-repository',
                'getting-started/apply-a-model',
                'getting-started/theme-customisation',
                'getting-started/publishing',
                'getting-started/navigation',
                'getting-started/instance-setting',
            ],
        },
        {
            type: 'category',
            label: 'Principal fonctionnalités disponible',
            link: {
                type: 'generated-index',
            },
            items: [
                {
                    type: 'category',
                    label: 'Introduction des modèles',
                    link: {
                        type: 'doc',
                        id: 'main-functionality/models/models-introduction',
                    },
                    items: [
                        'main-functionality/models/dataset-preparation',
                        'main-functionality/models/import-model',
                        'main-functionality/models/creating-and-modifying-model',
                        'main-functionality/models/sub-resources',
                        'main-functionality/models/ws-enrichment',
                    ],
                },
                {
                    type: 'category',
                    label: 'Les routines et graphes',
                    link: {
                        type: 'doc',
                        id: 'main-functionality/charts-and-routines/charts-and-routines-introduction',
                    },
                    items: [
                        'main-functionality/charts-and-routines/routines',
                        'main-functionality/charts-and-routines/charts',
                    ],
                },
                'main-functionality/formats/formats',
                'main-functionality/exporters/exporters',
                'main-functionality/loaders/loaders',
                'main-functionality/transformers/transformers',
                'main-functionality/theme/theme',
                'main-functionality/recipe/recipe',
            ],
        },
    ],
    docsDeveloper: [
        'developer/developer-introduction',
        'developer/adding-a-new-enricher',
        'developer/adding-a-new-format',
        'developer/adding-a-new-graphic',
        'developer/adding-a-new-loader',
        'developer/adding-a-new-routine',
        'developer/adding-new-exporter',
        'developer/adding-transformers',
        'developer/configuration',
        'developer/customizing-the-public-layout',
        'developer/d3-integration-with-react',
        'developer/development',
        'developer/theming-lodex',
        'developer/troubleshooting',
    ],
};

export default sidebars;
