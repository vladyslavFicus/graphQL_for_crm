const { AuthenticationError } = require('@hrzn/apollo-datasource');

module.exports = {
  brandConfig(_, { brandId }, { dataSources }) {
    return dataSources.BrandConfigAPI.getBrandConfig(brandId);
  },
  emailTemplate(_, { id }, { dataSources }) {
    return dataSources.EmailAPI.getTemplate(id);
  },
  emailTemplates(_, __, { dataSources }) {
    return dataSources.EmailAPI.getTemplates();
  },
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
  partners(_, args, { dataSources }) {
    return dataSources.AffiliateAPI.getPartners(args);
  },
  partner(_, { uuid }, { dataSources }) {
    return dataSources.AffiliateAPI.getPartner(uuid);
  },
};
