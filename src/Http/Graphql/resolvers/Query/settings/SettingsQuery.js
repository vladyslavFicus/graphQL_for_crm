module.exports = {
  acquisitionStatuses(_, { brandId, args }, { dataSources }) {
    return dataSources.HierarchyUpdaterAPI.getBrandAcquisitionStatuses(brandId, args);
  },
  paymentSystemsProvider(_, { args }, { dataSources }) {
    return dataSources.PaymentAPI.paymentSystemsProvider(args);
  },
};
