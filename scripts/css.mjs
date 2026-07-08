import { spawnSync } from 'node:child_process';

const [command] = process.argv.slice(2);

if (command !== 'build') {
  console.error('Usage: pnpm css build');
  process.exit(1);
}

const tailwindBin = process.platform === 'win32' ? 'tailwindcss.cmd' : 'tailwindcss';
const result = spawnSync(tailwindBin, ['-i', './input.css', '-o', './dist/output.css'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 0);
