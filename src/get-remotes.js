// @flow

import type { Git } from './git-factory';
import type { Remotes } from './parse-remotes';

import parseRemotes from './parse-remotes';

export default async function getRemotes(git: Git): Promise<Remotes> {
    const args = ['remote', '-v'];
    const out = await git(args);

    return parseRemotes(out);
}
