// @flow

import path from 'path';

import type { Git } from './git-factory';

export default async function clone(git: Git, url: string) {
    const repoDir = git.getRepoDir();
    const basename = path.basename(repoDir);
    const dir = path.join(repoDir, '..');

    return await git.exec(['clone', url, basename], { dir });
}
