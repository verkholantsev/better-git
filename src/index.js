import partial from 'lodash/partial';

import git from './git';
import _log from './git-log';
import _show from './git-show';

export const log = partial(_log, git);
export const show = partial(_show, git);
