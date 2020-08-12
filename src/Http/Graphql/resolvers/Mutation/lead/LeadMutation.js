module.exports = {
  /**
   * Update note
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   * @param brandId
   *s
   * @return {Promise<Lead|*>}
   */
  async update(_, { uuid, ...args }, { dataSources, brand: { id: brandId } }) {
    await dataSources.LeadUpdaterAPI.updateLead(uuid, { brandId, ...args });
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
   * @param brandId
   * @param userUUID
   *
   * @return {Promise<*>}
   */
  async bulkLeadUpdate(
    _,
    { allRowsSelected, leads, salesRep, salesStatus, searchParams, totalElements },
    { dataSources, brand: { id: brandId }, userUUID },
  ) {
    const leadsUuids = leads.length ? leads.map(({ uuid }) => uuid) : [];

    // If leads list length equal totalElements, than we just use the list
    let leadsUuidsForBulkUpdate = leadsUuids;

    // Otherwize we need to get all leads list and filter it
    // # leadsUuids in this case are exclusion elements that need to be removed from the list before bulk update
    if (allRowsSelected && leads.length !== totalElements) {
      const observedFrom = await dataSources.HierarchyAPI.getObserverForSubtree(userUUID);

      const allLeadsData = await dataSources.LeadAPI.getLeads({
        brandId,
        observedFrom,
        page: {
          from: 0,
          size: totalElements,
        },
        ...(searchParams && searchParams),
      });

      leadsUuidsForBulkUpdate = allLeadsData.content
        .filter(({ uuid }) => leadsUuids.indexOf(uuid) === -1)
        .map(({ uuid }) => uuid);
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
  },

  /**
   *
   * Upload leads (csv)
   *
   * @param _
   * @param file
   * @param dataSources
   * @param brand
   *
   * @return {Promise<*>}
   *
   * */
  async uploadLeads(_, { file }, { dataSources, brand: { id: brand } }) {
    await dataSources.LeadUpdaterAPI.uploadLeads(file, brand);
  },

  /**
   * Promote lead to client
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  async promote(_, { args: { uuid, ...args } }, { dataSources }) {
    // Get real lead contacts from BE service
    const lead = await dataSources.LeadAPI.getLead(uuid);

    const _args = {
      ...args,
      contacts: {
        phone: lead.phone,
        additionalPhone: lead.mobile,
        email: lead.email,
      },
    };

    return dataSources.ProfileAPI.createProfile(_args);
  },
};
