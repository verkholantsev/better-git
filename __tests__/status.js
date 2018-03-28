// @flow

import fs from 'fs';
import path from 'path';
import promisify from 'util.promisify';

import status from '../src/status';

const readFile = promisify(fs.readFile);

describe('git.status()', () => {
    it('should work correctly', async () => {
        const fixturePath = path.resolve(__dirname, '__fixtures__', 'status-porcelain');
        const git = async () => await readFile(fixturePath, { encoding: 'utf8' });

        expect(await status(git)).toMatchSnapshot();
    });
});
