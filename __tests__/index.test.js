import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fixturePath = path.join(
  __dirname,
  '..',
  '__fixtures__',
  'expected_file.txt',
);

const readFixtureFile = fs.readFileSync(fixturePath, 'utf8');
const expectedData = readFixtureFile;

const file1json = '__fixtures__/file1.json';
const file2json = '__fixtures__/file2.json';
const file1yml = '__fixtures__/file1.yml';
const file2yml = '__fixtures__/file2.yml';

test('Тестируем genDiff', () => {
  expect(genDiff(file1json, file2json)).toEqual(expectedData);
  expect(genDiff(file1yml, file2yml)).toEqual(expectedData);
  expect(genDiff(file1json, file2yml)).toEqual(expectedData);
});
