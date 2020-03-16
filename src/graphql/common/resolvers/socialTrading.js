const {
  getSocialTradingToken,
  getSocialTradingSubscribers,
  getSocialTradingProviders,
  getSocialTradingSubscribersOnProviders,
} = require('../../../utils/socialTrading');

const { tradingAccountQuery } = require('../../../utils/mt4requests');

const socialTradingResolver = async () => {
  return await getSocialTradingToken();
};

const getSubscribers = async (token, profileUuid, authorization) => {
  const tradingAccounts = await tradingAccountQuery({ accountType: 'LIVE', uuid: profileUuid }, authorization);

  const subscribers = await Promise.all(
    tradingAccounts.map(async tradingAccount => {
      return await getSocialTradingSubscribers(tradingAccount.login, token);
    })
  );

  return subscribers.flat(1);
};

const getProviders = async (token, profileUuid, authorization) => {
  const tradingAccounts = await tradingAccountQuery({ accountType: 'LIVE', uuid: profileUuid }, authorization);

  const providers = await Promise.all(
    tradingAccounts.map(async tradingAccount => {
      return await getSocialTradingProviders(tradingAccount.login, token);
    })
  );

  return providers.flat(1);
};

const getSubscriptionsOnProviders = async (token, providerId) => {
  return await getSocialTradingSubscribersOnProviders(providerId, token);
};

module.exports = {
  socialTradingResolver,
  getSubscribers,
  getProviders,
  getSubscriptionsOnProviders,
};
