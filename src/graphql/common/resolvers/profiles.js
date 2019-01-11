const { getSearchData, queryBuild, parseToPageable } = require('../../../utils/ESSearchHelpers');
const { get } = require('lodash');
const moment = require('moment');
const accessValidate = require('../../../utils/accessValidate');
const { aquisitionStatuses, assignStatuses, firstDepositStatuses } = require('../../../constants/profile');

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
  assignStatus,
  kycStatus,
  firstDeposit,
  salesStatuses,
  retentionStatuses,
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
  queryBuild.queryString(
    ['firstName', 'playerUUID', 'email', 'tradingProfile.phone1', 'tradingProfile.phone2'],
    searchValue,
    { prefix: '*', postfix: '*' }
  ),
  assignStatus === assignStatuses.UN_ASSIGN &&
    queryBuild.should(
      [
        queryBuild.must(queryBuild.match('tradingProfile.aquisitionStatus', aquisitionStatuses.RETENTION)),
        queryBuild.mustNot(queryBuild.exists('tradingProfile.retentionRep')),
      ],
      [
        queryBuild.must(queryBuild.match('tradingProfile.aquisitionStatus', aquisitionStatuses.SALES)),
        queryBuild.mustNot(queryBuild.exists('tradingProfile.salesRep')),
      ]
    ),
  assignStatus === assignStatuses.ASSIGN &&
    queryBuild.should(
      [
        queryBuild.must(queryBuild.match('tradingProfile.aquisitionStatus', aquisitionStatuses.SALES)),
        queryBuild.must(queryBuild.exists('tradingProfile.salesRep')),
      ],
      [
        queryBuild.must(queryBuild.match('tradingProfile.aquisitionStatus', aquisitionStatuses.RETENTION)),
        queryBuild.must(queryBuild.exists('tradingProfile.retentionRep')),
      ]
    ),
  queryBuild.filter([
    queryBuild.match('tradingProfile.retentionRep', repIds, { type: 'array' }),
    queryBuild.match('tradingProfile.salesRep', repIds, { type: 'array' }),
  ]),
  queryBuild.match('tradingProfile.kycStatus', kycStatus),
  firstDeposit === firstDepositStatuses.YES && queryBuild.exists('tradingProfile.firstDepositDate'),
  firstDeposit === firstDepositStatuses.NO &&
    queryBuild.bool(queryBuild.mustNot(queryBuild.exists('tradingProfile.firstDepositDate'))),
  salesStatuses &&
    queryBuild.should([
      queryBuild.must(queryBuild.match('tradingProfile.aquisitionStatus', aquisitionStatuses.SALES)),
      queryBuild.must(queryBuild.match('tradingProfile.salesStatus', salesStatuses)),
    ]),
  retentionStatuses &&
    queryBuild.should([
      queryBuild.must(queryBuild.match('tradingProfile.aquisitionStatus', aquisitionStatuses.RETENTION)),
      queryBuild.must(queryBuild.match('tradingProfile.retentionStatus', retentionStatuses)),
    ]),
];

const sortParams = [{ registrationDate: { order: 'desc' } }];

const getProfiles = async function(_, { page, size, ...args }, context) {
  const access = await accessValidate(context);

  if (access.error) {
    return { error: access.error };
  }

  const customersIds = await context.hierarchy.getCustomersIds();
  const _args = { ...args, hierarchyUsers: customersIds };

  // If phone provided in searchValue --> replace + and 00 from start
  const phone = _args.searchValue && _args.searchValue.match(/^(?:00|\+)(\d+)/);

  if (phone && phone[1]) {
    _args.searchValue = phone[1];
  }

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
