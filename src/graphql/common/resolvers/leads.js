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

const getUpdateIds = async (promise, excludeIds) => {
  const pageableObj = await promise;

  if (pageableObj.error) {
    return pageableObj;
  }
  const ids = pageableObj.data.content.map(({ id }) => id);

  if (excludeIds.length > 0) {
    return ids.filter(id => excludeIds.indexOf(id) === -1);
  }

  return ids;
};

const getIds = async ({ allRowsSelected, totalElements, ids, searchParams }, context) => {
  if (allRowsSelected) {
    const queryParams = {
      page: 0,
      limit: totalElements,
      ...(searchParams && searchParams),
    };
    const idsForUpdate = await getUpdateIds(getTradingLeads(null, queryParams, context), ids);

    if (idsForUpdate.error || idsForUpdate.jwtError) {
      return { error: idsForUpdate };
    }

    return ids.length > 0 ? idsForUpdate.filter(id => !ids.includes(id)) : idsForUpdate;
  }

  return ids;
};

const bulkLeadUpdate = async (
  _,
  { allRowsSelected, ids, searchParams, totalElements, salesRep, teamId, salesStatus },
  context
) => {
  const {
    brand: { id: brandId },
    headers: { authorization },
  } = context;

  const idsForUpdate = await getIds({ allRowsSelected, searchParams, totalElements, ids }, context);

  if (idsForUpdate.error) {
    return idsForUpdate;
  }

  let hierarchyArgs = {
    parentUsers: salesRep || [],
    userType: userTypes.LEAD_CUSTOMER,
    uuids: idsForUpdate,
  };

  let leadArgs = {
    ids: idsForUpdate,
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

    leadArgs.salesAgent = defaultUser;
    hierarchyArgs.parentUsers = [defaultUser];
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

const getLeadProfile = (_, { leadId }, { headers: { authorization } }) => getLeadById(leadId, authorization);

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
