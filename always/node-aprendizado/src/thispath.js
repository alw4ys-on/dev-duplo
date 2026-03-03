// dispatch

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

console.log(path.dirname(__filename));
// console.log(path.extname(__filename));
console.log(path.basename(__filename));
// console.log(path.parse(__filename));
