import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const getPath = (path, key) => (path ? `${path}.${key}` : `${key}`);

const createPlain = (diff, path = '') => {
  const result = diff.map((item) => {
    const currentPath = getPath(path, item.key);
    switch (item.type) {
      case 'unchanged':
        return '';
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(
          item.value,
        )}`;
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${stringify(
          item.value1,
        )} to ${stringify(item.value2)}`;
      case 'nested':
        return createPlain(item.children, currentPath);
      default:
        throw new Error(`Unknown type: '${item.type}!'`);
    }
  });
  return result.filter(Boolean).join('\n');
};

export default createPlain;
