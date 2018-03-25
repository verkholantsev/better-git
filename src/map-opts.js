import kebabCase from 'lodash/kebabCase';

/**
 * Converts object with camelCased keys to parameters to pass to git
 */
export default function mapOpts(opts) {
    return Object.entries(opts).reduce((acc, [key, value]) => {
        const parameter = `--${kebabCase(key)}=${String(value)}`;
        return [...acc, parameter];
    }, []);
}
