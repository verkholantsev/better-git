// @flow

import fs from 'fs';
import path from 'path';
import promisify from 'util.promisify';

import show from '../src/show';

const readFile = promisify(fs.readFile);

describe('git.show()', () => {
    let git;

    beforeEach(() => {
        const fixturePath = path.resolve(__dirname, '__fixtures__', 'git-show');
        git = jest.fn(async () => await readFile(fixturePath, { encoding: 'utf8' }));
    });

    it('should produce correct output', async () => {
        expect(await show(git)).toMatchSnapshot();
    });

    it('should call git with correct args', async () => {
        await show(git);
        expect(git).toBeCalledWith(['show']);
    });
});
