import fs from 'fs';
import path from 'path';
import process from 'process';
import getParse from './parsers.js';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) =>
  fs.readFileSync(getAbsolutePath(filePath), 'utf8');

const getFileExtension = (filePath) => path.extname(filePath).slice(1);

// const test = getAbsolutePath('__fixtures__/file1.json');
// const test1 = getFileExtension(test);
// console.log(test1);

// '__fixtures__/file1.json'
// '__fixtures__/file2.json'

const genDiff = (filepath1, filepath2) => {
  const fileReading1 = readFile(filepath1);
  const fileReading2 = readFile(filepath2);
  const filePars1 = getParse(fileReading1, getFileExtension(filepath1));
  const filePars2 = getParse(fileReading2, getFileExtension(filepath2));
  return console.log(fileReading1);
};
export default genDiff;
