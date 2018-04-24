// @flow

import type { Git } from './git-factory';
import checkSupportedOpts from './check-supported-opts';
import mapOpts, { type Opts } from './map-opts';

const SUPPORTED_OPTS = ['prune'];

export default async function fetch(git: Git, remote?: string, opts?: Opts = {}): Promise<string> {
    checkSupportedOpts('fetch', opts, SUPPORTED_OPTS);

    const args = ['fetch', mapOpts(opts), remote].filter(Boolean);
    return await git.exec(args);
}
