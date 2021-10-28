import { UserData } from '../../typescript/adminTypes';

export const simpleLoginCheck = (
  username: string,
  password: string,
  userList: UserData[]
): false | UserData => {
  for (const user of userList) {
    if (
      username.toLowerCase() === user.username.toLowerCase() &&
      password === user.password
    ) {
      return user;
    }
  }
  return false;
};

export const testFunc = () => {
  return 'Hi there';
};
