// @flow

import partial from 'lodash/partial';

import type { Commit } from './parse-commits';
import type { FileStatuses } from './parse-status';
import type { Opts } from './map-opts';
import type { Remotes } from './parse-remotes';
import add from './add';
import clone from './clone';
import commit from './commit';
import getRemotes from './get-remotes';
import gitFactory, { type GitArgs, type RepoOpts } from './git-factory';
import init from './init';
import log from './log';
import raw from './raw';
import show from './show';
import status from './status';
import withRemoteRepo, { type WithRemoteRepoFn } from './with-remote-repo';

type BetterGit = {|
    add: (opts?: Opts) => Promise<string>,
    clone: (url: string, dirname: string) => Promise<string>,
    commit: (opts?: Opts) => Promise<string>,
    getRemotes: () => Promise<Remotes>,
    init: (opts?: Opts) => Promise<string>,
    log: (opts?: Opts) => Promise<Array<Commit>>,
    raw: (args: GitArgs) => Promise<string>,
    show: (opts?: Opts) => Promise<Commit>,
    status: (opts?: Opts) => Promise<FileStatuses>,
    withRemoteRepo: <T>(url: string, fn: WithRemoteRepoFn<T>) => Promise<T>,
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
        withRemoteRepo: partial(withRemoteRepo, git),
    };
}
