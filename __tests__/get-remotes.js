// @flow

import fs from 'fs';
import os from 'os';
import path from 'path';

import promisify from 'util.promisify';

import getRemotes from '../src/get-remotes';

const readFile = promisify(fs.readFile);

describe('git.getRemotes()', () => {
    let git;

    beforeEach(() => {
        const fixturePath = path.resolve(__dirname, '__fixtures__', 'git-remote-v');
        git = {
            exec: jest.fn(async () => await readFile(fixturePath, { encoding: 'utf8' })),
            getRepoDir: () => '',
        };
    });

    it('should produce correct output', async () => {
        expect(await getRemotes(git)).toMatchSnapshot();
    });

    it('should call git with correct args', async () => {
        await getRemotes(git);

        expect(git.exec).toBeCalledWith(['remote', '-v']);
    });

    describe('should throw an error', () => {
        it('for unexpeced line in git output', async () => {
            const git = { exec: async () => 'bla', getRepoDir: () => '' };
            await expect(getRemotes(git)).rejects.toThrow('Unexpected line in remote output "bla"');
        });

        it('for duplicated line in git output', async () => {
            const git = {
                exec: async () =>
                    `origin\tgit@github.com:yarnpkg/yarn.git (fetch)${
                        os.EOL
                    }origin\tgit@github.com:yarnpkg/yarn.git (fetch)`,
                getRepoDir: () => '',
            };

            await expect(getRemotes(git)).rejects.toThrow('Ref type "fetch" for remote "origin" already exists');
        });
    });
});
