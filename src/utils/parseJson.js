module.exports = function(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return {
      error: 'Cannot parse to JSON',
      fields_errors: data,
    };
  }
};
