import parseCommits from './parse-commits';
import mapOpts from './map-opts';

export default async function show(git, opts = {}) {
    const args = ['show', ...mapOpts(opts)];
    const out = await git(args);
    const commits = parseCommits(out);

    if (commits.length > 1) {
        throw new Error('Output for `git show` contains more that one commit, it should contain only one');
    } else if (commits === 0) {
        throw new Error('Output for `git show` does not contain commits, it should contain exact one');
    }

    return commits[0];
}
