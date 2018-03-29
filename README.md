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

const git = better({ cwd: '/absolute/path/to/git/repo' });
```

### `git.add`

```js
await git.add({ all: true });
```

### `git.commit`

```js
await git.commit({ message: 'Create new commit' });
```

### `git.getRemotes`

```js
const remotes = await git.getRemotes();
```

### `git.init`

```js
await git.init();
```

### `git.log`

```js
const commits = await git.log({ maxCount: 10 });
```

### `git.show`

```js
const commit = await git.show();
```

### `git.status`

```js
const status = await git.status();
```
