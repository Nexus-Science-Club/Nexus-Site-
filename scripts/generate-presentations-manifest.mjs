import { promises as fs } from 'node:fs';
import path from 'node:path';

const workspaceRoot = process.cwd();
const presentationsDir = path.join(workspaceRoot, 'presentations');
const outputFile = path.join(workspaceRoot, 'src', 'data', 'presentationsManifest.ts');
const rawBase =
  process.env.PRESENTATIONS_RAW_BASE ??
  'https://raw.githubusercontent.com/Nexus-Science-Club/Nexus-Site-/main/presentations';

const toPosix = (value) => value.split(path.sep).join('/');

const formatTitle = (fileName) =>
  fileName
    .replace(/\.pdf$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const walk = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (entry.isFile() && /\.pdf$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
};

const main = async () => {
  try {
    await fs.access(presentationsDir);
  } catch {
    const emptyOutput =
      'export type PresentationManifestItem = { id: string; subject: string; title: string; href: string; };' +
      '\n' +
      'export const presentationsManifest: PresentationManifestItem[] = [];' +
      '\n';
    await fs.writeFile(outputFile, emptyOutput, 'utf8');
    console.log('No presentations directory found. Wrote empty manifest.');
    return;
  }

  const pdfFiles = await walk(presentationsDir);
  const items = pdfFiles
    .map((absolutePath) => {
      const relativePath = toPosix(path.relative(presentationsDir, absolutePath));
      const [subject = 'general'] = relativePath.split('/');
      const fileName = path.basename(relativePath);
      const encodedRelativePath = relativePath.split('/').map(encodeURIComponent).join('/');

      return {
        id: relativePath,
        subject,
        title: formatTitle(fileName),
        href: `${rawBase}/${encodedRelativePath}`,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, 'ro', { sensitivity: 'base' }));

  const output =
    'export type PresentationManifestItem = { id: string; subject: string; title: string; href: string; };' +
    '\n' +
    `export const presentationsManifest: PresentationManifestItem[] = ${JSON.stringify(items, null, 2)};` +
    '\n';

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, output, 'utf8');
  console.log(`Generated presentations manifest with ${items.length} file(s).`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
