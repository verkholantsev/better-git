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
            const dashPrefix = key.length === 1 ? '-' : '--';
            const equalsOrEmptyString = key.length === 1 ? '' : '=';

            if (value === true) {
                parameter = dashPrefix + kebabCase(key);
            } else {
                parameter = dashPrefix + kebabCase(key) + equalsOrEmptyString + String(value);
            }

            return [...acc, parameter];
        }, [])
        .join(' ');
}
