// @flow

import type { Git } from './git-factory';

export default async function addTag(git: Git, version: string, message: string): Promise<string> {
    const args = ['tag', `--annotate '${version}' --message '${message}'`];
    const out = await git.exec(args);
    return out;
}
