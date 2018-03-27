// @flow

import commit from '../src/commit';

describe('git.commit()', () => {
    let git;

    beforeEach(() => {
        git = jest.fn(async () => 'out');
    });

    it('should call git with correct args', async () => {
        await commit(git, { allowEmpty: true });

        expect(git).toBeCalledWith(['commit', '--allow-empty']);
    });

    it('should return correct output', async () => {
        const out = await commit(git);

        expect(out).toBe('out');
    });
});
