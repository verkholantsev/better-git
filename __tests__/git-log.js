import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import log from '../src/git-log';

const readFile = promisify(fs.readFile);

describe('git-log', () => {
    it('should work correctly', async () => {
        const fixturePath = path.resolve(__dirname, '__fixtures__', 'git-log');
        const git = async () => await readFile(fixturePath, { encoding: 'utf8' });

        expect(await log(git)).toMatchSnapshot();
    });
});
