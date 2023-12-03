import _ from 'lodash';

const findDifferences = (file1, file2) => {
  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);
  const uniqKeys = _.union(keysFile1, keysFile2);
  const sortUniqKeys = _.sortBy(uniqKeys);

  const differences = sortUniqKeys.map((key) => {
    const isObject = (item) => typeof item === 'object';
    if (isObject(file1[key]) && isObject(file2[key])) {
      return {
        key,
        value: findDifferences(file1[key], file2[key]),
        status: 'nested',
      };
    }
    if (
      file1[key] !== file2[key]
      && keysFile1.includes(key)
      && keysFile2.includes(key)
    ) {
      return {
        key,
        value1: file1[key],
        value2: file2[key],
        status: 'changed',
      };
    }
    if (!keysFile1.includes(key)) {
      return { key, value: file2[key], status: 'added' };
    }
    if (!keysFile2.includes(key)) {
      return { key, value: file1[key], status: 'deleted' };
    }
    return { key, value: file1[key], status: 'unchanged' };
  });
  return differences;
};

export default findDifferences;
