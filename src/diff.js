import _ from 'lodash';

const findDifferences = (file1, file2) => {
  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);
  const uniqKeys = _.union(keysFile1, keysFile2);
  const sortUniqKeys = _.sortBy(uniqKeys);
  // console.log(sortUniqKeys);

  const differences = sortUniqKeys.map((key) => {
    const isObject = (item) => typeof item === 'object';
    // console.log(key);
    if (isObject(file1[key]) && isObject(file2[key])) {
      return {
        key,
        value: findDifferences(file1[key], file2[key]),
        status: 'nested',
      };
    }
    if (
      file1[key] !== file2[key] &&
      keysFile1.includes(key) &&
      keysFile2.includes(key)
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
  // console.log(JSON.stringify(differences));
  return differences;
};

// const result = getAllUniqKeys.reduce((acc, key) => {
//   if (keysFile1.includes(key) && keysFile2.includes(key)) {
//     if (file1[key] === file2[key]) {
//       return `${acc}    ${key}: ${file1[key]}\n`;
//     }
//     if (file1[key] !== file2[key]) {
//       return `${acc}  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
//     }
//   }
//   if (keysFile1.includes(key) && !keysFile2.includes(key)) {
//     return `${acc}  - ${key}: ${file1[key]}\n`;
//   }
//   if (keysFile2.includes(key) && !keysFile1.includes(key)) {
//     return `${acc}  + ${key}: ${file2[key]}\n`;
//   }
//   return acc;
// }, '');
// return `{\n${result}}`;
// };

export default findDifferences;
