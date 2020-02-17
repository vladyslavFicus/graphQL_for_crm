const {
  updatePartner: updatePartnerRequest,
  getPartners: getPartnersRequest,
  createPartner: createPartnerRequest,
  getPartnerByUUID: getPartnerByUUIDRequest,
  changeStatus: changeStatusRequest,
} = require('../../../utils/partnerRequests');

const getPartners = async (_, args, { headers: { authorization } }) => {
  return getPartnersRequest(args, authorization);
};

const getPartnerByUUID = async (_, { uuid }, { headers: { authorization } }) => {
  return getPartnerByUUIDRequest(uuid, authorization);
};

const createPartner = async (_, args, { headers: { authorization } }) => {
  return createPartnerRequest(args, authorization);
};

const updatePartner = async (_, args, { headers: { authorization } }) => {
  return updatePartnerRequest(args, authorization);
};

const changeStatus = (_, args, { headers: { authorization } }) => {
  return changeStatusRequest(args, authorization);
};

module.exports = {
  getPartners,
  changeStatus,
  updatePartner,
  createPartner,
  getPartnerByUUID,
};
