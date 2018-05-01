// @flow

import fs from 'fs';
import log from '../src/log';
import path from 'path';
import promisify from 'util.promisify';

const readFile = promisify(fs.readFile);

describe('git.log()', () => {
    let git;

    beforeEach(() => {
        const fixturePath = path.resolve(__dirname, '__fixtures__', 'git-log');
        git = {
            exec: jest.fn(async () => await readFile(fixturePath, { encoding: 'utf8' })),
            getRepoDir: () => '',
            isTmpDir: () => false,
        };
    });

    it('should produce correct output', async () => {
        expect(await log(git)).toMatchSnapshot();
    });

    it('should call git with correct args', async () => {
        await log(git, { maxCount: 100 });

        expect(git.exec).toBeCalledWith(['log', '--max-count=100']);
    });

    it('should throw error if being called with unsupported opts', async () => {
        await expect(log(git, { bla: true })).rejects.toThrow(/Unsupported opts \[bla\] in git command 'log'/);
    });
});
