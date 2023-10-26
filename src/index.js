import fs from 'fs';
import path from 'path';
import process from 'process';
import getParse from './parsers.js';
import _ from 'lodash';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) =>
  fs.readFileSync(getAbsolutePath(filePath), 'utf8');

const getFileExtension = (filePath) => path.extname(filePath).slice(1);

// const test = getAbsolutePath('__fixtures__/file1.json');
// const test1 = getFileExtension(test);
// console.log(test1);

// '__fixtures__/file1.json'
// '__fixtures__/file2.json'

// gendiff __fixtures__/file1.json __fixtures__/file2.json

const findDifferences = (file1, file2) => {
  const keysFile1 = Object.keys(file1); // console.log(`Ключи первого файла: `, keysFile1);
  const keysFile2 = Object.keys(file2); // console.log(`Ключи второго файла: `, keysFile2);
  const getAllUniqKeys = _.union(keysFile1, keysFile2).sort();
  // console.log('Уникальные ключи: ', getAllUniqKeys);

  const result = getAllUniqKeys.reduce((acc, key) => {
    if (keysFile1.includes(key) && keysFile2.includes(key)) {
      if (file1[key] === file2[key]) {
        acc = `${acc}    ${key}: ${file1[key]}\n`;
      }
      if (file1[key] !== file2[key]) {
        acc = `${acc}  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
      }
    }
    if (keysFile1.includes(key) && !keysFile2.includes(key)) {
      acc = `${acc}  - ${key}: ${file1[key]}\n`;
    }
    if (keysFile2.includes(key) && !keysFile1.includes(key)) {
      acc = `${acc}  + ${key}: ${file2[key]}\n`;
    }

    return acc;
  }, '');

  return `{\n${result}}`;
};

const genDiff = (filepath1, filepath2) => {
  const fileReading1 = readFile(filepath1);
  const fileReading2 = readFile(filepath2);
  const filePars1 = getParse(fileReading1, getFileExtension(filepath1));
  const filePars2 = getParse(fileReading2, getFileExtension(filepath2));
  return findDifferences(filePars1, filePars2);
};
export default genDiff;
