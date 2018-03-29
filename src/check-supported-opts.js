// @flow

import type { Opts } from './map-opts';

export default function checkSupportedOpts(commandName: string, actualOpts: Opts, supportedOpts: Array<string>): void {
    const unsupportedOpts = Object.keys(actualOpts).filter(opt => !supportedOpts.includes(opt));

    const hasUnsupportedOpts = unsupportedOpts.length > 0;

    if (hasUnsupportedOpts) {
        throw new Error(`Unsupported opts [${unsupportedOpts.join(', ')}] in git command '${commandName}'`);
    }
}
