import {setInputValue} from '../helpers/input';
import {generateUserData} from '../../data/generators/userData';
import {createUser} from '../../data/backend/userRequests';

declare const appPath: string;
declare const appId: string;

describe('WebdriverIO and Appium interacting with a login form,', () => {
  let userData: ReturnType<typeof generateUserData>;
  beforeEach(async () => {
    await driver.installApp(appPath);
    await driver.activateApp(appId);
    userData = generateUserData();
    await createUser(userData);
  });

  afterEach(async () => {
    await driver.removeApp(appId);
  });

  it('should be able login successfully with valid credentials', async () => {
    const emailInput = await $('~email-input');
    await setInputValue(emailInput, userData.email);

    const passwordInput = await $('~password-input');
    await setInputValue(passwordInput, userData.password);

    await $('~login-button').click();

    // flaky :
    // expect(await $('~home-header').isDisplayed()).toBe(true);

    // works :
    // driver.pause(2000);
    // expect(await $('~home-header').isDisplayed()).toBe(true);

    // even better:
    await $('~home-header').waitForDisplayed({timeout: 10000});
  });

  it('should not be able to login with invalid password', async () => {
    const emailInput = await $('~email-input');
    await setInputValue(emailInput, userData.email);
    const passwordInput = await $('~password-input');
    await setInputValue(passwordInput, userData.password.slice(0, -1));
    await $('~login-button').click();
    await $('~login-error').waitForDisplayed({timeout: 2000});
    expect(await $('~login-error').getText()).toBe('mot de passe incorrect');
    expect(await $('~home-header').isDisplayed()).toBe(false);
    expect(await $('~login-header').isDisplayed()).toBe(true);
  });
});

export {};
