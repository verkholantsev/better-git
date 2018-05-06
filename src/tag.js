// @flow

import type { Git } from './git-factory';
import parseTag, { type Tags } from './parse-tag';

export default async function tag(git: Git): Promise<Tags> {
    return parseTag(await git.exec(['tag']));
}
