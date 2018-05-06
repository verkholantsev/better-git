// @flow

import os from 'os';

type Tag = {|
    name: string,
|};

export type Tags = Array<Tag>;

export default function parseTag(input: string): Tags {
    return input
        .split(os.EOL)
        .filter(Boolean)
        .map(line => ({
            name: line.trim(),
        }));
}
