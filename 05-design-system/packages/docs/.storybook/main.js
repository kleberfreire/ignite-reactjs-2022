/** @type { import('@storybook/react-vite').StorybookConfig } */
// import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

const config = {
  stories: ["../src/pages/**/*.mdx", "../src/stories/**/*.stories.@(js|jsx|ts|tsx)"],
  // stories: ["../pages/stories/**/*.mdx", "../src/stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
    themes: themes.dark
  },
};



export default config;
