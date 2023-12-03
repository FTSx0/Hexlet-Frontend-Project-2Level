import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fixturePath = path.join(__dirname, '..', '__fixtures__');

const expectedData0 = fs.readFileSync(
  `${fixturePath}/expectedData0.txt`,
  'utf8',
);

const expectedData1 = fs.readFileSync(
  `${fixturePath}/expectedData1.txt`,
  'utf8',
);

const expectedData2 = fs.readFileSync(
  `${fixturePath}/expectedData2.txt`,
  'utf8',
);

const expectedData3 = fs.readFileSync(
  `${fixturePath}/expectedData3.txt`,
  'utf8',
);

describe('Тестируем gendiff', () => {
  test('JSON-Flat-Stylish', () => {
    const filepath1 = '__fixtures__/file1.json';
    const filepath2 = '__fixtures__/file2.json';
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedData0);
  });
  test('YML-Flat-Stylish', () => {
    const filepath1 = '__fixtures__/file1.yml';
    const filepath2 = '__fixtures__/file2.yml';
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedData0);
  });
  test('JSON-Nested-Stylish', () => {
    const filepath1 = '__fixtures__/longFile1.json';
    const filepath2 = '__fixtures__/longFile2.json';
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedData1);
  });
  test('YML-Nested-Stylish', () => {
    const filepath1 = '__fixtures__/longFile1.yml';
    const filepath2 = '__fixtures__/longFile2.yml';
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedData1);
  });
  test('JSON-Nested-Plain', () => {
    const filepath1 = '__fixtures__/longFile1.json';
    const filepath2 = '__fixtures__/longFile2.json';
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedData2);
  });
  test('YML-Nested-Plain', () => {
    const filepath1 = '__fixtures__/longFile1.yml';
    const filepath2 = '__fixtures__/longFile2.yml';
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedData2);
  });
  test('JSON-Stringify', () => {
    const filepath1 = '__fixtures__/longFile1.json';
    const filepath2 = '__fixtures__/longFile2.json';
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedData3);
  });
  test('YML-Stringify', () => {
    const filepath1 = '__fixtures__/longFile1.yml';
    const filepath2 = '__fixtures__/longFile2.yml';
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedData3);
  });
});
