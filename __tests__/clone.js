// @flow

import clone from '../src/clone';

describe('git.clone()', () => {
    let git;

    beforeEach(() => {
        git = jest.fn(async () => 'out');
    });

    it('should call git with correct args', async () => {
        await clone(git, 'url', 'dirname');

        expect(git).toBeCalledWith(['clone', 'url', 'dirname']);
    });

    it('should return correct output', async () => {
        const out = await clone(git, 'url', 'dirname');

        expect(out).toBe('out');
    });
});
