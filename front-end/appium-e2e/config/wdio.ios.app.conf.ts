import config from './wdio.shared.local.appium.conf';

// ============
// Specs
// ============
config.specs = ['./appium-e2e/tests/specs/**/app*.spec.ts'];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    // The defaults you need to have in your config
    platformName: 'iOS',
    maxInstances: 1,
    // For W3C the appium capabilities need to have an extension prefix
    // This is `appium:` for all Appium Capabilities which can be found here
    // http://appium.io/docs/en/writing-running-appium/caps/
    'appium:deviceName': 'iPhone 14',
    'appium:platformVersion': '16.1',
    'appium:automationName': 'XCUITest',
    // The path to the app
    'appium:app':
      '/Users/jean-baptistelarriviere/Documents/rn-playground/endToEndDemo/front-end/ios/build/Build/Products/Debug-iphonesimulator/endToEndDemo.app',
    'appium:appPackage': 'org.reactjs.native.example.endToEndDemo',
    'appium:newCommandTimeout': 240,
  },
];

exports.config = config;
