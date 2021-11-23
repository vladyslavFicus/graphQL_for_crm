const { get, omitBy, isNil, groupBy } = require('lodash');
const moment = require('moment');
const config = require('config');
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
  cdePartners(_, __, { dataSources }) {
    return dataSources.AffiliateAPI.getCdePartners();
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
  async allActions(_, __, { dataSources }) {
    const { actions } = await dataSources.Auth2API.getAllActions();

    return actions.sort();
  },
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
  async authorityActions(_, { department, role }, { dataSources, brand }) {
    const { actions } = await dataSources.Auth2API.getActions(brand.id, department, role);

    return actions.sort();
  },
  async permission(_, __, { dataSources }) {
    const { actions } = await dataSources.Auth2API.getPermissions();

    return actions;
  },
  loginLock(_, { uuid }, { dataSources }) {
    return dataSources.Auth2API.getCredentialsLock(uuid);
  },
  async brandToAuthorities(_, __, { dataSources }) {
    // Using token renew endpoint to get brandsToAuthorities because BE haven't endpoint to get relation
    // "brand to authority" for clipped token (on operator sign in without choose department) and full token
    const { brandToAuthorities } = await dataSources.Auth2API.tokenRenew();

    return brandToAuthorities;
  },
  async isDefaultAuthority(_, { department, role }, { dataSources }) {
    try {
      await dataSources.Auth2API.checkDefaultAuthority(department, role);

      return true;
    } catch (e) {
      return false;
    }
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
    const callbacksData = await dataSources.CallbackAPI.getCallbacks({ searchKeyword: id, page: 0, limit: 1 });

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
  branchInfo(_, { branchId }, { dataSources }) {
    return dataSources.HierarchyAPI.getBranchInfo(branchId);
  },
  branchChildren(_, { uuid }, { dataSources }) {
    return dataSources.HierarchyAPI.getBranchChildren(uuid);
  },
  branchUsers(_, { branchUuid }, { dataSources }) {
    return dataSources.HierarchyAPI.getBranchUsers(branchUuid);
  },
  async userBranches(_, { withoutBrandFilter, brandId }, { dataSources, userUUID, brand }) {
    const args = withoutBrandFilter ? {} : { brandId: brandId || brand.id };
    const branches = await dataSources.HierarchyAPI.getUserBranches(userUUID, args);

    return groupBy(branches, 'branchType');
  },
  userHierarchy(_, __, { dataSources, userUUID }) {
    return dataSources.HierarchyAPI.getUserHierarchy(userUUID);
  },
  userHierarchyById(_, { uuid }, { dataSources }) {
    return dataSources.HierarchyAPI.getUserHierarchy(uuid);
  },
  userBranchesTreeUp(_, { userUUID }, { dataSources }) {
    return dataSources.HierarchyAPI.getUserBranchesTreeUp(userUUID);
  },
  treeTop(_, __, { dataSources }) {
    return dataSources.HierarchyAPI.getTreeTop();
  },
  treeBranch(_, { uuid }, { dataSources }) {
    return dataSources.HierarchyAPI.getTreeBranch(uuid);
  },

  /**
   * Lead API
   */
  leads(_, { args }, { dataSources, brand: { id: brandId } }) {
    return dataSources.LeadAPI.getLeads({ brandId, ...args });
  },
  lead(_, { uuid }, { dataSources }) {
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
  notificationCenterConfiguration(_, __, { dataSources }) {
    return dataSources.NotificationCenterAPI.getConfiguration();
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
  operatorsByBrand(_, args, { dataSources, userUUID }) {
    return dataSources.OperatorAPI.searchByBrand(userUUID, args);
  },
  operatorsSubordinates(_, args, { dataSources, userUUID, brand }) {
    return dataSources.OperatorAPI.getSubordinateOperators({
      userUUID,
      brandId: brand.id,
      ...args,
    });
  },
  operatorRelationsCount(_, { uuid }, { dataSources }) {
    return dataSources.OperatorAPI.getRelationsCount(uuid);
  },

  /**
   * Profile API && ProfileView API
   */
  profile(_, { playerUUID }, { dataSources }) {
    return dataSources.ProfileAPI.getByUUID(playerUUID);
  },
  profileContacts(_, { playerUUID }, { dataSources }) {
    return dataSources.ProfileAPI.getProfileContacts(playerUUID);
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
  referrerStatistics(_, { uuid }, { dataSources }) {
    return dataSources.ReferralAPI.getReferrerStatistics(uuid);
  },
  referrals(_, { uuid }, { dataSources }) {
    return dataSources.ReferralAPI.getReferralsByUUID(uuid);
  },

  /**
   * Rule API
   */
  rules(_, args, { dataSources, brand }) {
    return dataSources.RuleProfileAPI.search({ ...args, brandId: brand.id });
  },

  /**
   * Distribution Rule API
   */
  distributionRules(_, { args }, { dataSources }) {
    // Drop undefined and nullable values from object (because BE service throw Error if null will be sent)
    const params = omitBy(args, isNil);

    return dataSources.DistributionRuleAPI.search(params);
  },
  distributionClientsAmount(_, { uuid }, { dataSources }) {
    return dataSources.DistributionRuleAPI.getClientsAmount(uuid);
  },
  distributionRule(_, { uuid }, { dataSources }) {
    return dataSources.DistributionRuleAPI.getRule(uuid);
  },
  distributionRuleClientsAmount(_, args, { dataSources }) {
    return dataSources.DistributionRuleAPI.getRuleClientsAmount(args);
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
   * Trading Engine API
   */
  tradingEngineAccounts(_, { args }, { dataSources }) { // eslint-disable-line
    // Drop undefined and nullable values from object (because BE service throw Error if null will be sent)
    const params = omitBy(args, isNil); // eslint-disable-line

    return dataSources.TradingEngineAPI.getAccounts(params);
  },
  tradingEngineAccount(_, { identifier }, { dataSources }) {
    return dataSources.TradingEngineAPI.getAccountByIdentifier(identifier);
  },
  tradingEngineOrders(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.getOrders(args);
  },
  tradingEngineOrder(_, { orderId }, { dataSources }) {
    return dataSources.TradingEngineAPI.getOrder(orderId);
  },
  tradingEngineSymbols(_, __, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbols();
  },
  tradingEngineSecurities(_, __, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSecurities();
  },
  tradingEngineSymbol(_, { symbol }, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbol(symbol);
  },
  tradingEngineSecurity(_, { securityName }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSecurity(securityName);
  },
  tradingEngineGroups(_, __, { dataSources }) {
    return dataSources.TradingEngineAPI.getGroups();
  },
  tradingEngineTransactions(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.getTransactions(args);
  },
  tradingEngineHistory(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.getHistory(args);
  },
  tradingEngineSymbolPrices(_, { symbol, ...args }, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbolPrices(symbol, args);
  },
  tradingEngineAccountSymbols(_, { accountUuid }, { dataSources }) {
    return dataSources.TradingEngineAPI.getAllowedAccountSymbols(accountUuid);
  },
  tradingEngineAccountStatistic(_, { accountUuid }, { dataSources }) {
    return dataSources.TradingEngineAPI.getAccountStatistic(accountUuid);
  },

  /**
   * TradingActivity API
   */
  tradingActivity(_, args, { dataSources }) {
    return dataSources.TradingActivityAPI.getTradingActivity(args);
  },

  /**
   * Brand config resolver
   *
   * @param _
   * @param __
   * @param brandConfig
   *
   * @return {*}
   */
  config(_, __, { brandConfig }) {
    return {
      env: config.get('env'),
      currencies: get(brandConfig, 'nas.brand.currencies'),
      locales: get(brandConfig, 'nas.brand.locale'),
      password: get(brandConfig, 'nas.brand.password'),
      payment: {
        reasons: get(brandConfig, 'nas.brand.payment.reasons'),
      },
      mt4: {
        leveragesChangingRequest: get(brandConfig, 'nas.brand.mt4.leverages_changing_request', []),
        live: {
          enabled: !!get(brandConfig, 'nas.brand.mt4.groups'),
        },
        demo: {
          enabled: !!get(brandConfig, 'nas.brand.mt4.demo_groups'),
        },
      },
      mt5: {
        leveragesChangingRequest: get(brandConfig, 'nas.brand.mt5.leverages_changing_request', []),
        live: {
          enabled: !!get(brandConfig, 'nas.brand.mt5.groups'),
        },
        demo: {
          enabled: !!get(brandConfig, 'nas.brand.mt5.demo_groups'),
        },
      },
      wet: {
        leveragesChangingRequest: get(brandConfig, 'nas.brand.wet.leverages_changing_request', []),
        live: {
          enabled: !!get(brandConfig, 'nas.brand.wet.groups'),
        },
        demo: {
          enabled: !!get(brandConfig, 'nas.brand.wet.demo_groups'),
        },
      },
      clickToCall: {
        isActive: get(brandConfig, 'nas.brand.clickToCall.isActive', false),
        asterisk: {
          isActive: get(brandConfig, 'nas.brand.clickToCall.asterisk.isActive', false),
          prefixes: get(brandConfig, 'nas.brand.clickToCall.asterisk.prefixes', {}),
        },
        commpeak: {
          isActive: get(brandConfig, 'nas.brand.clickToCall.commpeak.isActive', false),
          prefixes: get(brandConfig, 'nas.brand.clickToCall.commpeak.prefixes', {}),
        },
        coperato: {
          isActive: get(brandConfig, 'nas.brand.clickToCall.coperato.isActive', false),
          prefixes: get(brandConfig, 'nas.brand.clickToCall.coperato.prefixes', {}),
        },
      },
      sms: {
        coperato: {
          isActive: get(brandConfig, 'nas.brand.sms.coperato.isActive', false),
        },
      },
      email: {
        templatedEmails: !!get(brandConfig, 'nas.brand.email.sendgrid.crm_templated_emails'),
      },
      clientPortal: {
        url: get(brandConfig, 'nas.brand.client_portal.url'),
      },
      affiliate: {
        restriction: {
          minFtdDeposit: get(brandConfig, 'nas.brand.affiliate.restriction.minFtdDeposit'),
        },
      },
    };
  },

  /**
   *
   * Brands resolver
   *
   */
  // TODO: Temporary solution until brand-config-service will be released
  brands() {
    return Object.keys(config.brandsConfig).map(brandId => ({
      brandId,
      config: JSON.stringify(config.brandsConfig[brandId]),
    }));
  },
};
