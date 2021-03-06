// @flow

import type { Git } from './git-factory';
import parseStatus, { type FileStatuses } from './parse-status';

export default async function status(git: Git): Promise<FileStatuses> {
    const args = ['status', '--porcelain'];
    const out = await git.exec(args);
    return parseStatus(out);
}
