const checkValueType = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (value === null) {
    return null;
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (diff, path = '') => {
  const result = diff.map((item) => {
    switch (item.status) {
      case 'unchanged':
        return '';
      case 'added':
        return `Property '${path}${
          item.key
        }' was added with value: ${checkValueType(item.value)}`;
      case 'deleted':
        return `Property '${path}${item.key}' was removed`;
      case 'changed':
        return `Property '${path}${
          item.key
        }' was updated. From ${checkValueType(item.value1)} to ${checkValueType(
          item.value2,
        )}`;
      case 'nested':
        return plain(item.value, `${path}${item.key}.`);
      default:
        throw new Error(`Unknown status: '${item.status}!'`);
    }
  });
  return result.filter((item) => item !== '').join('\n');
};

export default plain;
