const { getPartners: getPartnersRequest } = require('../../../utils/partnerRequests');

const getPartners = (_, args, { headers: { authorization } }) => {
  return getPartnersRequest(args, authorization);
};

module.exports = {
  getPartners,
};
