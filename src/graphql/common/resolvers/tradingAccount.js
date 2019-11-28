const { getProfile } = require('../resolvers/profile');
const {
  createTradingAccount,
  updateTradingAccount,
  tradingAccountChangePassword,
  tradingAccountQuery,
} = require('../../../utils/mt4Requests');

const createTradingAccountResolver = async (
  _,
  { profileId, name, currency, password, accountType, amount },
  context
) => {
  const { data, error } = await getProfile(_, { playerUUID: profileId }, context);

  if (error) {
    return { success: false };
  }

  const {
    brand: { id: brandId },
    headers: { authorization },
  } = context;

  const { address, city, country, email, phoneNumber: phone, state, postCode: zipCode } = data;

  const args = {
    profileId,
    currency,
    name,
    password,
    address,
    brandId,
    city,
    country,
    email,
    login: 0,
    phone,
    state,
    status: '',
    zipCode,
    accountType,
    amount,
  };

  const acc = await createTradingAccount(args, authorization);

  return {
    success: !acc.error,
    ...(acc.error && acc),
  };
};

const updateTradingAccountResolver = async (_, args, context) => {
  const {
    brand: { id: brandId },
    headers: { authorization },
  } = context;

  const acc = await updateTradingAccount({ ...args, brandId }, authorization);

  return {
    success: !acc.error,
    ...(acc.error && acc),
  };
};

const tradingAccountChangePasswordResolver = async (_, { login, password }, { headers: { authorization } }) => {
  const response = await tradingAccountChangePassword({ login, password }, authorization);

  return {
    success: !response.error,
    ...(response.error && response),
  };
};

const getTradingAccounts = async (_, args, { headers: { authorization } }) => {
  return await tradingAccountQuery(args, authorization);
};

module.exports = {
  createTradingAccountResolver,
  updateTradingAccountResolver,
  tradingAccountChangePasswordResolver,
  getTradingAccounts,
};
