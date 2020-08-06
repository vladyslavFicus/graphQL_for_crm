const { get, omitBy, isNil, groupBy } = require('lodash');
const moment = require('moment');
const {
  prepareAdditionalStatsUsersRegistration,
  getPaymentStatisticTotals,
  prepareRegistrationsData,
  getStatisticInitialArray,
} = require('../../../../utils/statisticHelpers');

module.exports = {
  /**
   * Affiliate API
   */
  partners(_, args, { dataSources }) {
    return dataSources.AffiliateAPI.getPartners(args);
  },
  partner(_, { uuid }, { dataSources }) {
    return dataSources.AffiliateAPI.getPartner(uuid);
  },

  /**
   * Attachments API
   */
  files(_, args, { dataSources }) {
    return dataSources.AttachmentsAPI.getFiles(args);
  },
  clientFiles(_, { clientUuid }, { dataSources }) {
    return dataSources.AttachmentsAPI.getClientFiles(clientUuid);
  },
  async filesCategories(_, __, { dataSources }) {
    const categories = await dataSources.AttachmentsAPI.getFilesCategories();

    return {
      ...categories,
      ADDRESS_VERIFICATION: categories.ADDRESS_VERIFICATION.filter(
        docType => docType !== 'PASSPORT' && docType !== 'EMPLOYER_LETTER',
      ),
    };
  },

  /**
   * Audit API
   */
  feeds(_, args, { dataSources }) {
    return dataSources.AuditAPI.getFeeds(args);
  },
  feedTypes(_, { uuid }, { dataSources }) {
    return dataSources.AuditAPI.getFeedTypes(uuid);
  },

  /**
   * Auth2 API
   */
  async authoritiesOptions(_, __, { dataSources, brand: { id: brand } }) {
    const responseData = await dataSources.Auth2API.getAuthorities(brand);

    const exceptDepartments = ['ADMINISTRATION', 'PLAYER', 'E2E'];
    const authorities = get(responseData, `authoritiesPerBrand.${brand}`) || [];

    const authoritiesOptions = authorities.reduce((acc, curr) => {
      if (exceptDepartments.includes(curr.department)) {
        return acc;
      }

      if (!Array.isArray(acc[curr.department])) {
        acc[curr.department] = [];
      }

      acc[curr.department].push(curr.role);

      return acc;
    }, {});

    return authoritiesOptions;
  },
  async permission(_, __, { dataSources }) {
    const { actions } = await dataSources.Auth2API.getPermissions();

    return actions;
  },
  loginLock(_, { uuid }, { dataSources }) {
    return dataSources.Auth2API.getCredentialsLock(uuid);
  },

  /**
   * BrandConfig API
   */
  brandConfig(_, { brandId }, { dataSources }) {
    return dataSources.BrandConfigAPI.getBrandConfig(brandId);
  },

  /**
   * Callback API
   */
  async callbacks(_, args, { dataSources, userUUID }) {
    const operatorIdsData = await dataSources.HierarchyAPI.getOperatorsSubtree(userUUID);
    const operatorIds = operatorIdsData.map(({ uuid }) => uuid);

    return dataSources.CallbackAPI.getCallbacks({ operatorIds, ...args });
  },
  async callback(_, { id }, { dataSources }) {
    const callbacksData = await dataSources.CallbackAPI.getCallbacks({ id, page: 0, limit: 1 });

    return callbacksData.content[0];
  },

  /**
   * Email API
   */
  emailTemplates(_, __, { dataSources }) {
    return dataSources.EmailAPI.getTemplates();
  },
  emailTemplate(_, { id }, { dataSources }) {
    return dataSources.EmailAPI.getTemplate(id);
  },

  /**
   * FilterSet API
   */
  filterSets(_, { type }, { dataSources, userUUID }) {
    return dataSources.FilterSetsAPI.getFilterSets(userUUID, type);
  },
  filterSet(_, { uuid }, { dataSources }) {
    return dataSources.FilterSetsAPI.getFilterSet(uuid);
  },

  /**
   * Hierarchy API
   */
  branch(_, { branchType, ...args }, { dataSources, userUUID }) {
    switch (branchType) {
      case 'office':
        return dataSources.HierarchyAPI.getOffice(userUUID, args);

      case 'team':
        return dataSources.HierarchyAPI.getTeam(userUUID, args);

      case 'desk':
        return dataSources.HierarchyAPI.getDesk(userUUID, args);

      default:
        return null;
    }
  },
  branchTree(_, { branchUuid }, { dataSources }) {
    return dataSources.HierarchyAPI.getBranchTree(branchUuid);
  },
  branchInfo(_, { branchId }, { dataSources }) {
    return dataSources.HierarchyAPI.getBranchInfo(branchId);
  },
  branchChildren(_, { uuid }, { dataSources }) {
    return dataSources.HierarchyAPI.getBranchChildren(uuid);
  },
  async userBranches(_, { withoutBrandFilter }, { dataSources, userUUID, brand }) {
    const args = withoutBrandFilter ? {} : { brandId: brand.id };
    const branches = await dataSources.HierarchyAPI.getUserBranches(userUUID, args);

    return groupBy(branches, 'branchType');
  },
  userHierarchy(_, __, { dataSources, userUUID }) {
    return dataSources.HierarchyAPI.getUserHierarchy(userUUID);
  },
  userHierarchyById(_, { uuid }, { dataSources }) {
    return dataSources.HierarchyAPI.getUserHierarchy(uuid);
  },
  async usersByBranch(_, { uuids, onlyActive }, { dataSources }) {
    const operatorsByBranch = await dataSources.HierarchyAPI.getUsersByBranch({ uuids });

    if (operatorsByBranch.length === 0) {
      return [];
    }

    const { content } = await dataSources.OperatorAPI.search({
      ...onlyActive && { status: 'ACTIVE' },
      uuids: operatorsByBranch.map(({ uuid }) => uuid),
      page: {
        from: 0,
        size: operatorsByBranch.length,
      },
    });

    const operators = operatorsByBranch.map(({ uuid, ...rest }) => {
      const { firstName, lastName } = content.find(item => item.uuid === uuid) || {};

      if (!firstName || !lastName) return null;

      return {
        uuid,
        fullName: [firstName, lastName].filter(v => v).join(' '),
        ...rest,
      };
    });

    return operators.filter(operator => operator && ['CUSTOMER', 'LEAD_CUSTOMER'].indexOf(operator.userType) === -1);
  },
  async usersByType(_, { userTypes, onlyActive }, { dataSources, userUUID }) {
    const allOperatorsByType = await dataSources.HierarchyAPI.getUsersByType(userTypes);

    const visibleUsersResponse = await dataSources.HierarchyAPI.getOperatorsSubtree(userUUID);
    const visibleUsers = visibleUsersResponse.map(({ uuid }) => uuid);

    const visibleOperatorsByType = allOperatorsByType.filter(({ uuid }) => visibleUsers.includes(uuid));

    const { content } = await dataSources.OperatorAPI.search({
      ...onlyActive && { status: 'ACTIVE' },
      uuids: visibleOperatorsByType.map(({ uuid }) => uuid),
      page: {
        from: 0,
        size: visibleOperatorsByType.length,
      },
    });

    const operators = visibleOperatorsByType.map(({ uuid, ...rest }) => {
      const { firstName, lastName } = content.find(item => item.uuid === uuid) || {};

      if (!firstName || !lastName) return null;

      return {
        uuid,
        fullName: [firstName, lastName].filter(v => v).join(' '),
        ...rest,
      };
    });

    return groupBy(operators, 'userType');
  },

  userBranchesTreeUp(_, { userUUID }, { dataSources }) {
    return dataSources.HierarchyAPI.getUserBranchesTreeUp(userUUID);
  },

  /**
   * Lead API
   */
  async leads(_, { args }, { dataSources, brand: { id: brandId } }) {
    return dataSources.LeadAPI.getLeads({ brandId, ...args });
  },
  async lead(_, { uuid }, { dataSources }) {
    return dataSources.LeadAPI.getLead(uuid);
  },

  /**
   * Note API
   */
  notes(_, { targetUUID, page, size, ...args }, { dataSources }) {
    return dataSources.NoteAPI.getNotes({
      ...args,
      targetUUIDs: [targetUUID],
      page: page || 0,
      size: size || 20,
    });
  },

  /**
   * NotificationCenter API
   */
  notificationCenter(_, { args }, { dataSources }) {
    const { hierarchical, ...argsBody } = args || {};

    return dataSources.NotificationCenterAPI.getNotifications({ ...argsBody, hierarchical: !!hierarchical });
  },
  notificationCenterTypes(_, __, { dataSources }) {
    return dataSources.NotificationCenterAPI.getTypes();
  },
  notificationCenterUnread(_, __, { dataSources }) {
    return dataSources.NotificationCenterAPI.getUnreadCount();
  },

  /**
   * Payment API
   */
  payments(_, args, { dataSources }) {
    return dataSources.PaymentAPI.getPayments({ ...args.args, withOriginalAgent: true });
  },
  clientPayments(_, args, { dataSources }) {
    return dataSources.PaymentAPI.getPayments(args.args);
  },
  async paymentMethods(_, __, { dataSources }) {
    const responseData = await dataSources.PaymentAPI.getPaymentMethods();

    return responseData.filter(method => method && method !== 'null').sort();
  },
  async manualPaymentMethods(_, __, { dataSources }) {
    const responseData = await dataSources.PaymentAPI.getManualPaymentMethods();

    return responseData.sort();
  },
  async paymentsStatistic(_, args, { dataSources }) {
    const responseData = await dataSources.PaymentAPI.getPaymentsStatistic(args);

    const { dateFrom, dateTo } = args;
    const { payments, totalAmount, totalCount, additionalStatistics } = responseData;
    let result = { items: [] };

    if (Array.isArray(payments) && payments.length) {
      const dateArray = getStatisticInitialArray(dateFrom, dateTo);

      const items = dateArray.map((date) => {
        const entity = payments.find(({ date: paymentDate }) => moment(date).diff(moment(paymentDate), 'days') === 0);
        return {
          amount: entity ? Number(entity.amount).toFixed(2) : 0,
          count: entity ? entity.count : 0,
          entryDate: date,
        };
      });

      result = {
        ...result,
        items,
        itemsTotal: {
          totalAmount,
          totalCount,
        },
      };
    }

    let additionalStatisticData = [];

    if (Array.isArray(additionalStatistics) && additionalStatistics.length) {
      additionalStatisticData = additionalStatistics.reduce(
        (acc, entry, index) => ({
          ...acc,
          additionalTotal: {
            ...acc.additionalTotal,
            ...getPaymentStatisticTotals(index, entry),
          },
        }),
        { additionalTotal: {} },
      );
    }

    return {
      ...result,
      ...additionalStatisticData,
    };
  },

  /**
   * Operator API
   */
  async operator(_, { uuid }, { dataSources }) {
    // Check allowance to see operator profile by hierarchy
    await dataSources.HierarchyAPI.checkAccess(uuid);

    return dataSources.OperatorAPI.getByUUID(uuid);
  },
  async operators(_, args, { dataSources, userUUID }) {
    // Drop undefined and nullable values from object (because BE service throw Error if null will be sent)
    const params = omitBy(args, isNil);

    const operatorsSubtree = await dataSources.HierarchyAPI.getOperatorsSubtree(userUUID);

    const operatorsIds = operatorsSubtree.map(({ uuid }) => uuid);

    return dataSources.OperatorAPI.search({
      ...params,
      uuids: operatorsIds,
      limit: operatorsIds.length,
    });
  },

  /**
   * Profile API && ProfileView API
   */
  profile(_, { playerUUID }, { dataSources }) {
    return dataSources.ProfileAPI.getByUUID(playerUUID);
  },
  profiles(_, { args }, { dataSources }) {
    return dataSources.ProfileViewAPI.search(args);
  },
  async registrationStatistic(_, args, { dataSources }) {
    const { additionalStatistics, registrations } = await dataSources.ProfileViewAPI.getRegistrationsStatistic(args);

    return {
      additionalStatistics: prepareAdditionalStatsUsersRegistration(additionalStatistics),
      registrations: prepareRegistrationsData(registrations),
    };
  },

  /**
   * Referral API
   */
  referrals(_, { uuid }, { dataSources }) {
    return dataSources.ReferralAPI.getReferralsByUUID(uuid);
  },

  /**
   * Rule API
   */
  rules(_, args, { dataSources, brand }) {
    return dataSources.RuleProfileAPI.search({ ...args, brandId: brand.id });
  },
  rulesRetention(_, args, { dataSources, brand }) {
    // Drop undefined and nullable values from object (because BE service throw Error if null will be sent)
    const params = omitBy(args, isNil);

    return dataSources.RulePaymentAPI.search({ ...params, brandId: brand.id });
  },

  /**
   * TradingAccount API && AccountView API
   */
  tradingAccounts(_, args, { dataSources }) {
    // Drop undefined and nullable values from object (because BE service throw Error if null will be sent)
    const params = omitBy(args, isNil);

    return dataSources.AccountViewAPI.getTradingAccounts(params);
  },
  clientTradingAccounts(_, args, { dataSources }) {
    // Drop undefined and nullable values from object (because BE service throw Error if null will be sent)
    const params = omitBy(args, isNil);

    return dataSources.TradingAccountAPI.getClientTradingAccounts(params);
  },

  /**
   * TradingActivity API
   */
  tradingActivity(_, args, { dataSources }) {
    return dataSources.TradingActivityAPI.getTradingActivity(args);
  },
};
