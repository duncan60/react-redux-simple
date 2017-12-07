import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/app.js',
  output: {
    file: 'build/app.js',
    format: 'iife'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    cjs({
      exclude: 'node_modules/process-es6/**',
      include: [
        'node_modules/create-react-class/**',
        'node_modules/fbjs/**',
        'node_modules/object-assign/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/prop-types/**',
        'node_modules/symbol-observable/**',
        'node_modules/invariant/**',
        'node_modules/hoist-non-react-statics/**'
      ],
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'createElement'
        ],
        'node_modules/react-dom/index.js': ['render'],
        'node_modules/symbol-observable/index.js': ['$$observable'],
        'node_modules/invariant/browser.js': ['invariant'],
        'node_modules/hoist-non-react-statics/index.js': ['hoistStatics']
      }
    }),
    globals(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve({
      browser: true,
      main: true,
      module: true,
      extensions: ['.js', '.jsx'],
      customResolveOptions: {
        moduleDirectory: ['src', 'node_modules']
      }
    })
  ],
  sourcemap: true
};
