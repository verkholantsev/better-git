// @flow

import fs from 'fs';
import path from 'path';
import promisify from 'util.promisify';

import getRemotes from '../src/get-remotes';

const readFile = promisify(fs.readFile);

describe('git.getRemotes()', () => {
    it('should work correctly', async () => {
        const fixturePath = path.resolve(__dirname, '__fixtures__', 'git-remote-v');
        const git = async () => await readFile(fixturePath, { encoding: 'utf8' });

        expect(await getRemotes(git)).toMatchSnapshot();
    });
});
