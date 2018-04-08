// @flow

import GitError from './git-error';
import debug from 'debug';
import os from 'os';
import path from 'path';
import spawn from 'spawndamnit';

const gitInputDebug = debug('better-git:input');
const gitOutputDebug = debug('better-git:output');

export type RepoOpts = {
    dir?: string,
};

export type GitArgs = Array<string>;

type SpawnArgs = {
    dir?: string,
};

export type Git = {|
    exec: (gitArgs: GitArgs, spawnArgs?: SpawnArgs) => Promise<string>,
    getRepoDir: () => string,
|};

function getTmpDir(): string {
    const timestamp = new Date().getTime();
    const repoDirName = `better-git-${String(timestamp)}`;
    return path.join(os.tmpdir(), repoDirName);
}

export default function gitFactory(repoOpts?: RepoOpts = {}) {
    const { dir = getTmpDir() } = repoOpts;

    async function exec(gitArgs: GitArgs, spawnArgs?: SpawnArgs = {}): Promise<string> {
        try {
            gitInputDebug('git', gitArgs);

            const out = await spawn('git', gitArgs, {
                cwd: spawnArgs.dir || dir,
                shell: true,
            });
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
    }

    function getRepoDir(): string {
        return dir;
    }

    return { exec, getRepoDir };
}
