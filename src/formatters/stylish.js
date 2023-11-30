// const stylish = (diff) => {
//   const result = diff.map((item) => {
//     console.log(item);
//     console.log(typeof item.value);
//     if (item.status === 'deleted') {
//       return `  - ${item.key}: ${item.value}`;
//     }
//     if (item.statur === 'added') {
//     }
//   });
//   return result;
// };

const ident = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const isObject = (data, depth = 0) => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  const entries = Object.entries(data);
  const items = entries.map(
    ([key, value]) => `${ident(depth)}  ${key}: ${isObject(value, depth + 1)}`,
  );
  const result = `{\n${items.join('\n')}\n${ident(depth - 1)}  }`;
  return result;
};

const stylish = (diff) => {
  const iter = (data, depth) =>
    data.map((item) => {
      switch (item.status) {
        case 'unchanged':
          return `${ident(depth)}  ${item.key}: ${isObject(
            item.value,
            depth + 1,
          )}`;
        case 'added':
          return `${ident(depth)}+ ${item.key}: ${isObject(
            item.value,
            depth + 1,
          )}`;
        case 'deleted':
          return `${ident(depth)}- ${item.key}: ${isObject(
            item.value,
            depth + 1,
          )}`;
        case 'changed':
          return `${ident(depth)}- ${item.key}: ${isObject(
            item.value1,
            depth + 1,
          )}\n${ident(depth)}+ ${item.key}: ${isObject(
            item.value2,
            depth + 1,
          )}`;
        case 'nested':
          return `${ident(depth)}  ${item.key}: {\n${iter(
            item.value,
            depth + 1,
          ).join('\n')}\n${ident(depth)}  }`;
        default:
          return `${ident(depth)}->${item.key}: неизвестный статус`;
      }
    });
  return `{\n${iter(diff, 1).join('\n')}\n}`;
};

export default stylish;
