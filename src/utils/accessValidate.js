const api = require('./api');
const { UNAUTHORIZED } = require('../constants/errors');

module.exports = async ({ headers: { authorization }, brand }, playerUUID) => {
  const [, token] = authorization ? authorization.split(' ') : [, null];

  if (!brand || !token) {
    return { error: UNAUTHORIZED };
  }

  const accessValidationResponse = await api.accessValidate({
    token,
    url: `/profiles${playerUUID ? `/${playerUUID}` : ''}`,
    method: 'GET',
    service: 'profile',
  });

  if (accessValidationResponse.jwtError) {
    return { error: UNAUTHORIZED };
  }

  return { error: null };
};
