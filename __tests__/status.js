// @flow

import fs from 'fs';
import path from 'path';
import promisify from 'util.promisify';

import status from '../src/status';

const readFile = promisify(fs.readFile);

describe('git.status()', () => {
    let git;

    beforeEach(() => {
        const fixturePath = path.resolve(__dirname, '__fixtures__', 'status-porcelain');
        git = jest.fn(async () => await readFile(fixturePath, { encoding: 'utf8' }));
    });

    it('should return correct output', async () => {
        expect(await status(git)).toMatchSnapshot();
    });

    it('should call git with correct args', async () => {
        await status(git);

        expect(git).toBeCalledWith(['status', '--porcelain']);
    });
});
