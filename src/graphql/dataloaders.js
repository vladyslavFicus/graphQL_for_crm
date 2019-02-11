const DataLoader = require('dataloader');
const orderByArray = require('../utils/orderByArray');
const { getOperatorsByUUIDs } = require('../utils/operatorRequests');
const { getNotes } = require('../utils/notesRequests');
const { getProfiles } = require('../utils/profile');
const { getHierarchyUsers } = require('../utils/hierarchyRequests');

exports.createDataloaders = (authorization, brandId) => ({
  operators: new DataLoader(async ids => {
    const { data } = await getOperatorsByUUIDs(ids, authorization);

    return orderByArray(ids, data.content, 'uuid');
  }),

  notes: new DataLoader(async ids => {
    const { data } = await getNotes({ targetUUID: ids, size: ids.length }, authorization);

    return orderByArray(ids, data.content, 'targetUUID');
  }),

  clients: new DataLoader(async ids => {
    const { data } = await getProfiles(brandId, { ids });

    return orderByArray(ids, data.content, 'playerUUID');
  }),

  usersHierarchy: new DataLoader(async ids => {
    const { data } = await getHierarchyUsers(ids, authorization);

    return orderByArray(ids, data, 'uuid');
  }),
});
