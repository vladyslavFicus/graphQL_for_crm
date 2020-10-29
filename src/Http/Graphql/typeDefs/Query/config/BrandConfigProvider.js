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

  type BrandConfigProvider__Password {
    pattern: String
    mt4_pattern: String
    mt4: Object
    mt5: Object
  }

  type BrandConfigProvider__Payment {
    reasons: Object
  }
  
  type BrandConfigProvider__Asterisk {
    isActive: Boolean
    prefixes: Object
  }

  type BrandConfigProvider__ClickToCall {
    isActive: Boolean
    asterisk: BrandConfigProvider__Asterisk
  }

  type BrandConfigProvider__MTx__Settings {
    enabled: Boolean
  }

  type BrandConfigProvider__MTx {
    live: BrandConfigProvider__MTx__Settings
    demo: BrandConfigProvider__MTx__Settings
    leveragesChangingRequest: [Int]
  }

  type BrandConfigProvider__Email {
    templatedEmails: Boolean
  }

  type BrandConfigProvider__ClientPortal {
    url: String
  }

  type BrandConfigProvider {
    env: String
    currencies: BrandConfigProvider__Currencies
    locales: BrandConfigProvider__Locales
    password: BrandConfigProvider__Password
    payment: BrandConfigProvider__Payment
    clickToCall: BrandConfigProvider__ClickToCall
    mt4: BrandConfigProvider__MTx
    mt5: BrandConfigProvider__MTx
    email: BrandConfigProvider__Email
    clientPortal: BrandConfigProvider__ClientPortal
  }
`;
