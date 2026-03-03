
async function run(file) {
    
    switch (file) {
        case 1:
            await import('./src/thisexec.js');
            break;
        case 2:
            await import('./src/thispath.js');
            break;
        case 3:
            await import('./src/thisfs.js');
            break;
        case 4: 
            await import('./src/test.js');
            break;
    }
}

run(4);