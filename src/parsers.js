const getParse = (filePath, fileFormat) => {
  if (fileFormat === 'json') {
    return JSON.parse(filePath);
  }
  return console.log('format error');
};

export default getParse;
