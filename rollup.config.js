import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

export default [
  // CommonJS
  {
    input: [
      'src/index.js',
      'src/initialState.js',
      'src/createObservableApi.js',
      'src/createFetchReducer.js',
      'src/base64ToObject.js'
    ],
    output: { dir: 'lib', format: 'cjs', indent: false },
    external: [
      ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
      }),
      babel({ runtimeHelpers: true })
    ]
  },

  // ES
  {
    input: [
      'src/index.js',
      'src/initialState.js',
      'src/createObservableApi.js',
      'src/createFetchReducer.js',
      'src/base64ToObject.js'
    ],
    output: { dir: 'es', format: 'es', indent: false },
    external: [
      ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
      }),
      babel({ runtimeHelpers: true })
    ]
  },

  // ES for Browsers
  {
    input: 'src/index.js',
    output: { file: 'es/index.mjs', format: 'es', indent: false },
    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
      }),
      nodeResolve({
        jsnext: true
      }),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  },

  // UMD Development
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'EGFEUtils',
      indent: false
    },
    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
      }),
      nodeResolve({
        jsnext: true
      }),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  },

  // UMD Production
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'EGFEUtils',
      indent: false
    },
    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
      }),
      nodeResolve({
        jsnext: true
      }),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  }
]