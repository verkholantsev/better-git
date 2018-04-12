// @flow

import type { Git } from './git-factory';

export default async function checkoutBranch(git: Git, branchName: string): Promise<string> {
    const args = ['checkout', '-b', branchName];
    return await git.exec(args);
}
