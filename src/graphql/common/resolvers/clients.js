const { get } = require('lodash');
const {
  requests: { bulkUpdateHierarchyUser, bulkMassAssignHierarchyUser },
} = require('../../../utils/hierarchy');
const { getProfiles, bulkUpdateSalesStasuses, bulkUpdateRetentionStasuses } = require('../../../utils/profile');

const CLIENTS_SIZE_LIMIT = 10000;

const bulkUpdate = async (body, request, authorization) => {
  const { error } = await request(body, authorization);

  if (error) {
    throw error;
  }
};

const bulkRepresentativeUpdate = async (_, args, { headers: { authorization } }) => {
  const {
    allRowsSelected,
    clients: clientsData,
    searchParams,
    salesRepresentative,
    salesStatus,
    retentionRepresentative,
    retentionStatus,
    totalElements,
    isMoveAction,
    type,
  } = args;

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

  try {
    if (salesStatus) {
      bulkUpdate(
        {
          salesStatus,
          uuids: clients.map(client => client.uuid),
        },
        bulkUpdateSalesStasuses,
        authorization
      );
    }

    if (retentionStatus) {
      bulkUpdate(
        {
          retentionStatus,
          uuids: clients.map(client => client.uuid),
        },
        bulkUpdateRetentionStasuses,
        authorization
      );
    }

    if (salesRepresentative || retentionRepresentative) {
      bulkUpdate(
        {
          parentUsers: salesRepresentative || retentionRepresentative,
          userUuids: clients.map(client => client.uuid),
        },
        bulkMassAssignHierarchyUser,
        authorization
      );
    }

    if (isMoveAction) {
      bulkUpdate(
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
        bulkUpdateHierarchyUser,
        authorization
      );
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  bulkRepresentativeUpdate,
};
