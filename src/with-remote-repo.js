// @flow

import type { Git } from './git-factory';

import clone from './clone';
import promisify from 'util.promisify';
import rimraf from 'rimraf';

export type WithRemoteRepoFn<T> = () => Promise<T>;

const rmdir = promisify(rimraf);

export default async function withRemoteRepo<T>(git: Git, url: string, fn: WithRemoteRepoFn<T>): Promise<T> {
    await clone(git, url);

    let result;
    try {
        result = await fn();
    } finally {
        await rmdir(git.getRepoDir());
    }

    return result;
}
