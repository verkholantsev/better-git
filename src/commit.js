// @flow

import type { Git } from './git-factory';
import type { Opts } from './map-opts';

import checkSupportedOpts from './check-supported-opts';
import mapOpts from './map-opts';

const SUPPORTED_OPTS = ['message', 'allowEmpty'];

export default async function commit(git: Git, opts: Opts = {}): Promise<string> {
    checkSupportedOpts('commit', opts, SUPPORTED_OPTS);

    const args = ['commit', mapOpts(opts)];
    const out = await git(args);
    return out;
}
