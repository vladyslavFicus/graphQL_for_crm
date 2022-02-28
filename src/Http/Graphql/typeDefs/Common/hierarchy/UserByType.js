const { gql } = require('apollo-server-express');

module.exports = gql`
  type HierarchyUserByType {
    COMPANY_ADMIN: [HierarchyUser]
    BRAND_ADMIN: [HierarchyUser]
    SALES_HOD: [HierarchyUser]
    RETENTION_HOD: [HierarchyUser]
    SUPPORT_HOD: [HierarchyUser]
    PSP_HOD: [HierarchyUser]
    SALES_MANAGER: [HierarchyUser]
    RETENTION_MANAGER: [HierarchyUser]
    SUPPORT_MANAGER: [HierarchyUser]
    PSP_MANAGER: [HierarchyUser]
    BO_MANAGER: [HierarchyUser]
    COMPLIANCE_MANAGER: [HierarchyUser]
    OPERATIONS_MANAGER: [HierarchyUser]
    DEALING_MANAGER: [HierarchyUser]
    SALES_LEAD: [HierarchyUser]
    RETENTION_LEAD: [HierarchyUser]
    SUPPORT_LEAD: [HierarchyUser]
    SALES_AGENT: [HierarchyUser]
    RETENTION_AGENT: [HierarchyUser]
    SUPPORT_AGENT: [HierarchyUser]
    CUSTOMER: [HierarchyUser]
    LEAD_CUSTOMER: [HierarchyUser]
  }
`;
