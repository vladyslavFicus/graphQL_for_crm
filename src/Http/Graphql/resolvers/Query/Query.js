const { AuthenticationError } = require('@hrzn/apollo-datasource');
const { get } = require('lodash');

module.exports = {
  /**
   *
   * AfilliateAPI
   *
   * */
  partners(_, args, { dataSources }) {
    return dataSources.AffiliateAPI.getPartners(args);
  },
  partner(_, { uuid }, { dataSources }) {
    return dataSources.AffiliateAPI.getPartner(uuid);
  },

  /**
   *
   * AuditAPI
   *
   * */
  feeds(_, args, { dataSources }) {
    return dataSources.AuditAPI.getFeeds(args);
  },
  feedTypes(_, { uuid }, { dataSources }) {
    return dataSources.AuditAPI.getFeedTypes(uuid);
  },

  /**
   *
   * Auth2API
   *
   * */
  async authoritiesOptions(_, __, { dataSources, brand: { id: brand } }) {
    const responseData = await dataSources.Auth2API.getAuthorities(brand);

    const executeDepartments = ['ADMINISTRATION', 'PLAYER', 'E2E'];
    const authorities = get(responseData, `authoritiesPerBrand.${brand}`) || [];
    const authoritiesOptions = {};

    authorities.map(({ department, role }) => {
      if (executeDepartments.includes(department)) {
        return;
      }

      if (Array.isArray(authoritiesOptions[department])) {
        return authoritiesOptions[department].push(role);
      }

      return (authoritiesOptions[department] = [role]);
    });

    return { authoritiesOptions };
  },
  async permission(_, __, { dataSources }) {
    const { actions } = await dataSources.Auth2API.getPermissions();
    return actions;
  },
  loginLock(_, { uuid }, { dataSources }) {
    return dataSources.Auth2API.getCredentialsLock(uuid);
  },

  /**
   *
   * BrandConfigAPI
   *
   * */
  brandConfig(_, { brandId }, { dataSources }) {
    return dataSources.BrandConfigAPI.getBrandConfig(brandId);
  },

  /**
   *
   * CallbackAPI
   *
   * */
  async callbacks(_, args, { dataSources, userUUID }) {
    const operatorIdsData = await dataSources.HierarchyAPI.getOperatorsSubtree(userUUID);
    const operatorIds = operatorIdsData.map(({ uuid }) => uuid);

    return await dataSources.CallbackAPI.getCallbacks({ operatorIds, ...args });
  },
  async callback(_, { id }, { dataSources }) {
    const callbacksData = await dataSources.CallbackAPI.getCallbacks({ id, page: 0, limit: 1 });

    return callbacksData.content[0];
  },

  /**
   *
   * EmailAPI
   *
   * */
  emailTemplates(_, __, { dataSources }) {
    return dataSources.EmailAPI.getTemplates();
  },
  emailTemplate(_, { id }, { dataSources }) {
    return dataSources.EmailAPI.getTemplate(id);
  },

  /**
   *
   * FilterSetAPI
   *
   * */
  filterSets(_, { type }, { dataSources, userUUID }) {
    return dataSources.FilterSetsAPI.getFilterSets(userUUID, type);
  },
  filterSet(_, { uuid }, { dataSources }) {
    return dataSources.FilterSetsAPI.getFilterSet(uuid);
  },

  /**
   *
   * NoteAPI
   *
   * */
  notes(_, { targetUUID, ...args }, { dataSources }) {
    return dataSources.NoteAPI.getNotes({ ...args, targetUUIDs: [targetUUID] });
  },

  /**
   *
   * NotificationCenterAPI
   *
   * */
  notificationCenter(_, { args }, { dataSources }) {
    const { hierarchical, ...argsBody } = args || {};

    return dataSources.NotificationCenterAPI.getNotifications({ ...argsBody, hierarchical: !!hierarchical });
  },
  notificationCenterTypes(_, __, { dataSources }) {
    return dataSources.NotificationCenterAPI.getTypes();
  },
  notificationCenterSubtypes(_, __, { dataSources }) {
    return dataSources.NotificationCenterAPI.getSubtypes();
  },
  notificationCenterUnread(_, __, { dataSources }) {
    return dataSources.NotificationCenterAPI.getUnreadCount();
  },

  /**
   *
   * PaymentAPI
   *
   * */
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

  /**
   * Operator API
   */
  async operator(_, { uuid }, { dataSources }) {
    // Check allowance to see operator profile by hierarchy
    await dataSources.HierarchyAPI.checkAccess(uuid);

    return dataSources.OperatorAPI.getByUUID(uuid);
  },
  async operators(_, args, { dataSources, userUUID }) {
    const operatorsSubtree = await dataSources.HierarchyAPI.getOperatorsSubtree(userUUID);

    const operatorsIds = operatorsSubtree.map(({ uuid }) => uuid);

    return dataSources.OperatorAPI.search({
      ...args,
      uuids: operatorsIds,
      limit: operatorsIds.length,
    });
  },
};
