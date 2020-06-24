module.exports = function (data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return {
      parseError: true,
      error: 'Cannot parse to JSON',
      fields_errors: data,
    };
  }
};
