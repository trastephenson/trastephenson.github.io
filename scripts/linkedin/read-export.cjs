const fs = require('fs');
const path = require('path');

const EXPORT_FILES = {
  profile: 'Profile.csv',
  positions: 'Positions.csv',
  skills: 'Skills.csv',
  projects: 'Projects.csv',
  certifications: 'Certifications.csv',
  recommendationsReceived: 'Recommendations Received.csv',
  richMedia: 'Rich Media.csv',
};

function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i += 1) {
    const char = csvText[i];
    const next = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
        continue;
      }
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(field);
      field = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') {
        i += 1;
      }
      row.push(field);
      field = '';

      if (row.some((value) => value.length > 0)) {
        rows.push(row);
      }

      row = [];
      continue;
    }

    field += char;
  }

  row.push(field);
  if (row.some((value) => value.length > 0)) {
    rows.push(row);
  }

  if (rows.length === 0) {
    return [];
  }

  const headers = rows[0].map((header) => header.trim());
  return rows.slice(1).map((values) =>
    headers.reduce((record, header, index) => {
      record[header] = values[index] === undefined ? '' : values[index].trim();
      return record;
    }, {})
  );
}

function listFilesRecursive(dirPath) {
  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      return listFilesRecursive(entryPath);
    }
    return entryPath;
  });
}

function findExportFile(exportDir, fileName) {
  const target = fileName.toLowerCase();
  return listFilesRecursive(exportDir).find((filePath) => path.basename(filePath).toLowerCase() === target);
}

function readLinkedInExport(exportDir) {
  if (!exportDir || !fs.existsSync(exportDir)) {
    throw new Error(`LinkedIn export directory not found: ${exportDir}`);
  }

  return Object.entries(EXPORT_FILES).reduce((records, [key, fileName]) => {
    const filePath = findExportFile(exportDir, fileName);
    records[key] = filePath ? parseCsv(fs.readFileSync(filePath, 'utf8')) : [];
    return records;
  }, {});
}

module.exports = {
  parseCsv,
  readLinkedInExport,
};
