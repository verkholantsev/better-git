// @flow

import type { FileStatuses } from './parse-status';
import type { Git } from './git-factory';

import parseStatus from './parse-status';

export default async function status(git: Git): Promise<FileStatuses> {
    const args = ['status', '--porcelain'];
    const out = await git.exec(args);
    return parseStatus(out);
}
