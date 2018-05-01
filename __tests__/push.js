// @flow

import push from '../src/push';

describe('git.push()', () => {
    let git;

    beforeEach(() => {
        git = { exec: jest.fn(async () => 'out'), getRepoDir: () => '', isTmpDir: () => false };
    });

    it('should call git with correct args', async () => {
        await push(git, 'origin', 'master', { force: true });

        expect(git.exec).toBeCalledWith(['push', '--force', 'origin', 'master']);
    });

    it('should return correct output', async () => {
        const out = await push(git, 'origin', 'master');

        expect(out).toBe('out');
    });
});
