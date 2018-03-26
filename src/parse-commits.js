// @flow

const ParseState = {
    HEADER: 0,
    MESSAGE: 1,
    DIFF: 2,
};

export type Commit = {
    author?: string,
    commit?: string,
    date?: string,
    diff?: string,
    merge?: Array<string>,
    message?: string,
};

export default function parseCommits(inputText: string): Array<Commit> {
    const lines = inputText.split('\n');

    const commits = [];
    let state = ParseState.HEADER;
    let commitMessageBuffer = [];
    let diffBuffer = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith('commit')) {
            if (commitMessageBuffer.length > 0) {
                assignToLastCommit(commits, { message: commitMessageBuffer.join('\n') });
            }
            if (diffBuffer.length > 0) {
                assignToLastCommit(commits, { diff: diffBuffer.join('\n') });
            }

            const commit = line.replace(/^commit\s*/, '');
            commits.push({ commit });
            commitMessageBuffer = [];
            state = ParseState.HEADER;
        } else if (line.startsWith('Merge:')) {
            const merge = line.replace(/^Merge:\s*/, '').split(/\s+/);
            assignToLastCommit(commits, { merge });
        } else if (line.startsWith('Author:')) {
            const author = line.replace(/^Author:\s*/, '');
            assignToLastCommit(commits, { author });
        } else if (line.startsWith('Date:')) {
            const date = line.replace(/^Date:\s*/, '');
            assignToLastCommit(commits, { date });
        } else if (line === '') {
            state = getNextParseStateOnEmptyLine(state);
        } else if (line.startsWith('    ')) {
            commitMessageBuffer.push(line.replace(/^\s\s\s\s/, ''));
        } else if (line.startsWith('diff') || state === ParseState.DIFF) {
            state = ParseState.DIFF;
            diffBuffer.push(line);
        } else {
            throw new Error(`Unexpected line: ${line}`);
        }
    }

    if (commitMessageBuffer.length > 0) {
        assignToLastCommit(commits, { message: commitMessageBuffer.join('\n') });
    }
    if (diffBuffer.length > 0) {
        assignToLastCommit(commits, { diff: diffBuffer.join('\n') });
    }

    return commits;
}

function getNextParseStateOnEmptyLine(state) {
    if (state === ParseState.HEADER) {
        return ParseState.MESSAGE;
    } else if (state === ParseState.MESSAGE) {
        return ParseState.MESSAGE;
    } else if (state === ParseState.DIFF) {
        return ParseState.DIFF;
    } else {
        throw new Error(`State ${state} does not have transitions`);
    }
}

function assignToLastCommit(commits, props) {
    if (commits.length === 0) {
        throw new Error('Can not assign to last commit because commit list is empty');
    }

    const lastCommit = commits[commits.length - 1];
    Object.assign(lastCommit, props);
}
