const { pickBy, omit, isEmpty } = require('lodash');
const { userTypes } = require('../../../constants/hierarchy');
const { createQueryHrznProfile, createQueryTradingProfile } = require('../../../utils/profile');
const { getLeads, getLeadById, updateLead, bulkUpdateLead } = require('../../../utils/leadRequests');
const { bulkMassAssignHierarchyUser } = require('../../../utils/hierarchyRequests');

const promoteLead = async args => {
  const profile = await createQueryHrznProfile(omit(args, ['phone']));

  if (profile.status !== 200) {
    return profile;
  }

  const tradingProfile = await createQueryTradingProfile({
    profileId: profile.data.playerUUID,
    brandId: args.brandId,
    email: args.email,
    phone1: args.phone,
    languageCode: args.languageCode,
  });

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
  const queryIds = allRecords ? hierarchy.getLeadCustomersIds() : leadIds;
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

  const { error, content, jwtError } = await getLeads(leadsArguments, authorization);

  if (error || jwtError) {
    return {
      error,
    };
  }

  const promises = [];
  const leadsToPromote =
    allRecords && leadIds.length > 0 ? content.filter(item => leadIds.indexOf(item.id) === -1) : content;

  leadsToPromote.forEach(({ email, name, surname, country, city, phone, language }) => {
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
    return { error: pageableObj };
  }
  const ids = pageableObj.data.content.map(({ id }) => id);

  if (excludeIds.length > 0) {
    return ids.filter(id => excludeIds.indexOf(id) === -1);
  }

  return ids;
};

const getIds = async ({ allRowsSelected, totalElements, ids, searchParams }, context) => {
  const {
    headers: { authorization },
    brand: { id: brandId },
  } = context;

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
  { allRowsSelected, ids, searchParams, totalElements, salesRep, teamId, type, salesStatus },
  context
) => {
  const {
    brand: { id: brandId },
    headers: { authorization },
  } = context;

  const idsForUpdate = await getIds({ allRowsSelected, searchParams, totalElements, ids }, context);

  const hierarchyArgs = {
    parentUsers: salesRep ? [salesRep] : [],
    userType: userTypes.LEAD_CUSTOMER,
    uuids: idsForUpdate,
  };

  const leadArgs = {
    ids: idsForUpdate,
    brandId,
    salesAgent: salesRep,
    salesStatus,
  };

  const leadBulkUpdate = await bulkUpdateLead(leadArgs, authorization);

  if (leadBulkUpdate.error) {
    return { error: leadBulkUpdate };
  }

  if (hierarchyArgs.parentUsers.length) {
    const hierarchyBulkUpdate = await bulkMassAssignHierarchyUser(hierarchyArgs, authorization);

    if (hierarchyBulkUpdate.error) {
      return { error: hierarchyBulkUpdate };
    }
  }

  return { data: 'success' };
};

const promoteLeadToClient = async (_, args, { brand: { id: brandId, currency } }) => {
  const { status, data, error } = await promoteLead({ brandId, currency, ...args });

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
  const _args = hierarchy.buildQueryArgs(args, { ids: hierarchy.getLeadCustomersIds() });
  const leads = await getLeads({ ..._args, brandId }, authorization);

  if (leads.error || leads.jwtError) {
    return {
      error: leads.error,
    };
  }

  return {
    data: leads,
  };
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
