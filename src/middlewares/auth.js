import * as admin from 'firebase-admin';

export const tokenAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = await admin.auth().verifyIdToken(token, true);
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ message: 'Token invalido' });
  }
};

export const basicAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send({ message: 'Credenciais inexistentes' });
    return false;
  }

  const basic = req.headers.authorization.split(' ')[1];
  let client;

  try {
    client = await admin
      .firestore()
      .collection('app-clients')
      .where('basicAuth', '==', basic)
      .get();
    if (!client && !client.docs && client.docs.length !== 1) {
      throw {
        message: 'Crendenciais inválidas',
      };
    }
  } catch (e) {
    res
      .status(401)
      .send({ message: e.message || 'Falha ao obter credenciais' });
  }

  next();
};
