// @flow

// $FlowFixMe ignore next import
import betterGit from '../';

jest.setTimeout(10000);

describe('withRemoteRepo integration test', () => {
    it('should work correctly', async () => {
        const REPO_URL = 'https://github.com/verkholantsev/better-git.git';
        const git = betterGit();

        await git.withRemoteRepo(REPO_URL, async () => {
            const remotes = await git.getRemotes();
            expect(remotes).toEqual([{ name: 'origin', refs: { fetch: REPO_URL, push: REPO_URL } }]);
        });
    });
});
