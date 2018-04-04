[![Build Status](https://img.shields.io/travis/verkholantsev/better-git.svg)](https://travis-ci.org/verkholantsev/better-git)
[![Coverage report](https://img.shields.io/coveralls/github/verkholantsev/better-git.svg)](https://coveralls.io/github/verkholantsev/better-git)

# 🌱 `better-git`

`better-git` is a Node.js API for `git` that:

1.  Has Promise interface (works with async/await)
2.  Has [Flow](https://flow.org/) typings
3.  Will parse `git` output for you

## Installation

```sh
# using npm
npm install better-git --save

# using yarn
yarn add better-git
```

## Import and initialisation

```js
// ES6 modules
import betterGit from 'better-git';

// CommonJS
const betterGit = require('better-git');

// Create `git` object
const git = betterGit({ cwd: '/absolute/path/to/git/repo' });
```

## API

### `git.add(opts: { [string]: mixed }): Promise<string>`

Adds files to staged area.

```js
await git.add({ all: true });
```

### `git.clone(url: string, dirname: string): Promise<string>`

Clones repo from `url` in `cwd` using `dirname` as a directory name for repo.

```js
const git = betterGit({ cwd: '/Users/user/tmp' });
await git.clone('git@github.com:verkholantsev/better-git.git', 'better-git');
```

### `git.commit(opts: { [string]: mixed }): Promise<string>`

Creates commit with specified message.

```js
await git.commit({ message: 'Create new commit' });
```

### `git.getRemotes(): Promise<Remotes>`

Returns array of [remote repos](https://github.com/verkholantsev/better-git/blob/master/src/parse-remotes.js#L5).

```js
const remotes = await git.getRemotes();
```

### `git.init(): Promise<string>`

Inits git repo in cwd directory (specified during initialisation).

```js
await git.init();
```

### `git.log(opts: { [string]: mixed }): Promise<Array<Commit>>`

Returns array of [commits](https://github.com/verkholantsev/better-git/blob/master/src/parse-commits.js#L9).

```js
const commits = await git.log({ maxCount: 10 });
```

### `git.raw(args: Array<string>): Promise<string>`

Executes raw git command and returns unparsed output.

```js
const output = await git.raw(['--help']);
```

### `git.show(opts: { [string]: mixed }): Promise<Commit>`

Returns detailed [commit](https://github.com/verkholantsev/better-git/blob/master/src/parse-commits.js#L9) information.

```js
const commit = await git.show();
```

### `git.status(): Promise<FileStatuses>`

Returns array of [changed files](https://github.com/verkholantsev/better-git/blob/master/src/parse-status.js#L16) in
current repo.

```js
const status = await git.status();
```

## Similar packages

1.  `simple-git` https://github.com/steveukx/git-js
2.  `git` https://github.com/christkv/node-git

## Author

Aleksei Verkholantcev
