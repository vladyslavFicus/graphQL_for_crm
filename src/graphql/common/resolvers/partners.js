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
  return getOperatorsByUUIDs(partnersIds, authorization);
};

const getForexOperatorByUUID = async ({ uuid }, _, { headers: { authorization } }) =>
  getForexOperatorRequest(uuid, authorization);

const getPartnerByUUID = async (_, { uuid }, { headers: { authorization } }) =>
  getOperatorByUUIDRequest(uuid, authorization);

const createPartner = async (_, { password, ...args }, context) => {
  const {
    headers: { authorization },
    brand: { id: brandId },
  } = context;
  const partner = await createOperator(
    _,
    {
      ...args,
      department: 'AFFILIATE_PARTNER',
      role: 'ROLE1',
      userType: 'AFFILIATE_PARTNER',
      sendMail: false,
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

  const token = await resetTokenRequest(partner.data.uuid, authorization);
  const activateOperator = await activateOperatorRequest(
    {
      password,
      token,
    },
    authorization,
    brandId
  );

  return {
    data: {
      ...partner.data,
    },
    error: get(forexOperator, 'error') || get(activateOperator, 'error'),
  };
};

const updatePartner = async (
  _,
  { allowedIpAddresses, forbiddenCountries, showNotes, showSalesStatus, ...args },
  { headers: { authorization } }
) => {
  const operator = await updateOperatorRequest(args, authorization);

  const forexOperatorRequestBody = {
    permission: {
      allowedIpAddresses,
      forbiddenCountries,
      showNotes,
      showSalesStatus,
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
