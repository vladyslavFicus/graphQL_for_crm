const { get } = require('lodash');
const {
  requests: { bulkUpdateHierarchyUser, bulkMassAssignHierarchyUser },
} = require('../../../utils/hierarchy');
const { getProfiles, bulkUpdateSalesStasuses, bulkUpdateRetentionStasuses } = require('../../../utils/profile');

const CLIENTS_SIZE_LIMIT = 10000;

const getClientsToBulkUpdate = async (args, authorization) => {
  const { allRowsSelected, clients: clientsData, searchParams, totalElements } = args;

  const { searchLimit, ...filters } = searchParams || { searchLimit: totalElements };
  const bulkUpdateSize = searchLimit < CLIENTS_SIZE_LIMIT ? searchLimit : CLIENTS_SIZE_LIMIT;

  let clients = [];

  if (allRowsSelected) {
    const excludeUuids = clientsData.length !== totalElements ? clientsData.map(client => client.uuid) : [];

    const { data } = await getProfiles(
      {
        ...filters,
        page: {
          from: 0,
          size: bulkUpdateSize - excludeUuids.length,
        },
        fields: ['uuid', 'acquisition'],
        excludeByUuids: excludeUuids,
      },
      authorization
    );

    clients = get(data, 'content') || [];
  } else {
    clients = clientsData;
  }

  return clients;
};

const bulkRepresentativeUpdate = async (_, args, { headers: { authorization } }) => {
  const { salesRepresentative, salesStatus, retentionRepresentative, retentionStatus, isMoveAction, type } = args;

  let clients = await getClientsToBulkUpdate(args, authorization);

  if (salesStatus) {
    const { error } = await bulkUpdateSalesStasuses(
      {
        salesStatus,
        uuids: clients.map(client => client.uuid),
      },
      authorization
    );

    if (error) {
      return { error };
    }
  }

  if (retentionStatus) {
    const { error } = await bulkUpdateRetentionStasuses(
      {
        retentionStatus,
        uuids: clients.map(client => client.uuid),
      },
      authorization
    );

    if (error) {
      return { error };
    }
  }

  if (salesRepresentative || retentionRepresentative) {
    const { error } = await bulkMassAssignHierarchyUser(
      {
        parentUsers: salesRepresentative || retentionRepresentative,
        userUuids: clients.map(client => client.uuid),
      },
      authorization
    );

    if (error) {
      return { error };
    }
  }

  if (isMoveAction) {
    const { error } = await bulkUpdateHierarchyUser(
      {
        assignments: clients.map(client => ({
          uuid: client.uuid,
          assignToOperator:
            type === 'SALES'
              ? client.acquisition
                ? client.acquisition.salesRepresentative
                : client.salesRepresentative
              : client.acquisition
              ? client.acquisition.retentionRepresentative
              : client.retentionRepresentative,
        })),
      },
      authorization
    );

    if (error) {
      return { error };
    }
  }
};

module.exports = {
  bulkRepresentativeUpdate,
};
