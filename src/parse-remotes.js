// @flow

const REMOTE_REGEX = /^(.+)\s(.+)\s\((.+)\)$/;

export type Remote = {
    name: string,
    refs: { ['fetch' | 'push']: string },
};

export type Remotes = Array<Remote>;

export default function parseRemotes(inputText: string): Remotes {
    const lines = inputText.split('\n').filter(Boolean);

    const remotesMap: Map<string, Remote> = new Map();

    for (const line of lines) {
        const groups = REMOTE_REGEX.exec(line);
        if (!groups) {
            throw new Error(`Unexpected line in remote output "${line}"`);
        }

        const [, name, ref, refType] = groups;
        const remote = remotesMap.get(name);
        if (!remote) {
            remotesMap.set(name, {
                name,
                refs: {
                    [refType]: ref,
                },
            });
        } else {
            if (remote.refs[refType]) {
                throw new Error(`Ref type "${refType}" for remote "${name}" already exists`);
            }

            remote.refs[refType] = ref;
        }
    }

    return [...remotesMap.values()];
}
