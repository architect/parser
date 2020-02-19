import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from "rollup-plugin-terser"
import { version } from './package.json'

// useful for bundling to lambda
let node = {
  input: 'src/index.js',
  output: {
    file: `dist/architect-parser-${version}.js`,
    format: 'cjs'
  },
  plugins: [
    commonjs({ignore: ['fs', 'path']}), 
    json()
  ]
}

// useful for bundling to browsers
let browser = {
  input: 'src/index.js',
  output: {
    file: `dist/architect-parser-${version}.mjs`,
    format: 'esm'
  },
  plugins: [
    commonjs({ignore: ['fs', 'path']}), 
    json(), 
    terser()
  ]
}

export default [node, browser]
