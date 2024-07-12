/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: DocsContainer,
      page: DocsPage,
    },
  },
};

import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

export default preview;
