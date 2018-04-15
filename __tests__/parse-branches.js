// @flow

import parseBranches from '../src/parse-branches';

describe('parseBranches()', () => {
    it('should return correct array of branches', () => {
        expect(parseBranches('* master\n  one-more-branch')).toEqual(['master', 'one-more-branch']);
    });
});
