const { get } = require('lodash');
const moment = require('moment');
const { aquisitionStatuses, assignStatuses, firstDepositStatuses } = require('../constants/profile');
const fetch = require('./fetch');
const parseJson = require('./parseJson');
const buildQueryString = require('./buildQueryString');
const { getSearchData, queryBuild, parseToPageable } = require('./ESSearchHelpers');

const profilesQuery = ({
  ids,
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
  repIds,
  assignStatus,
  kycStatus,
  firstDeposit,
  salesStatuses,
  retentionStatuses,
  searchAffiliate,
  migrationId,
}) => [
  queryBuild.ids(ids),
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
  queryBuild.multiMatch(
    [
      'firstName',
      'lastName',
      'playerUUID',
      'email',
      'tradingProfile.email2',
      'tradingProfile.phone1',
      'tradingProfile.phone2',
      'tradingProfile.mt4Users.login',
    ],
    searchValue
  ),
  queryBuild.match('tradingProfile.migrationId', migrationId),
  searchAffiliate &&
    queryBuild.shouldTerm(
      queryBuild.term(['tradingProfile.affiliateProfileDocument.source'], searchAffiliate),
      queryBuild.term(['tradingProfile.affiliateProfileDocument.affiliateUuid'], searchAffiliate)
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
  repIds &&
    queryBuild.should(
      [queryBuild.must(queryBuild.match('tradingProfile.retentionRep', repIds))],
      [queryBuild.must(queryBuild.match('tradingProfile.salesRep', repIds))]
    ),
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

const getProfiles = async function(brandId, { page, size, ...args }) {
  // If phone provided in searchValue --> replace + and 00 from start
  const phone = args.searchValue && args.searchValue.match(/^(?:00|\+)(\d+)/);

  if (phone && phone[1]) {
    args.searchValue = phone[1];
  }

  const response = await getSearchData(brandId, profilesQuery(args), sortParams, { page, size }, 'profile');
  const error = get(response, 'error');

  if (error) {
    return { error };
  }

  return { data: parseToPageable(response, page, size) };
};

const createQueryTradingProfile = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_profile/v2/conversion/lead`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json().then(({ data, error }) => ({ status: response.status, data, error })));
};

const updateQueryTradingProfile = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_profile/v2/`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const updateQueryProfile = (args, playerUUID, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/profile/profiles/${playerUUID}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization,
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};

const checkMigrationQuery = (_, args) =>
  fetch(`${global.appConfig.apiUrl}/trading_profile_updater/public/migration/check`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());

module.exports = {
  createQueryTradingProfile,
  updateQueryTradingProfile,
  updateQueryProfile,
  getProfiles,
  checkMigrationQuery,
};
