const { gql } = require('apollo-server-express');

module.exports = gql`
  type BrandConfigProvider__Currencies {
    base: String
    supported: [String]
  }

  type BrandConfigProvider__Locales {
    defaultLanguage: String
    languages: [String]
  }
  
  type BrandConfigProvider__Backoffice {
    dashboards: Object
  }

  type BrandConfigProvider__Password {
    pattern: String
    mt4_pattern: String
    mt4: Object
    mt5: Object
  }

  type BrandConfigProvider__Payment {
    reasons: Object
  }

  type BrandConfigProvider__Profile {
    isDepositEnabled: Boolean
  }
  
  type BrandConfigProvider__Newtel {
    isActive: Boolean
    prefixes: Object
  }

  type BrandConfigProvider__Commpeak {
    isActive: Boolean
    prefixes: Object
  }

  type BrandConfigProvider__Coperato {
    isActive: Boolean
    prefixes: Object
  }

  type BrandConfigProvider__ClickToCall {
    isActive: Boolean
    newtel: BrandConfigProvider__Newtel
    commpeak: BrandConfigProvider__Commpeak
    coperato: BrandConfigProvider__Coperato
  }

  type BrandConfigProvider__Sms__FullSms {
    isActive: Boolean
  }

  type BrandConfigProvider__Sms {
    fullSms: BrandConfigProvider__Sms__FullSms
  }

  type BrandConfigProvider__TradingProvider__Settings {
    enabled: Boolean
  }

  type BrandConfigProvider__TradingProvider__Currencies {
    default: String
    supported: [String]
  }

  type BrandConfigProvider__TradingProvider {
    live: BrandConfigProvider__TradingProvider__Settings
    demo: BrandConfigProvider__TradingProvider__Settings
    leveragesChangingRequest: [Int]
    currencies: BrandConfigProvider__TradingProvider__Currencies
  }

  type BrandConfigProvider__Email {
    templatedEmails: Boolean
  }

  type BrandConfigProvider__ClientPortal {
    url: String
  }

  type BrandConfigProvider__ClientPortalLanding {
    signUp: String
  }
  
  type BrandConfigProvider__Affiliate__Restriction {
    minFtdDeposit: Int
  }
  
  type BrandConfigProvider__Affiliate {
    restriction: BrandConfigProvider__Affiliate__Restriction
  }

  type BrandConfigProvider {
    env: String
    currencies: BrandConfigProvider__Currencies
    locales: BrandConfigProvider__Locales
    password: BrandConfigProvider__Password
    backoffice: BrandConfigProvider__Backoffice
    payment: BrandConfigProvider__Payment
    profile: BrandConfigProvider__Profile
    clickToCall: BrandConfigProvider__ClickToCall
    sms: BrandConfigProvider__Sms
    mt4: BrandConfigProvider__TradingProvider
    mt5: BrandConfigProvider__TradingProvider
    wet: BrandConfigProvider__TradingProvider
    email: BrandConfigProvider__Email
    clientPortal: BrandConfigProvider__ClientPortal
    clientPortalLanding: BrandConfigProvider__ClientPortalLanding
    affiliate: BrandConfigProvider__Affiliate
  }
`;
