// @flow

import type { Git } from './git-factory';
import checkSupportedOpts from './check-supported-opts';
import mapOpts, { type Opts } from './map-opts';

const SUPPORTED_OPTS = ['rebase'];

export default async function pull(git: Git, remote: string, branch: string, opts: Opts = {}): Promise<string> {
    checkSupportedOpts('pull', opts, SUPPORTED_OPTS);

    const args = ['pull', mapOpts(opts), remote, branch];
    return await git.exec(args);
}
