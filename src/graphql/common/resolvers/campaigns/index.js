const rewards = require('./rewards');
const fulfillments = require('./fulfillments');
const campaigns = require('./campaigns');

module.exports = {
  rewards,
  fulfillments,
  ...campaigns,
};
