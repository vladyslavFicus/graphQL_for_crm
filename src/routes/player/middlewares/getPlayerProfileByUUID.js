const { get } = require('lodash');
const getPlayerProfileFromESByUUID = require('../../../utils/getPlayerProfileFromESByUUID');
const Logger = require('../../../utils/logger');
const { ENTITY_NOT_FOUND, INTERNAL } = require('../../../constants/errors');

module.exports = async (req, res) => {
  const playerProfile = await getPlayerProfileFromESByUUID(req.auth.brandId, req.params.uuid);
  Logger.info({
    message: `getPlayerProfile(brandId = ${req.auth.brandId}, uuid = ${req.params.uuid}) {\r\n  ${JSON.stringify(
      playerProfile
    )}\r\n}`,
  });

  let responseStatusCode = 200;
  const error = get(playerProfile, 'error');

  if (error === ENTITY_NOT_FOUND) {
    responseStatusCode = 404;
  } else if (error === INTERNAL) {
    responseStatusCode = 500;
  }

  res
    .status(responseStatusCode)
    .json(playerProfile)
    .send();
};
