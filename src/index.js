// @flow

import partial from 'lodash/partial';

import add from './add';
import clone from './clone';
import commit from './commit';
import getRemotes from './get-remotes';
import gitFactory from './git-factory';
import init from './init';
import log from './log';
import raw from './raw';
import show from './show';
import status from './status';

import type { Commit } from './parse-commits';
import type { Opts } from './map-opts';
import type { Remotes } from './parse-remotes';
import type { RepoOpts, GitArgs } from './git-factory';
import type { FileStatuses } from './parse-status';

type BetterGit = {|
    add: (opts?: Opts) => Promise<string>,
    clone: (url: string, dirname: string) => Promise<string>,
    commit: (opts?: Opts) => Promise<string>,
    getRemotes: () => Promise<Remotes>,
    init: (opts?: Opts) => Promise<string>,
    raw: (args: GitArgs) => Promise<string>,
    log: (opts?: Opts) => Promise<Array<Commit>>,
    show: (opts?: Opts) => Promise<Commit>,
    status: (opts?: Opts) => Promise<FileStatuses>,
|};

export default function betterGit(repoOpts?: RepoOpts): BetterGit {
    const git = gitFactory(repoOpts);

    return {
        add: partial(add, git),
        clone: partial(clone, git),
        commit: partial(commit, git),
        getRemotes: partial(getRemotes, git),
        init: partial(init, git),
        log: partial(log, git),
        raw: partial(raw, git),
        show: partial(show, git),
        status: partial(status, git),
    };
}
