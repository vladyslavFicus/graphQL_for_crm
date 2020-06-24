const DataLoader = require('dataloader');
const orderByArray = require('../utils/orderByArray');
const { getOperatorsByUUIDs } = require('../utils/operatorRequests');
const {
  requests: { getHierarchyUsers },
} = require('../utils/hierarchy');

exports.createDataloaders = authorization => ({
  operators: new DataLoader(async (ids) => {
    const { data } = await getOperatorsByUUIDs({ uuids: ids }, authorization);

    return orderByArray(ids, data.content, 'uuid');
  }),

  activeOperators: new DataLoader(async (ids) => {
    const { data } = await getOperatorsByUUIDs({ uuids: ids, status: 'ACTIVE' }, authorization);

    return orderByArray(ids, data.content, 'uuid');
  }),

  usersHierarchy: new DataLoader(async (ids) => {
    const { data } = await getHierarchyUsers(ids, authorization);

    return orderByArray(ids, data, 'uuid');
  }),
});
