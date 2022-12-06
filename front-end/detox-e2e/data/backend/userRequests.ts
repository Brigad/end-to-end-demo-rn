import {generateUserData} from '../generators/userData';

export const createUser = async (
  userData: ReturnType<typeof generateUserData>,
) => {
  await fetch('http://localhost:3000/sign-up', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `usernameFromFront=${userData.userName}&emailFromFront=${userData.email}&passwordFromFront=${userData.password}`,
  });
};
