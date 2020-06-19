const {
  tradingAccountQuery, // will be removed after ProfileViewType will be removed
} = require('../../../utils/mt4Requests');

// # Can be removed after ProfileViewType will be removed
const getTradingAccounts = async (_, args, { headers: { authorization } }) => {
  return await tradingAccountQuery(args, authorization);
};

module.exports = {
  getTradingAccounts, // will be removed after ProfileViewType will be removed
};
