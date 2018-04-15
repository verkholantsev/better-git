// @flow

import os from 'os';

type Opts = {
    code: number,
    stdout: string,
    stderr: string,
};

/**
 * Represents git error. Includes exit code, standard output and standard error.
 */
export default class GitError extends Error {
    code: number;

    stdout: string;

    stderr: string;

    constructor({ code, stdout, stderr }: Opts) {
        const stdoutOrEmpty = stdout || '<empty>';
        const stderrOrEmpty = stderr || '<empty>';

        super(`Git error (exit code ${code})${os.EOL}stderr: ${stderrOrEmpty}${os.EOL}stdout: ${stdoutOrEmpty}`);
        this.code = code;
        this.stdout = stdout;
        this.stderr = stderr;
    }
}
