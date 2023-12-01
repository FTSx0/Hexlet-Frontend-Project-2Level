import fs from 'fs';
import path from 'path';
import process from 'process';
import findDifferences from './diff.js';
import getParse from './parsers.js';

import formatSelection from './formatters/index.js';
// import stylish from './formatters/stylish.js';
// import plain from './formatters/plain.js';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(fullPath, 'utf8');
};

// const getAbsPath = (filePath) => path.resolve(process.cwd(), filePath);
// const readFile = (filePath) => fs.readFileSync(getAbsPath(filePath), 'utf8');

const getFileExtension = (filePath) => path.extname(filePath).slice(1);

// gendiff __fixtures__/file1.json __fixtures__/file2.json
// gendiff __fixtures__/file1.yml __fixtures__/file2.yml
// gendiff __fixtures__/file1.json __fixtures__/file2.yml

// gendiff __fixtures__/longFile1.json __fixtures__/longFile2.json

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileReading1 = readFile(filepath1);
  const fileReading2 = readFile(filepath2);
  const filePars1 = getParse(fileReading1, getFileExtension(filepath1));
  const filePars2 = getParse(fileReading2, getFileExtension(filepath2));
  return formatSelection(findDifferences(filePars1, filePars2), formatName);
};
export default genDiff;
