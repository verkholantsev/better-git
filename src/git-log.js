import parseCommits from './parse-commits';
import mapOpts from './map-opts';

export default async function log(git, opts = {}) {
    const args = ['log', ...mapOpts(opts)];
    const out = await git(args);
    return parseCommits(out);
}
