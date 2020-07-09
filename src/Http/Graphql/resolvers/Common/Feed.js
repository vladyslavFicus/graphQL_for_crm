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

      const { firstName, lastName } = await dataSources.OperatorAPI.getByUUID(
        parsedDetails.acquisitionRepresentativeUuid,
      );

      return JSON.stringify({
        ...parsedDetails,
        assignedToName: `${firstName} ${lastName}`,
      });
    }

    return details;
  },
};
