const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
  addons: ['@storybook/preset-typescript'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.stories\.jsx?$/,
      loaders: [require.resolve('@storybook/addon-storysource/loader')],
      enforce: 'pre'
    });

    config.resolve.alias = {
      '@e-group/devops': path.resolve(__dirname, '../packages/devops/src/'),
      '@e-group/hooks': path.resolve(__dirname, '../packages/hooks/src/'),
      '@e-group/testing-utils': path.resolve(
        __dirname,
        '../packages/testing-utils/src/'
      ),
      '@e-group/utils': path.resolve(__dirname, '../packages/utils/src/')
    };

    // Return the altered config
    return config;
  }
};
