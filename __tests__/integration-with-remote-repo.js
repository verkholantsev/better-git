// @flow

import fs from 'fs';

import promisify from 'util.promisify';

import rimraf from 'rimraf';

// $FlowFixMe ignore this import
import betterGit from '../';
import getTmpDirPath from '../src/get-tmp-dir-path';

const mkdir = promisify(fs.mkdir);
const rmdir = promisify(rimraf);
const stat = promisify(fs.stat);

jest.setTimeout(10000);

describe('withRemoteRepo integration test', () => {
    const REPO_URL = 'https://github.com/verkholantsev/better-git.git';

    it('should work correctly', async () => {
        const git = betterGit();

        await git.withRemoteRepo(REPO_URL, async () => {
            const remotes = await git.getRemotes();
            expect(remotes).toEqual([{ name: 'origin', refs: { fetch: REPO_URL, push: REPO_URL } }]);
        });
    });

    it('should not throw error calling git.fetch()', async () => {
        const git = betterGit();

        await git.withRemoteRepo(REPO_URL, async () => {
            await git.fetch();
        });
    });

    describe("if repo's directory is specified in initialisation", () => {
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

        it("should not delete repo's directory in the end", async () => {
            await git.withRemoteRepo(REPO_URL, async () => {});

            expect(await stat(repoDir)).toEqual(expect.any(Object));
        });
    });
});
