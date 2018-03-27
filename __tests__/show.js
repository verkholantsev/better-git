// @flow

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import show from '../src/show';

const readFile = promisify(fs.readFile);

describe('git.show()', () => {
    it('should work correctly', async () => {
        const fixturePath = path.resolve(__dirname, '__fixtures__', 'git-show');
        const git = async () => await readFile(fixturePath, { encoding: 'utf8' });

        expect(await show(git)).toMatchSnapshot();
    });
});
