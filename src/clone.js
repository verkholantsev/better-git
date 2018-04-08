// @flow

import type { Git } from './git-factory';

import path from 'path';

export default async function clone(git: Git, url: string) {
    const repoDir = git.getRepoDir();
    const basename = path.basename(repoDir);
    const dir = path.join(repoDir, '..');

    return await git.exec(['clone', url, basename], { dir });
}
