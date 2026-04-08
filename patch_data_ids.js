const fs = require('fs');

const path = 'src/lib/data.ts';
let code = fs.readFileSync(path, 'utf8');

// Replace `id: Number,` with `id: Number + 100000,`
code = code.replace(/id:\s*(\d+)/g, (match, p1) => {
    return `id: ${parseInt(p1) + 100000}`;
});

fs.writeFileSync(path, code);
console.log('IDs bumped successfully.');
