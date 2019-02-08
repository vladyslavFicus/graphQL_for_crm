const DataLoader = require('dataloader');
const orderByArray = require('../utils/orderByArray');
const { getOperatorsByUUIDs } = require('../utils/operatorRequests');

exports.createDataloaders = authorization => ({
  operators: new DataLoader(async ids => {
    const { data } = await getOperatorsByUUIDs(ids, authorization);

    return orderByArray(ids, data.content, 'uuid');
  }),
});
