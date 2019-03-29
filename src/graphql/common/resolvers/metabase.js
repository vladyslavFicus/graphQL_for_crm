const jwt = require('jsonwebtoken');
const accessValidate = require('../../../utils/accessValidate');

const METABASE_SECRET_KEY = 'c20cb34bb2da9bb45acf2b69054160efeafb20e303fc09bc998f724b721b537e';

const getMetabaseToken = async (_, { agent_id }, context) => {
  const access = await accessValidate(context);

  if (access.error) {
    return { token: null };
  }

  const payload = {
    resource: { dashboard: 268 },
    params: { agent_id, brand: context.brand.id },
  };

  const token = jwt.sign(payload, METABASE_SECRET_KEY);

  return { token };
};

module.exports = {
  getMetabaseToken,
};
