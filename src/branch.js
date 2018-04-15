// @flow

import type { Git } from './git-factory';
import checkSupportedOpts from './check-supported-opts';
import mapOpts, { type Opts } from './map-opts';
import parseBranches from './parse-branches';

const SUPPORTED_OPTS = [];

export default async function branch(git: Git, opts: Opts = {}) {
    checkSupportedOpts('branch', opts, SUPPORTED_OPTS);
    const args = ['branch', mapOpts(opts)];

    const output = await git.exec(args);
    return parseBranches(output);
}
