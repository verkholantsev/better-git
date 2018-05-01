// @flow

import fs from 'fs';
import os from 'os';
import path from 'path';

import promisify from 'util.promisify';

import show from '../src/show';

const readFile = promisify(fs.readFile);

describe('git.show()', () => {
    let git;

    beforeEach(() => {
        const fixturePath = path.resolve(__dirname, '__fixtures__', 'git-show');
        git = {
            exec: jest.fn(async () => await readFile(fixturePath, { encoding: 'utf8' })),
            getRepoDir: () => '',
            isTmpDir: () => false,
        };
    });

    it('should produce correct output', async () => {
        expect(await show(git)).toMatchSnapshot();
    });

    it('should call git with correct args', async () => {
        await show(git);
        expect(git.exec).toBeCalledWith(['show']);
    });

    it('should throw error if there are no commits in git output', async () => {
        const git = { exec: async () => '', getRepoDir: () => '', isTmpDir: () => false };
        await expect(show(git)).rejects.toThrow(
            'Output for `git show` does not contain commits, it should contain exact one'
        );
    });

    it('should throw error if there are more than one commit in git output', async () => {
        const git = { exec: async () => `commit 1${os.EOL}commit2`, getRepoDir: () => '', isTmpDir: () => false };
        await expect(show(git)).rejects.toThrow(
            'Output for `git show` contains more that one commit, it should contain only one'
        );
    });
});
