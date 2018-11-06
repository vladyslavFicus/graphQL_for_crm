const { formatError } = require('graphql');

module.exports = error => {
  const data = formatError(error);
  const { originalError } = error;

  data.status = originalError && originalError.status;

  return data;
};
