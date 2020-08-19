const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class ProfileAPI extends RESTDataSource {
  /**
   * Get profile by uuid
   *
   * @param uuid Client UUID
   *
   * @return {*}
   */
  getByUUID(uuid) {
    return this.get(`/admin/profiles/${uuid}`);
  }

  /**
   * Create profile
   *
   * @param args
   *
   * @return {*}
   */
  createProfile(args) {
    return this.post('/admin/profiles', args);
  }

  /**
   * Change user status
   *
   * @param uuid Client UUID
   * @param args
   * @param args.status
   * @param args.reason
   * @param args.comment
   *
   * @return {*}
   */
  changeStatus(uuid, args) {
    return this.put(`/admin/profiles/${uuid}/status`, args);
  }

  /**
   * Update personal information
   *
   * @param uuid Client UUID
   * @param args
   * @param args.firstName
   * @param args.lastName
   * @param args.birthDate
   * @param args.gender
   * @param args.identificationNumber
   * @param args.languageCode
   * @param args.passport
   * @param args.passport.number
   * @param args.passport.issueDate
   * @param args.passport.expirationDate
   * @param args.passport.countryOfIssue
   * @param args.passport.countrySpecificIdentifier
   * @param args.passport.countrySpecificIdentifierType
   * @param args.timeZone
   *
   * @return {*}
   */
  updatePersonalInformation(uuid, args) {
    return this.put(`/admin/profiles/${uuid}/personal-information`, args);
  }

  /**
   * Update address
   *
   * @param uuid Client UUID
   * @param args
   * @param args.countryCode
   * @param args.city
   * @param args.state
   * @param args.postCode
   * @param args.address
   *
   * @return {*}
   */
  updateAddress(uuid, args) {
    return this.put(`/admin/profiles/${uuid}/address`, args);
  }

  /**
   * Update contacts
   *
   * @param uuid Client UUID
   * @param args
   * @param args.phone
   * @param args.additionalPhone
   * @param args.additionalEmail
   *
   * @return {*}
   */
  updateContacts(uuid, args) {
    return this.put(`/admin/profiles/${uuid}/contacts`, args);
  }

  /**
   * Update configuration
   *
   * @param uuid Client UUID
   * @param args
   * @param args.internalTransfer
   * @param args.crs
   * @param args.fatca
   *
   * @return {*}
   */
  updateConfiguration(uuid, args) {
    return this.put(`/admin/profiles/${uuid}/configuration`, args);
  }

  /**
   * Update KYC status
   *
   * @param uuid Client UUID
   * @param args
   * @param args.kycStatus
   *
   * @return {*}
   */
  updateKYCStatus(uuid, args) {
    return this.put(`/admin/profiles/${uuid}/kyc/status`, args);
  }

  /**
   * Update client email
   *
   * @param uuid Client UUID
   * @param email Email
   *
   * @return {*}
   */
  updateEmail(uuid, email) {
    return this.put(`/admin/profiles/${uuid}/contacts/email`, { email });
  }

  /**
   * Verify client email
   *
   * @param uuid Client UUID
   *
   * @return {*}
   */
  verifyEmail(uuid) {
    return this.post(`/admin/profiles/${uuid}/verification/email`);
  }

  /**
   * Verify client phone
   *
   * @param uuid Client UUID
   * @param phone Phone number
   *
   * @return {*}
   */
  verifyPhone(uuid, phone) {
    return this.post(`/admin/profiles/${uuid}/verification/phone`, { phone });
  }
}

module.exports = ProfileAPI;
