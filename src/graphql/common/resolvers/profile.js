const { getQueryProfileView } = require('../../../utils/profile');

// # Can be removed after NewPlayerProfileType will be removed
const getProfileView = async (uuid, authorization) => {
  return await getQueryProfileView(uuid, authorization);
};

module.exports = {
  getProfileView,
};
