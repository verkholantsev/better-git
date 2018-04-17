import type { Git } from './git-factory';
import type { Opts } from './map-opts';
import checkSupportedOpts from './check-supported-opts';

type ParseOutputFn<T> = <T>(input: string) => T;
type ProvideArgsFn = (opts: Opts) => Array<string>;

type CreateGitCommandOpts<T> = {|
    name: string,
    parseOutput: ParseOutputFn<T>,
    provideArgs: ProvideArgsFn,
    supportedOpts?: Array<string>,
|};

type GitCommand<T> = (git: Git, opts: Opts) => Promise<T>;

export default function createGitCommand<T>(opts: CreateGitCommandOpts<T>) {
    const { supportedOpts = [], provideArgs, name, parseOutput } = opts;

    const gitCommand: GitCommand<T> = async function gitCommand(git, opts) {
        checkSupportedOpts(name, opts, supportedOpts);
        const args = provideArgs(opts);
        const output = await git.exec(args);
        return parseOutput(output);
    };

    return gitCommand;
}

const command: GitCommand<string> = createGitCommand({
    name: 'test',
    parseOutput: x => x,
    provideArgs: () => [],
});
