// @flow

import mapOpts, { type Opts } from './map-opts';
import type { Git } from './git-factory';
import checkSupportedOpts from './check-supported-opts';

const SUPPORTED_OPTS = [];

export default async function init(git: Git, opts: Opts = {}): Promise<string> {
    checkSupportedOpts('init', opts, SUPPORTED_OPTS);

    const args = ['init', ...mapOpts(opts)];
    const out = await git.exec(args);
    return out;
}
