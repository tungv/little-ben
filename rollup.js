import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/index.js',
  dest: 'dist/js/bundle.js',
  format: 'cjs',
  plugins: [
    nodeResolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    json(),
    babel()
  ]
};
