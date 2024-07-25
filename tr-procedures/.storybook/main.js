const path = require('path');

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
    '@chromatic-com/storybook',
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-links'
  ],
  framework: {
    name: '@storybook/web-components-webpack5',
    options: {},
  },
  webpackFinal: async (config, { configType }) => {
    // Añade loader para manejar archivos Markdown
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
};
