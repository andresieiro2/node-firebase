import * as admin from 'firebase-admin';
import * as firebase from 'firebase';

export const find_user = async params => {
  let user;
  try {
    user = await new Promise(resolve => {
      setTimeout(() => {
        resolve('USER GET');
      }, 3000);
    });
  } catch (e) {
    return {
      message: 'Falha no get',
      code: 404,
    };
  }
  return user;
};

export const update_user = async body => {
  let user;
  try {
    user = await new Promise(resolve => {
      setTimeout(() => {
        resolve('USER PUT');
      }, 3000);
    });
  } catch (e) {
    return {
      message: 'Falha no put',
      code: 410,
    };
  }
  return user;
};

export const create_user = async body => {
  let user;
  try {
    user = await new Promise(resolve => {
      setTimeout(() => {
        resolve('USER POST');
      }, 3000);
    });
  } catch (e) {
    return {
      message: 'Falha no post',
      code: 406,
    };
  }
  return user;
};
