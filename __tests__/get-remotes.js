// @flow

import fs from 'fs';
import path from 'path';
import promisify from 'util.promisify';

import getRemotes from '../src/get-remotes';

const readFile = promisify(fs.readFile);

describe('git.getRemotes()', () => {
    let git;

    beforeEach(() => {
        const fixturePath = path.resolve(__dirname, '__fixtures__', 'git-remote-v');
        git = jest.fn(async () => await readFile(fixturePath, { encoding: 'utf8' }));
    });

    it('should produce correct output', async () => {
        expect(await getRemotes(git)).toMatchSnapshot();
    });

    it('should call git with correct args', async () => {
        await getRemotes(git);

        expect(git).toBeCalledWith(['remote', '-v']);
    });

    describe('should throw an error', () => {
        it('for unexpeced line in git output', async () => {
            const git = async () => 'bla';
            await expect(getRemotes(git)).rejects.toThrow('Unexpected line in remote output "bla"');
        });

        it('for duplicated line in git output', async () => {
            const git = async () =>
                'origin\tgit@github.com:yarnpkg/yarn.git (fetch)\norigin\tgit@github.com:yarnpkg/yarn.git (fetch)';

            await expect(getRemotes(git)).rejects.toThrow('Ref type "fetch" for remote "origin" already exists');
        });
    });
});
