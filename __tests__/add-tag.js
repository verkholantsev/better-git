// @flow

import addTag from '../src/add-tag';

describe('git.addTag()', () => {
    let git;

    beforeEach(() => {
        git = { exec: jest.fn(async () => 'out'), getRepoDir: () => '', isTmpDir: () => false };
    });

    it('should call git with correct args', async () => {
        await addTag(git, 'v1.0.0', 'Version 1.0.0');

        expect(git.exec).toBeCalledWith(['tag', "--annotate 'v1.0.0' --message 'Version 1.0.0'"]);
    });

    it('should return correct output', async () => {
        const out = await addTag(git, 'v1.0.0', 'Version 1.0.0');

        expect(out).toBe('out');
    });
});
