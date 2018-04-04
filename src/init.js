// @flow

import mapOpts from './map-opts';
import checkSupportedOpts from './check-supported-opts';

import type { Git } from './git-factory';
import type { Opts } from './map-opts';

const SUPPORTED_OPTS = [];

export default async function init(git: Git, opts: Opts = {}): Promise<string> {
    checkSupportedOpts('init', opts, SUPPORTED_OPTS);

    const args = ['init', ...mapOpts(opts)];
    const out = await git(args);
    return out;
}
