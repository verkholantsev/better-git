// @flow

import type { Opts } from './map-opts';

/**
 * Throws error if actual opts are not a part of supported opts, does nothing otherwise
 */
export default function checkSupportedOpts(commandName: string, actualOpts: Opts, supportedOpts: Array<string>): void {
    const unsupportedOpts = Object.keys(actualOpts).filter(opt => !supportedOpts.includes(opt));

    const hasUnsupportedOpts = unsupportedOpts.length > 0;

    if (hasUnsupportedOpts) {
        throw new Error(`Unsupported opts [${unsupportedOpts.join(', ')}] in git command '${commandName}'`);
    }
}
