// @flow

import parseRemotes, { type Remotes } from './parse-remotes';
import type { Git } from './git-factory';

export default async function getRemotes(git: Git): Promise<Remotes> {
    const args = ['remote', '-v'];
    const out = await git.exec(args);

    return parseRemotes(out);
}
