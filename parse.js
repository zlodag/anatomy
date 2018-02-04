const fs = require('fs');
const pdf = require('pdf-parse');
 
if (process.argv.length < 3) {
    console.error('Provide path to pdf');
    return process.exit();
} else if (process.argv.length > 3) {
    console.error('Too many arguments!');
    return process.exit();
}

const OPTIONS = {
    // internal page parser callback
    // you can set this option, if you need another format except raw text
    // pagerender: render_page,
    // max page number to parse
    // min: 86,
    // max: 87,
    //check https://mozilla.github.io/pdf.js/getting_started/
    // version: 'v1.9.426'
}

let dataBuffer = fs.readFileSync(process.argv[2]);

pdf(dataBuffer, OPTIONS).then(function(data) {
 
    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata); 
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text
    console.log(data.text); 
        
});