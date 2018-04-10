// @flow

import parseStatus, { type FileStatuses } from './parse-status';
import type { Git } from './git-factory';

export default async function status(git: Git): Promise<FileStatuses> {
    const args = ['status', '--porcelain'];
    const out = await git.exec(args);
    return parseStatus(out);
}
