const DataLoader = require('dataloader');
const orderByArray = require('../utils/orderByArray');
const { getOperatorsByUUIDs } = require('../utils/operatorRequests');
const { getPartners } = require('../utils/partnerRequests');
const { getNotes } = require('../utils/notesRequests');
const { getProfiles, getClientsPersonalInfoQuery } = require('../utils/profile');
const {
  requests: { getHierarchyUsers },
} = require('../utils/hierarchy');

exports.createDataloaders = (authorization, brandId) => ({
  operators: new DataLoader(async ids => {
    const { data } = await getOperatorsByUUIDs({ uuids: ids }, authorization);

    return orderByArray(ids, data.content, 'uuid');
  }),

  activeOperators: new DataLoader(async ids => {
    const { data } = await getOperatorsByUUIDs({ uuids: ids, status: 'ACTIVE' }, authorization);

    return orderByArray(ids, data.content, 'uuid');
  }),

  partners: new DataLoader(async ids => {
    const { data } = await getPartners({ uuids: ids }, authorization);

    return orderByArray(ids, data.content, 'uuid');
  }),

  clients: new DataLoader(async ids => {
    const { data } = await getProfiles(brandId, { ids, size: ids.length });

    return orderByArray(ids, data.content, 'playerUUID');
  }),

  clientsPersonalInfo: new DataLoader(async uuids => {
    const { data } = await getClientsPersonalInfoQuery({ uuids }, authorization);

    return orderByArray(uuids, data, 'uuid');
  }),

  usersHierarchy: new DataLoader(async ids => {
    const { data } = await getHierarchyUsers(ids, authorization);

    return orderByArray(ids, data, 'uuid');
  }),
});
