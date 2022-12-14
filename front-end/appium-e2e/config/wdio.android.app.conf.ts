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
    platformName: 'Android',
    maxInstances: 1,
    // For W3C the appium capabilities need to have an extension prefix
    // http://appium.io/docs/en/writing-running-appium/caps/
    // This is `appium:` for all Appium Capabilities which can be found here
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'UiAutomator2',
    // The path to the app
    'appium:appPackage': 'com.endtoenddemo',
    'appium:app':
      '/Users/jean-baptistelarriviere/Documents/rn-playground/endToEndDemo/front-end/android/app/build/outputs/apk/debug/app-debug.apk',
    // @ts-ignore
    'appium:appActivity': '.MainActivity',
    'appium:newCommandTimeout': 240,
    'appium:fullReset': true,
  },
];

exports.config = config;
