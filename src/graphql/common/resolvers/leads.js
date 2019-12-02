const { pickBy } = require('lodash');
const { getLeads, getLeadById, updateLead, bulkUpdateLead } = require('../../../utils/leadRequests');
const {
  requests: { bulkMassAssignHierarchyUser, getHierarchyBranch },
} = require('../../../utils/hierarchy');

const bulkLeadPromote = async (
  _,
  {
    allRecords,
    totalRecords,
    countries,
    searchKeyword,
    registrationDateEnd,
    registrationDateStart,
    salesStatus,
    leadIds,
  },
  { headers: { authorization }, brand: { id: brandId, currency }, hierarchy }
) => {
  const hierarchyLeadsIds = await hierarchy.getLeadsIds();
  const queryIds = allRecords ? hierarchyLeadsIds : leadIds;
  const leadsArguments = pickBy({
    limit: totalRecords,
    brandId,
    ids: queryIds,
    ...(allRecords && {
      countries,
      searchKeyword,
      registrationDateEnd,
      registrationDateStart,
      salesStatus,
    }),
  });

  const { error, content } = await getLeads(leadsArguments, authorization);

  if (error) {
    return { error };
  }

  const promises = [];
  const leadsToPromote =
    allRecords && leadIds.length > 0 ? content.filter(item => leadIds.indexOf(item.id) === -1) : content;

  leadsToPromote.forEach(({ email, name, surname, country, city, phone, mobile, language }) => {
    const request = promoteLead(
      {
        password: `A${Math.random().toString(36)}1#`,
        email,
        firstName: name,
        lastName: surname,
        country,
        brandId,
        city,
        currency,
        phone,
        phone2: mobile,
        languageCode: language,
      },
      authorization
    );

    promises.push(request);
  });

  const results = await Promise.all(promises);
  const result = results.reduce(
    (acc, { data, error, status }) => ({
      ...acc,
      ...(status === 200 ? { data: [...acc.data, data.playerUUID] } : { errors: [...acc.errors, error] }),
    }),
    { data: [], errors: [] }
  );

  return result;
};

const getDataForUpdate = async (promise, excludeIds) => {
  const pageableObj = await promise;

  if (pageableObj.error) {
    return pageableObj;
  }

  let data = pageableObj.data.content;

  if (excludeIds.length > 0) {
    data = data.filter(({ uuid }) => excludeIds.indexOf(uuid) === -1);
  }

  data = data.map(({ uuid, salesAgent }) => ({
    uuid,
    unassignFromOperator: salesAgent,
  }));

  if (!data.length) {
    return { error: 'Data is empty' };
  }

  return data;
};

const getLeadsUpdateData = async ({ allRowsSelected, totalElements, leads, searchParams }, context) => {
  if (!allRowsSelected || (allRowsSelected && leads.length === totalElements)) {
    return leads;
  }

  const queryParams = {
    page: 0,
    limit: totalElements,
    ...(searchParams && searchParams),
  };
  const excludeIds = leads.map(({ uuid }) => uuid);

  return getDataForUpdate(getTradingLeads(null, queryParams, context), excludeIds);
};

const bulkLeadUpdate = async (
  _,
  { allRowsSelected, leads, searchParams, totalElements, salesRep, teamId, salesStatus },
  context
) => {
  const {
    brand: { id: brandId },
    headers: { authorization },
  } = context;

  const updateData = await getLeadsUpdateData({ allRowsSelected, searchParams, totalElements, leads }, context);

  if (updateData.error) {
    return updateData;
  }

  let hierarchyArgs = {
    parentUsers: salesRep || [],
    userUuids: updateData.map(({ uuid }) => uuid),
  };

  let leadArgs = {
    uuids: updateData.map(({ uuid }) => uuid),
    brandId,
    ...(salesStatus && { salesStatus }),
  };

  if (teamId && !salesRep) {
    const {
      data: { defaultUser },
      error,
    } = await getHierarchyBranch(teamId, authorization);

    if (error) {
      return { error };
    }

    if (defaultUser) {
      hierarchyArgs.parentUsers = [defaultUser];
    }
  }

  if (salesStatus) {
    const leadBulkUpdate = await bulkUpdateLead(leadArgs, authorization);

    if (leadBulkUpdate.error) {
      return leadBulkUpdate;
    }
  }

  if (hierarchyArgs.parentUsers.length) {
    const hierarchyBulkUpdate = await bulkMassAssignHierarchyUser(hierarchyArgs, authorization);

    if (hierarchyBulkUpdate.error) {
      return hierarchyBulkUpdate;
    }
  }

  return { data: 'success' };
};

const getLeadProfile = async (_, { leadId }, { headers: { authorization }, hierarchy }) => {
  const allowed = await hierarchy.checkAccess(leadId);

  if (!allowed) {
    return {
      data: null,
      error: {
        error: 'Not Found',
      },
    };
  }

  return getLeadById(leadId, authorization);
};

const getTradingLeads = async (_, args, { headers: { authorization }, brand: { id: brandId }, hierarchy }) => {
  const observerForIds = await hierarchy.getObserverForIds();
  const _args = { ...args, brandId, observedFrom: observerForIds };

  // If phone provided in searchValue --> replace + and 00 from start
  const phone = _args.searchKeyword && _args.searchKeyword.match(/^(?:00|\+)(\d+)/);

  if (phone && phone[1]) {
    _args.searchKeyword = phone[1];
  }

  return getLeads(_args, authorization);
};

const updateLeadProfile = (_, args, { headers: { authorization }, brand: { id: brandId } }) => {
  return updateLead({ brandId, ...args }, authorization);
};

module.exports = {
  getTradingLeads,
  getLeadProfile,
  bulkLeadPromote,
  bulkLeadUpdate,
  updateLeadProfile,
};
