import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import getParse from './parsers.js';

const getAbsPath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(getAbsPath(filePath), 'utf8');

const getFileExtension = (filePath) => path.extname(filePath).slice(1);

// gendiff __fixtures__/file1.json __fixtures__/file2.json
// gendiff __fixtures__/file1.yml __fixtures__/file2.yml
// gendiff __fixtures__/file1.json __fixtures__/file2.yml

const findDifferences = (file1, file2) => {
  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);
  const getAllUniqKeys = _.union(keysFile1, keysFile2).sort();

  const result = getAllUniqKeys.reduce((acc, key) => {
    if (keysFile1.includes(key) && keysFile2.includes(key)) {
      if (file1[key] === file2[key]) {
        return `${acc}    ${key}: ${file1[key]}\n`;
      }
      if (file1[key] !== file2[key]) {
        return `${acc}  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
      }
    }
    if (keysFile1.includes(key) && !keysFile2.includes(key)) {
      return `${acc}  - ${key}: ${file1[key]}\n`;
    }
    if (keysFile2.includes(key) && !keysFile1.includes(key)) {
      return `${acc}  + ${key}: ${file2[key]}\n`;
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
