module.exports = {
  /**
   * Update note
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<Lead|*>}
   */
  async update(_, { uuid, ...args }, { dataSources, brand: { id: brandId } }) {
    await dataSources.LeadUpdaterAPI.updateLead(uuid, { brandId, ...args });
    return true;
  },

  /**
   * Mass leads reassign to new sales representative
   * and mass leads change sales status
   *
   * @param _
   * @param args
   * @param args.allRowsSelected
   * @param args.leads
   * @param args.salesRep
   * @param args.salesStatus
   * @param args.searchParams
   * @param args.totalElements
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  async bulkLeadUpdate(
    _,
    {
      allRowsSelected,
      leads,
      salesRep,
      salesStatus,
      searchParams,
      totalElements,
    },
    {
      dataSources,
      brand: { id: brandId },
    },
  ) {
    const leadsUuids = leads.length ? leads.map(({ uuid }) => uuid) : [];

    // If leads list length equal totalElements, than we just use the list
    let leadsUuidsForBulkUpdate = leadsUuids;

    // Otherwize we need to get all leads list and filter it
    // # leadsUuids in this case are exclusion elements that need to be removed from the list before bulk update
    if (allRowsSelected && leads.length !== totalElements) {
      const allLeadsData = dataSources.LeadAPI.getLeads({
        limit: totalElements,
        ...(searchParams && searchParams),
      });

      leadsUuidsForBulkUpdate = allLeadsData
        .filter(({ uuid }) => leadsUuids.indexOf(uuid) === -1)
        .map(({ uuid }) => ({ uuid }));
    }

    // Update leads sales status
    if (salesStatus) {
      await dataSources.LeadUpdaterAPI.bulkLeadUpdate({
        uuids: leadsUuidsForBulkUpdate,
        brandId,
        ...(salesStatus && { salesStatus }),
      });
    }

    // Assign leads to another operators (salesRepresentative)
    if (salesRep && salesRep.length) {
      await dataSources.HierarchyUpdaterAPI.bulkMassAssignHierarchyUser({
        userUuids: leadsUuidsForBulkUpdate,
        parentUsers: salesRep,
      });
    }

    return true;
  }
};
