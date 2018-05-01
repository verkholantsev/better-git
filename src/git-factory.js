// @flow

import spawn from 'spawndamnit';

import debug from 'debug';

import GitError from './git-error';
import getTmpDirPath from './get-tmp-dir-path';

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
    isTmpDir: () => boolean,
|};

/**
 * Creates instance that incapsulates interaction with git subprocess and stores data related to current git repo
 */
export default function gitFactory(repoOpts?: RepoOpts = {}): Git {
    let dir;
    let isTmpDir;

    if (repoOpts.dir) {
        dir = repoOpts.dir;
        isTmpDir = false;
    } else {
        dir = getTmpDirPath();
        isTmpDir = true;
    }

    async function exec(gitArgs: GitArgs, spawnArgs?: SpawnArgs = {}): Promise<string> {
        gitInputDebug('git', gitArgs);

        const out = await spawn('git', gitArgs, {
            cwd: spawnArgs.dir || dir,
            shell: true,
        });
        const stdout = out.stdout.toString('utf8');
        const stderr = out.stderr.toString('utf8');
        const { code } = out;

        gitOutputDebug({ stdout, stderr, code });

        if (code !== 0) {
            throw new GitError({
                code,
                stdout: stdout.toString('utf8').trim(),
                stderr: stderr.toString('utf8').trim(),
            });
        }

        return stdout.toString('utf8');
    }

    function getRepoDir(): string {
        return dir;
    }

    return { exec, getRepoDir, isTmpDir: () => isTmpDir };
}
