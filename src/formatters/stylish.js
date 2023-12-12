import _ from 'lodash';

const ident = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const strigify = (data, depth = 1) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const entries = Object.entries(data);
  const items = entries.map(
    ([key, value]) => `${ident(depth + 1)}  ${key}: ${strigify(value, depth + 1)}`,
  );
  const result = `{\n${items.join('\n')}\n  ${ident(depth)}}`;
  return result;
};

const createStylish = (diff) => {
  const iter = (data, depth = 1) => data.map((item) => {
    switch (item.type) {
      case 'unchanged':
        return `${ident(depth)}  ${item.key}: ${strigify(item.value, depth)}`;
      case 'added':
        return `${ident(depth)}+ ${item.key}: ${strigify(item.value, depth)}`;
      case 'deleted':
        return `${ident(depth)}- ${item.key}: ${strigify(item.value, depth)}`;
      case 'changed': {
        const line1 = `${ident(depth)}- ${item.key}: ${strigify(
          item.value1,
          depth,
        )}`;
        const line2 = `${ident(depth)}+ ${item.key}: ${strigify(
          item.value2,
          depth,
        )}`;
        return `${line1}\n${line2}`;
      }
      case 'nested':
        return `${ident(depth)}  ${item.key}: {\n${iter(
          item.children,
          depth + 1,
        ).join('\n')}\n${ident(depth)}  }`;
      default:
        throw new Error(`Unknown type: '${item.type}'!`);
    }
  });
  return `{\n${iter(diff).join('\n')}\n}`;
};

export default createStylish;
