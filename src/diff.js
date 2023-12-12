import _ from 'lodash';

const findDifferences = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  return keys.map((key) => {
    if (!keys2.includes(key)) {
      return { key, value: data1[key], type: 'deleted' };
    }
    if (!keys1.includes(key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        children: findDifferences(data1[key], data2[key]),
        type: 'nested',
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        value1: data1[key],
        value2: data2[key],
        type: 'changed',
      };
    }
    return { key, value: data1[key], type: 'unchanged' };
  });
};

export default findDifferences;
