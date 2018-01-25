// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  name: "dev",
  production: false,
  getRemittanceCentersAPI: 'remittanceapi/remittance/v1/quick/remcos',
  authAPI: 'cliqqapiauth/accounts/oauth2/token',
  getServiceFeeAPI: 'remittanceapi/remittance/v1/quick/fees',
  sendMoneyAPI: 'remittanceapi/remittance/v1/quick/transfers',
  maxTransactionAmount: 2500.00,
  destinationBranch: "PWA"
};
