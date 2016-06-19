import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
  entry: 'src/index.js',
  dest: 'dist/js/bundle.js',
  format: 'iife',
  moduleName: 'littleBen',
  plugins: [
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
      ignoreGlobal: true
    }),
    json(),
    babel({
      externalHelpers: false
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
