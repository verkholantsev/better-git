// @flow

import type { Git, GitArgs } from './git-factory';

export default async function raw(git: Git, args: GitArgs): Promise<string> {
    return await git(args);
}
