// @flow

import os from 'os';

export type Branches = Array<Branch>;

type Branch = {|
    name: string,
    isCurrent: boolean,
|};

/**
 * Parses output of `git branch` command
 */
export default function parseBranches(input: string): Branches {
    const lines = input.split(os.EOL).filter(Boolean);

    return lines.map(line => {
        const isCurrent = line.startsWith('* ');
        const name = line.replace(/^[*\s]\s/, '');
        return { isCurrent, name };
    });
}
