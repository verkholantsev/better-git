// @flow

import mapOpts from './map-opts';

import type { Git } from './git-factory';
import type { Opts } from './map-opts';

export default async function commit(git: Git, opts: Opts = {}): Promise<string> {
    const args = ['commit', mapOpts(opts)];
    const out = await git(args);
    return out;
}
