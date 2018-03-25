import spawn from 'spawndamnit';
import GitError from './git-error';

export default async function git(args) {
    try {
        const { stdout } = await spawn('git', args);
        return stdout.toString('utf8');
    } catch (error) {
        if (error instanceof spawn.ChildProcessError) {
            const { code, stdout, stderr } = error;
            throw new GitError({
                code,
                stdout: stdout.toString('utf8').trim(),
                stderr: stderr.toString('utf8').trim(),
            });
        }
    }
}
