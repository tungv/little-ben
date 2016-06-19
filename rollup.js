import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/index.js',
  dest: 'dist/js/bundle.js',
  format: 'iife',
  moduleName: 'littleBen',
  plugins: [
    nodeResolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    json(),
    babel({
      plugins: ['external-helpers-2'],
      externalHelpers: true
    })
  ]
};
