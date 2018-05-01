// @flow

import fetch from '../src/fetch';

describe('git.fetch()', () => {
    let git;

    beforeEach(() => {
        git = { exec: jest.fn(async () => 'out'), getRepoDir: () => '', isTmpDir: () => false };
    });

    it('should call git with correct args', async () => {
        await fetch(git, 'remote', { prune: true });

        expect(git.exec).toBeCalledWith(['fetch', '--prune', 'remote']);
    });

    it('should return correct output', async () => {
        const out = await fetch(git, 'remote');

        expect(out).toBe('out');
    });
});
