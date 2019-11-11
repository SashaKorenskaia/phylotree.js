import {terser} from "rollup-plugin-terser";
import node from "rollup-plugin-node-resolve";
import copy from 'rollup-plugin-copy';

import * as meta from "./package.json";

const config = {
  input: "src/index.js",
  external: Object.keys(meta.dependencies || {}),
  output: {
    file: `dist/${meta.name}.js`,
    name: "phylotree",
    format: "umd",
    indent: true,
    sourcemap: true,
    extend: true,
    globals: {d3:'d3', underscore:'_'}
  },
  plugins: [node(), copy({"phylotree.css":"build/phylotree.css", "index.html":"build/index.html"})]
};

export default [
  config,
  {
    ...config,
    output: {
      ...config.output,
      file: `dist/${meta.name}.min.js`
    },
    plugins: [
      ...config.plugins,
      terser({
        output: {
          preamble: config.output.banner
        }
      })
    ]
  }
];
