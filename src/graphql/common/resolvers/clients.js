const {
  requests: { bulkUpdateHierarchyUser, bulkMassAssignHierarchyUser },
} = require('../../../utils/hierarchy');
const { getProfiles, bulkUpdateSalesStasuses, bulkUpdateRetentionStasuses } = require('../../../utils/profile');

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

  let clients = [];
  const filters = searchParams || {};
  const bulkUpdateSize = totalElements < 10000 ? totalElements : 10000;

  if (allRowsSelected) {
    const excludeUuids = clientsData.length !== totalElements ? clientsData.map(client => client.uuid) : [];

    const getProfilesResponse = await getProfiles(
      {
        ...filters,
        page: {
          from: 0,
          size: bulkUpdateSize,
        },
        fields: ['uuid', 'acquisition'],
        excludeByUuids: excludeUuids,
      },
      authorization
    );

    clients = getProfilesResponse.data.content;
  } else {
    clients = clientsData;
  }

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
