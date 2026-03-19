const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const scripts = [
  {
    args: ['scripts/update-profile-headline.cjs', ...process.argv.slice(2)],
    label: 'update headline',
  },
  {
    args: ['scripts/sync-profile-content.cjs'],
    label: 'sync profile content',
  },
];

for (const step of scripts) {
  const result = spawnSync('node', step.args, {
    cwd: repoRoot,
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}
