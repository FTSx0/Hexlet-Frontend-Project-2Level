import createStylish from './stylish.js';
import createPlain from './plain.js';

const createReport = (data, format) => {
  switch (format) {
    case 'stylish':
      return createStylish(data);
    case 'plain':
      return createPlain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknown format: '${format}!`);
  }
};

export default createReport;
