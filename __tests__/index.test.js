import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fixturePath = path.join(__dirname, '..', '__fixtures__');

// const readFixtureFile = fs.readFileSync(fixturePath, 'utf8');
// const expectedData = readFixtureFile;

const expectedData1 = fs.readFileSync(
  `${fixturePath}/expected_longFile.txt`,
  'utf8',
);

const expectedData0 = fs.readFileSync(
  `${fixturePath}/expected_file.txt`,
  'utf8',
);

// const file1json = '__fixtures__/file1.json';
// const file2json = '__fixtures__/file2.json';
// const file1yml = '__fixtures__/file1.yml';
// const file2yml = '__fixtures__/file2.yml';
// const longFile1json = '__fixtures__/longFile1.json';
// const longFile2json = '__fixtures__/longFile2.json';

describe('Тестируем gendiff', () => {
  test('JSON Short', () => {
    const filepath1 = '__fixtures__/file1.json';
    const filepath2 = '__fixtures__/file2.json';
    expect(genDiff(filepath1, filepath2)).toEqual(expectedData0);
  });
  test('YML Short', () => {
    const filepath1 = '__fixtures__/file1.yml';
    const filepath2 = '__fixtures__/file2.yml';
    expect(genDiff(filepath1, filepath2)).toEqual(expectedData0);
  });
  test('JSON Long', () => {
    const filepath1 = '__fixtures__/longFile1.json';
    const filepath2 = '__fixtures__/longFile2.json';
    expect(genDiff(filepath1, filepath2)).toEqual(expectedData1);
  });
  test('YML Long', () => {
    const filepath1 = '__fixtures__/longFile1.yml';
    const filepath2 = '__fixtures__/longFile2.yml';
    expect(genDiff(filepath1, filepath2)).toEqual(expectedData1);
  });
});

// test('Тестируем genDiff', () => {
//   expect(genDiff(file1json, file2json)).toEqual(expectedData);
//   expect(genDiff(file1yml, file2yml)).toEqual(expectedData);
//   expect(genDiff(file1json, file2yml)).toEqual(expectedData);
// expect(genDiff(longFile1json, longFile2json)).toEqual(expectedData);
// });
