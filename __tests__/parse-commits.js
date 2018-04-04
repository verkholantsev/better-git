// @flow

import parseCommits from '../src/parse-commits';

describe('parseCommits()', () => {
    describe('should throw an error', () => {
        it('if there is unexpected line in input', () => {
            const input = 'bla';
            expect(() => parseCommits(input)).toThrow('Unexpected line: bla');
        });

        it('if there is unexpected line in `diff ...` line', () => {
            const input = 'diff bla';
            expect(() => parseCommits(input)).toThrow("Unexpected line 'diff bla' in parseChangedFile()");
        });

        it('if input does not contain initial `commit ...` line', () => {
            const input = 'Merge: abcd efgh';
            expect(() => parseCommits(input)).toThrow('Can not assign to last commit because commit list is empty');
        });
    });

    describe('should return correct output', () => {
        it('if input contains several commits', () => {
            const input = `commit a
diff --git a/one-file b/second-file
bla-bla

commit b
diff --git a/third-file b/fourth-file
bla-bla`;

            expect(parseCommits(input)).toMatchSnapshot();
        });
    });
});
