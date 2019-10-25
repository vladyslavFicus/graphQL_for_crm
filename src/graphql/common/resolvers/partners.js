const { get } = require('lodash');
const {
  updateOperator: updateOperatorRequest,
  getOperatorsByUUIDs,
  resetToken: resetTokenRequest,
  activateOperator: activateOperatorRequest,
  getOperatorByUUID: getOperatorByUUIDRequest,
} = require('../../../utils/operatorRequests');
const {
  getForexOperator: getForexOperatorRequest,
  createForexOperator: createForexOperatorRequest,
  updateForexOperator: updateForexOperatorRequest,
} = require('../../../utils/partnerRequests');
const { createOperator } = require('./operators');

const getPartners = async (_, args, { headers: { authorization }, hierarchy }) => {
  const partnersIds = await hierarchy.getPartnersIds();
  return getOperatorsByUUIDs({ ...args, uuids: partnersIds }, authorization);
};

const getForexOperatorByUUID = async ({ uuid }, _, { headers: { authorization } }) =>
  getForexOperatorRequest(uuid, authorization);

const getPartnerByUUID = async (_, { uuid }, { headers: { authorization }, hierarchy }) => {
  const allowed = await hierarchy.checkAccess(uuid);

  if (!allowed) {
    return {
      data: null,
      error: {
        error: 'Not Found',
      },
    };
  }

  return getOperatorByUUIDRequest(uuid, authorization);
};

const createPartner = async (_, { password, ...args }, context) => {
  const {
    headers: { authorization },
    brand: { id: brandId },
  } = context;
  const partner = await createOperator(
    _,
    {
      ...args,
      password,
      department: 'AFFILIATE_PARTNER',
      role: 'ROLE1',
      userType: 'AFFILIATE_PARTNER',
    },
    context
  );

  if (partner.error) return partner;

  const forexOperator = await createForexOperatorRequest(
    {
      permission: {
        allowedIpAddresses: [],
        forbiddenCountries: [],
      },
      uuid: partner.data.uuid,
    },
    authorization
  );

  return {
    data: partner.data,
    error: get(forexOperator, 'error'),
  };
};

const updatePartner = async (
  _,
  { allowedIpAddresses, forbiddenCountries, showNotes, showSalesStatus, showFTDAmount, ...args },
  { headers: { authorization } }
) => {
  const operator = await updateOperatorRequest(args, authorization);

  const forexOperatorRequestBody = {
    permission: {
      allowedIpAddresses,
      forbiddenCountries,
      showNotes,
      showSalesStatus,
      showFTDAmount,
    },
    uuid: args.uuid,
  };

  const forexOperator = await updateForexOperatorRequest(forexOperatorRequestBody, authorization);

  return {
    data: {
      ...operator.data,
      forexOperator: forexOperator.data,
    },
    error: operator.error || forexOperator.error,
  };
};

module.exports = {
  getPartners,
  updatePartner,
  createPartner,
  getForexOperatorByUUID,
  getPartnerByUUID,
};
