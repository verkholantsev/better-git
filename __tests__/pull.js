// @flow

import pull from '../src/pull';

describe('git.pull()', () => {
    let git;

    beforeEach(() => {
        git = { exec: jest.fn(async () => 'out'), getRepoDir: () => '' };
    });

    it('should call git with correct args', async () => {
        await pull(git, 'remote', 'branch', { rebase: true });

        expect(git.exec).toBeCalledWith(['pull', '--rebase', 'remote', 'branch']);
    });

    it('should return correct output', async () => {
        const out = await pull(git, 'remote', 'branch');

        expect(out).toBe('out');
    });
});
