import { spawnSync } from 'node:child_process';

const gitCheck = spawnSync('git', ['rev-parse', '--git-dir'], { stdio: 'ignore' });

if (gitCheck.status !== 0) {
    process.exit(0);
}

const result = spawnSync('git', ['config', 'core.hooksPath', '.githooks'], {
    stdio: 'inherit',
});

if (result.error) {
    console.error(result.error.message);
    process.exit(1);
}

process.exit(result.status ?? 0);
