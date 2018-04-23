// @flow

import os from 'os';
import path from 'path';

/**
 * Returns path for temporary directory
 */
export default function getTmpDirPath(): string {
    const timestamp = new Date().getTime();
    const repoDirName = `better-git-${String(timestamp)}`;
    return path.join(os.tmpdir(), repoDirName);
}
