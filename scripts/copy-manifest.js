// 复制public目录文件到dist
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// 复制manifest.json
copyFileSync(
  join(rootDir, 'public/manifest.json'),
  join(rootDir, 'dist/manifest.json')
);

console.log('✓ Manifest copied to dist/');
