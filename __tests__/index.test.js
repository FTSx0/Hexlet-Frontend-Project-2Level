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

const file1 = '__fixtures__/file1.json';
const file2 = '__fixtures__/file2.json';

test('Тестируем genDiff', () => {
  expect(genDiff(file1, file2)).toEqual(expectedData);
});
