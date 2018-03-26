// @flow

import parseCommits from './parse-commits';
import mapOpts from './map-opts';

import type { Git } from './git-factory';
import type { Opts } from './map-opts';
import type { Commit } from './parse-commits';

export default async function log(git: Git, opts: Opts = {}): Promise<Array<Commit>> {
    const args = ['log', ...mapOpts(opts)];
    const out = await git(args);
    return parseCommits(out);
}
