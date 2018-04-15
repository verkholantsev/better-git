// @flow

import kebabCase from 'lodash/kebabCase';

export type Opts = {
    [string]: mixed,
};

/**
 * Converts object with camelCased keys to parameters to pass to git
 */
export default function mapOpts(opts: Opts): string {
    return Object.keys(opts)
        .reduce((acc, key) => {
            let value = opts[key];
            let parameter;

            if (value === true) {
                parameter = '--' + kebabCase(key);
            } else if (typeof value === 'string') {
                parameter = `--${kebabCase(key)}='${value}'`;
            } else {
                parameter = `--${kebabCase(key)}=${String(value)}`;
            }

            return [...acc, parameter];
        }, [])
        .join(' ');
}
