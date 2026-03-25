'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'src/vendor/event-target-shim/index.d.ts');
const dest = path.join(root, 'lib/typescript/vendor/event-target-shim/index.d.ts');

if (!fs.existsSync(src)) {
    console.error('copy-vendor-types: missing', src);
    process.exit(1);
}
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
