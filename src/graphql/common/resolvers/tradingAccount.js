const fetch = require('../../../utils/fetch');
const parseJson = require('../../../utils/parseJson');
const { getProfile } = require('../resolvers/profile');
const {
  getAvailableCurrencies,
  createTradingAccount,
  tradingAccountChangePassword,
} = require('../../../utils/mt4Requests');

const getAvailableCurrenciesResolver = (_, args, { headers: { authorization }, brand: { id: brandId } }) => {
  return getAvailableCurrencies(brandId, authorization);
};

const createTradingAccountResolver = async (_, { profileId, name, mode, currency, password }, context) => {
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
    mode,
  };

  return createTradingAccount(args, authorization).then(success => ({ success }));
};

const tradingAccountChangePasswordResolver = (_, { login, password }, { headers: { authorization } }) => {
  return tradingAccountChangePassword({ login, password }, authorization).then(success => ({ success }));
};

module.exports = {
  getAvailableCurrenciesResolver,
  createTradingAccountResolver,
  tradingAccountChangePasswordResolver,
};
