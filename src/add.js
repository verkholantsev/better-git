// @flow

import type { Git } from './git-factory';
import checkSupportedOpts from './check-supported-opts';
import mapOpts, { type Opts } from './map-opts';

const SUPPORTED_OPTS = ['all'];

export default async function add(git: Git, opts: Opts = {}): Promise<string> {
    checkSupportedOpts('add', opts, SUPPORTED_OPTS);

    const args = ['add', mapOpts(opts)];
    const out = await git.exec(args);
    return out;
}
