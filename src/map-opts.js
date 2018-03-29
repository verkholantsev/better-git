// @flow

import kebabCase from 'lodash/kebabCase';

export type Opts = {
    [string]: mixed,
};

/**
 * Converts object with camelCased keys to parameters to pass to git
 */
export default function mapOpts(opts: Opts): string {
    return Object.entries(opts)
        .reduce((acc, [key, value]) => {
            let parameter;

            if (value === true) {
                parameter = '--' + kebabCase(key);
            } else {
                parameter = `--${kebabCase(key)}=${String(value)}`;
            }

            return [...acc, parameter];
        }, [])
        .join(' ');
}
