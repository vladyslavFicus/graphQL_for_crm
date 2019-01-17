const { getOperatorByUUID } = require('./operatorRequests');
// make folder with files
const getOperatorFromCache = async (id, auth) => {
  if (!global.cache.operators[id]) {
    global.cache.operators[id] = await getOperator(id, auth);
    setTimeout(() => {
      delete global.cache.operators[id];
    }, 300000);
  }

  return global.cache.operators[id];
};

const getOperator = async (id, auth) => {
  const operator = await getOperatorByUUID(id, auth);

  if (operator.error) {
    return {};
  }

  return operator;
};

module.exports = {
  getOperatorFromCache,
};
