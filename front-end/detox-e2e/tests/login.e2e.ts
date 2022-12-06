import {by, expect, element} from 'detox';
import {generateUserData} from '../data/generators/userData';
import {createUser} from '../data/backend/userRequests';

describe('Detox interacting with login flow, ', () => {
  let userData: ReturnType<typeof generateUserData>;

  beforeEach(async () => {
    await device.launchApp({delete: true});
    userData = generateUserData();
    await createUser(userData);
  });

  it('should be able to login with valid credentials, ', async () => {
    await element(by.id('email-input')).typeText(userData.email);
    await element(by.id('password-input')).typeText(userData.password);
    await element(by.id('login-button')).tap();

    await expect(element(by.id('home-header'))).toBeVisible();
  });

  it('should not be able to login with invalid password', async () => {
    await element(by.id('email-input')).typeText(userData.email);
    await element(by.id('password-input')).typeText(
      userData.password.slice(0, -1),
    );
    await element(by.id('login-button')).tap();

    await expect(element(by.id('login-error'))).toHaveText(
      'mot de passe incorrect',
    );
    await expect(element(by.id('home-header'))).not.toBeVisible();
    await expect(element(by.id('login-header'))).toBeVisible();
  });
});

export {};
