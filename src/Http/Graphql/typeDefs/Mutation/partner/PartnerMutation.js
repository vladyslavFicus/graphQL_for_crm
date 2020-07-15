const { gql } = require('apollo-server-express');

module.exports = gql`
  type PartnerMutation {
    createPartner(
      email: String!
      externalAffiliateId: String
      firstName: String!
      lastName: String!
      password: String!
      phone: String
      public: Boolean
    ): Partner

    updatePartner(
      country: String
      email: String
      externalAffiliateId: String
      firstName: String!
      lastName: String!
      permission: PartnerPermission__Input
      phone: String
      public: Boolean
      uuid: String!
    ): Boolean

    changePartnerAccountStatus(
      uuid: String!
      reason: String!
      status: String!
    ): Boolean
    
    createSchedule(
      affiliateUuid: String!
      activated: Boolean
      day: String
      totalLimit: Int
      countrySpreads: [PartnerSchedule__Input]
      workingHoursFrom: String
      workingHoursTo: String
    ): Boolean
    
    changeScheduleStatus(
      affiliateUuid: String!
      data: [PartnerScheduleStatus__Input]
    ): Boolean
  }
`;
