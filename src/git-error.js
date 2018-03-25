export default class GitError extends Error {
    constructor(options) {
        super('Git error');
        this.code = options.code;
        this.stdout = options.stdout;
        this.stderr = options.stderr;
    }
}
