module.exports = function (api) {
  if (api.env(["test"])) {
    return {
      presets: ['@babel/preset-env']
    }
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          // for browserslist in package.json
          useBuiltIns: 'entry',
          // use ES6 module
          modules: false
        },
      ],
    ],
    ignore: [
      "**/*.test.js"
    ]
  }
}