module.exports = {
  error(_) {
    return _.error || _.errorMessage || (typeof _ === 'string' ? _ : null);
  },
};
