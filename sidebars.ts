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
                        'main-functionality/models/creating-and-modifing-model',
                    ],
                },
            ],
        },
    ],
};

export default sidebars;
