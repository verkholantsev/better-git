// @flow

import add from '../src/add';

describe('git.add()', () => {
    let git;

    beforeEach(() => {
        git = { exec: jest.fn(async () => 'out'), getRepoDir: () => '' };
    });

    it('should call git with correct args', async () => {
        await add(git, { all: true });

        expect(git.exec).toBeCalledWith(['add', '--all']);
    });

    it('should return correct output', async () => {
        const out = await add(git);

        expect(out).toBe('out');
    });
});
