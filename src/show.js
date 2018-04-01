// @flow

import checkSupportedOpts from './check-supported-opts';
import mapOpts from './map-opts';
import parseCommits from './parse-commits';

import type { Git } from './git-factory';
import type { Opts } from './map-opts';
import type { Commit } from './parse-commits';

const SUPPORTED_OPTS = [];

export default async function show(git: Git, opts: Opts = {}): Promise<Commit> {
    checkSupportedOpts('show', opts, SUPPORTED_OPTS);

    const args = ['show', ...mapOpts(opts)];
    const out = await git(args);
    const commits = parseCommits(out);

    if (commits.length > 1) {
        throw new Error('Output for `git show` contains more that one commit, it should contain only one');
    } else if (commits.length === 0) {
        throw new Error('Output for `git show` does not contain commits, it should contain exact one');
    }

    return commits[0];
}
