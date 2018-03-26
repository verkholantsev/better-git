// @flow

type Opts = {
    code: number,
    stdout: string,
    stderr: string,
};

export default class GitError extends Error {
    code: number;

    stdout: string;

    stderr: string;

    constructor({ code, stdout, stderr }: Opts) {
        super(`Git error (exit code ${code})\nstderr: ${stderr || '<empty>'}\nstdout: ${stdout || '<empty>'}`);
        this.code = code;
        this.stdout = stdout;
        this.stderr = stderr;
    }
}
