const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre'
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@e-group/devops': path.resolve(__dirname, '../packages/devops/src/'),
      '@e-group/hooks': path.resolve(__dirname, '../packages/hooks/src/'),
      '@e-group/testing-utils': path.resolve(
        __dirname,
        '../packages/testing-utils/src/'
      ),
      '@e-group/utils': path.resolve(__dirname, '../packages/utils/src/')
    }
  }
};
