// this final stand

import { error } from 'node:console';
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(__dirname);

// criar pasta

fs.mkdir(path.join(__dirname, '/test'), (error) => {
    if(error) {
        return console.log('deu ruim', error);
    }
    console.log('deu bom');
});

// criar arquivo

fs.writeFile(path.join(__dirname, '/test', 'test.txt'), " _  _\n(o)(o)--.\n \\../ (  )hjw\n m\\/m--m'`--.\n", (error) => {
    if(error) {
        return console.log('deu ruim', error);
    }
    console.log('deu bom');

    // modificar arquivo
    
    fs.appendFile(path.join(__dirname, '/test', 'test.txt'), ' .   .\n( ).( )\n (o o) .-._."\n(  -  )  \n mm mm     mc', (error) => {
        if (error) {
            return console.log('deu ruim bixo', error);
        }
        console.log('bom demais sorh');
    });
    
    // hulk ler arquivo
    
    fs.readFile(path.join(__dirname, '/test', 'test.txt',), 'utf-8', (error, data) => {
        if (error) {
            console.log('deu ruim, dnv');
        }
        console.log(data);
    });
});
