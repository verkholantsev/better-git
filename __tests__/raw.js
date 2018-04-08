// @flow

import raw from '../src/raw';

describe('git.raw()', () => {
    let git;

    beforeEach(() => {
        git = { exec: jest.fn(async () => 'out'), getRepoDir: () => '' };
    });

    it('should call git with correct args', async () => {
        await raw(git, ['--some', '--raw', '--args']);

        expect(git.exec).toBeCalledWith(['--some', '--raw', '--args']);
    });

    it('should return correct output', async () => {
        const out = await raw(git, []);

        expect(out).toBe('out');
    });
});
