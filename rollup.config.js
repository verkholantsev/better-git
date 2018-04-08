'use strict';

const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const pkg = require('./package.json');

module.exports = {
    input: './src/index.js',
    output: {
        name: 'better-git',
        format: 'cjs',
        file: pkg.main,
    },
    plugins: [
        babel({
            presets: [['env', { modules: false, targets: { node: '6' } }], 'flow'],
            exclude: 'node_modules/**',
            babelrc: false,
            plugins: ['external-helpers'],
        }),
        commonjs(),
    ],
    external: ['debug', 'lodash/kebabCase', 'lodash/partial', 'os', 'path', 'rimraf', 'spawndamnit', 'util.promisify'],
};
