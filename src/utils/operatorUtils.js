const { getOperatorByUUID } = require('./operatorRequests');

const getOperatorFromCache = (id, auth) => {
  if (!global.cache.operators[id]) {
    global.cache.operators[id] = getOperator(id, auth);
    setTimeout(() => {
      delete global.cache.operators[id];
    }, 3600000);
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
