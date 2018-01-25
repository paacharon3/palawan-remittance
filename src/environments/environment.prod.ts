export const environment = {
  name: "prod",
  production: true,
  getRemittanceCentersAPI: 'https://gw.cliqq.net:8443/remittance/v1/quick/remcos',
  authAPI: 'https://gw.cliqq.net:8443/accounts/oauth2/token',
  getServiceFeeAPI: 'https://gw.cliqq.net:8443/remittance/v1/quick/fees',
  sendMoneyAPI: 'https://gw.cliqq.net:8443/remittance/v1/quick/transfers',
  maxTransactionAmount: 2500.00,
  destinationBranch: "XXK"
};
