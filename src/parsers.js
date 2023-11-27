import yaml from 'js-yaml';

const getParse = (filePath, fileFormat) => {
  if (fileFormat === 'json') {
    return JSON.parse(filePath);
  }
  if (fileFormat === 'yml' || fileFormat === 'yaml') {
    return yaml.load(filePath);
  }
  return console.log('format error');
};

export default getParse;
