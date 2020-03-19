const {
  getSocialTradingToken,
  getSocialTradingSubscribers,
  getSocialTradingProviders,
  getSocialTradingSubscribersOnProviders,
} = require('../../../utils/socialTrading');

const { tradingAccountQuery } = require('../../../utils/mt4Requests');

const socialTradingResolver = async () => {
  return await getSocialTradingToken();
};

const getSubscribers = async (token, profileUuid, authorization) => {
  const tradingAccounts = await tradingAccountQuery({ accountType: 'LIVE', uuid: profileUuid }, authorization);

  const subscribers = await Promise.all(
    tradingAccounts.map(async tradingAccount => {
      const result = await getSocialTradingSubscribers(tradingAccount.login, token);

      return result.error ? undefined : result;
    })
  );

  return subscribers.filter(subscriber => !!subscriber).flat(1);
};

const getProviders = async (token, profileUuid, authorization) => {
  const tradingAccounts = await tradingAccountQuery({ accountType: 'LIVE', uuid: profileUuid }, authorization);

  const providers = await Promise.all(
    tradingAccounts.map(async tradingAccount => {
      const result = await getSocialTradingProviders(tradingAccount.login, token);

      return result.error ? undefined : result;
    })
  );

  return providers.filter(provider => !!provider).flat(1);
};

const getSubscriptionsOnProviders = async (token, providerId) => {
  const result = await getSocialTradingSubscribersOnProviders(providerId, token);

  return result.length > 0 ? result : [];
};

module.exports = {
  socialTradingResolver,
  getSubscribers,
  getProviders,
  getSubscriptionsOnProviders,
};
