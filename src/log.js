// @flow

import type { Git } from './git-factory';
import checkSupportedOpts from './check-supported-opts';
import mapOpts, { type Opts } from './map-opts';
import parseCommits, { type Commits } from './parse-commits';

const SUPPORTED_OPTS = ['maxCount'];

export default async function log(git: Git, opts: Opts = {}): Promise<Commits> {
    checkSupportedOpts('log', opts, SUPPORTED_OPTS);

    const args = ['log', mapOpts(opts)];
    const out = await git.exec(args);
    return parseCommits(out);
}
