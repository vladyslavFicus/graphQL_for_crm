const { set } = require('lodash');
const maskText = require('../../../../utils/maskText');

module.exports = {
  async authorFullName({ authorUuid, authorFullName }, _, { dataSources }) {
    const prefix = authorUuid.split('-')[0];

    if (prefix === 'OPERATOR') {
      const operatorData = await dataSources.OperatorAPI.getByUUID(authorUuid);
      return operatorData ? `${operatorData.firstName} ${operatorData.lastName}` : '';
    }

    if (prefix === 'OPERATOR' || prefix === 'OPERATOR') {
      return 'System';
    }

    return authorFullName;
  },
  authorUuid({ authorUuid }) {
    return authorUuid === 'SYSTEM' ? '' : authorUuid;
  },
  async details({ type, details }, _, { dataSources }) {
    if (details && type === 'PROFILE_ASSIGN') {
      const parsedDetails = JSON.parse(details);

      const operator = await dataSources.OperatorAPI.getByUUID(
        parsedDetails.acquisitionRepresentativeUuid,
      );

      return JSON.stringify({
        ...parsedDetails,
        ...operator && { assignedToName: `${operator.firstName} ${operator.lastName}` },
      });
    }
    if (details && type === 'PLAYER_PROFILE_REGISTERED') {
      const parsedDetails = JSON.parse(details);
      const { contacts } = parsedDetails;

      if (!contacts) {
        return details;
      }

      if (contacts.phone) {
        set(parsedDetails, 'contacts.phone', maskText(contacts.phone, true));
      }

      if (contacts.additionalPhone) {
        set(parsedDetails, 'contacts.additionalPhone', maskText(contacts.additionalPhone, true));
      }

      return JSON.stringify(parsedDetails);
    }
    if (details && type === 'PLAYER_PROFILE_CHANGED') {
      const parsedDetails = JSON.parse(details);
      const { contacts } = parsedDetails;

      if (!contacts) {
        return details;
      }

      if (contacts.phone) {
        set(parsedDetails, 'contacts.phone.from', maskText(contacts.phone.from, true));
        set(parsedDetails, 'contacts.phone.to', maskText(contacts.phone.to, true));
      }

      if (contacts.additionalPhone) {
        set(parsedDetails, 'contacts.additionalPhone.from', maskText(contacts.additionalPhone.from, true));
        set(parsedDetails, 'contacts.additionalPhone.to', maskText(contacts.additionalPhone.to, true));
      }

      return JSON.stringify(parsedDetails);
    }

    return details;
  },
};
