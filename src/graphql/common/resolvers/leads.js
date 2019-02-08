const { pickBy, omit } = require('lodash');
const { userTypes } = require('../../../constants/hierarchy');
const { createQueryHrznProfile, createQueryTradingProfile } = require('../../../utils/profile');
const { getLeads, getLeadById, updateLead, bulkUpdateLead } = require('../../../utils/leadRequests');
const { bulkMassAssignHierarchyUser, getHierarchyBranch } = require('../../../utils/hierarchyRequests');

const promoteLead = async (args, authorization) => {
  const profile = await createQueryHrznProfile(omit(args, ['phone']));

  if (profile.status !== 200) {
    return profile;
  }

  const tradingProfile = await createQueryTradingProfile(
    {
      profileId: profile.data.playerUUID,
      brandId: args.brandId,
      email: args.email,
      phone1: args.phone,
      phone2: args.phone2,
      languageCode: args.languageCode,
      leadUuid: args.leadUuid,
    },
    authorization
  );

  if (tradingProfile.status !== 200) {
    return tradingProfile;
  }

  return profile;
};

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
  const data = pageableObj.data.content.map(({ id, salesAgent }) => ({
    uuid: id,
    unassignFrom: salesAgent,
  }));

  if (excludeIds.length > 0) {
    return data.filter(({ uuid }) => excludeIds.indexOf(uuid) === -1);
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
  const data = await getDataForUpdate(getTradingLeads(null, queryParams, context), excludeIds);

  if (data.error) {
    return data;
  }

  return data;
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
    userType: userTypes.LEAD_CUSTOMER,
    users: updateData,
  };

  let leadArgs = {
    ids: updateData.map(({ uuid }) => uuid),
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

const promoteLeadToClient = async (_, args, { brand: { id: brandId, currency }, headers: { authorization } }) => {
  const { status, data, error } = await promoteLead({ brandId, currency, ...args }, authorization);

  if (status !== 200) {
    return { error };
  }

  return { data };
};

const getLeadProfile = async (_, { leadId }, { headers: { authorization } }) => {
  const lead = await getLeadById(leadId, authorization);

  if (lead.error) {
    return {
      error: lead.error,
    };
  }

  return {
    data: lead,
  };
};

const getTradingLeads = async (_, args, { headers: { authorization }, brand: { id: brandId }, hierarchy }) => {
  const leadsIds = await hierarchy.getLeadsIds();
  const _args = { ...args, brandId, ids: leadsIds };

  // If phone provided in searchValue --> replace + and 00 from start
  const phone = _args.searchKeyword && _args.searchKeyword.match(/^(?:00|\+)(\d+)/);

  if (phone && phone[1]) {
    _args.searchKeyword = phone[1];
  }

  return getLeads(_args, authorization);
};

const updateLeadProfile = async (_, args, { headers: { authorization }, brand: { id: brandId } }) => {
  const { status, data } = await updateLead({ brandId, ...args }, authorization);

  if (status !== 200) {
    return {
      error: data,
    };
  }

  const lead = await getLeadById(args.id, authorization);

  return {
    data: lead,
  };
};

module.exports = {
  getTradingLeads,
  getLeadProfile,
  bulkLeadPromote,
  bulkLeadUpdate,
  promoteLeadToClient,
  updateLeadProfile,
};
