// @flow

import clone from '../src/clone';

describe('git.clone()', () => {
    let git;

    beforeEach(() => {
        git = { exec: jest.fn(async () => 'out'), getRepoDir: () => '/some/dirname', isTmpDir: () => false };
    });

    it('should call git with correct args', async () => {
        await clone(git, 'url');

        expect(git.exec).toBeCalledWith(['clone', 'url', 'dirname'], { dir: '/some' });
    });

    it('should return correct output', async () => {
        const out = await clone(git, 'url');

        expect(out).toBe('out');
    });
});
