// @flow

import partial from 'lodash/partial';

import add from './add';
import commit from './commit';
import getRemotes from './get-remotes';
import gitFactory from './git-factory';
import init from './init';
import log from './log';
import show from './show';

import type { Commit } from './parse-commits';
import type { Opts } from './map-opts';
import type { Remote } from './get-remotes';
import type { RepoOpts } from './git-factory';

type BetterGit = {|
    add: (opts?: Opts) => Promise<string>,
    commit: (opts?: Opts) => Promise<string>,
    getRemotes: () => Promise<Array<Remote>>,
    init: (opts?: Opts) => Promise<string>,
    log: (opts?: Opts) => Promise<Array<Commit>>,
    show: (opts?: Opts) => Promise<Commit>,
|};

export default function betterGit(repoOpts?: RepoOpts): BetterGit {
    const git = gitFactory(repoOpts);

    return {
        add: partial(add, git),
        commit: partial(commit, git),
        getRemotes: partial(getRemotes, git),
        init: partial(init, git),
        log: partial(log, git),
        show: partial(show, git),
    };
}
