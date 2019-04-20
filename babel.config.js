module.exports = function (api) {
  const isTest = api.env(["test"])
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ["ie >= 11"],
          node: 'current',
        },
        exclude: ["transform-async-to-generator", "transform-regenerator"],
        // use ES6 module
        modules: isTest ? undefined : false,
        // loose模式說明 https://www.w3ctech.com/topic/1708
        loose: true
      },
    ],
  ]
  
  const plugins = [
    "@babel/plugin-proposal-object-rest-spread"
  ]

  return {
    presets,
    plugins
  };
}