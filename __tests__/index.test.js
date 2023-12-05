import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf8');

const stylishData = readFile('expected_stylish_Data.txt');
const plainData = readFile('expected_plain_Data.txt');
const jsonData = readFile('expected_json_Data.txt');

describe('Тестируем genDiff', () => {
  test('*.YML', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    expect(genDiff(file1, file2, 'stylish')).toEqual(stylishData);
    expect(genDiff(file1, file2, 'plain')).toEqual(plainData);
    expect(genDiff(file1, file2, 'json')).toEqual(jsonData);
    expect(genDiff(file1, file2)).toEqual(stylishData);
  });
  test('*.JSON', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    expect(genDiff(file1, file2, 'stylish')).toEqual(stylishData);
    expect(genDiff(file1, file2, 'plain')).toEqual(plainData);
    expect(genDiff(file1, file2, 'json')).toEqual(jsonData);
    expect(genDiff(file1, file2)).toEqual(stylishData);
  });
});
