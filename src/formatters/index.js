import stylish from './stylish.js';
import plain from './plain.js';

const createReport = (data, format) => {
  if (format === 'stylish') {
    return stylish(data);
  }
  if (format === 'plain') {
    return plain(data);
  }
  if (format === 'json') {
    return JSON.stringify(data);
  }
  return `Format error: ${format}`;
};

export default createReport;
