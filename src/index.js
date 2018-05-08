// @flow

import partial from 'lodash/partial';

import type { Branches } from './parse-branches';
import type { Commit, Commits } from './parse-commits';
import type { FileStatuses } from './parse-status';
import type { Opts } from './map-opts';
import type { Remotes } from './parse-remotes';
import type { Tags } from './parse-tag';
import add from './add';
import addTag from './add-tag';
import branch from './branch';
import checkoutBranch from './checkout-branch';
import clone from './clone';
import commit from './commit';
import fetch from './fetch';
import getRemotes from './get-remotes';
import gitFactory, { type GitArgs, type RepoOpts } from './git-factory';
import init from './init';
import log from './log';
import pull from './pull';
import push from './push';
import raw from './raw';
import show from './show';
import status from './status';
import tag from './tag';
import withRemoteRepo, { type WithRemoteRepoFn } from './with-remote-repo';

type BetterGit = {|
    add: (opts?: Opts) => Promise<string>,
    addTag: (version: string, message: string) => Promise<string>,
    branch: (opts?: Opts) => Promise<Branches>,
    checkoutBranch: (branchName: string) => Promise<string>,
    clone: (url: string, dirname: string) => Promise<string>,
    commit: (opts?: Opts) => Promise<string>,
    fetch: (remote?: string, opts?: Opts) => Promise<string>,
    getRemotes: () => Promise<Remotes>,
    init: (opts?: Opts) => Promise<string>,
    log: (opts?: Opts) => Promise<Commits>,
    pull: (remote: string, branch: string, opts?: Opts) => Promise<string>,
    push: (remote?: string, branch?: string, opts?: Opts) => Promise<string>,
    raw: (args: GitArgs) => Promise<string>,
    show: (opts?: Opts) => Promise<Commit>,
    status: (opts?: Opts) => Promise<FileStatuses>,
    tag: () => Promise<Tags>,
    withRemoteRepo: <T>(url: string, fn: WithRemoteRepoFn<T>) => Promise<T>,
|};

export default function betterGit(repoOpts?: RepoOpts): BetterGit {
    const git = gitFactory(repoOpts);

    return {
        add: partial(add, git),
        addTag: partial(addTag, git),
        branch: partial(branch, git),
        checkoutBranch: partial(checkoutBranch, git),
        clone: partial(clone, git),
        commit: partial(commit, git),
        fetch: partial(fetch, git),
        getRemotes: partial(getRemotes, git),
        init: partial(init, git),
        log: partial(log, git),
        pull: partial(pull, git),
        push: partial(push, git),
        raw: partial(raw, git),
        show: partial(show, git),
        status: partial(status, git),
        tag: partial(tag, git),
        withRemoteRepo: partial(withRemoteRepo, git),
    };
}
