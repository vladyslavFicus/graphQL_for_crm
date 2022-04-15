module.exports = {
  acquisitionStatuses(_, { brandId, args }, { dataSources }) {
    return dataSources.HierarchyUpdaterAPI.getBrandAcquisitionStatuses(brandId, args);
  },
};
