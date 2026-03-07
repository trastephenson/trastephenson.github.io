const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const envPath = path.join(repoRoot, '.env.local');
const outputPath = path.join(repoRoot, 'public', 'movies-config.js');

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  const values = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }

  return values;
}

const envValues = parseEnvFile(envPath);
const tmdbApiKey =
  process.env.REACT_APP_TMDB_API_KEY ||
  process.env.TMDB_API_KEY ||
  envValues.REACT_APP_TMDB_API_KEY ||
  envValues.TMDB_API_KEY ||
  '';

const payload = `window.__MOVIE_VAULT_CONFIG = ${JSON.stringify({
  tmdbApiKey,
})};\n`;

fs.writeFileSync(outputPath, payload, 'utf8');
