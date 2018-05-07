'use strict';

const fs = require('fs');

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');

const pkg = require('./package.json');

const babelrcContent = fs.readFileSync('./.babelrc', 'utf8');
const babelrc = JSON.parse(babelrcContent);

function extendBabelrc(babelrc) {
    const presets = babelrc.presets.map(preset => {
        if (!Array.isArray(preset)) {
            return preset;
        }

        const [name, options] = preset;

        if (name === 'env') {
            const newOptions = Object.assign({}, options, {
                modules: false,
            });
            return [name, newOptions];
        }

        return preset;
    });

    const plugins = babelrc.plugins.concat(['external-helpers']);

    return Object.assign({}, babelrc, {
        babelrc: false,
        exclude: 'node_modules/**',
        plugins,
        presets,
    });
}

module.exports = {
    input: './src/index.js',
    output: {
        name: 'better-git',
        format: 'cjs',
        file: pkg.main,
    },
    plugins: [babel(extendBabelrc(babelrc)), commonjs()],
    external: ['debug', 'lodash/kebabCase', 'lodash/partial', 'os', 'path', 'rimraf', 'spawndamnit', 'util.promisify'],
};
