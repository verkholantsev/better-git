[![Build Status](https://travis-ci.org/verkholantsev/better-git.svg?branch=master)](https://travis-ci.org/verkholantsev/better-git)
[![Coverage Status](https://coveralls.io/repos/github/verkholantsev/better-git/badge.svg?branch=master)](https://coveralls.io/github/verkholantsev/better-git?branch=master)

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
const git = betterGit({ dir: '/absolute/path/to/git/repo' });
```

## API

### `git.add(opts: { [string]: mixed }): Promise<string>`

Adds files to staged area.

```js
await git.add({ all: true });
```

### `git.clone(url: string): Promise<string>`

Clones repo from `url` in `dir` (specified during initialisation).

```js
const git = betterGit({ dir: '/Users/user/tmp/better-git' });
await git.clone('git@github.com:verkholantsev/better-git.git');
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

Inits git repo in `dir` directory (specified during initialisation).

```js
const git = betterGit({ dir: '/Users/user/tmp' });
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

### `git.withRemoteRepo<T>(url: string, fn: () => Promise<T>): Promise<T>`

Clones repo to `dir` directory (will create temporary directory is `dir` is not specified), executes `fn` function and deletes `dir` after that.

```js
cosnt git = betterGit();
await git.withRemoteRepo('https://github.com/verkholantsev/better-git.git', async () => {
    await git.commit({ message: 'New empty commit', allowEmpty: true });
    await git.push('origin', 'master');
});
```

## Debug

Set environment variable `DEBUG=better-git:*` to enable debug output. This will make `better-git` log git commands it
spawns and log stdout/stderr of these commands.

Debug output example:

```
  better-git:input git [ 'init' ] +0ms
  better-git:output { stdout: 'Initialized empty Git repository in /private/var/folders/vx/f7cd9hkn3j75d9pgf6xlnjb80000gp/T/better-git-test-repo/.git/\n',
  better-git:output   stderr: '',
  better-git:output   code: 0 } +0ms
  better-git:input git [ 'remote', '-v' ] +24ms
  better-git:output { stdout: '', stderr: '', code: 0 } +10ms
  better-git:input git [ 'status', '--porcelain' ] +14ms
  better-git:output { stdout: '?? some-file\n', stderr: '', code: 0 } +16ms
```

## Similar packages

1.  `simple-git` https://github.com/steveukx/git-js
2.  `git` https://github.com/christkv/node-git

## Author

Aleksei Verkholantcev
