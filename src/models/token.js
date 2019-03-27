import * as admin from 'firebase-admin';
import * as firebase from 'firebase';

export const createToken = async (email, password) => {
  let token;
  try {
    const auth_user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    token = auth_user && (await auth_user.getIdToken(true));
  } catch (e) {
    throw {
      message: 'Falha ao gerar token',
    };
  }
  return token;
};

export const revokeToken = async uid => {
  await admin.auth().revokeRefreshTokens(uid);
};
