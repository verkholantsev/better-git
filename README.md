[![Build Status](https://img.shields.io/travis/verkholantsev/better-git.svg)](https://travis-ci.org/verkholantsev/better-git)
[![Coverage report](https://img.shields.io/coveralls/github/verkholantsev/better-git.svg)](https://coveralls.io/github/verkholantsev/better-git)

# `better-git`

`better-git` is a Node.js API for `git`.

## Usage

### Import and initialisation

```js
// ES6 modules
import betterGit from 'better-git';

// CommonJS
const betterGit = require('better-git');

// Create `git` object
const git = betterGit({ cwd: '/absolute/path/to/git/repo' });
```

### `git.add`

Adds files to staged area.

```js
await git.add({ all: true });
```

### `git.commit`

Creates commit with specified message.

```js
await git.commit({ message: 'Create new commit' });
```

### `git.getRemotes`

Returns array of remote repos.

```js
const remotes = await git.getRemotes();
```

### `git.init`

Inits git repo in cwd directory (specified during initialisation).

```js
await git.init();
```

### `git.log`

Returns array of commits.

```js
const commits = await git.log({ maxCount: 10 });
```

### `git.show`

Returns detailed commit information.

```js
const commit = await git.show();
```

### `git.status`

Returns array of changed files in current repo.

```js
const status = await git.status();
```
