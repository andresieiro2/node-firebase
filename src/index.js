import 'babel-polyfill';
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import 'firebase/firestore';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import config from './porto-seguro-r-financeiros.json';
import config_stg from './porto-seguro-r-financeiros-stg.json';
// import serviceAccount from './porto-seguro-r-financeiros-admin.json';
// import serviceAccount_stg from './porto-seguro-r-financeiros-admin-stg.json';
import routes from './routes';

const app = express();

// if (
//   !functions.config().project ||
//   functions.config().project.type !== 'production'
// ) {
//   firebase.initializeApp(config_stg);
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount_stg),
//     databaseURL: serviceAccount_stg.database_url,
//   });
// } else {
//   firebase.initializeApp(config);
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: serviceAccount.database_url,
//   });
// }

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// fix requisicoes sem body
app.use(async (req, res, next) => {
  try {
    req.body = await JSON.parse(req.body);
  } catch (e) {
    //req sem body
  }

  next();
});

exports.api = functions.https.onRequest(app);

routes.init(app);
