import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import * as User from './../models/user';

const userController = {
  get_user: async (req, res) => await User.find_user(req.params),
  post_user: async (req, res) => await User.create_user(req.body),
  put_user: async (req, res) => await User.update_user(req.body),
};

export default userController;
