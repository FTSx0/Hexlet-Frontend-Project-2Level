import fs from 'fs';
import path from 'path';
import process from 'process';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) =>
  fs.readFileSync(getAbsolutePath(filePath), 'utf8');

const test = getAbsolutePath('__fixtures__/file1.json');
const test1 = readFile(test);

console.log(test1);
