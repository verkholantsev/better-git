// @flow

const RENAMED_REGEX = /^R\s(.+)\s->\s(.+)$/;
const STATUS_REGEX = /^\s*[A-Z?]+\s+/;

type Status = 'renamed' | 'deleted' | 'modified' | 'new' | 'added';

type FileStatus = {
    destination?: string,
    isStaged: boolean,
    name?: string,
    source?: string,
    status: Status,
};

export type FileStatuses = Array<FileStatus>;

export default function parseStatus(inputText: string): Array<FileStatus> {
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
