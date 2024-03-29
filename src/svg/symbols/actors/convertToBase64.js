import {fs} from "fs" 

const filelist = fs.readdirSync('.');
let jsFile = '';
let importStatement = 'import { ';

console.log('Converting files to base64 strings');

filelist.forEach((file, index) => {
    if(file.split('.')[1] === 'js') {
        console.log(`Skipping js file ${file}`);
        return;
    }
    
    console.log(`Opening and converting ${file}`);
    
    const fileContent = fs.readFileSync(file).toString();
    const noNewlines = fileContent.replace(/(?:\r\n|\r|\n)/g, '');
    const nnlEscaped = encodeURIComponent(noNewlines);
     
    const urlString = `data:image/svg+xml;utf8,${nnlEscaped}`;
    
    const importName = file.split('.')[0].replace(/-/g,"_");
    console.log(`Export as ${importName}`);
    
    importStatement += `\t${importName}`;
    importStatement += index === filelist.length+1 ? '\n' : ',\n';
    
    jsFile += `export const ${importName} = '${urlString}';\n`;
});

console.log('Writing to file');
fs.writeFileSync('CJMLSymbolsBase64.js', jsFile);
console.log('Finished');

console.log('\n==: Import Statement :==');
importStatement += ' } from "./CJMLSymbolsBase64.js"';
console.log(importStatement);
