// @flow

import promisify from 'util.promisify';

import rimraf from 'rimraf';

import type { Git } from './git-factory';
import clone from './clone';

export type WithRemoteRepoFn<T> = () => Promise<T>;

const rmdir = promisify(rimraf);

export default async function withRemoteRepo<T>(git: Git, url: string, fn: WithRemoteRepoFn<T>): Promise<T> {
    await clone(git, url);

    let result;
    let isTmpDir = false;
    try {
        isTmpDir = git.isTmpDir();
        result = await fn();
    } finally {
        if (isTmpDir) {
            await rmdir(git.getRepoDir());
        }
    }

    return result;
}
