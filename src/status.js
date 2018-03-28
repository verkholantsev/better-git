// @flow

import mapOpts from './map-opts';

import type { Git } from './git-factory';
import type { Opts } from './map-opts';

type Status = 'renamed' | 'deleted' | 'modified' | 'new' | 'added';

export type FileStatus = {
    destination?: string,
    isStaged: boolean,
    name?: string,
    source?: string,
    status: Status,
};

export default async function status(git: Git, opts: Opts = {}): Promise<Array<FileStatus>> {
    const args = ['status', '--porcelain', ...mapOpts(opts)];
    const out = await git(args);
    return parseStatus(out);
}

const RENAMED_REGEX = /^R\s(.+)\s->\s(.+)$/;
const STATUS_REGEX = /^\s*[A-Z?]+\s+/;

function parseStatus(inputText: string): Array<FileStatus> {
    const lines = inputText.split('\n').filter(Boolean);

    return lines.map(line => {
        if (line.startsWith('R ')) {
            const groups = RENAMED_REGEX.exec(line);

            if (!groups) {
                throw new Error(`Unexpected line in 'git status --porcelain' output '${line}`);
            }

            const [, source, destination] = groups;
            return { source, destination, status: 'renamed', isStaged: true };
        } else if (line.startsWith(' D') || line.startsWith('D ')) {
            const isStaged = line.startsWith('D ');
            const name = line.replace(STATUS_REGEX, '');
            return { name, status: 'deleted', isStaged };
        } else if (line.startsWith(' M') || line.startsWith('M ')) {
            const isStaged = line.startsWith('M ');
            const name = line.replace(STATUS_REGEX, '');
            return { name, status: 'modified', isStaged };
        } else if (line.startsWith('A ')) {
            const name = line.replace(STATUS_REGEX, '');
            return { name, status: 'added', isStaged: true };
        } else if (line.startsWith('??')) {
            const name = line.replace(STATUS_REGEX, '');
            return { name, status: 'new', isStaged: false };
        }

        throw new Error(`Unexpected line in 'git status --porcelain' output '${line}'`);
    });
}
