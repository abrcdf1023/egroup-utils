import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'

import { dependencies } from './package.json'

export default [
  // build gulp script
  {
    input: [
      'src/gulp/createGulpTasks.js'
    ],
    output: { dir: './', format: 'cjs', indent: false },
    external: [
      ...Object.keys(dependencies || {})
    ],
    plugins: [
      babel()
    ]
  },
  // CommonJS
  {
    input: [
      'src/createObservableApi.js',
      'src/createFetchReducer.js',
      'src/base64ToObject.js'
    ],
    output: { dir: 'lib', format: 'cjs', indent: false },
    external: [
      ...Object.keys(dependencies || {})
    ],
    plugins: [
      babel()
    ]
  },
  {
    input: 'src/index.js',
    output: { file: 'lib/index.js', format: 'cjs', indent: false },
    external: [
      ...Object.keys(dependencies || {})
    ],
    plugins: [
      babel()
    ]
  },

  // ES
  {
    input: [
      'src/createObservableApi.js',
      'src/createFetchReducer.js',
      'src/base64ToObject.js'
    ],
    output: { dir: 'es', format: 'es', indent: false },
    external: [
      ...Object.keys(dependencies || {})
    ],
    plugins: [
      babel()
    ]
  },
  {
    input: 'src/index.js',
    output: { file: 'es/index.js', format: 'es', indent: false },
    external: [
      ...Object.keys(dependencies || {})
    ],
    plugins: [
      babel()
    ]
  },

  // ES for Browsers
  {
    input: 'src/index.js',
    output: { file: 'es/index.mjs', format: 'es', indent: false },
    plugins: [
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