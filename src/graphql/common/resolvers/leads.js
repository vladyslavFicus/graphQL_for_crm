const { pickBy, omit, isEmpty } = require('lodash');
const { createQueryHrznProfile, createQueryTradingProfile } = require('../../../utils/profile');
const { getLeads, getLeadById, updateLead } = require('../../../utils/leadRequests');
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

const getIds = async ({ allRowsSelected, totalElements, leadIds, ...searchParams }, { authorization, brandId }) => {
  console.log('searchParams', searchParams);
  if (allRowsSelected) {
    const queryParams = {
      page: 1,
      size: totalElements,
      brandId,
      ...(!isEmpty(searchParams) && searchParams),
    };
    console.log('queryParams', queryParams);
    const idsForUpdate = await getLeads(queryParams, authorization);

    if (idsForUpdate.error || idsForUpdate.jwtError) {
      return { error: idsForUpdate };
    }

    return leadIds.length > 0 ? idsForUpdate.filter(id => !leadIds.includes(id)) : idsForUpdate;
  }

  return leadIds;
};

const bulkLeadUpdate = async (
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
  { headers: { authorization }, brand: { id: brandId } }
) => {
  // console.log('DITCH');
  console.log('ARGS', {
    allRecords,
    totalRecords,
    countries,
    searchKeyword,
    registrationDateEnd,
    registrationDateStart,
    salesStatus,
    leadIds,
  });
  const getUpdateIds = await getIds(
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
    { authorization, brandId }
  );

  console.log('getUpdateIds', getUpdateIds);
  // const request = await bulkMassAssignHierarchyUser(args, authorization);
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
