import { spawnSync } from 'node:child_process';

const packageManager = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

function run(command, args) {
    const result = spawnSync(command, args, { stdio: 'inherit' });

    if (result.error) {
        console.error(result.error.message);
        process.exit(1);
    }

    if (result.status !== 0) {
        process.exit(result.status ?? 1);
    }
}

function assertGeneratedOutputIsCurrent(path) {
    const result = spawnSync('git', ['diff', '--quiet', 'HEAD', '--', path], {
        stdio: 'ignore',
    });

    if (result.status === 0) return;

    if (result.status === 1) {
        console.error(`Generated output is stale: ${path}`);
        console.error(`Run the relevant build command and commit ${path} before pushing.`);
    } else if (result.error) {
        console.error(result.error.message);
    } else {
        console.error(`Could not verify generated output: ${path}`);
    }

    process.exit(1);
}

run(packageManager, ['lint']);

run(packageManager, ['css', 'build']);
assertGeneratedOutputIsCurrent('dist/output.css');

run(packageManager, ['contact:build']);
assertGeneratedOutputIsCurrent('contact/');

console.log('All pre-push checks passed.');
