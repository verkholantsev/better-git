// @flow

import type { Git } from './git-factory';
import checkSupportedOpts from './check-supported-opts';
import mapOpts, { type Opts } from './map-opts';

const SUPPORTED_OPTS = ['force'];

export default async function push(git: Git, remote?: string, branch?: string, opts: Opts = {}): Promise<string> {
    checkSupportedOpts('push', opts, SUPPORTED_OPTS);

    const args = ['push', mapOpts(opts), remote, branch].filter(Boolean);
    return await git.exec(args);
}
