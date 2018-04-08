// @flow

import type { Git } from './git-factory';

export default async function clone(git: Git, url: string, dirname: string) {
    return await git.exec(['clone', url, dirname]);
}
