import fs from 'fs';
import path from 'path';
import process from 'process';
import findDifferences from './diff.js';
import parse from './parsers.js';
import createReport from './formatters/index.js';

const getFileFormat = (filePath) => path.extname(filePath).slice(1);

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const readData = fs.readFileSync(fullPath, 'utf8');
  return parse(readData, getFileFormat(filePath));
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const diff = findDifferences(readFile(filepath1), readFile(filepath2));
  return createReport(diff, formatName);
};
export default genDiff;
