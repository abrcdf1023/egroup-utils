module.exports = function (api) {
  if (api.env(["test"])) {
    return {
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime']
    }
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          // for browserslist in package.json
          useBuiltIns: 'entry'
        },
      ],
    ],
    plugins: [
      // A plugin that enables the re-use of Babel's injected helper code to save on codesize.
      // https://babeljs.io/docs/en/babel-plugin-transform-runtime
      '@babel/plugin-transform-runtime'
    ],
    ignore: [
      "**/*.test.js"
    ]
  }
}