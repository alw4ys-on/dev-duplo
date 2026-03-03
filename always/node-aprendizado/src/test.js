import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(import.meta.url);

teste = path.join(__dirname, '/test');


if (teste) {
    console.log(teste);
}