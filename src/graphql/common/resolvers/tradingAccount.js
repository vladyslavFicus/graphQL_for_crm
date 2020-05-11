const { getProfileNew } = require('../resolvers/profile');
const {
  createTradingAccount,
  updateTradingAccount,
  tradingAccountChangePassword,
  tradingAccountQuery,
  tradingAccountsQuery,
  changeLeverage,
  rejectChangeLeverage,
  approveChangeLeverage,
} = require('../../../utils/mt4Requests');

const createTradingAccountResolver = async (
  _,
  { profileId, name, currency, password, accountType, platformType, amount },
  context
) => {
  const { data, error } = await getProfileNew(_, { playerUUID: profileId }, context);
  if (error) {
    return { success: false };
  }

  const {
    brand: { id: brandId },
    headers: { authorization },
  } = context;

  const {
    address: { address, city, countryCode: country, state, postCode: zipCode },
    contacts: { email, phone },
  } = data;

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
    platformType,
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

const tradingAccountChangePasswordResolver = async (_, args, { headers: { authorization } }) => {
  const response = await tradingAccountChangePassword(args, authorization);

  return {
    success: !response.error,
    ...(response.error && response),
  };
};

const getTradingAccounts = async (_, args, { headers: { authorization } }) => {
  return await tradingAccountQuery(args, authorization);
};

const getTradingAccountsList = (_, args, { headers: { authorization } }) => {
  return tradingAccountsQuery(args, authorization);
};

const changeLeverageResolver = (_, args, { headers: { authorization } }) => {
  return changeLeverage(args, authorization);
};

const approveChangeLeverageResolver = (_, args, { headers: { authorization } }) => {
  return approveChangeLeverage(args, authorization);
};

const rejectChangeLeverageResolver = (_, args, { headers: { authorization } }) => {
  return rejectChangeLeverage(args, authorization);
};

module.exports = {
  createTradingAccountResolver,
  updateTradingAccountResolver,
  tradingAccountChangePasswordResolver,
  getTradingAccounts,
  getTradingAccountsList,
  changeLeverageResolver,
  rejectChangeLeverageResolver,
  approveChangeLeverageResolver,
};
