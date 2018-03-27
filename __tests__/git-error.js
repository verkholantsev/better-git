// @flow

import GitError from '../src/git-error';

describe('GitError', () => {
    let error;

    beforeEach(() => {
        error = new GitError({ code: 1337, stdout: 'stdout', stderr: 'stderr' });
    });

    it('should contain message property', () => {
        expect(error.message).toMatchSnapshot();
    });

    it('should contain code property', () => {
        expect(error).toHaveProperty('code', 1337);
    });

    it('should contain stdout property', () => {
        expect(error).toHaveProperty('stdout', 'stdout');
    });

    it('should contain stderr property', () => {
        expect(error).toHaveProperty('stderr', 'stderr');
    });
});
