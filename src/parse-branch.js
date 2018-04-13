// @flow

/**
 * Parses output of `git branch` command
 */
export default function parseBranch(input: string): Array<string> {
    const lines = input.split('\n').filter(Boolean);

    return lines.map(line => line.replace(/^[*\s]\s/, ''));
}
