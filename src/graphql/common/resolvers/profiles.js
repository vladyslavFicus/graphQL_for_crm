const { getSearchData, queryBuild, parseToPageable } = require('../../../utils/ESSearchHelpers');
const { get } = require('lodash');
const moment = require('moment');
const accessValidate = require('../../../utils/accessValidate');

const profilesQuery = ({
  balanceFrom,
  balanceTo,
  ageFrom,
  ageTo,
  tradingBalanceFrom,
  tradingBalanceTo,
  registrationDateFrom,
  registrationDateTo,
  acquisitionStatus,
  countries,
  status,
  searchValue,
  city,
  currency,
  affiliateId,
  hierarchyUsers,
  repIds,
}) => [
  queryBuild.ids(hierarchyUsers),
  queryBuild.range('tradingProfile.balance', { gte: tradingBalanceFrom, lte: tradingBalanceTo }),
  queryBuild.range('totalBalance.amount', { gte: balanceFrom, lte: balanceTo }),
  queryBuild.range('birthDate', {
    gte: ageTo ? moment().subtract(ageTo, 'years') : undefined,
    lte: ageFrom ? moment().subtract(ageFrom, 'years') : undefined,
  }),
  queryBuild.range('registrationDate', { gte: registrationDateFrom, lte: registrationDateTo }),
  queryBuild.match('tradingProfile.aquisitionStatus', acquisitionStatus),
  queryBuild.match('currency', currency),
  queryBuild.match('affiliateId', affiliateId),
  queryBuild.match('profileStatus', status),
  queryBuild.match('city', city),
  queryBuild.match('country', countries, { type: 'array' }),
  queryBuild.queryString(['firstName', 'playerUUID', 'email'], searchValue, { prefix: '*', postfix: '*' }),
  queryBuild.should(
    [
      queryBuild.must(queryBuild.match('tradingProfile.aquisitionStatus', 'RETENTION')),
      queryBuild.mustNot(queryBuild.exists('tradingProfile.retentionRep')),
    ],
    [
      queryBuild.must(queryBuild.match('tradingProfile.aquisitionStatus', 'SALES')),
      queryBuild.mustNot(queryBuild.exists('tradingProfile.salesRep')),
    ]
  ),
  queryBuild.filter([
    queryBuild.match('tradingProfile.retentionRep', repIds, { type: 'array' }),
    queryBuild.match('tradingProfile.salesRep', repIds, { type: 'array' }),
  ]),
];

const sortParams = [{ registrationDate: { order: 'desc' } }];

const getProfiles = async function(_, { page, size, ...args }, context) {
  const access = await accessValidate(context);

  if (access.error) {
    return { error: access.error };
  }

  const { hierarchy } = context;
  const _args = hierarchy.buildQueryArgs(args, { hierarchyUsers: hierarchy.getCustomerIds() });

  const response = await getSearchData(context.brand.id, profilesQuery(_args), sortParams, { page, size }, 'profile');
  const error = get(response, 'error');

  if (error) {
    return { error };
  }

  return { data: parseToPageable(response, page, size) };
};

module.exports = {
  getProfiles,
};
