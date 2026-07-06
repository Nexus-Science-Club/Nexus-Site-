#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║          NEXUS — Add Presentation Tool                       ║
 * ║                                                              ║
 * ║  Drop a PDF here or provide a path, pick the subject,       ║
 * ║  and the manifest is regenerated automatically.             ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Usage:
 *   npm run add-presentation
 *   npm run add-presentation -- "path/to/My Presentation.pdf"
 *   npm run add-presentation -- "path/to/file.pdf" --subject chemistry
 */

import { promises as fs, existsSync } from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { execSync } from 'node:child_process';

/* ─── Config ──────────────────────────────────────────────────── */

const ROOT = path.resolve(process.cwd());
const PRESENTATIONS_DIR = path.join(ROOT, 'presentations');
const DROP_ZONE = path.join(ROOT, 'presentations', '_drop');

const SUBJECTS = ['microscopy', 'chemistry', 'dissections', 'physics'];
const SUBJECT_LABELS = {
  microscopy: 'Microscopy (Microscopie)',
  chemistry:  'Chemistry (Chimie)',
  dissections:'Dissections (Disecții)',
  physics:    'Physics (Fizică)',
};

/* ─── Colours ─────────────────────────────────────────────────── */

const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  purple: '\x1b[35m',
  cyan:   '\x1b[36m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  red:    '\x1b[31m',
  white:  '\x1b[37m',
};

const p  = (...args) => console.log(...args);
const ok = (msg) => p(`${c.green}  ✓  ${c.reset}${msg}`);
const info = (msg) => p(`${c.cyan}  →  ${c.reset}${msg}`);
const warn = (msg) => p(`${c.yellow}  ⚠  ${c.reset}${msg}`);
const err  = (msg) => p(`${c.red}  ✗  ${c.reset}${msg}`);

/* ─── Helpers ─────────────────────────────────────────────────── */

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

const formatTitle = (fileName) =>
  fileName
    .replace(/\.pdf$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Find all PDFs inside the _drop folder */
const getPdfsInDrop = async () => {
  try {
    const entries = await fs.readdir(DROP_ZONE, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && /\.pdf$/i.test(e.name))
      .map((e) => path.join(DROP_ZONE, e.name));
  } catch {
    return [];
  }
};

/* ─── Banner ──────────────────────────────────────────────────── */

function banner() {
  p('');
  p(`${c.purple}${c.bold}  ██╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗${c.reset}`);
  p(`${c.purple}${c.bold}  ███╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝${c.reset}`);
  p(`${c.purple}${c.bold}  ████╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗${c.reset}`);
  p(`${c.purple}${c.bold}  ██╔██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║${c.reset}`);
  p(`${c.purple}${c.bold}  ██║╚████║███████╗██╔╝ ██╗╚██████╔╝███████║${c.reset}`);
  p(`${c.purple}${c.bold}  ╚═╝ ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝${c.reset}`);
  p('');
  p(`${c.bold}  ➕  Add Presentation Tool${c.reset}  ${c.dim}v2.0${c.reset}`);
  p(`${c.dim}  ────────────────────────────────────────────${c.reset}`);
  p('');
}

/* ─── Pick subject interactively ──────────────────────────────── */

async function pickSubject(hint) {
  if (hint) {
    const match = SUBJECTS.find((s) => s === hint.toLowerCase().trim());
    if (match) return match;
    warn(`Unknown subject "${hint}". Please pick one below.`);
  }

  p(`${c.bold}  Select a subject:${c.reset}`);
  SUBJECTS.forEach((s, i) => {
    p(`  ${c.purple}[${i + 1}]${c.reset} ${SUBJECT_LABELS[s]}`);
  });
  p('');

  while (true) {
    const raw = (await ask(`${c.cyan}  Your choice (1–${SUBJECTS.length}): ${c.reset}`)).trim();
    const idx = parseInt(raw, 10) - 1;
    if (idx >= 0 && idx < SUBJECTS.length) return SUBJECTS[idx];
    warn('Invalid choice, please enter a number from the list.');
  }
}

/* ─── Process a single PDF file ───────────────────────────────── */

async function processPdf(pdfPath, subjectHint) {
  if (!existsSync(pdfPath)) {
    err(`File not found: ${pdfPath}`);
    return false;
  }

  if (!/\.pdf$/i.test(pdfPath)) {
    err(`Not a PDF file: ${pdfPath}`);
    return false;
  }

  const fileName = path.basename(pdfPath);
  const title = formatTitle(fileName);

  p('');
  p(`${c.bold}  📄 File:${c.reset}  ${fileName}`);
  p(`${c.bold}  🏷  Title:${c.reset} ${title}`);
  p('');

  const subject = await pickSubject(subjectHint);
  const destDir = path.join(PRESENTATIONS_DIR, subject);
  const destPath = path.join(destDir, fileName);

  await fs.mkdir(destDir, { recursive: true });

  // Check for duplicates
  if (existsSync(destPath)) {
    const overwrite = (await ask(`${c.yellow}  File already exists. Overwrite? (y/N): ${c.reset}`)).trim().toLowerCase();
    if (overwrite !== 'y' && overwrite !== 'yes') {
      warn('Skipped (file already exists).');
      return false;
    }
  }

  await fs.copyFile(pdfPath, destPath);
  ok(`Copied → presentations/${subject}/${fileName}`);

  // Remove from drop zone if it came from there
  if (path.dirname(pdfPath) === DROP_ZONE) {
    await fs.unlink(pdfPath);
    ok(`Removed from drop zone.`);
  }

  return true;
}

/* ─── Regenerate manifest ─────────────────────────────────────── */

async function regenerateManifest() {
  info('Regenerating presentations manifest…');
  try {
    execSync('node scripts/generate-presentations-manifest.mjs', {
      cwd: ROOT,
      stdio: 'inherit',
    });
    ok('Manifest updated — presentations will appear on the site after the next build/deploy.');
  } catch {
    err('Failed to regenerate manifest. Run: npm run generate:presentations');
  }
}

/* ─── Main ────────────────────────────────────────────────────── */

async function main() {
  banner();

  const args = process.argv.slice(2);

  // Parse flags
  let filePath = null;
  let subjectHint = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--subject' || args[i] === '-s') {
      subjectHint = args[i + 1];
      i++;
    } else if (!args[i].startsWith('-')) {
      filePath = args[i];
    }
  }

  let processedCount = 0;

  if (filePath) {
    /* ── Mode A: File path passed as argument ── */
    const resolved = path.resolve(filePath);
    const success = await processPdf(resolved, subjectHint);
    if (success) processedCount++;

  } else {
    /* ── Mode B: Check _drop folder, or ask for path ── */
    await fs.mkdir(DROP_ZONE, { recursive: true });
    const dropped = await getPdfsInDrop();

    if (dropped.length > 0) {
      p(`${c.bold}  📂 Found ${dropped.length} PDF(s) in the drop zone:${c.reset}`);
      dropped.forEach((f, i) => p(`  ${c.dim}[${i + 1}]${c.reset} ${path.basename(f)}`));
      p('');

      for (const pdfPath of dropped) {
        const success = await processPdf(pdfPath, subjectHint);
        if (success) processedCount++;
        p('');
      }

    } else {
      p(`${c.dim}  Drop zone: presentations/_drop/${c.reset}`);
      p(`  No PDFs found in the drop zone.`);
      p('');
      p(`  You can either:`);
      p(`  ${c.purple}[1]${c.reset} Copy PDF files into  ${c.bold}presentations/_drop/${c.reset}  and run this again`);
      p(`  ${c.purple}[2]${c.reset} Enter the full path to a PDF right now`);
      p('');

      const raw = (await ask(`${c.cyan}  Your choice (1/2): ${c.reset}`)).trim();

      if (raw === '1') {
        p('');
        ok(`Drop zone is ready at: ${DROP_ZONE}`);
        info('Copy your PDF files there and run:  npm run add-presentation');
        rl.close();
        return;
      }

      p('');
      const inputPath = (await ask(`${c.cyan}  Path to PDF: ${c.reset}`)).trim().replace(/^["']|["']$/g, '');
      const resolved = path.resolve(inputPath);
      const success = await processPdf(resolved, subjectHint);
      if (success) processedCount++;
    }
  }

  rl.close();

  if (processedCount === 0) {
    p('');
    warn('No files were added. Nothing to do.');
    process.exit(0);
  }

  p('');
  await regenerateManifest();

  p('');
  p(`${c.green}${c.bold}  🎉 Done! ${processedCount} file(s) added successfully.${c.reset}`);
  p('');
  p(`  ${c.dim}Next steps:${c.reset}`);
  p(`  ${c.purple}→${c.reset} Run  ${c.bold}npm run dev${c.reset}   to preview locally`);
  p(`  ${c.purple}→${c.reset} Run  ${c.bold}npm run deploy${c.reset} to publish the site`);
  p('');
}

main().catch((e) => {
  err(e.message || String(e));
  process.exit(1);
});
