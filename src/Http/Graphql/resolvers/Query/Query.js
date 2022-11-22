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
  feedTypes(_, { uuid, filters }, { dataSources }) {
    return dataSources.AuditAPI.getFeedTypes(uuid, filters);
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
  async brandToAuthorities(_, { crmBrand }, { dataSources }) {
    // Using token renew endpoint to get brandsToAuthorities because BE haven't endpoint to get relation
    // "brand to authority" for clipped token (on operator sign in without choose department) and full token
    const { brandToAuthorities } = await dataSources.Auth2API.tokenRenew();

    let brands = Object.keys(brandToAuthorities).sort();

    // Get only allowed brands for operators (depends from brand groups on CRM brand if it exists)
    try {
      const { list, ignoreBrandList } = await dataSources.S3API.getAvailableBrandsForCrmBrand(crmBrand);

      // Provide only whitelisted brand list if ignoreBrandList=false or absent
      if (!ignoreBrandList) {
        brands = list.filter(brand => brands.includes(brand)).sort();
      }
    } catch (e) {
      brands = []; // If file doesn't exist or someting with request -> show empty brands list for current crm brand
    }

    // Format right array of data for BO with brand name and necessary authority data
    return brands.map(brandId => ({
      id: brandId,
      name: get(config.brandsConfig[brandId], 'nas.brand.name', brandId),
      authorities: brandToAuthorities[brandId],
    }));
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

  callHistory(_, { uuid, args }, { dataSources }) {
    return dataSources.Click2CallAPI.getCallHistory(uuid, args);
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
    return dataSources.OperatorConfigAPI.getFilterSets(userUUID, type);
  },
  filterSet(_, { uuid }, { dataSources }) {
    return dataSources.OperatorConfigAPI.getFilterSet(uuid);
  },

  /**
   * GridConfig API
   */
  gridConfig(_, { type }, { dataSources, userUUID }) {
    return dataSources.OperatorConfigAPI.getGridConfig(userUUID, type);
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
  leadContacts(_, { uuid }, { dataSources }) {
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
    return dataSources.PaymentViewAPI.getPayments({ ...args.args, withOriginalAgent: true });
  },
  clientPayments(_, args, { dataSources }) {
    return dataSources.PaymentViewAPI.getPayments(args.args);
  },
  async paymentMethods(_, __, { dataSources }) {
    const responseData = await dataSources.PaymentAPI.getPaymentMethods();

    return responseData.filter(method => method && method !== 'null').sort();
  },
  paymentSystems(_, __, { dataSources }) {
    return dataSources.PaymentAPI.getPaymentSystems();
  },
  async manualPaymentMethods(_, __, { dataSources }) {
    const responseData = await dataSources.PaymentAPI.getManualPaymentMethods();

    return responseData.sort();
  },
  async paymentsStatistic(_, args, { dataSources }) {
    const responseData = await dataSources.PaymentViewAPI.getPaymentsStatistic(args);

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
  operator(_, { uuid }, { dataSources }) {
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
   * IP Whitelist
   */
  ipWhitelistSearch(_, { args }, { dataSources }) {
    return dataSources.BrandConfigAPI.ipWhitelistSearch(args);
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
      backoffice: {
        dashboards: get(brandConfig, 'nas.brand.backoffice.dashboards'),
      },
      payment: {
        reasons: get(brandConfig, 'nas.brand.payment.reasons'),
      },
      profile: {
        isDepositEnabled: get(brandConfig, 'nas.brand.profile.deposit.enabled', true),
      },
      mt4: {
        leveragesChangingRequest: get(brandConfig, 'nas.brand.mt4.leverages_changing_request', []),
        live: {
          enabled: !!get(brandConfig, 'nas.brand.mt4.groups'),
        },
        demo: {
          enabled: !!get(brandConfig, 'nas.brand.mt4.demo_groups'),
        },
        currencies: get(brandConfig, 'nas.brand.mt4.currencies'),
      },
      mt5: {
        leveragesChangingRequest: get(brandConfig, 'nas.brand.mt5.leverages_changing_request', []),
        live: {
          enabled: !!get(brandConfig, 'nas.brand.mt5.groups'),
        },
        demo: {
          enabled: !!get(brandConfig, 'nas.brand.mt5.demo_groups'),
        },
        currencies: get(brandConfig, 'nas.brand.mt5.currencies'),
      },
      wet: {
        leveragesChangingRequest: get(brandConfig, 'nas.brand.wet.leverages_changing_request', []),
        live: {
          enabled: !!get(brandConfig, 'nas.brand.wet.groups'),
        },
        demo: {
          enabled: !!get(brandConfig, 'nas.brand.wet.demo_groups'),
        },
        currencies: get(brandConfig, 'nas.brand.wet.currencies'),
      },
      sms: {
        fullSms: {
          isActive: get(brandConfig, 'nas.brand.sms.fullSms.isActive', false),
        },
      },
      email: {
        templatedEmails: !!get(brandConfig, 'nas.brand.email.sendgrid.crm_templated_emails'),
      },
      clientPortal: {
        url: get(brandConfig, 'nas.brand.client_portal.url'),
      },
      clientPortalLanding: {
        signUp: get(brandConfig, 'nas.brand.client_portal_landing.signUp'),
      },
      affiliate: {
        restriction: {
          minFtdDeposit: get(brandConfig, 'nas.brand.affiliate.restriction.minFtdDeposit'),
        },
      },
    };
  },

  /**
   * Brands resolver for CDE
   */
  brands() {
    return Object.keys(config.brandsConfig).map(brandId => ({ brandId }));
  },
};
