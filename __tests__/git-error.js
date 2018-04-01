// @flow

import GitError from '../src/git-error';

describe('GitError', () => {
    let error;

    beforeEach(() => {
        error = new GitError({ code: 1337, stdout: 'stdout', stderr: 'stderr' });
    });

    it('should contain message property', () => {
        expect(error).toHaveProperty('message');
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

    describe('with empty stderr', () => {
        let error;

        beforeEach(() => {
            error = new GitError({ code: 1337, stdout: 'stdout', stderr: '' });
        });

        it('should contain "<empty>" as stderr in error message', () => {
            expect(error).toHaveProperty('message', expect.stringContaining('stderr: <empty>'));
        });
    });

    describe('with empty stdout', () => {
        let error;

        beforeEach(() => {
            error = new GitError({ code: 1337, stdout: '', stderr: 'stderr' });
        });

        it('should contain "<empty>" as stdout in error message', () => {
            expect(error).toHaveProperty('message', expect.stringContaining('stdout: <empty>'));
        });
    });
});
