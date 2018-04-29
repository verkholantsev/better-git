// @flow

import fs from 'fs';
import path from 'path';

import promisify from 'util.promisify';

import rimraf from 'rimraf';

// $FlowFixMe ignore this import
import betterGit from '../';
import getTmpDirPath from '../src/get-tmp-dir-path';

const mkdir = promisify(fs.mkdir);
const rmdir = promisify(rimraf);
const writeFile = promisify(fs.writeFile);

describe('integration test', () => {
    let repoDir;
    let git;

    beforeEach(async () => {
        repoDir = getTmpDirPath();
        await mkdir(repoDir);
        git = betterGit({ dir: repoDir });
    });

    afterEach(async () => {
        await rmdir(repoDir);
    });

    describe('after git init', () => {
        beforeEach(async () => {
            await git.init();
        });

        it('git.getRemotes() should return empty array', async () => {
            expect(await git.getRemotes()).toHaveLength(0);
        });

        describe('after trying to create empty commit without `--allow-empty` parameter', () => {
            it('should throw an error', async () => {
                await expect(git.commit({ message: 'New commit' })).rejects.toThrow(/nothing to commit/);
            });
        });

        describe('after creating a file', () => {
            beforeEach(async () => {
                const filename = path.join(repoDir, 'some-file');
                await writeFile(filename, 'Some content');
            });

            it('git.status() should return this file as `new`', async () => {
                const status = await git.status();

                expect(status).toHaveLength(1);

                expect(status[0]).toEqual(
                    expect.objectContaining({
                        isStaged: false,
                        name: 'some-file',
                        status: 'new',
                    })
                );
            });

            describe('after adding file to staging area', () => {
                beforeEach(async () => {
                    await git.add({ all: true });
                });

                it('git.status() should return this file as `added`', async () => {
                    const status = await git.status();

                    expect(status).toHaveLength(1);

                    expect(status[0]).toEqual(
                        expect.objectContaining({
                            isStaged: true,
                            name: 'some-file',
                            status: 'added',
                        })
                    );
                });

                describe('after first commit', () => {
                    beforeEach(async () => {
                        await git.commit({ message: 'Commit' });
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

                    describe('after checking out branch', () => {
                        beforeEach(async () => {
                            await git.checkoutBranch('new-branch');
                        });

                        it('git.branch() should return two branches', async () => {
                            expect(await git.branch()).toEqual([
                                { name: 'master', isCurrent: false },
                                { name: 'new-branch', isCurrent: true },
                            ]);
                        });
                    });
                });
            });
        });
    });
});
