const getRange = function(config) {
  return config.split('-').map(i => parseFloat(i));
};

const parseRange = function(config) {
  const [start, end] = getRange(config);

  return end ? [...[...new Array(end - start)].map((_, i) => start + i), end] : [start];
};

const parseNumbersRange = function(config) {
  return config.split(';').reduce((res, item) => [...res, ...parseRange(item)], []);
};

module.exports = {
  parseNumbersRange,
  getRange,
};
