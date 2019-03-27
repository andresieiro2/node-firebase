import * as admin from 'firebase-admin';
import * as UserModel from './../models/user';

const scopeAuth = scope => {
  return async (req, res, next) => {
    try {
      let user = await UserModel.getUser(req.user.uid);

      req.user = { ...req.user, ...user };

      let userType = await user.type.get();
      userType = userType.data();
      req.user = {
        ...req.user,
        type: userType.type,
        roles: userType.roles,
      };

      const roles = Object.keys(userType.roles);
      if (roles.filter(role => scope === role).length > 0) {
        next();
      } else {
        throw { message: 'Usuário não tem permissão para esta ação' };
      }
    } catch (e) {
      res
        .status(405)
        .send({ message: e.message || 'Falha ao checar permissões' });
    }
  };
};

export default scopeAuth;
