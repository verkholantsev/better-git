// @flow

import fs from 'fs';
import path from 'path';
import os from 'os';
import rimraf from 'rimraf';
import { promisify } from 'util';

const mkdir = promisify(fs.mkdir);
const rmdir = promisify(rimraf);
const writeFile = promisify(fs.writeFile);

import betterGit from '../';

describe('integration test', () => {
    let repoDir;
    let git;

    beforeAll(async () => {
        const tmpdir = os.tmpdir();
        repoDir = path.join(tmpdir, 'better-git-test-repo');
        mkdir(repoDir);
        git = betterGit({ cwd: repoDir });
    });

    afterAll(async () => {
        rmdir(repoDir);
    });

    describe('after git init', () => {
        beforeAll(async () => {
            await git.init();
        });

        it('git.getRemotes() should return empty array', async () => {
            expect(await git.getRemotes()).toHaveLength(0);
        });

        describe('after first commit', () => {
            beforeAll(async () => {
                const filename = path.join(repoDir, 'some-file');
                await writeFile(filename, 'Some content');
                await git.add({ all: true });
                await git.commit({ message: 'Commit', allowEmpty: true });
            });

            it('git.log() should return one commit', async () => {
                const commits = await git.log();
                expect(commits).toHaveLength(1);
            });

            it('git.log() should return one commit with `Commit` as a message', async () => {
                const [commit] = await git.log();
                expect(commit).toHaveProperty('message', 'Commit');
            });

            it('git.show() should return commit with `Commit` as a message', async () => {
                const commit = await git.show();
                expect(commit).toHaveProperty('message', 'Commit');
            });

            it('git.show() should return commit with diff containing `+Some content`', async () => {
                const commit = await git.show();
                expect(commit).toHaveProperty('diff', expect.stringContaining('+Some content'));
            });
        });
    });
});
