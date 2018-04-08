// @flow

import GitError from './git-error';
import debug from 'debug';
import spawn from 'spawndamnit';

const gitInputDebug = debug('better-git:input');
const gitOutputDebug = debug('better-git:output');

export type RepoOpts = {
    cwd?: string,
};

export type GitArgs = Array<string>;

export type Git = (args: GitArgs) => Promise<string>;

export default function gitFactory(repoOpts?: RepoOpts = {}) {
    const { cwd = process.cwd() } = repoOpts;

    return async function git(args: GitArgs): Promise<string> {
        try {
            gitInputDebug('git', args);

            const out = await spawn('git', args, { cwd, shell: true });
            const stdout = out.stdout.toString('utf8');
            const stderr = out.stderr.toString('utf8');
            const { code } = out;

            gitOutputDebug({ stdout, stderr, code });

            return stdout.toString('utf8');
        } catch (error) {
            if (error instanceof spawn.ChildProcessError) {
                const { code, stdout, stderr } = error;
                throw new GitError({
                    code,
                    stdout: stdout.toString('utf8').trim(),
                    stderr: stderr.toString('utf8').trim(),
                });
            }

            throw error;
        }
    };
}
