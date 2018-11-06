module.exports = function(url) {
  return url
    .replace(/https?:/g, '')
    .replace(/:9300/g, ':9200')
    .split(',');
};
