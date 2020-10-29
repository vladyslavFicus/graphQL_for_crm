module.exports = config => ({
  versions: config.reduce((prev, curr) => ({ ...prev, [curr.service]: curr.version }), {}),
});
