# `better-git`

`better-git` is a Node.js API for `git`.

## Usage

### `git.log`

```js
const commits = await git.log({ maxCount: 10 });
```

### `git.show`

```js
const commit = await git.show();
```

### `git.getRemotes`

```js
const remotes = await git.getRemotes();
```
