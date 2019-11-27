const {
  updatePartner: updatePartnerRequest,
  getPartnersByUUIDs,
  createPartner: createPartnerRequest,
  getPartnerByUUID: getPartnerByUUIDRequest,
  changeStatus: changeStatusRequest,
} = require('../../../utils/partnerRequests');

const getPartners = async (_, args, { headers: { authorization } }) => {
  return getPartnersByUUIDs(args, authorization);
};

const getPartnerByUUID = async (_, { uuid }, { headers: { authorization } }) => {
  return getPartnerByUUIDRequest(uuid, authorization);
};

const createPartner = async (_, args, { headers: { authorization } }) => {
  const { data, error } = await createPartnerRequest(args, authorization);

  return {
    data,
    error,
  };
};

const updatePartner = async (_, args, { headers: { authorization } }) => {
  const { data, error } = await updatePartnerRequest(args, authorization);

  return {
    data,
    error,
  };
};

const changeStatus = (_, args, { headers: { authorization } }) => changeStatusRequest(args, authorization);

module.exports = {
  getPartners,
  changeStatus,
  updatePartner,
  createPartner,
  getPartnerByUUID,
};
