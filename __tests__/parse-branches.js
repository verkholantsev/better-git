// @flow

import os from 'os';

import parseBranches from '../src/parse-branches';

describe('parseBranches()', () => {
    it('should return correct array of branches', () => {
        expect(parseBranches(`* master${os.EOL}  one-more-branch`)).toEqual([
            { name: 'master', isCurrent: true },
            { name: 'one-more-branch', isCurrent: false },
        ]);
    });
});
